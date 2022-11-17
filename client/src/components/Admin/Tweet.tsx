import {
  Alert,
  Button,
  Checkbox,
  Snackbar,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { TweetRead } from "../../client";
import { PseudoTweetsService, TweetsService } from "../../client";
import { useTweetModifications } from "../../hooks";

interface Props {
  row: TweetRead;
  action: "verify" | "modify";
}

const Tweet = ({ row, action }: Props) => {
  const {
    getChangedColumns,
    currentRow,
    handleChange,
    snackOpen,
    handleClose,
    modifySubmit,
  } = useTweetModifications({
    row,
    serviceFunc: TweetsService.tweetsUpdateTweet,
  });
  const [isVerified, setIsVerified] = useState(false);

  const verifySubmit = () => {
    PseudoTweetsService.pseudoTweetsVerifyPseudoTweet(
      row.id,
      getChangedColumns()
    ).then(() => setIsVerified(true));
  };

  return (
    <TableRow
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell sx={{ fontSize: "1rem" }} align="left">
        {row.text}
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={currentRow.is_abuse}
          onChange={({ target: { checked } }) => {
            handleChange(checked, "is_abuse");
          }}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[1-9]|10" }}
          value={currentRow.sexual_score}
          onChange={({ target: { value } }) => {
            handleChange(parseInt(value), "sexual_score");
          }}
          helperText="1-10"
        />
      </TableCell>
      <TableCell align="right">
        {action === "modify" ? (
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
            <Button variant="contained" onClick={modifySubmit}>
              Modify
            </Button>
          </>
        ) : (
          <>
            {isVerified ? (
              <Button
                color="success"
                disabled={action === "verify"}
                // variant="contained"
                onClick={verifySubmit}
              >
                Verified
              </Button>
            ) : (
              <Button variant="contained" onClick={verifySubmit}>
                Verify
              </Button>
            )}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Tweet;
