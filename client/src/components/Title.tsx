import type { ReactNode, FunctionComponent } from "react";

interface TitleProps {
  children: NonNullable<ReactNode>;
}

const Title: FunctionComponent<TitleProps> = ({ children }) => (
  <div className="text-2xl font-bold text-primary">{children}</div>
);

export default Title;
