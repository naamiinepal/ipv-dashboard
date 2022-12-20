import { Select } from "@mui/material";
import SourceSelection from "./SourceSelection";
import TopicSelection from "./TopicSelection";
import useCombinedSelection from "./useCombinedSelection";

interface CombinedSelectionProps
  extends React.ComponentPropsWithoutRef<typeof Select>,
    ReturnType<typeof useCombinedSelection> {
  isAdmin?: boolean;
}

const CombinedSelection: React.FunctionComponent<CombinedSelectionProps> = ({
  topics,
  setTopics,
  sources,
  setSources,
  ...commonProps
}) => (
  <>
    <TopicSelection {...commonProps} filters={topics} setFilters={setTopics} />
    <SourceSelection
      {...commonProps}
      filters={sources}
      setFilters={setSources}
    />
  </>
);

export default CombinedSelection;

export type { CombinedSelectionProps };
