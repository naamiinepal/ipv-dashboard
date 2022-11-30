import type { TweetRead, TweetUpdate } from "../../client";
import type { ValueOf } from "../../utility";

enum ActionEnum {
  NewPhrase,
  ChangeStart,
  ChangeEnd,
  ChangeAspect,
  DeletePhrase,
  Verify,
  ChangeSentenceAnnotaion,
}
type ActionInterface =
  | { type: ActionEnum.NewPhrase }
  | { type: ActionEnum.ChangeStart; payload: { index: number; start: number } }
  | { type: ActionEnum.ChangeEnd; payload: { index: number; end: number } }
  | {
      type: ActionEnum.ChangeAspect;
      payload: { index: number; aspect: number };
    }
  | { type: ActionEnum.DeletePhrase; payload: { index: number } }
  | { type: ActionEnum.Verify }
  | {
      type: ActionEnum.ChangeSentenceAnnotaion;
      payload: {
        value: NonNullable<ValueOf<TweetUpdate>>;
        column: Exclude<keyof TweetUpdate, "aspects_anno">;
      };
    };

interface SingleAnnotationType {
  start: number;
  startHelperText: string;
  end: number;
  endHelperText: string;
  hasErrorOccurred: boolean;
  aspect: number;
}

interface TweetStateInterface extends Omit<TweetRead, "aspects_anno"> {
  isVerified: boolean;
  aspects_anno: SingleAnnotationType[];
}

const Aspects = [
  "others",
  "profanity",
  "physical_threat",
  "rape_threat",
  "general_threat",
  "ethnic_violence",
  "religion_violence",
  "religion_racism",
  "sexism",
  "character_assasination",
];

const defaultSingleAnnotation: SingleAnnotationType = {
  start: 0,
  startHelperText: "Start Offset (inclusive)",
  end: 0,
  endHelperText: "End Offset (exclusive)",
  hasErrorOccurred: false,
  aspect: 0,
};

const getUpdatedSingleAnno = (
  currentSingleAnno: SingleAnnotationType,
  start: number,
  end: number
): SingleAnnotationType => {
  const hasErrorOccurred = start >= end;

  let { startHelperText, endHelperText } = defaultSingleAnnotation;
  if (hasErrorOccurred) {
    startHelperText = endHelperText = "start must be less than end";
  }
  return {
    ...currentSingleAnno,
    start,
    end,
    hasErrorOccurred,
    startHelperText,
    endHelperText,
  };
};

const annotationsReducer = (
  state: TweetStateInterface,
  action: ActionInterface
): TweetStateInterface => {
  switch (action.type) {
    case ActionEnum.NewPhrase:
      return {
        ...state,
        aspects_anno: [...state.aspects_anno, defaultSingleAnnotation],
      };
    case ActionEnum.ChangeStart: {
      const { index, start } = action.payload;

      const aspects_anno = [...state.aspects_anno];
      const currentSingleAnno = aspects_anno[index];

      const newSingleAnno = getUpdatedSingleAnno(
        currentSingleAnno,
        start,
        currentSingleAnno.end
      );

      aspects_anno[index] = newSingleAnno;
      return { ...state, aspects_anno };
    }
    case ActionEnum.ChangeEnd: {
      const { index, end } = action.payload;

      const aspects_anno = [...state.aspects_anno];
      const currentSingleAnno = aspects_anno[index];

      const newSingleAnno = getUpdatedSingleAnno(
        currentSingleAnno,
        currentSingleAnno.start,
        end
      );

      aspects_anno[index] = newSingleAnno;
      return { ...state, aspects_anno };
    }
    case ActionEnum.ChangeAspect: {
      const { index, aspect } = action.payload;

      const aspects_anno = [...state.aspects_anno];
      const currentSingleAnno = aspects_anno[index];

      aspects_anno[index] = { ...currentSingleAnno, aspect };
      return { ...state, aspects_anno };
    }
    case ActionEnum.DeletePhrase: {
      const { index } = action.payload;
      const aspects_anno = [...state.aspects_anno];
      aspects_anno.splice(index, 1);
      return { ...state, aspects_anno };
    }
    case ActionEnum.Verify:
      return { ...state, isVerified: true };
    case ActionEnum.ChangeSentenceAnnotaion:
      return {
        ...state,
        [action.payload.column]: action.payload.value,
      };
    default:
      return state;
  }
};

export default annotationsReducer;
export { Aspects, ActionEnum, defaultSingleAnnotation };
export type {
  TweetStateInterface as TweetState,
  SingleAnnotationType,
  ActionInterface,
};
