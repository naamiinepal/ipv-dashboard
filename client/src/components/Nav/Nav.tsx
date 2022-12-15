import ChildSafeNetLogo from "../../images/childsafenetlogo.png";
import NaamiiLogo from "../../images/naamii-logo.png";
import CustomNavLink from "./CustomNavLink";
import RightNavLink from "./RightNavLink";

const Nav: React.FunctionComponent<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = (props) => (
  <nav {...props}>
    <div className="border-t-2 bg-white px-16 py-2 flex items-center justify-between">
      <img
        alt="ChildSafeNet-Logo"
        src={ChildSafeNetLogo}
        className="w-1/6"
        width="657"
        height="193"
      />
      <h1 className="font-bold text-primary text-2xl">
        Online Abusive Text Detection System for IPV
      </h1>
      <img alt="NAAMII-Logo" src={NaamiiLogo} width="80" height="88" />
    </div>
    <div className="border-b-2 bg-white px-16 flex items-center justify-between">
      <CustomNavLink to="/">Home</CustomNavLink>
      <RightNavLink />
    </div>
  </nav>
);

export default Nav;
