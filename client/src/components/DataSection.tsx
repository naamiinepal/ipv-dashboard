import CampaignIcon from "@mui/icons-material/Campaign";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { CancelError, PseudoTweetsService } from "../client";
import Title from "./Title";

const DataSection = () => {
  const [tweetCount, setTweetCount] = useState(0);

  useEffect(() => {
    const request = PseudoTweetsService.pseudoTweetsGetCount(true);
    request
      .then(({ total }) => setTweetCount(total))
      .catch((err) => {
        if (err instanceof CancelError) {
          console.log("DataSection umounted");
        }
      });
    return () => {
      request.cancel();
    };
  }, []);

  return (
    <Paper className="w-1.5/12 mt-2 p-2">
      <div className="mt-3">
        <Title element={<h2>Data</h2>} />
        <div className="text-primary mt-3">
          <CampaignIcon fontSize="large" />{" "}
          <b>{tweetCount.toLocaleString("hi")}</b>
          <div className="text-black">Tweets Analysed</div>
        </div>
      </div>
    </Paper>
  );
};

export default DataSection;
