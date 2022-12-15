import TweetContainer from "./TweetContainer";
import WordCloud from "./WordCloud";

const TweetWordCloud: React.FunctionComponent = () => (
  <div className="flex mt-2">
    <TweetContainer />
    <div className="w-1/2">
      <WordCloud />
    </div>
  </div>
);

export default TweetWordCloud;
