from datetime import date
from typing import Set

import pandas as pd
from sqlmodel import select, union

from app.database import get_session
from app.tweets_common.models import PseudoTweet, Tweet
from utils.load_pseudo_labels import load_database

predictions = pd.read_csv(
    "/mnt/SSD0/rabin/IPV-detection/lightning_modules/datasets/word_sent_combined.csv"
)

all_tweets = set(predictions[["text", "created_at"]].itertuples(index=False))

session = next(get_session())

existing_tweets: Set[str] = set(
    session.exec(
        union(
            select(Tweet.text, Tweet.created_at),
            select(PseudoTweet.text, PseudoTweet.created_at),
        )
    ).all()
)

new_tweets = all_tweets - existing_tweets

new_df = pd.DataFrame(
    {"text": [t[0] for t in new_tweets], "created_at": [t[1] for t in new_tweets]}
)

new_combined_df = pd.merge(new_df, predictions, on=["text", "created_at"])

store_file_name = (
    f"utils/sent_psuedo_labels_combined_{date.today().strftime(r'%Y_%m_%d')}.csv"
)
new_combined_df.to_csv(store_file_name, index=False)

load_database(session, store_file_name)
