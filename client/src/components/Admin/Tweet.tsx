import type { AlertColor } from "@mui/material";
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
import type { TweetRead, TweetUpdate } from "../../client";
import { PseudoTweetsService, TweetsService } from "../../client";
import { columns } from "../../constants";

interface Props {
  row: TweetRead;
  action: "verify" | "modify";
}

type ValueOf<T> = T[keyof T];

interface SnackProps {
  display: boolean;
  message: string;
  intent: AlertColor;
}

const Tweet = ({ row, action }: Props) => {
  const [currentRow, setCurrentRow] = useState(row);
  const [isVerified, setIsVerified] = useState(false);
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

  const modifySubmit = () =>
    TweetsService.tweetsUpdateTweet({
      tweetId: row.id as number,
      requestBody: getChangedColumns(),
    })
      .then(() => {
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

  const verifySubmit = () => {
    PseudoTweetsService.pseudoTweetsVerifyPseudoTweet({
      pseudoTweetId: row.id as number,
      requestBody: getChangedColumns(),
    }).then(() => setIsVerified(true));
  };

  const handleClose = () => {
    console.log("Closed");
    setSnackOpen({ ...snackOpen, display: false });
  };

  const handleChange = (
    value: Exclude<ValueOf<TweetUpdate>, undefined>,
    column: keyof TweetUpdate
  ) => setCurrentRow({ ...currentRow, [column]: value });

  return (
    <TableRow
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      {columns
        .map((column) => column.field)
        .filter((datum) => datum !== "action" && datum !== "others")
        .map((datum, index) => {
          if (datum === "text")
            return (
              <TableCell key={index} sx={{ fontSize: "1rem" }} align="left">
                {row[datum]}
              </TableCell>
            );
          else if (datum === "sexual_score")
            return (
              <TableCell key={index} align="right">
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[1-9]|10" }}
                  value={currentRow[datum]}
                  onChange={({ target: { value } }) => {
                    handleChange(parseInt(value), datum);
                  }}
                  helperText="1-10"
                />
              </TableCell>
            );
          else {
            const typeDatum = datum as keyof TweetUpdate;
            return (
              <TableCell key={index} align="right">
                <Checkbox
                  checked={currentRow[typeDatum] as boolean}
                  onChange={({ target: { checked } }) => {
                    handleChange(checked, typeDatum);
                  }}
                />
              </TableCell>
            );
          }
        })}
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
