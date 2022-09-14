from csv import DictReader
from datetime import datetime
from typing import List, Mapping, Union

from sqlmodel import Session

from app.tweets_common.models import PseudoTweet


def load_database(session: Session):
    with open("utils/sent_pseudo_labels_combined.csv") as csvfile:
        pseudo_tweets: List[PseudoTweet] = []
        for row in DictReader(csvfile):
            created_at: datetime = datetime.strptime(
                row["created_at"], r"%a %b %d %H:%M:%S %z %Y"
            )
            is_abuse = float(row["abuse_pred"]) >= 0.5
            kwargs: Mapping[str, Union[str, datetime]] = {
                **row,
                "is_abuse": is_abuse,
                "sexual_score": max(min(round(float(row["sexual_score"])), 10), 1),
                "created_at": created_at,
            }
            pseudo_tweets.append(PseudoTweet(**kwargs))

    session.bulk_save_objects(pseudo_tweets)
    session.commit()

    return pseudo_tweets


if __name__ == "__main__":
    from app.database import get_session

    load_database(next(get_session()))
