import CampaignIcon from "@mui/icons-material/Campaign";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { PseudoTweetsService } from "../client";
import Title from "./Title";

const DataSection = () => {
  const [tweetCount, setTweetCount] = useState(0);

  useEffect(() => {
    PseudoTweetsService.pseudoTweetsGetCount({ all: true }).then((data) => {
      setTweetCount(data.total);
    });
  }, []);

  return (
    <Paper className="w-1/12 mt-2 p-2">
      <Title text="Data"></Title>
      <div className=" text-primary">
        <CampaignIcon fontSize="large" /> <b>{tweetCount}</b>
        <div className="text-black">Tweets Analysed</div>
      </div>
    </Paper>
  );
};

export default DataSection;
