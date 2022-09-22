import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import type { OptionsProp } from "react-wordcloud";
import ReactWordcloud from "react-wordcloud";
import { TweetsCommonsService } from "../client";
import { useFilter } from "../contexts/FilterProvider";
import Title from "./Title";

const options: OptionsProp = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 3,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};

type Response = [string, number][];

interface Word {
  text: string;
  value: number;
}

const WordCloud = () => {
  const [words, setWords] = useState<Word[]>([]);
  // const [counts, setCounts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { startDate, endDate } = useFilter();

  useEffect(() => {
    TweetsCommonsService.tweetsCommonsGetWordCloud(startDate, endDate).then(
      (data) => {
        const wordCount = (data as Response).map(([text, value]) => ({
          text,
          value,
        }));
        console.log(wordCount);
        setWords(wordCount);
        setLoaded(true);
      }
    );
  }, [startDate, endDate]);

  return (
    <div>
      {loaded && (
        <Card className="h-96 ml-2">
          <Title text="Trending Words"></Title>
          <ReactWordcloud options={options} words={words} />
        </Card>
      )}
    </div>
  );
};

export default WordCloud;
