import { Button, MenuItem, Select, TextField } from "@mui/material";
import type { Dispatch } from "react";
import { Aspects } from "../../constants";
import { toTitleCase } from "../../utility";
import type {
  ActionInterface,
  SingleAnnotationType,
} from "./AnnotationReducer";
import { ActionEnum } from "./AnnotationReducer";

interface SingleAnnoInterface {
  index: number;
  end: number;
  start: number;
  hasErrorOccurred: boolean;
  dispatch: Dispatch<ActionInterface>;
  startHelperText: string;
  textLength: number;
  endHelperText: string;
  aspect: number;
  isDisabled: boolean;
}

const SingleAnno = ({
  index,
  end,
  start,
  hasErrorOccurred,
  dispatch,
  startHelperText,
  textLength,
  endHelperText,
  aspect,
  isDisabled,
}: SingleAnnoInterface): JSX.Element => (
  <>
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
  </>
);

interface TweetTextInterface {
  aspects_anno: SingleAnnotationType[];
  dispatch: Dispatch<ActionInterface>;
  isDisabled: boolean;
  textLength: number;
}

const TweetTextAnno = (props: TweetTextInterface) => {
  const { aspects_anno, ...restProps } = props;
  const { dispatch, isDisabled } = restProps;
  return (
    <>
      {aspects_anno.map((anno, index) => (
        <SingleAnno {...restProps} {...anno} index={index} key={index} />
      ))}
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
