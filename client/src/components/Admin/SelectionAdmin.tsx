import { Button, TextField } from "@mui/material";
import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { useState } from "react";
import SourceSelection, { allSources } from "../SourceSelection";
import TopicSelection, { allTopics } from "../TopicSelection";

interface SelectionAdminProps {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  toggleReload: () => void;
}

const SelectionAdmin: FunctionComponent<SelectionAdminProps> = ({
  offset,
  setOffset,
  toggleReload,
}) => {
  const [offsetTemp, setOffsetTemp] = useState(offset);
  const [topics, setTopics] = useState(allTopics);
  const [sources, setSources] = useState(allSources);

  return (
    <div className="flex justify-between">
      <TopicSelection topics={topics} setTopics={setTopics} />
      <SourceSelection sources={sources} setSources={setSources} />
      <TextField
        label="Offset"
        value={offsetTemp}
        type="number"
        onChange={({ target: { value } }) => setOffsetTemp(parseInt(value))}
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            setOffset(offsetTemp);
          }
        }}
      />
      <Button onClick={toggleReload}>Refuel</Button>
    </div>
  );
};

export default SelectionAdmin;
