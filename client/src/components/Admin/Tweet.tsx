import {
  Button,
  Checkbox,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useMemo, useReducer } from "react";
import type { TweetRead, TweetUpdate } from "../../client";
import { PseudoTweetsService } from "../../client";
import type { ValueOf } from "../../utility";
import { nestedArraysEqual } from "../../utility";
import annotationsReducer, {
  ActionEnum,
  defaultSingleAnnotation,
} from "./AnnotationReducer";
import ModifierButton from "./ModifierButton";
import TweetTextAnno from "./TweetTextAnno";
import { InteractiveHighlighter } from "react-interactive-highlighter";

interface TweetProps {
  row: TweetRead;
  action: "verify" | "modify";
}

// Compare two arrays of (start, end, aspect) arrays
const compareFn = (
  [startA, endA, aspectA]: number[],
  [startB, endB, aspectB]: number[]
) => startA - startB || endA - endB || aspectA - aspectB;

const Tweet: React.FunctionComponent<TweetProps> = ({ row, action }) => {
  const [state, dispatch] = useReducer(annotationsReducer, {
    ...row,
    isVerified: false,
    aspects_anno:
      row.aspects_anno?.map(([start, end, aspect]) => ({
        ...defaultSingleAnnotation,
        start,
        end,
        aspect,
      })) || [],
  });

  const handleChange = (
    value: NonNullable<ValueOf<TweetUpdate>>,
    column: Exclude<keyof TweetUpdate, "aspects_anno">
  ) =>
    dispatch({
      type: ActionEnum.ChangeSentenceAnnotaion,
      payload: { value, column },
    });

  const getChangedColumns = () => {
    const toSubmit: TweetUpdate = {};

    if (row.is_abuse !== state.is_abuse) {
      toSubmit.is_abuse = state.is_abuse;
    }
    if (row.sexual_score !== state.sexual_score) {
      toSubmit.sexual_score = state.sexual_score;
    }

    const aspects_anno = state.aspects_anno
      .map(({ start, end, aspect }) => [start, end, aspect])
      .sort(compareFn);

    const oldAspectsAnno: number[][] = [...(row.aspects_anno || [])].sort(
      compareFn
    );

    if (!nestedArraysEqual(aspects_anno, oldAspectsAnno)) {
      toSubmit.aspects_anno = aspects_anno;
    }

    return toSubmit;
  };

  const isPhraseAnnotationValid = useMemo(
    () => state.aspects_anno.every(({ hasErrorOccurred }) => !hasErrorOccurred),
    [state.aspects_anno]
  );

  const highlights = useMemo(
    () =>
      state.aspects_anno.map(({ start, end }) => ({
        startIndex: start,
        numChars: end - start,
      })),
    [state.aspects_anno]
  );

  const verifySubmit = () => {
    if (isPhraseAnnotationValid) {
      PseudoTweetsService.pseudoTweetsVerifyPseudoTweet(
        state.id,
        getChangedColumns()
      ).then(() => dispatch({ type: ActionEnum.Verify }));
    } else {
      console.error("Error in phrase annotaion");
    }
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell sx={{ fontSize: "1rem", paddingTop: "0px" }} align="left">
        <div className="flex flex-col">
          <InteractiveHighlighter
            text={state.text}
            highlights={highlights}
            customClass="highlighted"
          />
          <TweetTextAnno
            aspects_anno={state.aspects_anno}
            dispatch={dispatch}
            isDisabled={action === "verify" && state.isVerified}
            textLength={state.text.length}
          />
        </div>
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={state.is_abuse}
          onChange={({ target: { checked } }) =>
            handleChange(checked, "is_abuse")
          }
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          inputProps={{ min: 1, max: 10 }}
          type="number"
          value={state.sexual_score}
          onChange={({ target: { value } }) =>
            handleChange(parseInt(value) || 1, "sexual_score")
          }
          helperText="1-10"
        />
      </TableCell>
      <TableCell align="right">
        {action === "modify" ? (
          <ModifierButton
            tweetId={state.id}
            getChangedColumns={getChangedColumns}
            disabled={!isPhraseAnnotationValid}
          />
        ) : (
          <>
            {state.isVerified ? (
              <Button
                color="success"
                disabled={action === "verify" || !isPhraseAnnotationValid}
                onClick={verifySubmit}
              >
                Verified
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={verifySubmit}
                disabled={!isPhraseAnnotationValid}
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

export default Tweet;
