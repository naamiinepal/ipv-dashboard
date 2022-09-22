import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useState } from "react";
import { useFilter } from "../contexts/FilterProvider";
import LineChart from "./LineChart";
import Tweets from "./Tweets";

interface CustomDatePickerProps
  extends Omit<ComponentPropsWithoutRef<typeof DatePicker>, "renderInput"> {
  textLabel: ReactNode;
}

const CustomDatePicker = ({ textLabel, ...props }: CustomDatePickerProps) => (
  <div className="mx-2 flex items-center w-2/12">
    <div className="text-white text-base font-semibold mr-2">{textLabel}</div>
    <div className="bg-white pt-2">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          inputFormat="DD/MM/YYYY"
          {...props}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  </div>
);

const FilteredContainer = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useFilter();

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(startDate)
  );

  const [selectedEndDate, setSelectedEndDate] = useState(new Date(endDate));

  const submitFilter = () => {
    setStartDate(moment(selectedStartDate).format("YYYY-MM-DD"));
    setEndDate(moment(selectedEndDate).format("YYYY-MM-DD"));
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
