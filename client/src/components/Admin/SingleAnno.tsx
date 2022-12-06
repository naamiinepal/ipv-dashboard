import { Button, MenuItem, Select, TextField } from "@mui/material";
import type { Dispatch, FunctionComponent } from "react";
import { Aspects } from "../../constants";
import { toTitleCase } from "../../utility";
import type { ActionInterface } from "./AnnotationReducer";
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
const SingleAnno: FunctionComponent<SingleAnnoInterface> = ({
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
}) => (
  <div className="flex items-start justify-between">
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
      sx={{ marginTop: "0.5rem" }}
    >
      Delete Annotation
    </Button>
  </div>
);

export default SingleAnno;
