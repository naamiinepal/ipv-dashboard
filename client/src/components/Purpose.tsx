import { Paper } from "@mui/material";
import Nepal from "../svgs/nepal.svg";
import DataSection from "./DataSection";
import Title from "./Title";

const Purpose = () => (
  <div className="ml-16 w-11/12 flex justify-between">
    <Paper className="w-3/12 mt-2 p-2">
      <Title element={<h2>An Idea Behind</h2>} />
      <p>
        Detecting the Intimate Partner Violence (IPV) is a hard task due to
        unavailability of conversations of intimate partners. We aim to find the
        abusive texts from the social media platforms which could have
        potentially used for IPV.
      </p>
    </Paper>
    <img alt="NAAMII-Logo" src={Nepal} width="100" />
    <DataSection />
  </div>
);

export default Purpose;
