"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "November", gasoline: 186, diesel: 80 },
  { month: "December", gasoline: 305, diesel: 200 },
  { month: "January", gasoline: 237, diesel: 120 },
  { month: "February", gasoline: 73, diesel: 190 },
  { month: "March", gasoline: 209, diesel: 130 },
  { month: "April", gasoline: 214, diesel: 140 },
]

const chartConfig = {
  gasoline: {
    label: "Gasoline",
    color: "hsl(var(--chart-1))",
  },
  diesel: {
    label: "Diesel",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card className="relative flex flex-col justify-between border-none py-0.5 px-0 overflow-hidden h-full max-h-full">
      <CardHeader className="gap-0 pt-0 pl-2">
        <CardTitle className="text-base">Fuel Usage Curve - Gasoline & Diesel</CardTitle>
        <CardDescription className="text-sm">
          Showing fuel usage for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid stroke="#52525b" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="border-zinc-700 rounded bg-zinc-900" indicator="line" />}
            />
            <Area
              dataKey="diesel"
              type="natural"
              fill="#312e81"
              // fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="#312e81"
              // stroke="var(--color-mobile)"       
              stackId="a"
            />
            <Area
              dataKey="gasoline"
              type="natural"
              fill="#4338ca"
              // fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="#4338ca"
              // stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center gap-2 text-sm">
          <div className="grid gap-0.5">
            <div className="flex justify-center gap-2 text-xs font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex justify-center gap-2 text-xs leading-none text-muted-foreground">
              Nov 2024 - Apr 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
