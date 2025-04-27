"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sentiment } from "@/types/sentiment";

interface ChartProps {
  data: Sentiment[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment for Amazon</CardTitle>
        <CardDescription>Customer service: Jan 2023 - Jan 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-[100%] h-[300px]">
          <ResponsiveContainer>
            <LineChart
              data={data}
              width={1100}
              height={300}
              margin={{ left: 0, right: 30 }}
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" stroke="#8884d8" dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
