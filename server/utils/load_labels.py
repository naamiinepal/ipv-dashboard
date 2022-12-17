from ast import literal_eval
from csv import DictReader
from datetime import datetime
from random import randrange
from typing import List, Mapping, Tuple, Union

from sqlmodel import Session, select

from app.auth.models import User
from app.database import get_session
from app.tweets_common.custom_types import AspectEnum
from app.tweets_common.models import Tweet


def get_random_time():
    """
    Get a random datetime within the range of the dataset
    """
    try:
        return datetime(
            year=2022,
            month=randrange(1, 6),
            day=randrange(1, 31),
            hour=randrange(8, 22),
            minute=randrange(0, 60),
            second=randrange(0, 60),
            microsecond=randrange(0, 1_000_000),
        )
    except ValueError:
        # If the day is invalid for the month, try again
        return get_random_time()


def load_database(write_session: Session):
    with open("utils/labeled_sent_word_combined.csv") as csvfile:
        tweets: List[Tweet] = []
        username2id: Mapping[str, int] = {}

        read_session: Session = next(get_session())

        skipped_rows = 0

        for row in DictReader(csvfile):
            is_abuse = row["is_abuse"]
            if not is_abuse:
                print("Abuse field empy in Line Number", len(tweets) + 2 + skipped_rows)
                skipped_rows += 1
                continue

            created_at: str = row["created_at"]
            created_at = (
                datetime.fromisoformat(created_at) if created_at else get_random_time()
            )

            verifier_username = row["annotator"]

            # Try to get from cache
            verifier_id = username2id.get(verifier_username)

            # If cache misses
            if verifier_id is None:
                # Get from database
                verifier_id = read_session.exec(
                    select(User.id).where(User.username == verifier_username)
                ).one_or_none()
                if verifier_id is None:
                    print(f"User {verifier_username} not found")
                    return tweets

                # And update the cache
                username2id[verifier_username] = verifier_id

            username = row["username"]

            # If username is empty in the csv, use a random one
            if not username:
                username = "John Doe"

            aspects_anno = row["aspects_anno"]

            # If the aspects_anno is empty in the csv, use None
            # Else evaluate the expression to get the list of aspects
            if not aspects_anno:
                aspects_anno = None
            else:
                aspects_anno: List[Tuple[int, int, str]] = literal_eval(aspects_anno)

                for i, (start, end, aspect) in enumerate(aspects_anno):
                    aspects_anno[i] = (start, end, AspectEnum[aspect.lower()])

            sexual_score = row["sexual_score"]

            kwargs: Mapping[str, Union[str, int, datetime]] = {
                **row,
                "is_abuse": bool(float(is_abuse)),
                "sexual_score": int(float(sexual_score)) if sexual_score else None,
                "created_at": created_at,
                "username": username,
                "aspects_anno": aspects_anno,
                "verifier_id": verifier_id,
                "verified_at": get_random_time(),
            }

            tweet = Tweet(**kwargs)

            tweets.append(tweet)

    write_session.bulk_save_objects(tweets)
    write_session.commit()

    return tweets


if __name__ == "__main__":
    load_database(next(get_session()))
