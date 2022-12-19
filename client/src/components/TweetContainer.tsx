import { useContext, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CancelError, TweetRead, TweetsService } from "../client";
import FilterContext from "../FilterContext";
import { SourceSelection, TopicSelection } from "./Selections";
import Tweet from "./Tweet";

interface TweetObj {
  [id: number]: TweetRead;
}

const TweetContainer: React.FunctionComponent<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  const [dataList, setDataList] = useState<TweetObj>({});
  const [offset, setOffset] = useState(0);
  const { startDate, endDate } = useContext(FilterContext);

  const sourceRef = useRef(null);
  const topicsRef = useRef(null);

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
    <div {...props}>
      <div className="mb-2 p-2 flex justify-between bg-primary">
        <TopicSelection ref={topicsRef} />
        <SourceSelection ref={sourceRef} />
      </div>
      <div className="overflow-y-auto">
        <InfiniteScroll
          dataLength={Object.keys(dataList).length} //This is important field to render the next data
          next={() => setOffset(offset + 10)}
          height="65vh"
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
  );
};

export default TweetContainer;