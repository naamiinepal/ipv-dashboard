import { Button, TextField } from "@mui/material";
import { useState } from "react";

const SelectionAdmin = ({
  offset,
  setOffset,
  toggleReload,
  endUser = false,
}) => {
  const [offsetTemp, setOffsetTemp] = useState(offset);

  return (
    !endUser && (
      <div className="w-5/12 flex items-end mb-3">
        <TextField
          label={"Offset"}
          value={offsetTemp}
          type={"number"}
          onChange={({ target: { value } }) => {
            setOffsetTemp(value);
          }}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              setOffset(offsetTemp);
            }
          }}
        />
        <Button onClick={toggleReload}>Refuel</Button>
      </div>
    )
  );
};

export default SelectionAdmin;
