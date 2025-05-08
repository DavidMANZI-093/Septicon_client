"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
  { station: "Gako", arma8x8: 186, cobra1n2: 160, rg31nyala: 131, mcave001: 164, ratelmk3: 181 },
  { station: "Akagera", arma8x8: 185, cobra1n2: 170, rg31nyala: 177, mcave001: 161, ratelmk3: 121 },
  { station: "Nyungwe", arma8x8: 207, cobra1n2: 180, rg31nyala: 194, mcave001: 182, ratelmk3: 161 },
  { station: "Bweyeye", arma8x8: 173, cobra1n2: 160, rg31nyala: 186, mcave001: 148, ratelmk3: 171 },
  { station: "Musanze", arma8x8: 160, cobra1n2: 67, rg31nyala: 138, mcave001: 165, ratelmk3: 191 },
  { station: "Ngororero", arma8x8: 174, cobra1n2: 204, rg31nyala: 171, mcave001: 187, ratelmk3: 161 },
]

const chartConfig = {
  arma8x8: {
    label: "Arma 8x8",
    color: "hsl(var(--chart-1))",
  },
  cobra1n2: {
    label: "Cobra 1 & 2",
    color: "hsl(var(--chart-2))",
  },
  rg31nyala: {
    label: "RG - 31 Nyala",
    color: "hsl(var(--chart-3))",
  },
  mcave001: {
    label: "MCAVE - 001",
    color: "hsl(var(--chart-4))",
  },
  ratelmk3: {
    label: "Ratel MK3",
    color: "hsl(var(--chart-5))",
  }
} satisfies ChartConfig

export default function Component() {
  return (
    <Card className="relative flex flex-col justify-between border-none py-0.5 px-0 overflow-hidden h-full max-h-full">
      <CardHeader className="gap-0 pl-2">
        <CardTitle className="text-base">Deployment Chart - Platforms</CardTitle>
        <CardDescription className="text-sm">
          Showing total deployments to 6 stations
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[180px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="border-zinc-700 rounded bg-zinc-900 w-36" indicator="line" />}
            />
            <PolarAngleAxis dataKey="station" />
            <PolarGrid stroke="#52525b" radialLines={false} />
            <Radar
              dataKey="arma8x8"
              // fill="var(--color-desktop)"
              fill="#312e81"
              fillOpacity={0.1}
              // stroke="var(--color-desktop)"
              stroke="#312e81"
              strokeWidth={2}
            />
            <Radar
              dataKey="cobra1n2"
              // fill="var(--color-mobile)"
              fill="#4f46e5"
              fillOpacity={0.1}
              // stroke="var(--color-mobile)"
              stroke="#4f46e5"
              strokeWidth={2}
            />
            <Radar
              dataKey="rg31nyala"
              // fill="var(--color-desktop)"
              fill="#6366f1"
              fillOpacity={0.1}
              // stroke="var(--color-desktop)"
              stroke="#6366f1"
              strokeWidth={2}
            />
            <Radar
              dataKey="mcave001"
              // fill="var(--color-mobile)"
              fill="#7c86ff"
              fillOpacity={0.1}
              // stroke="var(--color-mobile)"
              stroke="#7c86ff"
              strokeWidth={2}
            />
            <Radar
              dataKey="ratelmk3"
              // fill="var(--color-mobile)"
              fill="#4338ca"
              fillOpacity={0.1}
              // stroke="var(--color-mobile)"
              stroke="#4338ca"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-0.5 text-sm">
        <div className="flex items-center gap-2 font-medium text-xs leading-none">
          Trending up by 5.2% this station <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 text-xs leading-none text-muted-foreground">
          Nov 2024 - Apr 2025
        </div>
      </CardFooter>
    </Card>
  )
}