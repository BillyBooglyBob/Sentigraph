"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface ChartProps {
  data: any[]; // Array of data
  labels: string[]; // Labels for each line (e.g., "Customer Service", "Product Quality")
  colors: string[]; // Colors to use for the lines
  title: string; // Title of the chart
  description: string; // Description of the chart
}

const Chart = ({ data, labels, colors, title, description }: ChartProps) => {
  // Dynamically generate the chartConfig based on labels and colors
  const chartConfig = Object.fromEntries(
    labels.map((label, index) => [
      label.toLowerCase().replace(/\s+/g, ""),
      {
        label,
        color: colors[index],
      },
    ])
  ) satisfies ChartConfig;

  const [timeRange, setTimeRange] = useState("90d");
  const latestDate = new Date(data[data.length - 1].date);

  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = latestDate;
    let daysToSubtract = 90;

    if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "90d") {
      daysToSubtract = 90;
    } else if (timeRange === "1y") {
      daysToSubtract = 365;
    } else if (timeRange === "3y") {
      daysToSubtract = 3 * 365;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="3y" className="rounded-lg">
              Last 3 years
            </SelectItem>
            <SelectItem value="1y" className="rounded-lg">
              Last 1 year
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              right: 20,
            }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {labels.map((label, index) => (
              <Line
                // Convert to camelCase to match the dataset keys
                dataKey={label.replace(/\s+/g, "")}
                type="monotone"
                strokeWidth={2}
                stroke={colors[index]}
                dot={true}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
