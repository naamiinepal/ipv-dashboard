import { Button } from "@mui/material";
import type { Dispatch, FunctionComponent } from "react";
import type {
  ActionInterface,
  SingleAnnotationType,
} from "./AnnotationReducer";
import { ActionEnum } from "./AnnotationReducer";
import SingleAnno from "./SingleAnno";

interface TweetTextInterface {
  aspects_anno: SingleAnnotationType[];
  dispatch: Dispatch<ActionInterface>;
  isDisabled: boolean;
  textLength: number;
}

const TweetTextAnno: FunctionComponent<TweetTextInterface> = (props) => {
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
