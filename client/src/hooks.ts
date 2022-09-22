import type { AlertColor } from "@mui/material";
import { useState } from "react";
import type { TweetRead, TweetsService, TweetUpdate } from "./client";

interface Props {
  row: TweetRead;
  serviceFunc: typeof TweetsService.tweetsUpdateTweet;
  submitCallback?: () => void;
}

type ValueOf<T> = T[keyof T];

interface SnackProps {
  display: boolean;
  message: string;
  intent: AlertColor;
}

const useTweetModifications = ({
  row,
  serviceFunc,
  submitCallback = () => {},
}: Props) => {
  const [currentRow, setCurrentRow] = useState(row);
  const [snackOpen, setSnackOpen] = useState<SnackProps>({
    display: false,
    message: "",
    intent: "success",
  });

  const handleClose = () => {
    console.log("Closed");
    setSnackOpen({ ...snackOpen, display: false });
  };

  const handleChange = (
    value: Exclude<ValueOf<TweetUpdate>, undefined>,
    column: keyof TweetUpdate
  ) => setCurrentRow({ ...currentRow, [column]: value });

  const modifySubmit = () =>
    serviceFunc(row.id, getChangedColumns())
      .then(() => {
        submitCallback();
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

  return {
    currentRow,
    snackOpen,
    getChangedColumns,
    handleChange,
    handleClose,
    modifySubmit,
  };
};

export { useTweetModifications };
