"use client"

import { TrendingUp } from "lucide-react"
import { PolarGrid, RadialBar, RadialBarChart } from "recharts"

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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Rifle Ammo",
    color: "#312e81",
  },
  safari: {
    label: "6mm Barrels",
    color: "#4338ca",
  },
  firefox: {
    label: "Pistol Ammo",
    color: "#4f46e5",
  },
  edge: {
    label: "Tank Shells",
    color: "#6366f1",
  },
  other: {
    label: "Artillery Sh",
    color: "#7c86ff",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card className="relative flex flex-col justify-between border-none py-0.5 px-0.5 overflow-hidden h-full max-h-full">
      <CardHeader className="pb-0 pl-2 gap-0">
        <CardTitle className="text-base">Critical Store Values</CardTitle>
        <CardDescription className="text-sm">
            Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 w-full h-full overflow-visible !p-0">
        <ChartContainer
          config={chartConfig}
          className="m-auto overflow-visible max-h-[180px]"
        >
          <RadialBarChart data={chartData} innerRadius={25} outerRadius={90}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="border-zinc-700 rounded bg-zinc-900" hideLabel nameKey="browser" />}
            />
            <PolarGrid stroke="#52525b" gridType="circle" />
            <RadialBar dataKey="visitors" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-0.5 text-sm">
        <div className="flex items-center gap-2 font-medium text-xs leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-xs leading-none text-muted-foreground">
          Nov 2024 - Apr 2025
        </div>
      </CardFooter>
    </Card>
  )
}
