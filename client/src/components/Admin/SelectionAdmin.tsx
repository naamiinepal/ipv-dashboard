import { Button, TextField } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  toggleReload: () => void;
}

const SelectionAdmin = ({ offset, setOffset, toggleReload }: Props) => {
  const [offsetTemp, setOffsetTemp] = useState(offset);

  return (
    <div className="w-5/12 flex items-end mb-3">
      <TextField
        label="Offset"
        value={offsetTemp}
        type="number"
        onChange={({ target: { value } }) => {
          setOffsetTemp(parseInt(value));
        }}
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
