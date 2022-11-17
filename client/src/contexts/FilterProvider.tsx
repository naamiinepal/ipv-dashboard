import moment from "moment";
import type { Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";

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

interface Props {
  children: React.ReactNode;
}

const FilterProvider = ({ children }: Props) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  return (
    <FilterContext.Provider
      value={{ startDate, endDate, setStartDate, setEndDate }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
export { FilterContext };
