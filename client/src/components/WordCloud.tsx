import { Card } from "@mui/material";
import { memo, useContext, useEffect, useState } from "react";
import type { OptionsProp } from "react-wordcloud";
import ReactWordcloud from "react-wordcloud";
import { CancelError, TweetsCommonsService } from "../client";
import FilterContext from "../FilterContext";
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

interface WordCloudStateInterface {
  words: {
    text: string;
    value: number;
  }[];
  loaded: boolean;
}

const WordCloud: React.FunctionComponent = () => {
  const [state, setState] = useState<WordCloudStateInterface>({
    words: [],
    loaded: false,
  });

  const { startDate, endDate } = useContext(FilterContext);

  useEffect(() => {
    const request = TweetsCommonsService.tweetsCommonsGetWordCloud(
      startDate,
      endDate
    );
    request
      .then((data) => {
        const words = (data as Response).map(([text, value]) => ({
          text,
          value,
        }));
        setState({ words, loaded: true });
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
    <Card className="ml-2" style={{ height: "75vh" }}>
      <Title>
        <h2 className="ml-3">Trending Words</h2>
      </Title>
      {state.loaded ? (
        <ReactWordcloud options={options} words={state.words} />
      ) : (
        <div className="flex justify-center items-center h-5/6 text-xl">
          Loading
        </div>
      )}
    </Card>
  );
};

export default WordCloud;
