enum ActionEnum {
  New,
  ChangeStart,
  ChangeEnd,
  ChangeAspect,
  Delete,
}

type ActionInterface =
  | { type: ActionEnum.New }
  | { type: ActionEnum.ChangeStart; payload: { index: number; start: number } }
  | { type: ActionEnum.ChangeEnd; payload: { index: number; end: number } }
  | {
      type: ActionEnum.ChangeAspect;
      payload: { index: number; aspect: number };
    }
  | { type: ActionEnum.Delete; payload: { index: number } };

interface SingleAnnotationType {
  start: number;
  startHelperText: string;
  end: number;
  endHelperText: string;
  hasErrorOccurred: boolean;
  aspect: number;
}

type AnnotationType = SingleAnnotationType[];

const Aspects = [
  "others",
  "profanity",
  "physical_threat",
  "rape_threat",
  "ethnic_racism",
  "religion_racism",
  "sexism",
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
  index: number,
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
  state: AnnotationType,
  action: ActionInterface
): AnnotationType => {
  switch (action.type) {
    case ActionEnum.New:
      return [...state, defaultSingleAnnotation];
    case ActionEnum.ChangeStart: {
      const { index, start } = action.payload!;

      const newState = [...state];
      const currentSingleAnno = newState[index];

      const newSingleAnno = getUpdatedSingleAnno(
        currentSingleAnno,
        index,
        start,
        currentSingleAnno.end
      );

      newState[index] = newSingleAnno;
      return newState;
    }
    case ActionEnum.ChangeEnd: {
      const { index, end } = action.payload!;

      const newState = [...state];
      const currentSingleAnno = newState[index];

      const newSingleAnno = getUpdatedSingleAnno(
        currentSingleAnno,
        index,
        currentSingleAnno.start,
        end
      );

      newState[index] = newSingleAnno;
      return newState;
    }
    case ActionEnum.ChangeAspect: {
      const { index, aspect } = action.payload!;
      const newState = [...state];
      const currentSingleAnno = newState[index];

      newState[index] = { ...currentSingleAnno, aspect };
      return newState;
    }
    case ActionEnum.Delete: {
      const { index } = action.payload!;
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    }
    default:
      return state;
  }
};

export default annotationsReducer;
export { Aspects, ActionEnum };
