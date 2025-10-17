'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useIsMobile } from '@/hooks/use-mobile'

export const description = 'An interactive area chart'

const chartData = [
  {
    date: '2024-04-01',
    sencillo: 222,
    doble: 150,
    triple: 95,
    cuadruple: 62,
    quintuple: 38,
    sextuple: 18,
  },
  {
    date: '2024-04-02',
    sencillo: 97,
    doble: 180,
    triple: 110,
    cuadruple: 75,
    quintuple: 45,
    sextuple: 22,
  },
  {
    date: '2024-04-03',
    sencillo: 167,
    doble: 120,
    triple: 88,
    cuadruple: 55,
    quintuple: 32,
    sextuple: 15,
  },
  {
    date: '2024-04-04',
    sencillo: 242,
    doble: 260,
    triple: 145,
    cuadruple: 98,
    quintuple: 58,
    sextuple: 28,
  },
  {
    date: '2024-04-05',
    sencillo: 373,
    doble: 290,
    triple: 165,
    cuadruple: 112,
    quintuple: 68,
    sextuple: 35,
  },
  {
    date: '2024-04-06',
    sencillo: 301,
    doble: 340,
    triple: 195,
    cuadruple: 128,
    quintuple: 78,
    sextuple: 42,
  },
  {
    date: '2024-04-07',
    sencillo: 245,
    doble: 180,
    triple: 102,
    cuadruple: 68,
    quintuple: 42,
    sextuple: 20,
  },
  {
    date: '2024-04-08',
    sencillo: 409,
    doble: 320,
    triple: 185,
    cuadruple: 122,
    quintuple: 72,
    sextuple: 38,
  },
  {
    date: '2024-04-09',
    sencillo: 59,
    doble: 110,
    triple: 65,
    cuadruple: 42,
    quintuple: 25,
    sextuple: 12,
  },
  {
    date: '2024-04-10',
    sencillo: 261,
    doble: 190,
    triple: 115,
    cuadruple: 78,
    quintuple: 48,
    sextuple: 24,
  },
  {
    date: '2024-04-11',
    sencillo: 327,
    doble: 350,
    triple: 205,
    cuadruple: 135,
    quintuple: 82,
    sextuple: 45,
  },
  {
    date: '2024-04-12',
    sencillo: 292,
    doble: 210,
    triple: 128,
    cuadruple: 85,
    quintuple: 52,
    sextuple: 26,
  },
  {
    date: '2024-04-13',
    sencillo: 342,
    doble: 380,
    triple: 225,
    cuadruple: 148,
    quintuple: 90,
    sextuple: 48,
  },
  {
    date: '2024-04-14',
    sencillo: 137,
    doble: 220,
    triple: 132,
    cuadruple: 88,
    quintuple: 54,
    sextuple: 28,
  },
  {
    date: '2024-04-15',
    sencillo: 120,
    doble: 170,
    triple: 98,
    cuadruple: 65,
    quintuple: 40,
    sextuple: 19,
  },
  {
    date: '2024-04-16',
    sencillo: 138,
    doble: 190,
    triple: 112,
    cuadruple: 75,
    quintuple: 46,
    sextuple: 23,
  },
  {
    date: '2024-04-17',
    sencillo: 446,
    doble: 360,
    triple: 215,
    cuadruple: 142,
    quintuple: 88,
    sextuple: 46,
  },
  {
    date: '2024-04-18',
    sencillo: 364,
    doble: 410,
    triple: 245,
    cuadruple: 162,
    quintuple: 98,
    sextuple: 52,
  },
  {
    date: '2024-04-19',
    sencillo: 243,
    doble: 180,
    triple: 105,
    cuadruple: 70,
    quintuple: 43,
    sextuple: 21,
  },
  {
    date: '2024-04-20',
    sencillo: 89,
    doble: 150,
    triple: 85,
    cuadruple: 56,
    quintuple: 34,
    sextuple: 17,
  },
  {
    date: '2024-04-21',
    sencillo: 137,
    doble: 200,
    triple: 118,
    cuadruple: 78,
    quintuple: 48,
    sextuple: 24,
  },
  {
    date: '2024-04-22',
    sencillo: 224,
    doble: 170,
    triple: 95,
    cuadruple: 64,
    quintuple: 39,
    sextuple: 19,
  },
  {
    date: '2024-04-23',
    sencillo: 138,
    doble: 230,
    triple: 138,
    cuadruple: 92,
    quintuple: 56,
    sextuple: 29,
  },
  {
    date: '2024-04-24',
    sencillo: 387,
    doble: 290,
    triple: 172,
    cuadruple: 115,
    quintuple: 70,
    sextuple: 36,
  },
  {
    date: '2024-04-25',
    sencillo: 215,
    doble: 250,
    triple: 148,
    cuadruple: 98,
    quintuple: 60,
    sextuple: 31,
  },
  {
    date: '2024-04-26',
    sencillo: 75,
    doble: 130,
    triple: 75,
    cuadruple: 50,
    quintuple: 30,
    sextuple: 15,
  },
  {
    date: '2024-04-27',
    sencillo: 383,
    doble: 420,
    triple: 252,
    cuadruple: 168,
    quintuple: 102,
    sextuple: 54,
  },
  {
    date: '2024-04-28',
    sencillo: 122,
    doble: 180,
    triple: 105,
    cuadruple: 70,
    quintuple: 43,
    sextuple: 22,
  },
  {
    date: '2024-04-29',
    sencillo: 315,
    doble: 240,
    triple: 142,
    cuadruple: 95,
    quintuple: 58,
    sextuple: 30,
  },
  {
    date: '2024-04-30',
    sencillo: 454,
    doble: 380,
    triple: 228,
    cuadruple: 152,
    quintuple: 92,
    sextuple: 49,
  },
  {
    date: '2024-05-01',
    sencillo: 165,
    doble: 220,
    triple: 132,
    cuadruple: 88,
    quintuple: 54,
    sextuple: 28,
  },
  {
    date: '2024-05-02',
    sencillo: 293,
    doble: 310,
    triple: 185,
    cuadruple: 124,
    quintuple: 75,
    sextuple: 40,
  },
  {
    date: '2024-05-03',
    sencillo: 247,
    doble: 190,
    triple: 112,
    cuadruple: 75,
    quintuple: 46,
    sextuple: 24,
  },
  {
    date: '2024-05-04',
    sencillo: 385,
    doble: 420,
    triple: 252,
    cuadruple: 168,
    quintuple: 102,
    sextuple: 54,
  },
  {
    date: '2024-05-05',
    sencillo: 481,
    doble: 390,
    triple: 235,
    cuadruple: 156,
    quintuple: 95,
    sextuple: 50,
  },
  {
    date: '2024-05-06',
    sencillo: 498,
    doble: 520,
    triple: 312,
    cuadruple: 208,
    quintuple: 126,
    sextuple: 67,
  },
  {
    date: '2024-05-07',
    sencillo: 388,
    doble: 300,
    triple: 178,
    cuadruple: 119,
    quintuple: 72,
    sextuple: 38,
  },
  {
    date: '2024-05-08',
    sencillo: 149,
    doble: 210,
    triple: 125,
    cuadruple: 84,
    quintuple: 51,
    sextuple: 27,
  },
  {
    date: '2024-05-09',
    sencillo: 227,
    doble: 180,
    triple: 105,
    cuadruple: 70,
    quintuple: 43,
    sextuple: 22,
  },
  {
    date: '2024-05-10',
    sencillo: 293,
    doble: 330,
    triple: 198,
    cuadruple: 132,
    quintuple: 80,
    sextuple: 42,
  },
  {
    date: '2024-05-11',
    sencillo: 335,
    doble: 270,
    triple: 162,
    cuadruple: 108,
    quintuple: 65,
    sextuple: 35,
  },
  {
    date: '2024-05-12',
    sencillo: 197,
    doble: 240,
    triple: 142,
    cuadruple: 95,
    quintuple: 58,
    sextuple: 30,
  },
  {
    date: '2024-05-13',
    sencillo: 197,
    doble: 160,
    triple: 92,
    cuadruple: 62,
    quintuple: 38,
    sextuple: 19,
  },
  {
    date: '2024-05-14',
    sencillo: 448,
    doble: 490,
    triple: 295,
    cuadruple: 196,
    quintuple: 119,
    sextuple: 63,
  },
  {
    date: '2024-05-15',
    sencillo: 473,
    doble: 380,
    triple: 228,
    cuadruple: 152,
    quintuple: 92,
    sextuple: 49,
  },
  {
    date: '2024-05-16',
    sencillo: 338,
    doble: 400,
    triple: 238,
    cuadruple: 159,
    quintuple: 96,
    sextuple: 51,
  },
  {
    date: '2024-05-17',
    sencillo: 499,
    doble: 420,
    triple: 252,
    cuadruple: 168,
    quintuple: 102,
    sextuple: 54,
  },
  {
    date: '2024-05-18',
    sencillo: 315,
    doble: 350,
    triple: 208,
    cuadruple: 139,
    quintuple: 84,
    sextuple: 45,
  },
  {
    date: '2024-05-19',
    sencillo: 235,
    doble: 180,
    triple: 105,
    cuadruple: 70,
    quintuple: 43,
    sextuple: 22,
  },
  {
    date: '2024-05-20',
    sencillo: 177,
    doble: 230,
    triple: 138,
    cuadruple: 92,
    quintuple: 56,
    sextuple: 29,
  },
  {
    date: '2024-05-21',
    sencillo: 82,
    doble: 140,
    triple: 82,
    cuadruple: 55,
    quintuple: 33,
    sextuple: 17,
  },
  {
    date: '2024-05-22',
    sencillo: 81,
    doble: 120,
    triple: 70,
    cuadruple: 47,
    quintuple: 29,
    sextuple: 15,
  },
  {
    date: '2024-05-23',
    sencillo: 252,
    doble: 290,
    triple: 172,
    cuadruple: 115,
    quintuple: 70,
    sextuple: 37,
  },
  {
    date: '2024-05-24',
    sencillo: 294,
    doble: 220,
    triple: 132,
    cuadruple: 88,
    quintuple: 54,
    sextuple: 28,
  },
  {
    date: '2024-05-25',
    sencillo: 201,
    doble: 250,
    triple: 148,
    cuadruple: 99,
    quintuple: 60,
    sextuple: 32,
  },
  {
    date: '2024-05-26',
    sencillo: 213,
    doble: 170,
    triple: 98,
    cuadruple: 66,
    quintuple: 40,
    sextuple: 21,
  },
  {
    date: '2024-05-27',
    sencillo: 420,
    doble: 460,
    triple: 275,
    cuadruple: 184,
    quintuple: 111,
    sextuple: 59,
  },
  {
    date: '2024-05-28',
    sencillo: 233,
    doble: 190,
    triple: 112,
    cuadruple: 75,
    quintuple: 46,
    sextuple: 24,
  },
  {
    date: '2024-05-29',
    sencillo: 78,
    doble: 130,
    triple: 75,
    cuadruple: 50,
    quintuple: 31,
    sextuple: 16,
  },
  {
    date: '2024-05-30',
    sencillo: 340,
    doble: 280,
    triple: 168,
    cuadruple: 112,
    quintuple: 68,
    sextuple: 36,
  },
  {
    date: '2024-05-31',
    sencillo: 178,
    doble: 230,
    triple: 138,
    cuadruple: 92,
    quintuple: 56,
    sextuple: 29,
  },
  {
    date: '2024-06-01',
    sencillo: 178,
    doble: 200,
    triple: 118,
    cuadruple: 79,
    quintuple: 48,
    sextuple: 25,
  },
  {
    date: '2024-06-02',
    sencillo: 470,
    doble: 410,
    triple: 245,
    cuadruple: 164,
    quintuple: 99,
    sextuple: 53,
  },
  {
    date: '2024-06-03',
    sencillo: 103,
    doble: 160,
    triple: 92,
    cuadruple: 62,
    quintuple: 38,
    sextuple: 19,
  },
  {
    date: '2024-06-04',
    sencillo: 439,
    doble: 380,
    triple: 228,
    cuadruple: 152,
    quintuple: 92,
    sextuple: 49,
  },
  {
    date: '2024-06-05',
    sencillo: 88,
    doble: 140,
    triple: 82,
    cuadruple: 55,
    quintuple: 33,
    sextuple: 17,
  },
  {
    date: '2024-06-06',
    sencillo: 294,
    doble: 250,
    triple: 148,
    cuadruple: 99,
    quintuple: 60,
    sextuple: 32,
  },
  {
    date: '2024-06-07',
    sencillo: 323,
    doble: 370,
    triple: 222,
    cuadruple: 148,
    quintuple: 90,
    sextuple: 48,
  },
  {
    date: '2024-06-08',
    sencillo: 385,
    doble: 320,
    triple: 192,
    cuadruple: 128,
    quintuple: 78,
    sextuple: 41,
  },
  {
    date: '2024-06-09',
    sencillo: 438,
    doble: 480,
    triple: 288,
    cuadruple: 192,
    quintuple: 116,
    sextuple: 62,
  },
  {
    date: '2024-06-10',
    sencillo: 155,
    doble: 200,
    triple: 118,
    cuadruple: 79,
    quintuple: 48,
    sextuple: 25,
  },
  {
    date: '2024-06-11',
    sencillo: 92,
    doble: 150,
    triple: 88,
    cuadruple: 59,
    quintuple: 36,
    sextuple: 18,
  },
  {
    date: '2024-06-12',
    sencillo: 492,
    doble: 420,
    triple: 252,
    cuadruple: 168,
    quintuple: 102,
    sextuple: 54,
  },
  {
    date: '2024-06-13',
    sencillo: 81,
    doble: 130,
    triple: 75,
    cuadruple: 50,
    quintuple: 31,
    sextuple: 16,
  },
  {
    date: '2024-06-14',
    sencillo: 426,
    doble: 380,
    triple: 228,
    cuadruple: 152,
    quintuple: 92,
    sextuple: 49,
  },
  {
    date: '2024-06-15',
    sencillo: 307,
    doble: 350,
    triple: 208,
    cuadruple: 139,
    quintuple: 84,
    sextuple: 45,
  },
  {
    date: '2024-06-16',
    sencillo: 371,
    doble: 310,
    triple: 185,
    cuadruple: 124,
    quintuple: 75,
    sextuple: 40,
  },
  {
    date: '2024-06-17',
    sencillo: 475,
    doble: 520,
    triple: 312,
    cuadruple: 208,
    quintuple: 126,
    sextuple: 67,
  },
  {
    date: '2024-06-18',
    sencillo: 107,
    doble: 170,
    triple: 98,
    cuadruple: 66,
    quintuple: 40,
    sextuple: 21,
  },
  {
    date: '2024-06-19',
    sencillo: 341,
    doble: 290,
    triple: 172,
    cuadruple: 115,
    quintuple: 70,
    sextuple: 37,
  },
  {
    date: '2024-06-20',
    sencillo: 408,
    doble: 450,
    triple: 268,
    cuadruple: 179,
    quintuple: 108,
    sextuple: 58,
  },
  {
    date: '2024-06-21',
    sencillo: 169,
    doble: 210,
    triple: 125,
    cuadruple: 84,
    quintuple: 51,
    sextuple: 27,
  },
  {
    date: '2024-06-22',
    sencillo: 317,
    doble: 270,
    triple: 162,
    cuadruple: 108,
    quintuple: 65,
    sextuple: 35,
  },
  {
    date: '2024-06-23',
    sencillo: 480,
    doble: 530,
    triple: 318,
    cuadruple: 212,
    quintuple: 128,
    sextuple: 68,
  },
  {
    date: '2024-06-24',
    sencillo: 132,
    doble: 180,
    triple: 105,
    cuadruple: 70,
    quintuple: 43,
    sextuple: 22,
  },
  {
    date: '2024-06-25',
    sencillo: 141,
    doble: 190,
    triple: 112,
    cuadruple: 75,
    quintuple: 46,
    sextuple: 24,
  },
  {
    date: '2024-06-26',
    sencillo: 434,
    doble: 380,
    triple: 228,
    cuadruple: 152,
    quintuple: 92,
    sextuple: 49,
  },
  {
    date: '2024-06-27',
    sencillo: 448,
    doble: 490,
    triple: 295,
    cuadruple: 196,
    quintuple: 119,
    sextuple: 63,
  },
  {
    date: '2024-06-28',
    sencillo: 149,
    doble: 200,
    triple: 118,
    cuadruple: 79,
    quintuple: 48,
    sextuple: 25,
  },
  {
    date: '2024-06-29',
    sencillo: 103,
    doble: 160,
    triple: 92,
    cuadruple: 62,
    quintuple: 38,
    sextuple: 19,
  },
  {
    date: '2024-06-30',
    sencillo: 446,
    doble: 400,
    triple: 238,
    cuadruple: 159,
    quintuple: 96,
    sextuple: 51,
  },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  sencillo: {
    label: 'Sencillo',
    color: 'var(--chart-1)',
  },
  doble: {
    label: 'Doble',
    color: 'var(--chart-2)',
  },
  triple: {
    label: 'Triple',
    color: 'var(--chart-3)',
  },
  cuadruple: {
    label: 'Cuádruple',
    color: 'var(--chart-4)',
  },
  quintuple: {
    label: 'Quíntuple',
    color: 'var(--chart-5)',
  },
  sextuple: {
    label: 'Séxtuple',
    color: 'var(--chart-6)',
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState('90d')

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total de Produccion</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total de los últimos 3 meses
          </span>
          <span className="@[540px]/card:hidden">Últimos 3 meses</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 días
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 días
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillsencillo" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sencillo)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sencillo)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filldoble" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-doble)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-doble)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filltriple" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-triple)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-triple)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillcuadruple" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-cuadruple)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-cuadruple)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillquintuple" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-quintuple)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-quintuple)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillsextuple" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sextuple)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sextuple)"
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
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sextuple"
              type="natural"
              fill="url(#fillsextuple)"
              stroke="var(--color-sextuple)"
              stackId="a"
            />
            <Area
              dataKey="quintuple"
              type="natural"
              fill="url(#fillquintuple)"
              stroke="var(--color-quintuple)"
              stackId="a"
            />
            <Area
              dataKey="cuadruple"
              type="natural"
              fill="url(#fillcuadruple)"
              stroke="var(--color-cuadruple)"
              stackId="a"
            />
            <Area
              dataKey="triple"
              type="natural"
              fill="url(#filltriple)"
              stroke="var(--color-triple)"
              stackId="a"
            />
            <Area
              dataKey="doble"
              type="natural"
              fill="url(#filldoble)"
              stroke="var(--color-doble)"
              stackId="a"
            />
            <Area
              dataKey="sencillo"
              type="natural"
              fill="url(#fillsencillo)"
              stroke="var(--color-sencillo)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
