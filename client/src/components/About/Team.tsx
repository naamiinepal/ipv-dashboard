import type { FunctionComponent } from "react";
import type { TeamProps } from "./types";

const Team: FunctionComponent<TeamProps> = ({
  src,
  alt,
  name,
  institution = "IOE, Pulchowk Campus",
}) => (
  <div className="text-center">
    <img src={src} alt={alt} width="100" className="rounded-full mx-auto" />
    <div>{name}</div>
    <div>{institution}</div>
  </div>
);

export default Team;
