/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Index
     * Fallback route to get the document needed for client side routing.
     * Fallback is kept since the server doesn't know all the routes
     * needed in the client side.
     * **Please use the file server from the nginx instead of calling
     * this function for each static file.**
     *
     * Args:
     * file_path (str): The path to the file inside the templates directory
     *
     * Returns:
     * File: The file request if found, else falls back to index.html
     * @param filePath
     * @returns any Successful Response
     * @throws ApiError
     */
    public static index(
        filePath: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{file_path}',
            path: {
                'file_path': filePath,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
