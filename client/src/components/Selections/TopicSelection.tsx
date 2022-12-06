import {
  Checkbox,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import { phraseColumns } from "../../constants";
import { toTitleCase } from "../../utility";
import SelectorHOC, {
  WrappedComponentProps,
  FilterArrayType,
} from "./SelectorHOC";

const phrasePrefixLength = "phrase: ".length;

const phraseTopicNames = phraseColumns.map(({ field }) =>
  field.substring(phrasePrefixLength)
);

const TopicSelection: React.FunctionComponent<WrappedComponentProps> = ({
  filters,
  setFilters,
  ...restProps
}) => (
  <Select
    sx={{ backgroundColor: "white" }}
    value={filters}
    label="TopicSelection"
    onChange={({ target: { value } }) => setFilters(value as FilterArrayType)}
    multiple
    {...restProps}
  >
    <ListSubheader>Sentence Label</ListSubheader>

    <MenuItem value="is_abuse">
      <Checkbox checked={filters.indexOf("is_abuse") > -1} />
      <ListItemText primary="Is Abuse" />
    </MenuItem>
    <ListSubheader>Phrases</ListSubheader>
    {phraseTopicNames.map((field) => (
      <MenuItem key={field} value={field}>
        <Checkbox checked={filters.indexOf(field) > -1} />
        <ListItemText primary={toTitleCase(field)} />
      </MenuItem>
    ))}
  </Select>
);

const allTopics = [...phraseTopicNames, "is_abuse"];

export default SelectorHOC(TopicSelection, "Topic", allTopics);
