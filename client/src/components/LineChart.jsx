import { Card } from "@mui/material";
import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { columns } from "../constants";
import BarChart from "./BarChart";
import { useFilter } from "./FilterProvider";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  zoomPlugin,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  cubicInterpolationMode: "monotone",
  plugins: {
    legend: {
      position: "top",
    },
    // tooltip: { cornerRadius: 0 },
    title: {
      display: true,
      text: "Line Chart",
    },

    zoom: {
      zoom: {
        wheel: {
          enabled: false,
        },
        drag: {
          enabled: false,
        },
        mode: "x",
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Day",
      },
    },
    y: {
      // stacked: true,
      title: {
        display: true,
        text: "Tweet Count per day",
      },
    },
  },
};

const optionsPie = {
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

const fetchLabels = async () =>
  axios
    .get(`/pseudo_tweets/overview?all=true`)
    .then(({ data }) => {
      const finalData = {};

      const is_abuse = data.map((datum) => datum.is_abuse);
      const sexual_score = data.map((datum) => datum.sexual_score);

      const dataArrays = {
        is_abuse,
        sexual_score,
      };
      finalData["labels"] = data.map((datum) => datum.created_date);

      finalData["datasets"] = columns
        .filter(({ field }) => Object.keys(dataArrays).includes(field))
        .map(({ field, label, areaColor }) => ({
          data: dataArrays[field],
          label: label,
          fill: true,
          borderColor: areaColor,
          backgroundColor: areaColor,
        }));

      console.log(finalData);
      return finalData;
    })
    .catch((error) => {
      console.log(error);
    });

const LineChart = () => {
  const [labels, setLabels] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { startDate, endDate } = useFilter();

  useEffect(() => {
    fetchLabels(startDate, endDate).then((label) => {
      setLabels(label);
      setLoaded(true);
    });
  }, [startDate, endDate]);

  return (
    <div className="flex w-11/12 my-3 mx-16">
      {loaded && (
        <Card className="flex-1">
          {/* <Button onClick={resetZoom}>Zoom Out</Button> */}
          <Line options={options} data={labels} />
        </Card>
      )}
      <BarChart />
    </div>
  );
};

export { options, optionsPie };
export default LineChart;
