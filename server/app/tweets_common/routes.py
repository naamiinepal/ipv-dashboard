from datetime import date
from functools import lru_cache
from typing import List, Optional, Tuple

import requests
from fastapi import Depends, HTTPException
from sqlmodel import Session, select, union_all

from ..config import settings
from ..database import get_session
from . import router
from .decorators import timed_lru_cache
from .helper_functions import get_abusive_tweets
from .models import PredictionOutput, PseudoTweet, Tweet
from .scrape_youtube import (
    YoutubeScrapeResponse,
    youtube_comment_scraper,
    youtube_video_scraper,
)
from .types import MaxResultsType
from .word_cloud_helper import get_word_count_distribution

CACHE_TIMEOUT = 6 * 60 * 60  # 6 hours


@router.get("/", response_model=List[Tuple[str, int]])
@timed_lru_cache(seconds=CACHE_TIMEOUT, maxsize=64)
def get_word_cloud(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    session: Session = Depends(get_session),
):
    """
    Get the word-count distribution within the given time range
    """

    tweet_selection = get_abusive_tweets(Tweet, start_date, end_date)
    pseudo_tweet_selection = get_abusive_tweets(PseudoTweet, start_date, end_date)

    combined_model = union_all(tweet_selection, pseudo_tweet_selection).subquery().c

    # Manually selected the text here, need to change if needed
    combined_tweets = session.exec(select(combined_model.text)).all()

    # change list of tweets to tuple to allow caching
    combined_tweets = tuple(combined_tweets)

    word_freq = get_word_count_distribution(combined_tweets)

    return word_freq


THRESHOLD = 0.5


@router.get(
    "/predict",
    response_model=PredictionOutput,
    responses={503: {"description": "Could not connect to model."}},
)
@timed_lru_cache(seconds=CACHE_TIMEOUT, maxsize=64)
def get_prediction(text: str):
    """
    Get prediction from the live model
    """
    try:
        json_response = requests.post(
            settings.model_url, json={"instances": [text]}
        ).json()
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="Could not connect to the model.")

    # We will be working on a single sample
    predictions = json_response["predictions"][0]

    labels = [
        (abuse_pred >= THRESHOLD, sexual_score)
        for abuse_pred, sexual_score in predictions
    ]

    return PredictionOutput(predictions=predictions, labels=labels)


@router.get("/scrape_youtube", response_model=List[YoutubeScrapeResponse])
@lru_cache(maxsize=16)
def scrape_youtube(
    video_query: str,
    max_video_results: MaxResultsType = 2,
    max_comment_results: MaxResultsType = 2,
):
    video_search_response = youtube_video_scraper.list(
        part="id", q=video_query, maxResults=max_video_results, type="video"
    ).execute()

    # Get all the video ids
    video_ids: Tuple[str] = tuple(
        item["id"]["videoId"] for item in video_search_response["items"]
    )

    response = []
    for video_id in video_ids:
        comment_search_response = youtube_comment_scraper.list(
            part="snippet,replies",
            videoId=video_id,
            maxResults=max_comment_results,
            textFormat="plainText",
        ).execute()

        comment_snippets = tuple(
            {
                "top_level_comment": comment_item["snippet"]["topLevelComment"][
                    "snippet"
                ],
                "replies": [
                    reply["snippet"] for reply in comment_item["replies"]["comments"]
                ]
                if "replies" in comment_item
                else [],
            }
            for comment_item in comment_search_response["items"]
        )

        response.append({"video_id": video_id, "comments": comment_snippets})

    return response
