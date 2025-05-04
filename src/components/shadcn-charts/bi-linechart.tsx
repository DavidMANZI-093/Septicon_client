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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "November", ammunition: 186, spareparts: 80 },
  { month: "December", ammunition: 305, spareparts: 200 },
  { month: "January", ammunition: 237, spareparts: 120 },
  { month: "February", ammunition: 73, spareparts: 190 },
  { month: "March", ammunition: 209, spareparts: 130 },
  { month: "April", ammunition: 214, spareparts: 140 },
]

const chartConfig = {
  ammunition: {
    label: "Ammunition",
    color: "hsl(var(--chart-1))",
  },
  spareparts: {
    label: "Spare parts",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card className="relative flex flex-col justify-between border-none py-0.5 px-0 overflow-hidden max-h-full gap-4">
      <CardHeader className="gap-0 pl-2">
        <CardTitle className="text-base">Deployment Curve - Ammo & Spare parts</CardTitle>
        <CardDescription className="text-sm">Comparison between ammo and spare parts usages</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="mx-auto max-h-[180px]" config={chartConfig}>
          <LineChart
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
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="border-zinc-700 rounded bg-zinc-900" />} />
            <Line
              dataKey="spareparts"
              type="monotone"
              stroke="#312e81"
              // stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="ammunition"
              type="monotone"
              stroke="#4338ca"
              // stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center gap-2 text-sm">
          <div className="grid gap-0.5">
            <div className="flex items-center justify-center gap-2 text-xs font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs leading-none text-muted-foreground">
              Nov 2024 - Jun 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
