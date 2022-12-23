from typing import TYPE_CHECKING, List, Optional

from pydantic import BaseModel, EmailStr, PositiveInt, constr
from sqlmodel import Field, Relationship, SQLModel, UniqueConstraint

# Data Models

if TYPE_CHECKING:
    from ..tweets_common.models import Tweet


class Token(BaseModel):
    """
    Token response model
    """

    access_token: str
    token_type: str = "bearer"


class UserBase(SQLModel):
    """
    Base user model
    """

    __table_args__ = (UniqueConstraint("username"), UniqueConstraint("email"))

    username: constr(strip_whitespace=True, to_lower=True, min_length=4, max_length=20)
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    """
    User create model
    """

    password: str


class UserRead(UserBase):
    """
    User read model
    """

    id: PositiveInt


class UserUpdate(BaseModel):
    """
    User update model
    """

    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None


# Table Models


class User(UserBase, table=True):

    id: Optional[PositiveInt] = Field(default=None, primary_key=True)
    hashed_password: str

    modified_tweets: List["Tweet"] = Relationship(
        back_populates="modifier",
        sa_relationship_kwargs={"primaryjoin": "User.id==Tweet.modifier_id"},
    )
    verified_tweets: List["Tweet"] = Relationship(
        back_populates="verifier",
        sa_relationship_kwargs={"primaryjoin": "User.id==Tweet.verifier_id"},
    )

    # Who created the user
    creator_id: Optional[PositiveInt] = Field(default=None, foreign_key="user.id")
    creator: Optional["User"] = Relationship(
        back_populates="creations", sa_relationship_kwargs={"remote_side": "User.id"}
    )

    creations: List["User"] = Relationship(back_populates="creator")
