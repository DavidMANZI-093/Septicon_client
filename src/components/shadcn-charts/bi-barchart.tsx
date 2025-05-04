"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  { month: "November", desktop: 186, mobile: 80 },
  { month: "December", desktop: 305, mobile: 200 },
  { month: "January", desktop: 237, mobile: 120 },
  { month: "February", desktop: 73, mobile: 190 },
  { month: "March", desktop: 209, mobile: 130 },
  { month: "April", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Supplies",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Replenishments",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card className="relative flex flex-col justify-between border-none py-0.5 px-0 overflow-hidden max-h-full">
      <CardHeader className="gap-0 pl-2">
        <CardTitle className="text-base">Stock Flow Curve - Replenisment and Supply</CardTitle>
        <CardDescription className="text-sm">
        Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="mx-auto max-h-[180px]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid stroke="#52525b" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="border-zinc-700 w-36 rounded bg-zinc-900" indicator="line" />}
            />
            <Bar dataKey="desktop" fill="#312e81" radius={4} />
            <Bar dataKey="mobile" fill="#4338ca" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col justify-center gap-0.5 text-sm">
        <div className="flex justify-center gap-2 font-medium text-xs leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="justify-center text-xs leading-none text-muted-foreground">
          Nov 2024 - Apr 2025
        </div>
      </CardFooter>
    </Card>
  )
}
