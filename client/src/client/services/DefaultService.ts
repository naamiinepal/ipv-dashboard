import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DefaultService {
  /**
   * Index
   * @returns any Successful Response
   * @throws ApiError
   */
  public static index({
    filePath,
  }: {
    filePath: string;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/{file_path}",
      path: {
        file_path: filePath,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
