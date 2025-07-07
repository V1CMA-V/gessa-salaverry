import { SparkLineChart } from "@mui/x-charts/SparkLineChart"

export default function BasicSparkLine({ data }: { data: number[] }) {
  return (
    <SparkLineChart
      plotType="line"
      data={data}
      height={200}
      showTooltip
      showHighlight
      xAxis={{
        scaleType: "band",
        data: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ]
      }}
    />
  )
}
