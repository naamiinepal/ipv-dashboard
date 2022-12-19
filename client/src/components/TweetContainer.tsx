import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CancelError, TweetRead, TweetsService } from "../client";
import FilterContext from "../FilterContext";
import {
  allSources,
  allTopics,
  CombinedSelection,
  useCombinedSelection,
} from "./Selections";
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
  const combinedProps = useCombinedSelection();
  const { topics, sources } = combinedProps;

  useEffect(() => {
    setDataList({});
  }, [startDate, endDate, topics, sources]);

  useEffect(() => {
    let isAbuse: boolean | undefined;
    let aspects: typeof topics;

    if (topics.length === allTopics.length + 1 || topics.length === 0) {
      isAbuse = undefined;
      aspects = [];
    } else {
      const abuseIndex = topics.indexOf(-1);
      if (abuseIndex < 0) {
        isAbuse = undefined;
        aspects = topics.length === allTopics.length ? [] : topics;
      } else {
        isAbuse = true;
        aspects = [
          ...topics.slice(0, abuseIndex),
          ...topics.slice(abuseIndex + 1, topics.length),
        ];
      }
    }

    const currSources = sources.length === allSources.length ? [] : sources;

    const request = TweetsService.tweetsReadTweets(
      isAbuse,
      currSources,
      aspects,
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
  }, [offset, startDate, endDate, topics, sources]);

  return (
    <div {...props}>
      <div className="mb-2 p-2 flex justify-between bg-primary">
        <CombinedSelection {...combinedProps} />
      </div>
      {Object.keys(dataList).length ? (
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
      ) : (
        <p>
          <b> No texts found</b>
        </p>
      )}
    </div>
  );
};

export default TweetContainer;
