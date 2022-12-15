import Charts from "./Charts";
import Filter from "./Filter";
import TweetWordCloud from "./TweetWordCloud";

const FilteredContainer: React.FunctionComponent = () => (
  <div className="mt-2">
    <Filter />
    <Charts />
    <TweetWordCloud />
  </div>
);

export default FilteredContainer;
