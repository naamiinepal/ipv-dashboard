import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import {
  Button,
  Checkbox,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import type {
  ComponentPropsWithoutRef,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";
import { phraseColumns } from "../constants";
import { toTitleCase } from "../utility";

const phrasePrefixLength = "phrase: ".length;

const phraseTopicNames = phraseColumns.map(({ field }) =>
  field.substring(phrasePrefixLength)
);

const allTopics = [...phraseTopicNames, "is_abuse"];

type TopicArray = typeof allTopics;

interface TopicSelectionProps extends ComponentPropsWithoutRef<typeof Select> {
  topics: TopicArray;
  setTopics: Dispatch<SetStateAction<TopicArray>>;
  isWhite?: boolean;
}

const TopicSelection: FunctionComponent<TopicSelectionProps> = ({
  topics,
  setTopics,
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
        Filter by Topic:
      </span>
      <div className="flex justify-between">
        <Button
          variant="contained"
          startIcon={<DoneAllIcon />}
          size="small"
          onClick={() => setTopics(allTopics)}
        >
          All
        </Button>
        <Button
          variant="contained"
          startIcon={<RemoveDoneIcon />}
          size="small"
          color="warning"
          onClick={() => setTopics([])}
        >
          None
        </Button>
      </div>
    </div>
    <Select
      sx={{ backgroundColor: "white" }}
      value={topics}
      label="Topic"
      onChange={({ target: { value } }) => setTopics(value as TopicArray)}
      multiple
      {...restProps}
    >
      <ListSubheader>Sentence Label</ListSubheader>

      <MenuItem value="is_abuse">
        <Checkbox checked={topics.indexOf("is_abuse") > -1} />
        <ListItemText primary="Is Abuse" />
      </MenuItem>
      <ListSubheader>Phrases</ListSubheader>
      {phraseTopicNames.map((field) => (
        <MenuItem key={field} value={field}>
          <Checkbox checked={topics.indexOf(field) > -1} />
          <ListItemText primary={toTitleCase(field)} />
        </MenuItem>
      ))}
    </Select>
  </div>
);

export default TopicSelection;

export { allTopics };
