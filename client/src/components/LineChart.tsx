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
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CancelError, PseudoTweetsService } from "../client";
import { predictionColumns } from "../constants";
import { FilterContext } from "../contexts/FilterProvider";
import { toTitleCase } from "../utility";
import BarChart from "./BarChart";

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
  const { startDate, endDate } = useContext(FilterContext);

  useEffect(() => {
    const request = PseudoTweetsService.pseudoTweetsGetPseudoOverview(
      true,
      startDate,
      endDate
    );
    request
      .then((response_data) => {
        const dataArrays = {
          is_abuse: response_data.map(({ is_abuse }) => is_abuse),
          sexual_score: response_data.map(
            ({ sexual_score }) => sexual_score ?? null
          ),
        };

        const finalData = {
          labels: response_data.map(({ created_date }) => created_date),
          datasets: predictionColumns.map(({ field, areaColor }) => ({
            data: dataArrays[field as keyof typeof dataArrays],
            label: toTitleCase(field),
            fill: true,
            borderColor: areaColor,
            backgroundColor: areaColor,
          })),
        };

        setData(finalData);
        setLoaded(true);
      })
      .catch((err) => {
        if (err instanceof CancelError) {
          console.log("LineChart umounted");
        }
      });
    return () => {
      request?.cancel();
    };
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
