"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface LineChartCardProps {
    title: string
    description: string
    data: Array<{
        month: string
        desktop: number
        mobile: number
    }>
    config: ChartConfig
    trendingPercentage?: number
    footerText?: string
}

export function LineChartCard({
    title,
    description,
    data,
    config,
    trendingPercentage = 5.2,
    // footerText = "Showing total visitors for the last 6 months"
}: LineChartCardProps) {
    return (
        <Card className="max-w-lg">
            {/* <CardHeader className="px-5 py-7">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader> */}
            <CardContent className=" py-5">
                <ChartContainer config={config}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by {trendingPercentage}% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    {footerText}
                </div>
            </CardFooter> */}
        </Card>
    )
} 