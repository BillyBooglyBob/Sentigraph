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
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sentiment for Amazon</CardTitle>
          <CardDescription>Customer service</CardDescription>
        </CardHeader>
        <CardDescription>
          <div className="w-[100%] h-[300px]">
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={data}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" stroke="#8884d8" dataKey="value" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardDescription>
      </Card>
    </>
  );
};

export default Chart;
