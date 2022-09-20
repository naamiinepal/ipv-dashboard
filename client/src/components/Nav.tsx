import type { ReactNode } from "react";
import type { To } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ChildSafeNetLogo from "../images/childsafenetlogo.jpg";
import NaamiiLogo from "../images/naamii-logo.png";
import Name from "./Name";

interface CustomNavLinkProps {
  to: To;
  children: ReactNode;
}

const CustomNavLink = ({ to, children }: CustomNavLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? "text-primary underline" : "text-primary"
    }
  >
    {children}
  </NavLink>
);

const Nav = () => (
  <div>
    <div className="border-t-2 bg-white px-16 py-2 flex items-center justify-between">
      <div className="font-bold w-20">
        <img alt="TU-Logo" src={ChildSafeNetLogo} />
      </div>
      <Name />
      <div className="w-14">
        <img alt="NAAMII-Logo" src={NaamiiLogo} />
      </div>
    </div>
    <div className="border-b-2 bg-white px-16 flex items-center justify-between">
      <CustomNavLink to="/">Home</CustomNavLink>
      <CustomNavLink to="/ap">Admin</CustomNavLink>
    </div>
  </div>
);

export default Nav;
