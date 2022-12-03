import type { FunctionComponent } from "react";
import Title from "../Title";
import type { TeamCollectionProps } from "./types";

const TeamCollection: FunctionComponent<TeamCollectionProps> = ({
  title,
  children,
}) => (
  <>
    <Title>
      <h2>{title}</h2>
    </Title>
    <div className="flex justify-around my-6 items-center">{children}</div>
  </>
);

export default TeamCollection;
