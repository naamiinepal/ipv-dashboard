const baseAddress = "http://localhost:8000";

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

const columns = [
  {
    field: "text",
    label: "Text",
    headerName: "text",
  },
  {
    field: "is_abuse",
    label: "Is Abuse",
    borderColor: "#390ba4",
    areaColor: "#e5c185",
    backgroundColor: "#f77189",
    headerName: "Is Abuse",
    description:
      "Statistics about new cases, deaths, total cases, tests, casualties, etc.",
  },
  {
    field: "sexual_score",
    label: "Sexual Score",
    borderColor: "#8c0096",
    areaColor: "#74a892",
    backgroundColor: "#d58c32",
    headerName: "Sexual Score",
    description: "Serious information regarding vaccination.",
  },
  { field: "action", label: "Action", headerName: "Action" },
];
export { baseAddress, columns, months };
