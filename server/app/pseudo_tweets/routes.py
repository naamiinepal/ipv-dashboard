from datetime import date
from typing import List, Optional

from fastapi import Depends
from pydantic import NonNegativeInt, PositiveInt, conint
from sqlmodel import Session, select

from ..auth.dependencies import get_current_user, get_username_from_token
from ..auth.models import User
from ..database import get_session, save_and_refresh
from ..tweets_common.helper_functions import (
    assert_not_null,
    get_a_tweet,
    get_combined_model,
    get_db_overview,
    get_filtered_count,
    get_selection_filter,
)
from ..tweets_common.models import (
    Overview,
    PseudoTweet,
    Tweet,
    TweetCount,
    TweetRead,
    TweetUpdate,
)
from . import router


# Keep it in the top to avoid clashing with pseudo_tweet_id
@router.get("/overview", response_model=List[Overview])
def get_pseudo_overview(all: bool = False, session: Session = Depends(get_session)):
    """
    Get overview by grouping on created_at
    """

    Model = get_combined_model() if all else PseudoTweet

    return get_db_overview(session, Model)


@router.get("/count", response_model=TweetCount)
def get_count(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    all: bool = False,
    session: Session = Depends(get_session),
):
    """
    Get the count of pseudo tweets for the given filters
    """

    Model = get_combined_model() if all else PseudoTweet

    return get_filtered_count(Model, start_date, end_date, session)


@router.get("/", response_model=List[TweetRead])
def read_pseudo_tweets(
    offset: NonNegativeInt = 0,
    limit: conint(le=10, gt=0) = 10,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    session: Session = Depends(get_session),
):
    """
    Read pseudo tweets within the offset and limit
    """
    selection = get_selection_filter(
        PseudoTweet, start_date, end_date, select(PseudoTweet)
    )

    return session.exec(
        selection.order_by(PseudoTweet.id.desc()).offset(offset).limit(limit)
    ).all()


@router.get(
    "/{pseudo_tweet_id}",
    response_model=TweetRead,
    responses={404: {"description": "PseudoTweet Not found"}},
)
def read_pseudo_tweet(
    pseudo_tweet_id: PositiveInt, session: Session = Depends(get_session)
):
    """
    Read a pseudo tweet by id.
    """
    return get_a_tweet(session, pseudo_tweet_id, PseudoTweet)


@router.patch(
    "/{pseudo_tweet_id}",
    response_model=TweetRead,
    responses={404: {"description": "PseudoTweet Not found"}},
)
def verify_pseudo_tweet(
    pseudo_tweet_id: PositiveInt,
    tweet: TweetUpdate,
    db_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Verify a pseudo tweet by id.
    """

    db_pseudo_tweet = session.exec(
        select(PseudoTweet).where(PseudoTweet.id == pseudo_tweet_id)
    ).one_or_none()

    assert_not_null(db_pseudo_tweet, pseudo_tweet_id, PseudoTweet)

    # Exclude the nones
    tweet_data = tweet.dict(exclude_none=True)

    verified_tweet = Tweet.from_orm(
        db_pseudo_tweet,
        {
            **tweet_data,
            "id": None,  # Let database decide the id of the new row in Tweet
            "verifier_id": db_user.id,  # Tweet needs the user id when forming
        },
    )

    # Save verified tweet and refresh it to get the new id
    save_and_refresh(session, verified_tweet)

    # Delete pseudo tweet
    session.delete(db_pseudo_tweet)

    return db_pseudo_tweet


@router.delete(
    "/{pseudo_tweet_id}",
    response_model=TweetRead,
    responses={404: {"description": "PseudoTweet Not found"}},
)
def delete_pseudo_tweet(
    pseudo_tweet_id: PositiveInt,
    _: User = Depends(get_username_from_token),
    session: Session = Depends(get_session),
):
    """
    Delete a pseudo tweet by id.
    """

    db_pseudo_tweet = session.exec(
        select(PseudoTweet).where(PseudoTweet.id == pseudo_tweet_id)
    ).one_or_none()

    assert_not_null(db_pseudo_tweet, pseudo_tweet_id, PseudoTweet)

    session.delete(db_pseudo_tweet)
    session.commit()
    return db_pseudo_tweet


@router.post("/edit_request/{pseudo_tweet_id}")
def request_pseudo_tweet_edit(pseudo_tweet_id: PositiveInt, tweet: TweetUpdate):
    """
    Request for pseudo tweet edit
    """
    # NOTE: DANGER...CHANGE THIS CODE
    # ONLY FOR DEMO PURPOSE
    with open("edits.txt", "a") as f:
        f.write(f"Pseudo Tweet, {pseudo_tweet_id}, {tweet}\n")

    return {"message": "Successfully submitted edit request."}
