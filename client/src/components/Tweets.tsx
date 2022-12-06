import type { FunctionComponent } from "react";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CancelError, TweetRead, TweetsService } from "../client";
import FilterContext from "../FilterContext";
import SourceSelection, { allSources } from "./SourceSelection";
import TopicSelection, { allTopics } from "./TopicSelection";
import Tweet from "./Tweet";
import WordCloud from "./WordCloud";

interface TweetObj {
  [id: number]: TweetRead;
}

const Tweets: FunctionComponent = () => {
  const [dataList, setDataList] = useState<TweetObj>({});
  const [offset, setOffset] = useState(0);
  const { startDate, endDate } = useContext(FilterContext);
  const [topics, setTopics] = useState(allTopics);
  const [sources, setSources] = useState(allSources);

  useEffect(() => {
    setDataList({});
  }, [startDate, endDate]);

  useEffect(() => {
    const request = TweetsService.tweetsReadTweets(
      offset,
      10,
      startDate,
      endDate
    );
    request
      .then((data) => {
        // Removes duplicates
        const tempDataList: TweetObj = {};
        for (const tweet of data) {
          tempDataList[tweet.id] = tweet;
        }
        setDataList((dl) => ({ ...dl, ...tempDataList }));
      })
      .catch((err) => {
        if (err instanceof CancelError) {
          console.log("Tweets umounted");
        }
      });
    return () => {
      request?.cancel();
    };
  }, [offset, startDate, endDate]);

  return (
    <div className="flex w-11/12 mx-auto">
      <div className="w-1/2 items-stretch flex flex-col justify-between ">
        <div className="mb-2 p-2 flex justify-between bg-primary">
          <TopicSelection topics={topics} setTopics={setTopics} isWhite />
          <SourceSelection sources={sources} setSources={setSources} isWhite />
        </div>
        <div className="overflow-y-auto">
          <InfiniteScroll
            dataLength={Object.keys(dataList).length} //This is important field to render the next data
            next={() => setOffset(offset + 10)}
            height={384}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {Object.entries(dataList)
              .sort(([id1], [id2]) => parseInt(id2) - parseInt(id1))
              .map(([id, tweet]) => (
                <Tweet tweet={tweet} key={id} />
              ))}
          </InfiniteScroll>
        </div>
      </div>
      <div className="w-1/2">
        <WordCloud />
      </div>
    </div>
  );
};

export default Tweets;
