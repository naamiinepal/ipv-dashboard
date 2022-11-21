import PersonIcon from "@mui/icons-material/Person";
import { Card, Chip } from "@mui/material";
import { useMemo } from "react";
import type { TweetRead } from "../client";
import { months } from "../constants";

interface TweetProps {
  tweet: TweetRead;
}

const Tweet = ({ tweet }: TweetProps) => {
  const created_date = useMemo(
    () => new Date(tweet.created_at),
    [tweet.created_at]
  );

  const currentMonth = useMemo(
    () => months[created_date.getMonth()],
    [created_date]
  );

  return (
    <Card className="p-5 mb-2" variant="outlined">
      <div>
        <PersonIcon />
        <span className="text-primary">{tweet.username}</span> on{" "}
        <span className="text-primary">
          {currentMonth} {created_date.getDate()}, {created_date.getFullYear()}
        </span>
      </div>
      {tweet.text}
      <div className="mt-1 flex">
        {tweet.is_abuse ? (
          <>
            <Chip className="mr-1" label="Abusive" color="warning" />
            <Chip
              className="mr-1"
              label={`Sexual Score: ${tweet.sexual_score}`}
              color="warning"
            />
          </>
        ) : (
          <Chip className="mr-1" label="Non-abusive" color="success" />
        )}
      </div>
    </Card>
  );
};

export default Tweet;
