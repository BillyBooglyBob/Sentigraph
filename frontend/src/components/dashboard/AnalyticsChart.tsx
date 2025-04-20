"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
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
import sentiments from "@/data/sentiments";

const AnalyticsChart = () => {
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
              <LineChart width={1100} height={300} data={sentiments}>
                <Line type="monotone" stroke="#8884d8" dataKey="value" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardDescription>
      </Card>
    </>
  );
};

export default AnalyticsChart;
