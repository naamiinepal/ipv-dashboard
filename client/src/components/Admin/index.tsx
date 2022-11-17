import { Outlet } from "react-router";
import Nav from "../Nav";

const Admin = () => (
  <>
    <Nav />
    {/* <TweetCollectionAdminPanel action="verify" /> */}
    <Outlet />
  </>
);

export default Admin;
