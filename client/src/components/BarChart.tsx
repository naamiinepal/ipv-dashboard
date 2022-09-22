import { Card } from "@mui/material";
import type { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { PseudoTweetsService } from "../client";
import { useFilter } from "../contexts/FilterProvider";
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
  const { startDate, endDate } = useFilter();

  useEffect(() => {
    PseudoTweetsService.pseudoTweetsGetCount(true, startDate, endDate).then(
      (data) => {
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
      }
    );
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
