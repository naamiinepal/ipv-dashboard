import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFilter } from "./FilterProvider";
import Tweet from "./Tweet";
import WordCloud from "./WordCloud";

const Tweets = () => {
  const [dataList, setDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const { startDate, endDate } = useFilter();

  useEffect(() => {
    setDataList([]);
  }, [startDate, endDate]);

  useEffect(() => {
    const params = new URLSearchParams([
      ["offset", offset],
      ["limit", 10],
      ["start_date", startDate],
      ["end_date", endDate],
    ]);

    axios
      .get(`/tweets/`, {
        params,
      })
      .then(({ data }) => {
        setDataList((dl) => [...dl, ...data]);
      });
  }, [offset, startDate, endDate]);

  const fetchData = () => {
    setOffset(offset + 10);
  };

  // const toggleReload = () => {
  //   setReload(!reload);
  // };

  return (
    <div className="flex w-11/12 mx-auto">
      <div className="w-1/2 items-stretch flex flex-col justify-between overflow-y-auto">
        {/* <div className="mb-2 p-2 flex items-center bg-primary ">
          <div className="font-bold text-center text-2xl text-primary">
          Filter
        </div>
          <div className="text-white mr-3 text-base font-semibold">
            Filter by Topic:
          </div>
          <Selection
            offset={offset}
            setOffset={setOffset}
            topic={topics}
            toggleReload={toggleReload}
            endUser={true}
            setTopic={setTopics}
          />

          <div className="text-base">{description}</div>
        </div> */}
        <InfiniteScroll
          dataLength={dataList.length} //This is important field to render the next data
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
          {dataList.map((datum) => (
            <Tweet tweet={datum} key={datum.id} />
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
