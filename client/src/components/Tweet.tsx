import PersonIcon from "@mui/icons-material/Person";
import { Card, Chip } from "@mui/material";
import { useMemo } from "react";
import { InteractiveHighlighter } from "react-interactive-highlighter";
import type { TweetRead } from "../client";
import { Aspects, months } from "../constants";
import { toTitleCase } from "../utility";

interface TweetProps {
  tweet: TweetRead;
}

const Tweet: React.FunctionComponent<TweetProps> = ({ tweet }) => {
  const created_date = useMemo(
    () => new Date(tweet.created_at),
    [tweet.created_at]
  );

  const currentMonth = useMemo(
    () => months[created_date.getMonth()],
    [created_date]
  );

  const highlights =
    tweet.aspects_anno?.map(([start, end]) => ({
      startIndex: start,
      numChars: end - start,
    })) || [];

  return (
    <Card className="p-5 mb-2" variant="outlined">
      <div>
        <PersonIcon />
        <span className="text-primary">{tweet.username}</span> on{" "}
        <span className="text-primary">
          {currentMonth} {created_date.getDate()}, {created_date.getFullYear()}
        </span>
      </div>
      <InteractiveHighlighter
        text={tweet.text}
        highlights={highlights}
        customClass="highlighted"
      />
      <div className="mt-1">
        {tweet.is_abuse ? (
          <>
            <Chip className="mr-1" label="Abusive" color="warning" />
            <Chip
              label={`Sexual Score: ${tweet.sexual_score}/10`}
              color="warning"
            />
          </>
        ) : (
          <Chip label="Non-abusive" color="success" />
        )}
        <Chip
          className="ml-1"
          label={`Source: ${toTitleCase(tweet.source)}`}
          color="secondary"
        />
        {tweet.aspects_anno && (
          <div className="mt-1">
            {tweet.aspects_anno.map(([start, end, asp]) => (
              <Chip
                key={asp}
                className="mr-1"
                label={`${toTitleCase(Aspects[asp])}: ${tweet.text.slice(
                  start,
                  end
                )}`}
                color="info"
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Tweet;
