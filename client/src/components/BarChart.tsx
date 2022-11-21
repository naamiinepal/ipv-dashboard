import { Card } from "@mui/material";
import type { ChartData, ChartOptions } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CancelError, PseudoTweetsService } from "../client";
import FilterContext from "../FilterContext";
import { toTitleCase } from "../utility";

const optionsBar: ChartOptions<"bar"> = {
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
      endDate
    );
    request
      .then((response_data) => {
        const data = {
          labels: Object.keys(response_data).map(toTitleCase),
          datasets: [
            {
              label: "Number of abusive texts in given range",
              data: Object.values(response_data),
              backgroundColor: "#247881",
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
