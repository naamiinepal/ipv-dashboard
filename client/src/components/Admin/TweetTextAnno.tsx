import { Button, MenuItem, Select, TextField } from "@mui/material";
import type { Dispatch } from "react";
import { toTitleCase } from "../../utility";
import type {
  ActionInterface,
  SingleAnnotationType,
} from "./AnnotationReducer";
import { ActionEnum, Aspects } from "./AnnotationReducer";

interface TweetTextInterface {
  aspects_anno: SingleAnnotationType[];
  dispatch: Dispatch<ActionInterface>;
  isDisabled: boolean;
  textLength: number;
}

const TweetTextAnno = ({
  aspects_anno,
  dispatch,
  isDisabled,
  textLength,
}: TweetTextInterface) => {
  return (
    <>
      {aspects_anno.map(
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
              inputProps={{ min: 0, max: end - 1 < 0 ? 0 : end - 1 }}
              type="number"
              value={start}
              error={hasErrorOccurred}
              onChange={({ target: { value } }) =>
                dispatch({
                  type: ActionEnum.ChangeStart,
                  payload: { index, start: parseInt(value) || 0 },
                })
              }
              helperText={startHelperText}
            />
            <TextField
              inputProps={{ min: start + 1, max: textLength }}
              type="number"
              value={end}
              error={hasErrorOccurred}
              onChange={({ target: { value } }) =>
                dispatch({
                  type: ActionEnum.ChangeEnd,
                  payload: { index, end: parseInt(value) || 0 },
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
                dispatch({
                  type: ActionEnum.DeletePhrase,
                  payload: { index },
                })
              }
              disabled={isDisabled}
            >
              Delete Annotation
            </Button>
          </div>
        )
      )}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch({ type: ActionEnum.NewPhrase })}
        disabled={isDisabled}
      >
        Add New Phrase Annotation
      </Button>
    </>
  );
};

export default TweetTextAnno;
