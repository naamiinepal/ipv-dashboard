import { useState } from "react";
import { ValueType as SourceValueType } from "./SourceSelection";
import { ValueType as TopicsValueType } from "./TopicSelection";

const useCombinedSelection = () => {
  const [sources, setSources] = useState<SourceValueType[]>([]);
  const [topics, setTopics] = useState<TopicsValueType[]>([]);

  return {
    sources,
    setSources,
    topics,
    setTopics,
  };
};

export default useCombinedSelection;
