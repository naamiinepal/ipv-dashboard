import { Card } from "@mui/material";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Charts: React.FunctionComponent = () => (
  <div className="flex mt-2">
    <Card className="flex-1">
      <LineChart />
    </Card>
    <Card className="w-1/3 ml-3">
      <BarChart />
    </Card>
  </div>
);

export { LineChart, BarChart };
export default Charts;
