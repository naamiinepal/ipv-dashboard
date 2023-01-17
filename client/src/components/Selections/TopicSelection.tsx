import {
  Checkbox,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import type { AspectEnum } from "../../client";
import { Aspects } from "../../constants";
import { toTitleCase } from "../../utility";
import type { WrappedComponentProps } from "./SelectorHOC";
import SelectorHOC from "./SelectorHOC";

type ValueType = AspectEnum | -1;

const titleAspects = Aspects.map(toTitleCase);

const TopicSelection: React.FunctionComponent<
  WrappedComponentProps<ValueType>
> = ({ filters, setFilters, ...restProps }) => (
  <Select
    sx={{ backgroundColor: "white" }}
    value={filters}
    label="TopicSelection"
    onChange={({ target: { value } }) => setFilters(value as ValueType[])}
    multiple
    {...restProps}
  >
    <ListSubheader>Sentence Label</ListSubheader>

    <MenuItem value={-1}>
      <Checkbox checked={filters.indexOf(-1) > -1} />
      <ListItemText primary="Is Abuse" />
    </MenuItem>
    <ListSubheader>Phrases</ListSubheader>
    {titleAspects.map((field, index) => (
      <MenuItem key={field} value={index}>
        <Checkbox checked={filters.indexOf(index as AspectEnum) > -1} />
        <ListItemText primary={field} />
      </MenuItem>
    ))}
  </Select>
);

// -1 is for is_abuse category
const allTopics = [...Array(titleAspects.length).keys()] as AspectEnum[];

export default SelectorHOC(TopicSelection, "Topic", allTopics);

export { allTopics, type ValueType };
