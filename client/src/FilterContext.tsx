import moment from "moment";
import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

interface FilterProviderValue {
  startDate: string;
  endDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
}

const defaultStartDate = "2015-01-01";
const defaultEndDate = moment(new Date()).format("YYYY-MM-DD");

const FilterContext = createContext<FilterProviderValue>({
  startDate: defaultStartDate,
  endDate: defaultEndDate,
  setStartDate: () => {},
  setEndDate: () => {},
});

export default FilterContext;
export { defaultStartDate, defaultEndDate };
