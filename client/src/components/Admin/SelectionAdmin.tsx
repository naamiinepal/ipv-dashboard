import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { CombinedSelection, useCombinedSelection } from "../Selections";
import { CombinedSelectionProps } from "../Selections/CombinedSelection";

interface SelectionAdminProps {
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  toggleReload: () => void;
  combinedProps: CombinedSelectionProps;
}

const SelectionAdmin: React.FunctionComponent<SelectionAdminProps> = ({
  offset,
  setOffset,
  toggleReload,
  combinedProps,
}) => {
  const [offsetTemp, setOffsetTemp] = useState(offset);

  return (
    <div className="flex justify-between">
      <CombinedSelection {...combinedProps} isAdmin />
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
