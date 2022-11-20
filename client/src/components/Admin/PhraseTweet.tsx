import {
  Alert,
  Button,
  MenuItem,
  Select,
  Snackbar,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useReducer, useState } from "react";
import type { TweetRead } from "../../client";
import { PseudoTweetsService, TweetsService } from "../../client";
import { useTweetModifications } from "../../hooks";
import { toTitleCase } from "../../utility";
import annotationsReducer, { ActionEnum, Aspects } from "./AnnotationReducer";

interface Props {
  row: TweetRead;
  action: "verify" | "modify";
}

const PhraseTweet = ({ row, action }: Props) => {
  const { snackOpen, handleClose, modifySubmit } = useTweetModifications({
    row,
    serviceFunc: TweetsService.tweetsUpdateTweet,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [state, dispatch] = useReducer(annotationsReducer, []);

  const isAnnotationValid = () =>
    state.every(({ hasErrorOccurred }) => !hasErrorOccurred);

  const verifySubmit = () => {
    if (isAnnotationValid()) {
      const aspects_anno: [number, number, number][] = state.map(
        ({ start, end, aspect }) => [start, end, aspect]
      );
      PseudoTweetsService.pseudoTweetsVerifyPseudoTweet(row.id, {
        aspects_anno,
      }).then(() => setIsVerified(true));
    } else {
      console.error("Error in phrase annotaion");
    }
  };

  return (
    <TableRow
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell sx={{ fontSize: "1rem" }} align="left">
        <p>{row.text}</p>
        {state.map(
          (
            {
              start,
              hasErrorOccurred,
              startHelperText,
              end,
              endHelperText,
              aspect,
            },
            index
          ) => (
            <div key={index}>
              <TextField
                inputProps={{ inputMode: "numeric", step: 1 }}
                value={start}
                error={hasErrorOccurred}
                onChange={({ target: { value } }) =>
                  dispatch({
                    type: ActionEnum.ChangeStart,
                    payload: { index, start: parseInt(value) },
                  })
                }
                helperText={startHelperText}
              />
              <TextField
                inputProps={{ inputMode: "numeric", step: 1 }}
                value={end}
                error={hasErrorOccurred}
                onChange={({ target: { value } }) =>
                  dispatch({
                    type: ActionEnum.ChangeEnd,
                    payload: { index, end: parseInt(value) },
                  })
                }
                helperText={endHelperText}
              />
              <Select
                value={aspect}
                label="Aspect"
                onChange={({ target: { value } }) =>
                  dispatch({
                    type: ActionEnum.ChangeAspect,
                    payload: { index, aspect: value as number },
                  })
                }
              >
                {Aspects.map(toTitleCase).map((asp, asp_index) => (
                  <MenuItem value={asp_index} key={asp_index}>
                    {asp}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="warning"
                onClick={() =>
                  dispatch({ type: ActionEnum.Delete, payload: { index } })
                }
                disabled={isVerified}
              >
                Delete Annotation
              </Button>
            </div>
          )
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch({ type: ActionEnum.New })}
          disabled={isVerified}
        >
          Add New Annotation
        </Button>
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
              <Button
                variant="contained"
                onClick={verifySubmit}
                disabled={!isAnnotationValid()}
              >
                Verify
              </Button>
            )}
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PhraseTweet;
