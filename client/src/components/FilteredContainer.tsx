import { Button } from "@mui/material";
import moment from "moment";
import type { FunctionComponent } from "react";
import { useContext, useState } from "react";
import FilterContext from "../FilterContext";
import CustomDatePicker from "./CustomDatePicker";
import LineChart from "./LineChart";
import Tweets from "./Tweets";

const FilteredContainer: FunctionComponent = () => {
  const { startDate, setStartDate, endDate, setEndDate } =
    useContext(FilterContext);

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(startDate)
  );

  const [selectedEndDate, setSelectedEndDate] = useState(new Date(endDate));

  const submitFilter = () => {
    setStartDate &&
      setStartDate(moment(selectedStartDate).format("YYYY-MM-DD"));
    setEndDate && setEndDate(moment(selectedEndDate).format("YYYY-MM-DD"));
  };

  return (
    <div>
      <div className="flex mt-2 items-center ml-16 pl-2 w-11/12 py-1 bg-primary">
        <div className="text-white w-2/12 text-lg font-bold">View Data Of</div>
        <CustomDatePicker
          textLabel="From"
          label="Start Date"
          value={selectedStartDate}
          onChange={(value) => setSelectedStartDate(value as Date)}
        />
        <CustomDatePicker
          textLabel="To"
          label="End Date"
          value={selectedEndDate}
          onChange={(value) => setSelectedEndDate(value as Date)}
        />
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#247890" }}
          onClick={submitFilter}
        >
          Filter
        </Button>
      </div>
      <LineChart />
      <Tweets />
    </div>
  );
};

export default FilteredContainer;
