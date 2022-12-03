import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const NoMatch: FunctionComponent = () => (
  <>
    <Nav />
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-xl font-bold  text-primary">Nothing to see here!</h2>
      <p className="mt-8">
        <Link
          to="/"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          Go to the home page
        </Link>
      </p>
    </div>
  </>
);

export default NoMatch;
