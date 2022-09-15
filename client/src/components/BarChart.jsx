import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useFilter } from "./FilterProvider";
import { toTitleCase } from "./utility";

const optionsBar = {
  responsive: true,
  indexAxis: "y",
  maintainAspectRatio: false,
  // barThickness: 6,
  plugins: {
    legend: {
      // position: 'top',
      // display: true,
    },
    title: {
      display: true,
      text: "Bar Graph",
    },
  },
};

const BarChart = () => {
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { startDate, endDate } = useFilter();

  useEffect(() => {
    const params = new URLSearchParams([
      ["all", true],
      ["start_date", startDate],
      ["end_date", endDate],
    ]);

    axios.get(`/pseudo_tweets/count`, { params }).then(({ data }) => {
      setData({
        labels: Object.keys(data).map(toTitleCase),
        datasets: [
          {
            label: "Number of abusive texts in given range",
            data: Object.values(data),
            backgroundColor: "#247881",
          },
        ],
      });
      setLoaded(true);
    });
  }, [startDate, endDate]);

  return (
    <>
      {loaded && (
        <Card className="w-1/3 ml-3">
          <Bar options={optionsBar} data={data} />
        </Card>
      )}
    </>
  );
};

export default BarChart;
