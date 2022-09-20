from datetime import date
from typing import List, Optional, TypeVar

from fastapi import HTTPException
from pydantic import PositiveInt
from sqlmodel import Integer, Session, func, select, text, union_all
from sqlmodel.sql.expression import Select

from .models import PseudoTweet, Tweet

# Make a Generic Type to get the original type completion back
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
    Model: ModelType,
    start_date: Optional[date],
    end_date: Optional[date],
    session: Session,
) -> List[tuple]:
    """
    Get overview of the database for the given Model
    """

    created_date_label = "created_date"
    created_date = func.date(Model.created_at).label(created_date_label)

    selection = get_selection_filter(
        Model,
        start_date,
        end_date,
        select(
            func.sum(Model.is_abuse, type_=Integer).label("is_abuse"),
            func.avg(Model.sexual_score).label("sexual_score"),
            created_date,
            func.count().label("total"),
        ),
    )

    return session.exec(
        selection.group_by(text(created_date_label))  # Created_date is already defined
    ).all()


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

    all_model = (
        union_all(get_overview_selection(Tweet), get_overview_selection(PseudoTweet))
        .subquery()
        .c
    )
    return all_model


def get_filtered_count(
    Model: ModelType,
    start_date: Optional[date],
    end_date: Optional[date],
    session: Session,
):

    selection = select(
        func.sum(Model.is_abuse, type_=Integer).label("is_abuse"),
        func.count().label("total"),
    )

    selection = get_selection_filter(Model, start_date, end_date, selection)

    return session.exec(selection).one()
