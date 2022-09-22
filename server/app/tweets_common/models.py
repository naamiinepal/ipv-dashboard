from datetime import date, datetime, timezone
from typing import TYPE_CHECKING, List, Optional, Tuple

from pydantic import BaseModel, PositiveInt, confloat, conint
from sqlmodel import CheckConstraint, Field, Relationship, SQLModel, func

if TYPE_CHECKING:
    from app.auth.models import User

# Data Models

# Sexual score is in the range of 1 to 10
sexual_score_kwargs = {"ge": 1, "le": 10}
sexual_score_int = Optional[conint(**sexual_score_kwargs)]


class TweetCount(BaseModel):
    is_abuse: int
    total: int


class Overview(BaseModel):
    created_date: date
    is_abuse: int
    # Can be float due to averaging
    sexual_score: Optional[confloat(**sexual_score_kwargs)]
    total: int


class TweetUpdate(BaseModel):
    is_abuse: Optional[bool] = None
    sexual_score: sexual_score_int = None


class PredictionOutput(BaseModel):
    # Raw prediction logits
    predictions: List[List[float]]
    # Thresholded labels
    labels: List[Tuple[bool, float]]


class TweetRead(SQLModel):
    id: PositiveInt
    text: str
    username: str
    created_at: datetime
    is_abuse: bool
    sexual_score: sexual_score_int


class DBTweetBase(TweetRead):

    __table_args__ = (CheckConstraint("sexual_score >= 1 AND sexual_score <= 10"),)

    id: Optional[PositiveInt] = Field(default=None, primary_key=True)


# Table Models


class Tweet(DBTweetBase, table=True):
    # The user who moved tweet from PseudoTweet to Tweet
    verifier_id: PositiveInt = Field(foreign_key="user.id")
    verifier: "User" = Relationship(
        back_populates="verified_tweets",
        sa_relationship_kwargs={"foreign_keys": "Tweet.verifier_id"},
    )

    # Do not manually modify it
    verified_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column_kwargs={"server_default": func.now()},
    )

    # The user who modified tweet in Tweet itself, so optional
    modifier_id: Optional[PositiveInt] = Field(default=None, foreign_key="user.id")
    modifier: Optional["User"] = Relationship(
        back_populates="modified_tweets",
        sa_relationship_kwargs={"foreign_keys": "Tweet.modifier_id"},
    )

    modified_at: Optional[datetime] = Field(
        default=None, sa_column_kwargs={"onupdate": func.now()}
    )


class PseudoTweet(DBTweetBase, table=True):
    __tablename__ = "pseudo_tweet"
