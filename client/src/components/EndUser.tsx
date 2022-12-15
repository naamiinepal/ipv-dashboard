import FilteredContainer from "./FilteredContainer";
import Nav from "./Nav";
import Purpose from "./Purpose";

const EndUser: React.FunctionComponent = () => (
  <>
    <Nav />
    <div className="bg-blue-50">
      <div className="w-11/12 mx-auto">
        <Purpose />
        <FilteredContainer />
      </div>
    </div>
  </>
);

export default EndUser;
