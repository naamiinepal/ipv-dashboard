from collections import defaultdict
from datetime import date
from typing import List, Optional, TypeVar

from fastapi import HTTPException
from pydantic import PositiveInt
from sqlalchemy.sql.base import ImmutableColumnCollection
from sqlmodel import Integer, Session, cast, func, select, text, union_all
from sqlmodel.sql.expression import Select

from .models import Overview, PseudoTweet, Tweet, TweetCount

# Make a Generic Type to get the original type completion back
# Moving to the types file will create a circular import
ModelType = TypeVar("ModelType", Tweet, PseudoTweet)


def get_selection_filter(
    Model: ModelType,
    start_date: Optional[date],
    end_date: Optional[date],
    selection: Select[tuple],
):
    """
    Filter the selection by various dimensions.
    `selection` is the selection before filtering
    """
    # Passing text doesn't work for comparision
    created_date = func.date(Model.created_at)

    if start_date is not None:
        selection = selection.filter(created_date >= start_date)

    if end_date is not None:
        selection = selection.filter(created_date < end_date)
    return selection


def get_a_tweet(session: Session, tweet_id: PositiveInt, Model: ModelType) -> tuple:
    """
    Get a not-None tweet from the database with others column as a dictonary
    """

    tweet = session.exec(select(Model).where(Model.id == tweet_id)).one_or_none()

    assert_not_null(tweet, tweet_id, Model)

    return tweet


def assert_not_null(tweet: Optional[ModelType], id: PositiveInt, Model: ModelType):
    """
    Make sure the provided row of tweet is not None
    """
    if tweet is None:
        raise HTTPException(404, f"{Model.__name__} with id: {id} not found.")


def get_db_overview(
    SentenceModel: ModelType,
    PhraseModel: ImmutableColumnCollection,
    start_date: Optional[date],
    end_date: Optional[date],
    session: Session,
) -> List[Overview]:
    """
    Get sentence and phrase overview of the database
    for the given SentenceModel and PhraseModel respectively
    """

    created_date_label = "created_date"
    sentence_selection = get_selection_filter(
        SentenceModel,
        start_date,
        end_date,
        select(
            func.sum(cast(SentenceModel.is_abuse, type_=Integer)).label("is_abuse"),
            func.avg(SentenceModel.sexual_score).label("sexual_score"),
            func.date(SentenceModel.created_at).label(created_date_label),
            func.count().label("total"),
        ),
    )

    sentence_overview = session.exec(
        sentence_selection.group_by(
            text(created_date_label)
        )  # Created_date is already defined
    ).all()

    phrase_selection = get_selection_filter(
        PhraseModel,
        start_date,
        end_date,
        select(
            func.date(PhraseModel.created_at).label(created_date_label),
            PhraseModel.asp,
            func.count().label("count"),
        ),
    )

    phrase_overview = session.exec(
        phrase_selection.group_by(
            text(created_date_label), PhraseModel.asp
        )  # Created_date is already defined
    ).all()

    phrase_date_grouped = defaultdict(dict)

    for phrase in phrase_overview:
        phrase_date_grouped[phrase.created_date][phrase.asp] = phrase.count

    combined_overview = [
        Overview(**sentence, aspects_anno=phrase_date_grouped[sentence.created_date])
        for sentence in sentence_overview
    ]

    return combined_overview


def get_combined_model():

    """
    Get a combined model with numerics columns and created_at
    """

    def get_overview_selection(Model: ModelType) -> Select[tuple]:
        """
        Get the selection statement with numeric columns only and created_at
        """

        return select(
            Model.is_abuse,
            Model.sexual_score,
            Model.created_at,
        )

    return (
        union_all(get_overview_selection(Tweet), get_overview_selection(PseudoTweet))
        .subquery()
        .c
    )


def get_filtered_count(
    SentenceModel: ModelType,
    phrase_selection: Optional[Select[tuple]],
    start_date: Optional[date],
    end_date: Optional[date],
    get_phrase_count: bool,
    session: Session,
) -> TweetCount:

    """
    Get the count of the filtered tweets
    If get_phrase_count is True, get the count of the phrases
        Some aspects may not be present in the given date range
    """

    sentence_selection = get_selection_filter(
        SentenceModel,
        start_date,
        end_date,
        select(
            func.sum(cast(SentenceModel.is_abuse, type_=Integer)).label("is_abuse"),
            func.count().label("total"),
        ),
    )

    sentence_count = session.exec(sentence_selection).one()

    tweet_count = TweetCount(**sentence_count)

    if not get_phrase_count:
        return tweet_count

    phrase_count = session.exec(phrase_selection.group_by(text("asp"))).all()

    tweet_count.aspects = {phrase.asp: phrase.total for phrase in phrase_count}

    return tweet_count


def get_abusive_tweets(
    Model: ModelType, start_date: date, end_date: date
) -> Select[tuple]:
    return get_selection_filter(
        Model, start_date, end_date, select(Model.text).where(Model.is_abuse)
    )
