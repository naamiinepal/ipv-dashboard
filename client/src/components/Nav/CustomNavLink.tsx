import { NavLink } from "react-router-dom";

const CustomNavLink: React.FunctionComponent<
  Omit<React.ComponentPropsWithoutRef<typeof NavLink>, "className">
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

export default CustomNavLink;
