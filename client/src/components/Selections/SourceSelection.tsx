import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import { FunctionComponent } from "react";
import { toTitleCase } from "../../utility";
import SelectorHOC, {
  WrappedComponentProps,
  FilterArrayType,
} from "./SelectorHOC";

const allSources = ["simulation", "twitter", "youtube"];

const SourceSelection: FunctionComponent<WrappedComponentProps> = ({
  filters,
  setFilters,
  ...restProps
}) => (
  <Select
    sx={{ backgroundColor: "white" }}
    value={filters}
    label="SourceSelection"
    onChange={({ target: { value } }) => setFilters(value as FilterArrayType)}
    multiple
    {...restProps}
  >
    {allSources.map((field) => (
      <MenuItem key={field} value={field}>
        <Checkbox checked={filters.indexOf(field) > -1} />
        <ListItemText primary={toTitleCase(field)} />
      </MenuItem>
    ))}
  </Select>
);

export default SelectorHOC(SourceSelection, "Source", allSources);
