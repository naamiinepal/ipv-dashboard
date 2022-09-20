import PersonIcon from "@mui/icons-material/Person";
import type { AlertColor } from "@mui/material";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useState } from "react";
import type { TweetRead, TweetUpdate } from "../client";
import { TweetsService } from "../client";
import { columns, months } from "../constants";

interface Props {
  tweet: TweetRead;
}

type ValueOf<T> = T[keyof T];

interface SnackProps {
  display: boolean;
  message: string;
  intent: AlertColor;
}

const Tweet = ({ tweet }: Props) => {
  const [currentTweet, setCurrentTweet] = useState(tweet);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState<SnackProps>({
    display: false,
    message: "",
    intent: "success",
  });

  const getChangedColumns = () => {
    const toSubmit: TweetUpdate = {};

    for (const key of ["is_abuse", "sexual_score"]) {
      // @ts-ignore
      if (row[key] !== currentRow[key]) {
        // @ts-ignore
        toSubmit[key] = currentRow[key];
      }
    }
    return toSubmit;
  };

  const editSubmit = () => {
    TweetsService.tweetsRequestTweetEdit({
      tweetId: tweet.id as number,
      requestBody: getChangedColumns(),
    })
      .then(() => {
        setIsEditOpen(false);
        setSnackOpen({
          display: true,
          message: "Successfully Modified",
          intent: "success",
        });
      })
      .catch(() => {
        setSnackOpen({
          display: false,
          message: "Modification Failed",
          intent: "error",
        });
      });
  };

  const handleClose = () => {
    console.log("Closed");
    setSnackOpen({ ...snackOpen, display: false });
  };

  const handleChange = (
    value: Exclude<ValueOf<TweetUpdate>, undefined>,
    column: keyof TweetUpdate
  ) => {
    setCurrentTweet({ ...currentTweet, [column]: value });
  };

  const created_date = new Date(tweet.created_at);

  return (
    <Card className="p-5 mb-2" variant="outlined">
      <div>
        <PersonIcon />
        <span className="text-primary"> {tweet.username}</span> on{" "}
        <span className="text-primary">
          {months[created_date.getMonth()]} {created_date.getDate()},{" "}
          {created_date.getFullYear()}
        </span>
      </div>
      {tweet.text}
      <div className="mt-1 flex">
        {tweet.is_abuse && (
          <>
            <Chip className="mr-1" label="abusive" color="success" />
            <Chip
              className="mr-1"
              label={`Sexual Score: ${tweet.sexual_score}`}
              color="success"
            />
          </>
        )}
        <Button
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            setIsEditOpen(true);
          }}
        >
          Edit
        </Button>
      </div>
      {isEditOpen && (
        <>
          <FormGroup sx={{ fontSize: "0.5em" }}>
            {columns
              .map((column) => column.field)
              .filter((datum) => datum !== "verify" && datum !== "text")
              .map((datum) =>
                datum === "is_abuse" ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          currentTweet[datum as keyof TweetUpdate] as boolean
                        }
                        onChange={({ target: { checked } }) => {
                          handleChange(checked, datum);
                        }}
                      />
                    }
                    label={datum}
                  />
                ) : (
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[1-9]|10" }}
                    value={currentTweet[datum as keyof TweetUpdate]}
                    onChange={({ target: { value } }) => {
                      handleChange(parseInt(value), datum as keyof TweetUpdate);
                    }}
                    helperText="1-10"
                  />
                )
              )}
          </FormGroup>
          <Snackbar
            open={snackOpen.display}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackOpen.intent}
              sx={{ width: "100%" }}
            >
              {snackOpen.message}
            </Alert>
          </Snackbar>
          <Button variant="contained" onClick={editSubmit}>
            Request
          </Button>
        </>
      )}
    </Card>
  );
};

export default Tweet;
