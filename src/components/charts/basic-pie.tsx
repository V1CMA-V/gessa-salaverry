"use client"

import { PieChart } from "@mui/x-charts/PieChart"

interface BasicPieProps {
  data: { label: string; value: number }[]
}

export default function BasicPie({ data }: BasicPieProps) {
  return (
    <PieChart
      series={[
        {
          data: data,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          valueFormatter
        }
      ]}
      height={200}
      width={200}
    />
  )
}

const valueFormatter = (item: { value: number }) => `${item.value}%`
