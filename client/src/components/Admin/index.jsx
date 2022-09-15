import { Outlet } from "react-router";
import Nav from "../Nav";

const Admin = () => (
  <div>
    <Nav />
    {/* <TweetCollectionAdminPanel action="verify" /> */}
    <Outlet />
  </div>
);

export default Admin;
