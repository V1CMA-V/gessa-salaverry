import { BarChart } from "@mui/x-charts/BarChart"

interface ChartDataItem {
  month: string
  Sencillo?: number
  Doble?: number
  Triple?: number
  Cuadruple?: number
  Quintuple?: number
  // Permit any additional dynamic configuration keys
  [key: string]: string | number | undefined
}

interface BasicBarProps {
  dataset: ChartDataItem[]
}

const chartSetting = {
  yAxis: [
    {
      label: "Cantidad"
    }
  ],
  height: 150
}

export default function BasicBar({ dataset }: BasicBarProps) {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ dataKey: "month" }]}
      series={[
        { dataKey: "Sencillo", label: "Sencillo" },
        { dataKey: "Doble", label: "Doble" },
        { dataKey: "Triple", label: "Triple" },
        { dataKey: "Cuadruple", label: "Cuadruple" },
        { dataKey: "Quintuple", label: "Quintuple" }
      ]}
      {...chartSetting}
    />
  )
}
