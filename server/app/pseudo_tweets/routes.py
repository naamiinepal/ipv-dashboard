from datetime import date
from typing import List, Optional

from fastapi import Depends, Query
from pydantic import NonNegativeInt, PositiveInt, conint
from sqlalchemy.dialects.postgresql import array
from sqlmodel import Session, func, literal_column, select, text, union_all

from ..auth.dependencies import get_current_user, get_username_from_token
from ..auth.models import User
from ..database import get_session, save_and_refresh
from ..tweets_common.custom_types import AspectEnum, source_str
from ..tweets_common.helper_functions import (
    assert_not_null,
    get_a_tweet,
    get_combined_model,
    get_db_overview,
    get_filtered_count,
    get_selection_filter,
    get_common_fields,
)
from ..tweets_common.models import (
    Overview,
    PseudoTweet,
    Tweet,
    TweetCount,
    TweetRead,
    TweetUpdate,
    TweetReadExtraInfo,
)
from . import router


# Keep it in the top to avoid clashing with pseudo_tweet_id
@router.get("/overview", response_model=List[Overview])
def get_pseudo_overview(
    all: bool = False,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    session: Session = Depends(get_session),
):
    """
    Get overview by grouping on created_at
    """
    phrase_selection = select(
        func.unnest(text(f"{PseudoTweet.__tablename__}.aspects_anno[:][3:]")).label(
            "asp"
        ),
        PseudoTweet.created_at,
    )

    if all:
        SentenceModel = get_combined_model()
        phrase_selection = union_all(
            select(
                func.unnest(text(f"{Tweet.__tablename__}.aspects_anno[:][3:]")).label(
                    "asp"
                ),
                Tweet.created_at,
            ),
            phrase_selection,
        )
    else:
        SentenceModel = PseudoTweet

    PhraseModel = phrase_selection.subquery().c

    return get_db_overview(SentenceModel, PhraseModel, start_date, end_date, session)


@router.get("/count", response_model=TweetCount)
def get_count(
    all: bool = False,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    get_phrase_count: bool = False,
    session: Session = Depends(get_session),
):
    """
    Get the count of pseudo tweets for the given filters
    """

    SentenceModel = get_combined_model() if all else PseudoTweet

    if get_phrase_count:
        if all:
            combined_aspects_query = union_all(
                select(Tweet.aspects_anno, Tweet.created_at),
                select(PseudoTweet.aspects_anno, PseudoTweet.created_at),
            ).subquery()

            CombinedAspectsModel = combined_aspects_query.c

            phrase_selection = get_selection_filter(
                CombinedAspectsModel,
                start_date,
                end_date,
                select(
                    func.count().label("total"),
                    func.unnest(
                        text(f"{CombinedAspectsModel.aspects_anno}[:][3:]")
                    ).label("asp"),
                ).select_from(combined_aspects_query),
            )

        else:
            phrase_selection = get_selection_filter(
                PseudoTweet,
                start_date,
                end_date,
                select(
                    func.count().label("total"),
                    func.unnest(
                        text(f"{PseudoTweet.__tablename__}.aspects_anno[:][3:]")
                    ).label("asp"),
                ).select_from(PseudoTweet),
            )
    else:
        phrase_selection = None

    return get_filtered_count(
        SentenceModel, phrase_selection, start_date, end_date, get_phrase_count, session
    )


@router.get("/", response_model=List[TweetReadExtraInfo])
def read_pseudo_tweets(
    all: bool = False,
    is_abuse: Optional[bool] = None,
    sources: Optional[List[source_str]] = Query(default=None),
    aspects: Optional[List[AspectEnum]] = Query(default=None),
    offset: NonNegativeInt = 0,
    limit: conint(le=10, gt=0) = 10,
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    session: Session = Depends(get_session),
):
    """
    Read pseudo tweets within the offset and limit
    """

    if all:
        verification_label = "verified"
        Model = (
            union_all(
                select(
                    *get_common_fields(Tweet),
                    literal_column("1").label(verification_label),
                ),
                select(
                    *get_common_fields(PseudoTweet),
                    literal_column("0").label(verification_label),
                ),
            )
            .subquery()
            .c
        )
        base_selection = select(*Model)
    else:
        Model = PseudoTweet
        base_selection = select(PseudoTweet)

    if is_abuse is not None:
        base_selection = base_selection.where(Model.is_abuse == is_abuse)

    if sources:
        base_selection = base_selection.where(Model.source.in_(sources))

    if aspects:
        unnest_label = "unnest_anno"
        unnest_anno = select(
            Model.id, func.unnest(text("aspects_anno[:][3:]")).label(unnest_label)
        ).subquery()

        asp_label = "contains_asp"
        flat_asp = (
            select(
                Model.id,
                array(aspects)
                .contained_by(func.array_agg(getattr(unnest_anno.c, unnest_label)))
                .label(asp_label),
            )
            .join(unnest_anno, unnest_anno.c.id == Model.id)
            .group_by(Model.id)
            .subquery()
        )

        base_selection = base_selection.join(flat_asp, flat_asp.c.id == Model.id).where(
            getattr(flat_asp.c, asp_label)
        )

    selection = get_selection_filter(Model, start_date, end_date, base_selection)

    return session.exec(
        selection.order_by(Model.created_at.desc()).offset(offset).limit(limit)
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

    # Delete pseudo tweet
    session.delete(db_pseudo_tweet)

    # Save verified tweet and refresh it to get the new id
    save_and_refresh(session, verified_tweet)

    return verified_tweet


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
