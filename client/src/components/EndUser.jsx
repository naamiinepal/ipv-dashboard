import FilteredContainer from "./FilteredContainer";
import Nav from "./Nav";
import Purpose from "./Purpose";

const EndUser = () => (
  <div>
    <Nav />
    <div className=" bg-blue-50">
      <Purpose />
      <FilteredContainer />
    </div>
  </div>
);

export default EndUser;
