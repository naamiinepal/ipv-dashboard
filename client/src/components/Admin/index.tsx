import type { FunctionComponent } from "react";
import { Outlet } from "react-router";
import Nav from "../Nav";

const Admin: FunctionComponent = () => (
  <>
    <Nav />
    {/* <TweetCollectionAdminPanel action="verify" /> */}
    <Outlet />
  </>
);

export default Admin;
