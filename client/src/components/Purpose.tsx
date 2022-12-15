import { Paper } from "@mui/material";
import Nepal from "../svgs/Nepal";
import DataSection from "./DataSection";
import Title from "./Title";

const Purpose: React.FunctionComponent = () => (
  <div className="ml-16 w-11/12 flex justify-between">
    <Paper className="w-5/12 mt-2 p-2">
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
    <Nepal className="w-24" />
    <DataSection className="w-4/12 p-3" />
  </div>
);

export default Purpose;
