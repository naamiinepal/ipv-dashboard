from typing import List

from googleapiclient.discovery import build
from pydantic import BaseModel

from ..config import settings

# Create a resource for interacting with the API
youtube_builder = build("youtube", "v3", developerKey=settings.youtube_api_key)

youtube_video_scraper = youtube_builder.search()

youtube_comment_scraper = youtube_builder.commentThreads()


class CommentResponse(BaseModel):
    top_level_comment: dict
    replies: List[dict]


class YoutubeScrapeResponse(BaseModel):
    video_id: str
    comments: List[CommentResponse]
