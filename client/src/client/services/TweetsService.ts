/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AspectEnum } from '../models/AspectEnum';
import type { Overview } from '../models/Overview';
import type { TweetCount } from '../models/TweetCount';
import type { TweetRead } from '../models/TweetRead';
import type { TweetUpdate } from '../models/TweetUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TweetsService {

    /**
     * Get Tweet Overview
     * Get overview by grouping on created_at
     * @param startDate
     * @param endDate
     * @returns Overview Successful Response
     * @throws ApiError
     */
    public static tweetsGetTweetOverview(
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Array<Overview>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tweets/overview',
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
     * Get Count
     * Get the count of tweets for the given filters
     * @param startDate
     * @param endDate
     * @param getPhraseCount
     * @returns TweetCount Successful Response
     * @throws ApiError
     */
    public static tweetsGetCount(
        startDate?: string,
        endDate?: string,
        getPhraseCount: boolean = false,
    ): CancelablePromise<TweetCount> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tweets/count',
            query: {
                'start_date': startDate,
                'end_date': endDate,
                'get_phrase_count': getPhraseCount,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Tweets
     * Read tweets within the offset and limit
     * @param isAbuse
     * @param sources
     * @param aspects
     * @param offset
     * @param limit
     * @param startDate
     * @param endDate
     * @returns TweetRead Successful Response
     * @throws ApiError
     */
    public static tweetsReadTweets(
        isAbuse?: boolean,
        sources?: Array<string>,
        aspects?: Array<AspectEnum>,
        offset?: number,
        limit: number = 10,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Array<TweetRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tweets/',
            query: {
                'is_abuse': isAbuse,
                'sources': sources,
                'aspects': aspects,
                'offset': offset,
                'limit': limit,
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Tweet
     * Read a tweet by id.
     * @param tweetId
     * @returns TweetRead Successful Response
     * @throws ApiError
     */
    public static tweetsReadTweet(
        tweetId: number,
    ): CancelablePromise<TweetRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tweets/{tweet_id}',
            path: {
                'tweet_id': tweetId,
            },
            errors: {
                404: `Tweet Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Tweet
     * Update a tweet by id.
     * @param tweetId
     * @param requestBody
     * @returns TweetRead Successful Response
     * @throws ApiError
     */
    public static tweetsUpdateTweet(
        tweetId: number,
        requestBody: TweetUpdate,
    ): CancelablePromise<TweetRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tweets/{tweet_id}',
            path: {
                'tweet_id': tweetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `No Valid Data to Update`,
                404: `Tweet Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Request Tweet Edit
     * Request for tweet edit
     * @param tweetId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tweetsRequestTweetEdit(
        tweetId: number,
        requestBody: TweetUpdate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tweets/edit_request/{tweet_id}',
            path: {
                'tweet_id': tweetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
