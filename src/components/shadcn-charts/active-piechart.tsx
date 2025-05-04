"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
const chartData = [
    { month: "April", arma8x8: 80.5, ratelmk3: 77.8, cobra1: 68.4, cobra2: 76.5, rg31nyala: 88.7 },
]

const chartConfig = {
  arma8x8: {
    label: "Arma 8x8",
    color: "hsl(var(--chart-1))",
  },
  ratelmk3: {
    label: "Ratel MK3",
    color: "hsl(var(--chart-2))",
  },
  cobra1: {
    label: "Cobra 1",
    color: "hsl(var(--chart-3))",
  },
  cobra2: {
    label: "Cobra 2",
    color: "hsl(var(--chart-4))",
  },
  rg31nyala: {
    label: "RG 31 Nyala",
    color: "hsl(var(--chart-5))",
  }
} satisfies ChartConfig

export default function Component() {
  const totalVisitors = (chartData[0].arma8x8 + chartData[0].ratelmk3 + chartData[0].cobra1 + chartData[0].cobra2) / 4

  return (
    <Card className="relative flex flex-col justify-between border-none py-0.5 px-0 overflow-hidden max-h-full">
      <CardHeader className="items-center pb-0 pl-2 gap-0">
        <CardTitle className="text-base">Platform Health Score</CardTitle>
        <CardDescription className="text-sm">
          Showing the overall platform health score
          </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[180px] aspect-square w-full max-w-[200px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={360}
            innerRadius={80}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="border-zinc-700 rounded bg-zinc-900 w-36" hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-zinc-500 text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-zinc-500"
                        >
                          Overall Health
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="arma8x8"
              stackId="a"
              cornerRadius={4}
              fill="#312e81"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="ratelmk3"
              fill="#4338ca"
              stackId="a"
              cornerRadius={4}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="cobra1"
              fill="#4f46e5"
              stackId="a"
              cornerRadius={4}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="cobra2"
              fill="#6366f1"
              stackId="a"
              cornerRadius={4}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="rg31nyala"
              fill="#7c86ff"
              stackId="a"
              cornerRadius={4}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-0.5 text-sm">
        <div className="flex items-center gap-2 text-xs font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-xs leading-none text-muted-foreground">
          Nov 2024 - Apr 2025
        </div>
      </CardFooter>
    </Card>
  )
}
