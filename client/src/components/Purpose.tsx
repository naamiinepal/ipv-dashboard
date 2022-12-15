import { Paper } from "@mui/material";
import NepalLogo from "../svgs/Nepal";
import DataSection from "./DataSection";
import Title from "./Title";

const Purpose: React.FunctionComponent = () => (
  <div className="flex justify-between pt-2">
    <Paper className="w-5/12 p-1.5">
      <Title>
        <h2>An Idea Behind</h2>
      </Title>
      <p>
        Detecting Intimate Partner Violence (IPV) is arduous due to the
        unavailability of conversations between intimate partners. We aim to
        find abusive texts from social media platforms that could have
        potentially been used for IPV.
      </p>
    </Paper>
    <NepalLogo className="w-24" />
    <DataSection className="w-4/12 p-3" />
  </div>
);

export default Purpose;
