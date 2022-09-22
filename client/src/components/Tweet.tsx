import PersonIcon from "@mui/icons-material/Person";
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
import type { TweetRead } from "../client";
import { TweetsService } from "../client";
import { months } from "../constants";
import { useTweetModifications } from "../hooks";

interface Props {
  tweet: TweetRead;
}

const Tweet = ({ tweet }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    currentRow: currentTweet,
    handleChange,
    snackOpen,
    handleClose,
    modifySubmit: editSubmit,
  } = useTweetModifications({
    row: tweet,
    serviceFunc: TweetsService.tweetsRequestTweetEdit,
    submitCallback: () => setIsEditOpen(false),
  });

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
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentTweet.is_abuse as boolean}
                  onChange={({ target: { checked } }) => {
                    handleChange(checked, "is_abuse");
                  }}
                />
              }
              label="is Abuse"
            />
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[1-9]|10" }}
              value={currentTweet.sexual_score}
              onChange={({ target: { value } }) => {
                handleChange(parseInt(value), "sexual_score");
              }}
              helperText="1-10"
            />
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
