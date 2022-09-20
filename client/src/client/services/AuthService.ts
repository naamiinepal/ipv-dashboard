import type { Body_auth_login } from "../models/Body_auth_login";
import type { Token } from "../models/Token";
import type { UserCreate } from "../models/UserCreate";
import type { UserRead } from "../models/UserRead";
import type { UserUpdate } from "../models/UserUpdate";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AuthService {
  /**
   * Get Users Me
   * Get current user
   * @returns UserRead Successful Response
   * @throws ApiError
   */
  public static authGetUsersMe(): CancelablePromise<UserRead> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/auth/me",
      errors: {
        401: `Authentication Error`,
      },
    });
  }

  /**
   * Login
   * Login user and return access token
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static authLogin({
    formData,
  }: {
    formData: Body_auth_login;
  }): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/login",
      formData: formData,
      mediaType: "application/x-www-form-urlencoded",
      errors: {
        400: `Incorrect Username or Password`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Register
   * Register user and return access token
   * @returns Token Successful Response
   * @throws ApiError
   */
  public static authRegister({
    requestBody,
  }: {
    requestBody: UserCreate;
  }): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/auth/register",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `The Username Already Exists`,
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update
   * Update current user
   * @returns UserRead Successful Response
   * @throws ApiError
   */
  public static authUpdate({
    requestBody,
  }: {
    requestBody: UserUpdate;
  }): CancelablePromise<UserRead> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/auth/update",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `No Valid Data to Update`,
        401: `Authentication Error`,
        422: `Validation Error`,
      },
    });
  }
}
