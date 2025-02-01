"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
  { date: "2024-04-01", aircraft: 222, truck: 150 },
  { date: "2024-04-02", aircraft: 97, truck: 180 },
  { date: "2024-04-03", aircraft: 167, truck: 120 },
  { date: "2024-04-04", aircraft: 242, truck: 260 },
  { date: "2024-04-05", aircraft: 373, truck: 290 },
  { date: "2024-04-06", aircraft: 301, truck: 340 },
  { date: "2024-04-07", aircraft: 245, truck: 180 },
  { date: "2024-04-08", aircraft: 409, truck: 320 },
  { date: "2024-04-09", aircraft: 59, truck: 110 },
  { date: "2024-04-10", aircraft: 261, truck: 190 },
  { date: "2024-04-11", aircraft: 327, truck: 350 },
  { date: "2024-04-12", aircraft: 292, truck: 210 },
  { date: "2024-04-13", aircraft: 342, truck: 380 },
  { date: "2024-04-14", aircraft: 137, truck: 220 },
  { date: "2024-04-15", aircraft: 120, truck: 170 },
  { date: "2024-04-16", aircraft: 138, truck: 190 },
  { date: "2024-04-17", aircraft: 446, truck: 360 },
  { date: "2024-04-18", aircraft: 364, truck: 410 },
  { date: "2024-04-19", aircraft: 243, truck: 180 },
  { date: "2024-04-20", aircraft: 89, truck: 150 },
  { date: "2024-04-21", aircraft: 137, truck: 200 },
  { date: "2024-04-22", aircraft: 224, truck: 170 },
  { date: "2024-04-23", aircraft: 138, truck: 230 },
  { date: "2024-04-24", aircraft: 387, truck: 290 },
  { date: "2024-04-25", aircraft: 215, truck: 250 },
  { date: "2024-04-26", aircraft: 75, truck: 130 },
  { date: "2024-04-27", aircraft: 383, truck: 420 },
  { date: "2024-04-28", aircraft: 122, truck: 180 },
  { date: "2024-04-29", aircraft: 315, truck: 240 },
  { date: "2024-04-30", aircraft: 454, truck: 380 },
  { date: "2024-05-01", aircraft: 165, truck: 220 },
  { date: "2024-05-02", aircraft: 293, truck: 310 },
  { date: "2024-05-03", aircraft: 247, truck: 190 },
  { date: "2024-05-04", aircraft: 385, truck: 420 },
  { date: "2024-05-05", aircraft: 481, truck: 390 },
  { date: "2024-05-06", aircraft: 498, truck: 520 },
  { date: "2024-05-07", aircraft: 388, truck: 300 },
  { date: "2024-05-08", aircraft: 149, truck: 210 },
  { date: "2024-05-09", aircraft: 227, truck: 180 },
  { date: "2024-05-10", aircraft: 293, truck: 330 },
  { date: "2024-05-11", aircraft: 335, truck: 270 },
  { date: "2024-05-12", aircraft: 197, truck: 240 },
  { date: "2024-05-13", aircraft: 197, truck: 160 },
  { date: "2024-05-14", aircraft: 448, truck: 490 },
  { date: "2024-05-15", aircraft: 473, truck: 380 },
  { date: "2024-05-16", aircraft: 338, truck: 400 },
  { date: "2024-05-17", aircraft: 499, truck: 420 },
  { date: "2024-05-18", aircraft: 315, truck: 350 },
  { date: "2024-05-19", aircraft: 235, truck: 180 },
  { date: "2024-05-20", aircraft: 177, truck: 230 },
  { date: "2024-05-21", aircraft: 82, truck: 140 },
  { date: "2024-05-22", aircraft: 81, truck: 120 },
  { date: "2024-05-23", aircraft: 252, truck: 290 },
  { date: "2024-05-24", aircraft: 294, truck: 220 },
  { date: "2024-05-25", aircraft: 201, truck: 250 },
  { date: "2024-05-26", aircraft: 213, truck: 170 },
  { date: "2024-05-27", aircraft: 420, truck: 460 },
  { date: "2024-05-28", aircraft: 233, truck: 190 },
  { date: "2024-05-29", aircraft: 78, truck: 130 },
  { date: "2024-05-30", aircraft: 340, truck: 280 },
  { date: "2024-05-31", aircraft: 178, truck: 230 },
  { date: "2024-06-01", aircraft: 178, truck: 200 },
  { date: "2024-06-02", aircraft: 470, truck: 410 },
  { date: "2024-06-03", aircraft: 103, truck: 160 },
  { date: "2024-06-04", aircraft: 439, truck: 380 },
  { date: "2024-06-05", aircraft: 88, truck: 140 },
  { date: "2024-06-06", aircraft: 294, truck: 250 },
  { date: "2024-06-07", aircraft: 323, truck: 370 },
  { date: "2024-06-08", aircraft: 385, truck: 320 },
  { date: "2024-06-09", aircraft: 438, truck: 480 },
  { date: "2024-06-10", aircraft: 155, truck: 200 },
  { date: "2024-06-11", aircraft: 92, truck: 150 },
  { date: "2024-06-12", aircraft: 492, truck: 420 },
  { date: "2024-06-13", aircraft: 81, truck: 130 },
  { date: "2024-06-14", aircraft: 426, truck: 380 },
  { date: "2024-06-15", aircraft: 307, truck: 350 },
  { date: "2024-06-16", aircraft: 371, truck: 310 },
  { date: "2024-06-17", aircraft: 475, truck: 520 },
  { date: "2024-06-18", aircraft: 107, truck: 170 },
  { date: "2024-06-19", aircraft: 341, truck: 290 },
  { date: "2024-06-20", aircraft: 408, truck: 450 },
  { date: "2024-06-21", aircraft: 169, truck: 210 },
  { date: "2024-06-22", aircraft: 317, truck: 270 },
  { date: "2024-06-23", aircraft: 480, truck: 530 },
  { date: "2024-06-24", aircraft: 132, truck: 180 },
  { date: "2024-06-25", aircraft: 141, truck: 190 },
  { date: "2024-06-26", aircraft: 434, truck: 380 },
  { date: "2024-06-27", aircraft: 448, truck: 490 },
  { date: "2024-06-28", aircraft: 149, truck: 200 },
  { date: "2024-06-29", aircraft: 103, truck: 160 },
  { date: "2024-06-30", aircraft: 446, truck: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function ChartDashboard() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transfers chart</CardTitle>
          <CardDescription>
          Transfer of postal goods with truck and aircraft
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
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
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="line"
                />
              }
            />
            <Area
              dataKey="truck"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="aircraft"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
