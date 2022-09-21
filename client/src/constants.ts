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

const predictionColumns = [
  {
    field: "is_abuse",
    areaColor: "#e5c185",
  },
  {
    field: "sexual_score",
    areaColor: "#74a892",
  },
];

const displayColumns = ["text", "action"];

export { predictionColumns, displayColumns, months };
