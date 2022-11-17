/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PredictionOutput } from '../models/PredictionOutput';
import type { YoutubeScrapeResponse } from '../models/YoutubeScrapeResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TweetsCommonsService {

    /**
     * Get Word Cloud
     * Get the word-count distribution within the given time range
     * @param startDate
     * @param endDate
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tweetsCommonsGetWordCloud(
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Array<Array<any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tweets_commons/',
            query: {
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Prediction
     * Get prediction from the live model
     * @param text
     * @returns PredictionOutput Successful Response
     * @throws ApiError
     */
    public static tweetsCommonsGetPrediction(
        text: string,
    ): CancelablePromise<PredictionOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tweets_commons/predict',
            query: {
                'text': text,
            },
            errors: {
                422: `Validation Error`,
                503: `Could not connect to model.`,
            },
        });
    }

    /**
     * Scrape Youtube
     * @param videoQuery
     * @param maxVideoResults
     * @param maxCommentResults
     * @returns YoutubeScrapeResponse Successful Response
     * @throws ApiError
     */
    public static tweetsCommonsScrapeYoutube(
        videoQuery: string,
        maxVideoResults: number = 2,
        maxCommentResults: number = 2,
    ): CancelablePromise<Array<YoutubeScrapeResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tweets_commons/scrape_youtube',
            query: {
                'video_query': videoQuery,
                'max_video_results': maxVideoResults,
                'max_comment_results': maxCommentResults,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
