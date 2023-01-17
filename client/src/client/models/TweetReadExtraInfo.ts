/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TweetReadExtraInfo = {
    id: number;
    text: string;
    username: string;
    created_at: string;
    is_abuse: boolean;
    sexual_score?: number;
    /**
     * List of aspects in the tweet
     */
    aspects_anno?: Array<Array<any>>;
    source: string;
    verified?: boolean;
};

