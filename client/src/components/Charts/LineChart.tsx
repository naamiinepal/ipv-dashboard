import type { ChartData, ChartOptions } from "chart.js";
import {
  CategoryScale,
  Chart as ChartJS,
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
import { CancelError, PseudoTweetsService } from "../../client";
import { Aspects, combinedColumns } from "../../constants";
import FilterContext from "../../FilterContext";
import { toTitleCase } from "../../utility";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const optionsChart: ChartOptions<"line"> = {
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
          enabled: true,
        },
        drag: {
          enabled: true,
        },
        pinch: {
          enabled: true,
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
        text: "Tweet Count and Average Sexual Score per day ",
      },
    },
  },
};

interface LineChartStateInterface {
  data: ChartData<"line">;
  loaded: boolean;
}

const LineChart: React.FunctionComponent = () => {
  const [state, setState] = useState<LineChartStateInterface>({
    data: {
      labels: [],
      datasets: [],
    },
    loaded: false,
  });
  const { startDate, endDate } = useContext(FilterContext);

  useEffect(() => {
    const request = PseudoTweetsService.pseudoTweetsGetPseudoOverview(
      true,
      startDate,
      endDate
    );
    request
      .then((response_data) => {
        const phraseAnnotation: {
          [key: string]: number[];
        } = {};
        response_data.forEach(({ aspects_anno }) => {
          Aspects.forEach((asp, index) => {
            const key = `Phrase: ${asp}`;
            const anno = phraseAnnotation[key] || [];
            anno.push(aspects_anno[index] || 0);
            phraseAnnotation[key] = anno;
          });
        });

        const dataArrays: {
          [key: string]: (number | null)[];
        } = {
          is_abuse: response_data.map(({ is_abuse }) => is_abuse),
          sexual_score: response_data.map(
            ({ sexual_score }) => sexual_score ?? null
          ),
          ...phraseAnnotation,
        };

        const data: ChartData<"line"> = {
          labels: response_data.map(({ created_date }) => created_date),
          datasets: combinedColumns.map(({ field, areaColor }) => ({
            data: dataArrays[field],
            label: toTitleCase(field),
            borderColor: areaColor,
            backgroundColor: areaColor,
            cubicInterpolationMode: "monotone",
            tension: 0.4,
          })),
        };
        setState({ data, loaded: true });
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

  return state.loaded ? (
    <Line options={optionsChart} data={state.data} />
  ) : null;
};

export default LineChart;

export { optionsChart };
