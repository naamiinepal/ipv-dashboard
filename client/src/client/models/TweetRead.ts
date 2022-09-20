export type TweetRead = {
  id?: number;
  text: string;
  username: string;
  created_at: string;
  is_abuse: boolean;
  sexual_score?: number;
};
