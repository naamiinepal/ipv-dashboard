from ast import literal_eval
from csv import DictReader
from datetime import datetime
from typing import List, Mapping, Tuple, Union

from sqlmodel import Session

from app.tweets_common.models import PseudoTweet
from app.tweets_common.custom_types import AspectEnum


def load_database(
    session: Session, csv_path: str = "utils/sent_pseudo_labels_combined.csv"
):
    with open(csv_path) as csvfile:
        pseudo_tweets: List[PseudoTweet] = []
        for row in DictReader(csvfile):
            created_at: datetime = datetime.strptime(
                row["created_at"], r"%a %b %d %H:%M:%S %z %Y"
            )
            is_abuse = float(row["abuse_pred"]) >= 0.5
            aspects_anno = row["aspects_anno"]

            # If the aspects_anno is empty in the csv, use None
            # Else evaluate the expression to get the list of aspects
            if not aspects_anno:
                aspects_anno = None
            else:
                aspects_anno: List[Tuple[int, int, str]] = literal_eval(aspects_anno)

                for i, (start, end, aspect) in enumerate(aspects_anno):
                    aspects_anno[i] = (start, end, AspectEnum[aspect.lower()])

            kwargs: Mapping[str, Union[str, datetime]] = {
                "text": row["text"],
                "username": row["user_name"],
                "is_abuse": is_abuse,
                "sexual_score": max(min(round(float(row["sexual_score"])), 10), 1),
                "aspects_anno": aspects_anno,
                "created_at": created_at,
            }
            pseudo_tweets.append(PseudoTweet(**kwargs))

    print("Inserting Pseudo Tweets.......")

    session.bulk_save_objects(pseudo_tweets)
    session.commit()

    return pseudo_tweets


if __name__ == "__main__":
    from app.database import get_session

    load_database(next(get_session()))
