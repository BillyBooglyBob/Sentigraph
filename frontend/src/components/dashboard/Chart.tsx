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

interface ChartProps {
  data: any[]; // Array of data
  labels: string[]; // Labels for each line (e.g., "Customer Service", "Product Quality")
  colors: string[]; // Colors to use for the lines
  title: string; // Title of the chart
  description: string; // Description of the chart
}

const Chart = ({ data, labels, colors, title, description }: ChartProps) => {
  // Dynamically generate the chartConfig based on labels and colors
  console.log("Chart data:", data);
  console.log("Chart labels:", labels);

  const chartConfig = Object.fromEntries(
    labels.map((label, index) => [
      label.toLowerCase().replace(/\s+/g, ""),
      {
        label,
        color: colors[index],
      },
    ])
  ) satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
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
