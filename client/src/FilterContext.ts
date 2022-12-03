import moment from "moment";
import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

type StateSetter = Dispatch<SetStateAction<string>> | null;

interface FilterProviderValue {
  startDate: string;
  endDate: string;
  setStartDate: StateSetter;
  setEndDate: StateSetter;
}

const defaultStartDate = "2015-01-01";
const defaultEndDate = moment(new Date()).format("YYYY-MM-DD");

const FilterContext = createContext<FilterProviderValue>({
  startDate: defaultStartDate,
  endDate: defaultEndDate,
  setStartDate: null,
  setEndDate: null,
});

export default FilterContext;
export { defaultStartDate, defaultEndDate };
