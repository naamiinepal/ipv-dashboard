import type { Overview } from "../models/Overview";
import type { TweetCount } from "../models/TweetCount";
import type { TweetRead } from "../models/TweetRead";
import type { TweetUpdate } from "../models/TweetUpdate";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PseudoTweetsService {
  /**
   * Get Pseudo Overview
   * Get overview by grouping on created_at
   * @returns Overview Successful Response
   * @throws ApiError
   */
  public static pseudoTweetsGetPseudoOverview({
    all = false,
    startDate,
    endDate,
  }: {
    all?: boolean;
    startDate?: string;
    endDate?: string;
  }): CancelablePromise<Array<Overview>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pseudo_tweets/overview",
      query: {
        all: all,
        start_date: startDate,
        end_date: endDate,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Count
   * Get the count of pseudo tweets for the given filters
   * @returns TweetCount Successful Response
   * @throws ApiError
   */
  public static pseudoTweetsGetCount({
    startDate,
    endDate,
    all = false,
  }: {
    startDate?: string;
    endDate?: string;
    all?: boolean;
  }): CancelablePromise<TweetCount> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pseudo_tweets/count",
      query: {
        start_date: startDate,
        end_date: endDate,
        all: all,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Pseudo Tweets
   * Read pseudo tweets within the offset and limit
   * @returns TweetRead Successful Response
   * @throws ApiError
   */
  public static pseudoTweetsReadPseudoTweets({
    offset,
    limit = 10,
    startDate,
    endDate,
  }: {
    offset?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
  }): CancelablePromise<Array<TweetRead>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pseudo_tweets/",
      query: {
        offset: offset,
        limit: limit,
        start_date: startDate,
        end_date: endDate,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Pseudo Tweet
   * Read a pseudo tweet by id.
   * @returns TweetRead Successful Response
   * @throws ApiError
   */
  public static pseudoTweetsReadPseudoTweet({
    pseudoTweetId,
  }: {
    pseudoTweetId: number;
  }): CancelablePromise<TweetRead> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/pseudo_tweets/{pseudo_tweet_id}",
      path: {
        pseudo_tweet_id: pseudoTweetId,
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
   * @returns TweetRead Successful Response
   * @throws ApiError
   */
  public static pseudoTweetsDeletePseudoTweet({
    pseudoTweetId,
  }: {
    pseudoTweetId: number;
  }): CancelablePromise<TweetRead> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/pseudo_tweets/{pseudo_tweet_id}",
      path: {
        pseudo_tweet_id: pseudoTweetId,
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
   * @returns TweetRead Successful Response
   * @throws ApiError
   */
  public static pseudoTweetsVerifyPseudoTweet({
    pseudoTweetId,
    requestBody,
  }: {
    pseudoTweetId: number;
    requestBody: TweetUpdate;
  }): CancelablePromise<TweetRead> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/pseudo_tweets/{pseudo_tweet_id}",
      path: {
        pseudo_tweet_id: pseudoTweetId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `PseudoTweet Not found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Request Pseudo Tweet Edit
   * Request for pseudo tweet edit
   * @returns any Successful Response
   * @throws ApiError
   */
  public static pseudoTweetsRequestPseudoTweetEdit({
    pseudoTweetId,
    requestBody,
  }: {
    pseudoTweetId: number;
    requestBody: TweetUpdate;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/pseudo_tweets/edit_request/{pseudo_tweet_id}",
      path: {
        pseudo_tweet_id: pseudoTweetId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
