import { Paper } from "@mui/material";
import type { FunctionComponent } from "react";
import Nepal from "../svgs/nepal.svg";
import DataSection from "./DataSection";
import Title from "./Title";

const Purpose: FunctionComponent = () => (
  <div className="ml-16 w-11/12 flex justify-between">
    <Paper className="w-4/12 mt-2 p-2">
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
    <img alt="NAAMII-Logo" src={Nepal} width="100" />
    <DataSection />
  </div>
);

export default Purpose;
