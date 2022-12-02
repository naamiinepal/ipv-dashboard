import { Campaign, Category } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { CancelError, PseudoTweetsService } from "../client";
import type { TweetCount } from "../client";
import Title from "./Title";

const storageKey = "totalCount";

type TotalType = TweetCount["total"];

const storeTotal = (total: TotalType) =>
  localStorage.setItem(storageKey, total.toString());

const getStorageTotal = (): TotalType => {
  const item = localStorage.getItem(storageKey);
  return item ? parseInt(item) : 0;
};

const DataSection = () => {
  const [tweetCount, setTweetCount] = useState(getStorageTotal);

  useEffect(() => {
    const request = PseudoTweetsService.pseudoTweetsGetCount(true);
    request
      .then(({ total }) => {
        setTweetCount(total);
        storeTotal(total);
      })
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
    <Paper className="w-3/12 p-2">
      <Title element={<h2>Data</h2>} />
      <div className="flex justify-between text-primary items-center h-24">
        <div>
          <Campaign fontSize="large" />
          <b>{tweetCount.toLocaleString("hi")}</b>
          <div className="text-black">Sentences Analysed</div>
        </div>
        <div>
          <Category fontSize="large" />
          <b>9</b>
          <div className="text-black">Phrases Analysed</div>
        </div>
      </div>
    </Paper>
  );
};

export default DataSection;
