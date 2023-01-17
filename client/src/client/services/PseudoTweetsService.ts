/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AspectEnum } from '../models/AspectEnum';
import type { Overview } from '../models/Overview';
import type { TweetCount } from '../models/TweetCount';
import type { TweetRead } from '../models/TweetRead';
import type { TweetReadExtraInfo } from '../models/TweetReadExtraInfo';
import type { TweetUpdate } from '../models/TweetUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PseudoTweetsService {

    /**
     * Get Pseudo Overview
     * Get overview by grouping on created_at
     * @param all
     * @param startDate
     * @param endDate
     * @returns Overview Successful Response
     * @throws ApiError
     */
    public static pseudoTweetsGetPseudoOverview(
        all: boolean = false,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<Array<Overview>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pseudo_tweets/overview',
            query: {
                'all': all,
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
     * Get the count of pseudo tweets for the given filters
     * @param all
     * @param startDate
     * @param endDate
     * @param getPhraseCount
     * @returns TweetCount Successful Response
     * @throws ApiError
     */
    public static pseudoTweetsGetCount(
        all: boolean = false,
        startDate?: string,
        endDate?: string,
        getPhraseCount: boolean = false,
    ): CancelablePromise<TweetCount> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pseudo_tweets/count',
            query: {
                'all': all,
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
     * Read Pseudo Tweets
     * Read pseudo tweets within the offset and limit
     * @param isAbuse
     * @param sources
     * @param aspects
     * @param offset
     * @param limit
     * @param startDate
     * @param endDate
     * @param all
     * @returns TweetReadExtraInfo Successful Response
     * @throws ApiError
     */
    public static pseudoTweetsReadPseudoTweets(
        isAbuse?: boolean,
        sources?: Array<string>,
        aspects?: Array<AspectEnum>,
        offset?: number,
        limit: number = 10,
        startDate?: string,
        endDate?: string,
        all: boolean = false,
    ): CancelablePromise<Array<TweetReadExtraInfo>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pseudo_tweets/',
            query: {
                'is_abuse': isAbuse,
                'sources': sources,
                'aspects': aspects,
                'offset': offset,
                'limit': limit,
                'start_date': startDate,
                'end_date': endDate,
                'all': all,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Pseudo Tweet
     * Read a pseudo tweet by id.
     * @param pseudoTweetId
     * @returns TweetRead Successful Response
     * @throws ApiError
     */
    public static pseudoTweetsReadPseudoTweet(
        pseudoTweetId: number,
    ): CancelablePromise<TweetRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pseudo_tweets/{pseudo_tweet_id}',
            path: {
                'pseudo_tweet_id': pseudoTweetId,
            },
            errors: {
                404: `PseudoTweet Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Pseudo Tweet
     * Delete a pseudo tweet by id.
     * @param pseudoTweetId
     * @returns TweetRead Successful Response
     * @throws ApiError
     */
    public static pseudoTweetsDeletePseudoTweet(
        pseudoTweetId: number,
    ): CancelablePromise<TweetRead> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/pseudo_tweets/{pseudo_tweet_id}',
            path: {
                'pseudo_tweet_id': pseudoTweetId,
            },
            errors: {
                404: `PseudoTweet Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Verify Pseudo Tweet
     * Verify a pseudo tweet by id.
     * @param pseudoTweetId
     * @param requestBody
     * @returns TweetRead Successful Response
     * @throws ApiError
     */
    public static pseudoTweetsVerifyPseudoTweet(
        pseudoTweetId: number,
        requestBody: TweetUpdate,
    ): CancelablePromise<TweetRead> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/pseudo_tweets/{pseudo_tweet_id}',
            path: {
                'pseudo_tweet_id': pseudoTweetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `PseudoTweet Not found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Request Pseudo Tweet Edit
     * Request for pseudo tweet edit
     * @param pseudoTweetId
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static pseudoTweetsRequestPseudoTweetEdit(
        pseudoTweetId: number,
        requestBody: TweetUpdate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pseudo_tweets/edit_request/{pseudo_tweet_id}',
            path: {
                'pseudo_tweet_id': pseudoTweetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
