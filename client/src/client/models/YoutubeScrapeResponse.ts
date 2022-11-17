/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommentResponse } from './CommentResponse';

export type YoutubeScrapeResponse = {
    video_id: string;
    comments: Array<CommentResponse>;
};

