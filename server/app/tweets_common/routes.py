from datetime import date
from typing import List, Optional, Tuple

import requests
from fastapi import Depends, HTTPException
from sqlmodel import Session, select, union_all

from ..config import settings
from ..database import get_session
from . import router
from .decorators import timed_lru_cache
from .helper_functions import get_selection_filter
from .models import PredictionOutput, PseudoTweet, Tweet
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

    args = (start_date, end_date)

    tweet_selection = get_selection_filter(Tweet, *args, select(Tweet.text))
    pseudo_tweet_selection = get_selection_filter(
        PseudoTweet, *args, select(PseudoTweet.text)
    )

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
