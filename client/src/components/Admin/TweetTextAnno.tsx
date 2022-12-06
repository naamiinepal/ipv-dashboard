import { Button } from "@mui/material";
import type {
  ActionInterface,
  SingleAnnotationType,
} from "./AnnotationReducer";
import { ActionEnum } from "./AnnotationReducer";
import SingleAnno from "./SingleAnno";

interface TweetTextInterface {
  aspects_anno: SingleAnnotationType[];
  dispatch: React.Dispatch<ActionInterface>;
  isDisabled: boolean;
  textLength: number;
}

const TweetTextAnno: React.FunctionComponent<TweetTextInterface> = (props) => {
  const { aspects_anno, ...restProps } = props;
  const { dispatch, isDisabled } = restProps;
  return (
    <div className="items-start mt-0.5">
      <div className="flex flex-col">
        {aspects_anno.map((anno, index) => (
          <SingleAnno {...restProps} {...anno} index={index} key={index} />
        ))}
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch({ type: ActionEnum.NewPhrase })}
        disabled={isDisabled}
      >
        Add New Phrase Annotation
      </Button>
    </div>
  );
};

export default TweetTextAnno;
