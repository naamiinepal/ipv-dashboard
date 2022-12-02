import { Card } from "@mui/material";
import type { ChartData, ChartOptions } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CancelError, PseudoTweetsService } from "../client";
import { phraseColumns, sentenceColumns } from "../constants";
import FilterContext from "../FilterContext";
import { Aspects, toTitleCase } from "../utility";

const optionsBar: ChartOptions<"bar"> = {
  responsive: true,
  indexAxis: "y",
  maintainAspectRatio: false,
  // barThickness: 6,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Bar Graph",
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
};

interface BarChartStateInterface {
  data: ChartData<"bar">;
  loaded: boolean;
}

const BarChart = () => {
  const [state, setState] = useState<BarChartStateInterface>({
    data: {
      labels: [],
      datasets: [],
    },
    loaded: false,
  });

  const { startDate, endDate } = useContext(FilterContext);

  useEffect(() => {
    const request = PseudoTweetsService.pseudoTweetsGetCount(
      true,
      startDate,
      endDate,
      true
    );
    request
      .then((response_data) => {
        const { aspects, ...restResponse } = response_data;
        const phraseCount = Object.fromEntries(
          Aspects.map((asp, index) => [`Phrase: ${asp}`, aspects![index] || 0])
        );

        const normalizedData = {
          ...phraseCount,
          ...restResponse,
        };

        const data = {
          labels: Object.keys(normalizedData).map(toTitleCase),
          datasets: [
            {
              label: "Number of abusive texts in given range",
              data: Object.values(normalizedData),
              backgroundColor: [
                ...phraseColumns.map(({ areaColor }) => areaColor),
                ...sentenceColumns.map(({ areaColor }) => areaColor),
              ],
            },
          ],
        };
        setState({ data, loaded: true });
      })
      .catch((err) => {
        if (err instanceof CancelError) {
          console.log("BarChart umounted");
        }
      });
    return () => {
      request?.cancel();
    };
  }, [startDate, endDate]);

  return (
    <>
      {state.loaded && (
        <Card className="w-1/3 ml-3">
          <Bar options={optionsBar} data={state.data} />
        </Card>
      )}
    </>
  );
};

export default BarChart;
