import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { TweetRead } from "../client";
import { TweetsService } from "../client";
import { useFilter } from "./FilterProvider";
import Tweet from "./Tweet";
import WordCloud from "./WordCloud";

interface TweetObj {
  [id: number]: TweetRead;
}

const Tweets = () => {
  const [dataList, setDataList] = useState<TweetObj>({});
  const [offset, setOffset] = useState(0);
  const { startDate, endDate } = useFilter();

  useEffect(() => {
    setDataList([]);
  }, [startDate, endDate]);

  useEffect(() => {
    TweetsService.tweetsReadTweets({
      offset,
      limit: 10,
      startDate,
      endDate,
    }).then((data) => {
      // Removes duplicates
      const tempDataList: TweetObj = {};
      for (const tweet of data) {
        tempDataList[tweet.id as number] = tweet;
      }
      setDataList((dl) => ({ ...dl, ...tempDataList }));
    });
  }, [offset, startDate, endDate]);

  const fetchData = () => setOffset(offset + 10);

  return (
    <div className="flex w-11/12 mx-auto">
      <div className="w-1/2 items-stretch flex flex-col justify-between overflow-y-auto">
        <InfiniteScroll
          dataLength={Object.keys(dataList).length} //This is important field to render the next data
          next={fetchData}
          height={384}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {Object.entries(dataList).map(([id, tweet]) => (
            <Tweet tweet={tweet} key={id} />
          ))}
        </InfiniteScroll>
      </div>
      <div className="w-1/2">
        <WordCloud />
      </div>
    </div>
  );
};

export default Tweets;
