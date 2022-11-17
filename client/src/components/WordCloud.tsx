import { Card } from "@mui/material";
import { useContext, useEffect, useState, memo } from "react";
import type { OptionsProp } from "react-wordcloud";
import ReactWordcloud from "react-wordcloud";
import { CancelError, TweetsCommonsService } from "../client";
import { FilterContext } from "../contexts/FilterProvider";
import Title from "./Title";

const options: OptionsProp = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: true,
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

  const { startDate, endDate } = useContext(FilterContext);

  useEffect(() => {
    const request = TweetsCommonsService.tweetsCommonsGetWordCloud(
      startDate,
      endDate
    );
    request
      .then((data) => {
        const wordCount = (data as Response).map(([text, value]) => ({
          text,
          value,
        }));
        setWords(wordCount);
        setLoaded(true);
      })
      .catch((err) => {
        if (err instanceof CancelError) {
          console.log("WordCloud umounted");
        }
      });
    return () => {
      request?.cancel();
    };
  }, [startDate, endDate]);

  return (
    <div>
      {loaded && (
        <Card className="h-96 ml-2">
          <Title element={<h2>Trending Words</h2>} />
          <ReactWordcloud options={options} words={words} />
        </Card>
      )}
    </div>
  );
};

export default memo(WordCloud);
