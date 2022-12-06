import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import {
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import type {
  ComponentPropsWithoutRef,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";
import { toTitleCase } from "../utility";

const allSources = ["simulation", "twitter", "youtube"];

type SourceArray = typeof allSources;

interface SourceSelectionProps extends ComponentPropsWithoutRef<typeof Select> {
  sources: SourceArray;
  setSources: Dispatch<SetStateAction<SourceArray>>;
  isWhite?: boolean;
}

const SourceSelection: FunctionComponent<SourceSelectionProps> = ({
  sources,
  setSources,
  isWhite = false,
  ...restProps
}) => (
  <div className="flex justify-between">
    <div className="mr-3 flex flex-col">
      <span
        className={`${
          isWhite ? "text-white" : "text-black"
        } text-base font-semibold`}
      >
        Filter by Source:
      </span>
      <div className="flex justify-between">
        <Button
          variant="contained"
          startIcon={<DoneAllIcon />}
          size="small"
          onClick={() => setSources(allSources)}
        >
          All
        </Button>
        <Button
          variant="contained"
          startIcon={<RemoveDoneIcon />}
          size="small"
          color="warning"
          onClick={() => setSources([])}
        >
          None
        </Button>
      </div>
    </div>
    <Select
      sx={{ backgroundColor: "white" }}
      value={sources}
      label="Topic"
      onChange={({ target: { value } }) => setSources(value as SourceArray)}
      multiple
      {...restProps}
    >
      {allSources.map((field) => (
        <MenuItem key={field} value={field}>
          <Checkbox checked={sources.indexOf(field) > -1} />
          <ListItemText primary={toTitleCase(field)} />
        </MenuItem>
      ))}
    </Select>
  </div>
);

export default SourceSelection;

export { allSources };
