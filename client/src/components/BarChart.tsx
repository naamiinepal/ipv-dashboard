import { Card } from "@mui/material";
import type { ChartData, ChartOptions } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CancelError, PseudoTweetsService } from "../client";
import { FilterContext } from "../contexts/FilterProvider";
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

const BarChart = () => {
  const [data, setData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [loaded, setLoaded] = useState(false);
  const { startDate, endDate } = useContext(FilterContext);

  useEffect(() => {
    const request = PseudoTweetsService.pseudoTweetsGetCount(
      true,
      startDate,
      endDate
    );
    request
      .then((response_data) => {
        setData({
          labels: Object.keys(response_data).map(toTitleCase),
          datasets: [
            {
              label: "Number of abusive texts in given range",
              data: Object.values(response_data),
              backgroundColor: "#247881",
            },
          ],
        });
        setLoaded(true);
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
      {loaded && (
        <Card className="w-1/3 ml-3">
          <Bar options={optionsBar} data={data} />
        </Card>
      )}
    </>
  );
};

export default BarChart;
