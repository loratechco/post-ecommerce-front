"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  companys: {
    label: "Companys",
    color: "hsl(var(--chart-1))",
  },
  teams: {
    label: "Teams",
    color: "hsl(var(--chart-2))",
  },
  person: {
    label: "Person",
    color: "hsl(var(--chart-3))",
  },
  organizations: {
    label: "Organizations",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const chartData = [
  { users: "companys", visitors: 275, fill: chartConfig.companys.color },
  { users: "teams", visitors: 200, fill: chartConfig.teams.color },
  { users: "person", visitors: 187, fill: chartConfig.person.color },
  {
    users: "organizations",
    visitors: 173,
    fill: chartConfig.organizations.color,
  },
  { users: "other", visitors: 90, fill: chartConfig.other.color },
];

export default function CircleChart() {
  return (
    <Card className="flex flex-col h-[450px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Classification by Postal Service Usage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[310px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="users"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Most customers are from companies 275 users
        </div>
        <div className="leading-none text-muted-foreground">
          The least number of customers are others 90 users
        </div>
      </CardFooter>
    </Card>
  );
}
