import type { AlertColor } from "@mui/material";
import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import type { TweetUpdate } from "../../client";
import { TweetsService } from "../../client";

interface ModifierButtonProps {
  tweetId: number;
  getChangedColumns: () => TweetUpdate;
  disabled: boolean;
}

interface SnackProps {
  display: boolean;
  message: string;
  intent: AlertColor;
}
const ModifierButton = ({
  tweetId,
  getChangedColumns,
  disabled,
}: ModifierButtonProps) => {
  const [snackOpen, setSnackOpen] = useState<SnackProps>({
    display: false,
    message: "",
    intent: "success",
  });

  const handleClose = () =>
    setSnackOpen((snackOpen) => ({ ...snackOpen, display: false }));

  const modifySubmit = async () => {
    try {
      await TweetsService.tweetsUpdateTweet(tweetId, getChangedColumns());
      return setSnackOpen({
        display: true,
        message: "Successfully Modified",
        intent: "success",
      });
    } catch {
      return setSnackOpen({
        display: false,
        message: "Modification Failed",
        intent: "error",
      });
    }
  };

  return (
    <>
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
      <Button variant="contained" onClick={modifySubmit} disabled={disabled}>
        Modify
      </Button>
    </>
  );
};

export default ModifierButton;
