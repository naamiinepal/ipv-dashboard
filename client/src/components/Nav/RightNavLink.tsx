import { useLocation } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";

const RightNavLink: React.FunctionComponent<
  Omit<React.ComponentPropsWithoutRef<typeof CustomNavLink>, "to">
> = (props) => {
  const { pathname } = useLocation();

  const [_, apPath, modifyPath] = pathname.split("/", 3);

  const isVerify = apPath === "ap" && !modifyPath?.startsWith("modify");
  let to: string, text: string;
  if (isVerify) {
    to = "/ap/modify";
    text = "Modify";
  } else {
    to = "/ap";
    text = "Admin";
  }
  return (
    <CustomNavLink {...props} to={to}>
      {text}
    </CustomNavLink>
  );
};

export default RightNavLink;
