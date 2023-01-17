import PersonIcon from "@mui/icons-material/Person";
import type { ChipTypeMap } from "@mui/material";
import { Card, Chip } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { ComponentPropsWithoutRef } from "react";
import { InteractiveHighlighter } from "react-interactive-highlighter";
import type { TweetReadExtraInfo } from "../client";
import { Aspects, months } from "../constants";
import { toTitleCase } from "../utility";

interface TweetProps {
  tweet: TweetReadExtraInfo;
}

const Tweet: React.FunctionComponent<TweetProps> = ({ tweet }) => {
  const created_date = new Date(tweet.created_at);

  const currentMonth = months[created_date.getMonth()];

  const highlights =
    tweet.aspects_anno?.map(([start, end]) => ({
      startIndex: start,
      numChars: end - start,
    })) || [];

  const verifiedProps: ComponentPropsWithoutRef<
    OverridableComponent<ChipTypeMap>
  > = tweet.verified
    ? { label: "Verified", color: "success" }
    : { label: "Unverified", color: "info" };

  return (
    <Card className="p-5 mb-2" variant="outlined">
      <div className="flex justify-between">
        <div>
          <PersonIcon />
          <span className="text-primary">{tweet.username}</span> on{" "}
          <span className="text-primary">
            {currentMonth} {created_date.getDate()},{" "}
            {created_date.getFullYear()}
          </span>
        </div>
        <Chip size="small" {...verifiedProps} />
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
