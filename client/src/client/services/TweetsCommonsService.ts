import type { PredictionOutput } from "../models/PredictionOutput";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TweetsCommonsService {
  /**
   * Get Word Cloud
   * Get the word-count distribution within the given time range
   * @returns any Successful Response
   * @throws ApiError
   */
  public static tweetsCommonsGetWordCloud({
    startDate,
    endDate,
  }: {
    startDate?: string;
    endDate?: string;
  }): CancelablePromise<Array<Array<any>>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tweets_commons/",
      query: {
        start_date: startDate,
        end_date: endDate,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Prediction
   * Get prediction from the live model
   * @returns PredictionOutput Successful Response
   * @throws ApiError
   */
  public static tweetsCommonsGetPrediction({
    text,
  }: {
    text: string;
  }): CancelablePromise<PredictionOutput> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/tweets_commons/predict",
      query: {
        text: text,
      },
      errors: {
        422: `Validation Error`,
        503: `Could not connect to model.`,
      },
    });
  }
}
