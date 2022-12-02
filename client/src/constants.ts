import { Aspects } from "./utility";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generated from `sns.color_palette("husl", 9)`
const colorPalette = [
  "#f77189",
  "#dc8932",
  "#ae9d31",
  "#77ab31",
  "#33b07a",
  "#36ada4",
  "#38a9c5",
  "#6e9bf4",
  "#cc7af4",
  "#f565cc",
];

const phraseColumns = Aspects.map((asp, index) => ({
  field: `Phrase: ${asp}`,
  areaColor: colorPalette[index],
}));

const sentenceColumns = [
  {
    field: "is_abuse",
    areaColor: "#e5c185",
  },
  {
    field: "sexual_score",
    areaColor: "#74a892",
  },
];

const combinedColumns = [...phraseColumns, ...sentenceColumns];

export { months, sentenceColumns, combinedColumns, phraseColumns };
