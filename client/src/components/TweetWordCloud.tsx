import TweetContainer from "./TweetContainer";
import WordCloud from "./WordCloud";

const TweetWordCloud: React.FunctionComponent = () => (
  <div className="flex mt-2">
    <TweetContainer className="shrink" />
    <div className="w-1/2 flex-auto">
      <WordCloud />
    </div>
  </div>
);

export default TweetWordCloud;
