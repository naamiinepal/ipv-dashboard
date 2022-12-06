import { NavLink } from "react-router-dom";
import ChildSafeNetLogo from "../images/childsafenetlogo.jpg";
import NaamiiLogo from "../images/naamii-logo.png";

const CustomNavLink: React.FunctionComponent<
  React.ComponentPropsWithoutRef<typeof NavLink>
> = ({ children, ...props }) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      isActive ? "text-primary underline" : "text-primary"
    }
  >
    {children}
  </NavLink>
);

const Nav: React.FunctionComponent = () => (
  <nav>
    <div className="border-t-2 bg-white px-16 py-2 flex items-center justify-between">
      <div className="font-bold w-20">
        <img alt="ChildSafeNet-Logo" src={ChildSafeNetLogo} />
      </div>
      <h1 className="font-bold text-primary ml-3 text-2xl">
        Online Abusive Text Detection System for IPV
      </h1>
      <div className="w-14">
        <img alt="NAAMII-Logo" src={NaamiiLogo} />
      </div>
    </div>
    <div className="border-b-2 bg-white px-16 flex items-center justify-between">
      <CustomNavLink to="/">Home</CustomNavLink>
      <CustomNavLink to="/ap">Admin</CustomNavLink>
    </div>
  </nav>
);

export default Nav;
