import FilteredContainer from "./FilteredContainer";
import Nav from "./Nav";
import Purpose from "./Purpose";

const EndUser = () => (
  <>
    <Nav />
    <div className="bg-blue-50">
      <Purpose />
      <FilteredContainer />
    </div>
  </>
);

export default EndUser;
