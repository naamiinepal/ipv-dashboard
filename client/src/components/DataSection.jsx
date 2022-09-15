import CampaignIcon from "@mui/icons-material/Campaign";
import { Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Title from "./Title";

const DataSection = () => {
  const [tweetCount, setTweetCount] = useState(0);

  useEffect(() => {
    axios.get("/pseudo_tweets/count").then(({ data: { total } }) => {
      setTweetCount(total);
    });
  }, []);

  return (
    <Paper className="w-1/12 mt-2 p-2">
      <Title text="Data"></Title>
      <div className=" text-primary">
        <CampaignIcon color="#247881" fontSize="large" /> <b>{tweetCount}</b>
        <div className="text-black">Tweets analysed</div>
      </div>
    </Paper>
  );
};

export default DataSection;
