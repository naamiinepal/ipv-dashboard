import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import { toTitleCase } from "../../utility";
import type { FilterArrayType, WrappedComponentProps } from "./SelectorHOC";
import SelectorHOC from "./SelectorHOC";

type ValueType = string;

const allSources: ValueType[] = ["simulation", "twitter", "youtube"];

const SourceSelection: React.FunctionComponent<
  WrappedComponentProps<ValueType>
> = ({ filters, setFilters, ...restProps }) => (
  <Select
    sx={{ backgroundColor: "white" }}
    value={filters}
    label="SourceSelection"
    onChange={({ target: { value } }) =>
      setFilters(value as FilterArrayType<ValueType>)
    }
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

export default SelectorHOC<ValueType>(
  SourceSelection,
  "Source",
  allSources,
  false
);

export { allSources, type ValueType };
