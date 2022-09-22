import { Card } from "@mui/material";
import type { ChartData, ChartOptions } from "chart.js";
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
import { PseudoTweetsService } from "../client";
import { predictionColumns } from "../constants";
import BarChart from "./BarChart";
import { useFilter } from "../contexts/FilterProvider";
import { toTitleCase } from "../utility";

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

const options: ChartOptions<"line"> = {
  responsive: true,
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

const optionsPie: ChartOptions<"pie"> = {
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

const LineChart = () => {
  const [data, setData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [loaded, setLoaded] = useState(false);
  const { startDate, endDate } = useFilter();

  useEffect(() => {
    PseudoTweetsService.pseudoTweetsGetPseudoOverview(
      true,
      startDate,
      endDate
    ).then((data) => {
      const dataArrays = {
        is_abuse: data.map(({ is_abuse }) => is_abuse),
        sexual_score: data.map(({ sexual_score }) => sexual_score ?? null),
      };

      const finalData = {
        labels: data.map(({ created_date }) => created_date),
        datasets: predictionColumns.map(({ field, areaColor }) => ({
          data: dataArrays[field as keyof typeof dataArrays],
          label: toTitleCase(field),
          fill: true,
          borderColor: areaColor,
          backgroundColor: areaColor,
        })),
      };

      console.log(finalData);

      setData(finalData);
      setLoaded(true);
    });
  }, [startDate, endDate]);

  return (
    <div className="flex w-11/12 my-3 mx-16">
      {loaded && (
        <Card className="flex-1">
          {/* <Button onClick={resetZoom}>Zoom Out</Button> */}
          <Line options={options} data={data} />
        </Card>
      )}
      <BarChart />
    </div>
  );
};

export { options, optionsPie };
export default LineChart;
