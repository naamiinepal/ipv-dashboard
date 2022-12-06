import { Button, TextField } from "@mui/material";
import type { Dispatch, FunctionComponent, SetStateAction } from "react";
import { useRef, useState } from "react";
import { SourceSelection, TopicSelection } from "../Selections";

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

  const topicsRef = useRef(null);
  const sourceRef = useRef(null);

  return (
    <div className="flex justify-between">
      <TopicSelection ref={topicsRef} />
      <SourceSelection ref={sourceRef} />
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
