from datetime import date
from typing import List, Optional

from fastapi import Depends, HTTPException
from pydantic import NonNegativeInt, PositiveInt, conint
from sqlmodel import Session, select

from ..auth.dependencies import get_current_user
from ..auth.models import User
from ..database import get_session, save_and_refresh
from ..tweets_common.helper_functions import (
    assert_not_null,
    get_a_tweet,
    get_db_overview,
    get_filtered_count,
    get_selection_filter,
)
from ..tweets_common.models import Overview, Tweet, TweetCount, TweetRead, TweetUpdate
from . import router


# Keep it in the top to avoid clashing with pseudo_tweet_id
@router.get("/overview", response_model=List[Overview])
def get_tweet_overview(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    session: Session = Depends(get_session),
):
    """
    Get overview by grouping on created_at
    """

    return get_db_overview(Tweet, start_date, end_date, session)


@router.get("/count", response_model=TweetCount)
def get_count(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    session: Session = Depends(get_session),
):
    """
    Get the count of tweets for the given filters
    """

    return get_filtered_count(Tweet, start_date, end_date, session)


@router.get("/", response_model=List[TweetRead])
def read_tweets(
    offset: NonNegativeInt = 0,
    limit: conint(le=10, gt=0) = 10,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    session: Session = Depends(get_session),
):
    """
    Read tweets within the offset and limit
    """
    selection = get_selection_filter(Tweet, start_date, end_date, select(Tweet))

    return session.exec(
        selection.order_by(Tweet.id.desc()).offset(offset).limit(limit)
    ).all()


@router.get(
    "/{tweet_id}",
    response_model=TweetRead,
    responses={404: {"description": "Tweet Not found"}},
)
def read_tweet(tweet_id: PositiveInt, session: Session = Depends(get_session)):
    """
    Read a tweet by id.
    """

    return get_a_tweet(session, tweet_id, Tweet)


@router.patch(
    "/{tweet_id}",
    response_model=TweetRead,
    responses={
        404: {"description": "Tweet Not found"},
        400: {"description": "No Valid Data to Update"},
    },
)
def update_tweet(
    tweet_id: PositiveInt,
    tweet: TweetUpdate,
    db_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Update a tweet by id.
    """

    # Exclude the nones
    tweet_data = tweet.dict(exclude_none=True)

    if len(tweet_data) == 0:
        raise HTTPException(status_code=400, detail="No Valid Data to Update")

    db_tweet = session.exec(select(Tweet).where(Tweet.id == tweet_id)).one_or_none()

    assert_not_null(db_tweet, tweet_id, Tweet)

    for key, value in tweet_data.items():
        setattr(db_tweet, key, value)

    db_tweet.modifier = db_user

    save_and_refresh(session, db_tweet)
    return db_tweet


@router.post("/edit_request/{tweet_id}")
def request_tweet_edit(tweet_id: PositiveInt, tweet: TweetUpdate):
    """
    Request for tweet edit
    """
    # NOTE: DANGER...CHANGE THIS CODE
    # ONLY FOR DEMO PURPOSE
    with open("edits.txt", "a") as f:
        f.write(f"Tweet, {tweet_id}, {tweet}\n")

    return {"message": "Successfully submitted edit request."}
