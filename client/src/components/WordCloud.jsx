import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import Title from "./Title";

const options = {
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

const WordCloud = () => {
  const [words, setWords] = useState([]);
  // const [counts, setCounts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams([["month", "2021-09"]]);

    axios.get("/tweets_commons/", { params }).then(({ data }) => {
      // console.log(data);
      const wordCount = data.map((datum) => ({
        text: datum[0],
        value: datum[1],
      }));
      console.log(wordCount);
      setWords(wordCount);
      setLoaded(true);
    });
  }, []);

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
