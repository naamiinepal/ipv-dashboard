import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { SourceSelection, TopicSelection } from "../Selections";

interface SelectionAdminProps {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  toggleReload: () => void;
}

const SelectionAdmin: React.FunctionComponent<SelectionAdminProps> = ({
  offset,
  setOffset,
  toggleReload,
}) => {
  const [offsetTemp, setOffsetTemp] = useState(offset);

  const topicsRef = useRef(null);
  const sourceRef = useRef(null);

  return (
    <div className="flex justify-between">
      <TopicSelection ref={topicsRef} isAdmin />
      <SourceSelection ref={sourceRef} isAdmin />
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
