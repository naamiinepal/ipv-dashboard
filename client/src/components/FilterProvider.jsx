import moment from "moment";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [startDate, setStartDate] = useState("2019-12-01");
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const value = { startDate, endDate, setStartDate, setEndDate };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export default FilterProvider;
export { useFilter };
