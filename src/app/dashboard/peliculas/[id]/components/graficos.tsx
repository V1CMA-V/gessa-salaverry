'use client'

import { ScatterChart } from '@mui/x-charts'
import { LineChart } from '@mui/x-charts/LineChart'

export function LineGraf({
  series,
}: {
  series: {
    position: string
    values: number[]
  }[]
}) {
  // Configurar el eje X (puedes ajustar los valores según sea necesario)
  const xAxisData = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <LineChart
      xAxis={[{ data: xAxisData }]}
      series={series.map((item) => ({
        data: item.values,
        label: item.position,
      }))}
      height={200}
      margin={{ bottom: 10 }}
    />
  )
}

export function ScatterGraf({
  series,
}: {
  series: {
    position: string
    values: number[]
  }[]
}) {
  // Configurar los datos para el gráfico de dispersión
  const scatterData = series.flatMap((item) =>
    item.values.map((value, valueIndex) => ({
      x: valueIndex + 1, // Índice como eje X
      y: value, // Valor como eje Y
      id: `${item.position}-${valueIndex}`, // ID único
      label: item.position, // Etiqueta de la serie
    }))
  )

  return (
    <ScatterChart
      height={300}
      series={[
        {
          label: 'Datos de Dispersión',
          data: scatterData,
        },
      ]}
    />
  )
}

import { BarChart } from '@mui/x-charts/BarChart'

export default function BarGraf({
  series,
}: {
  series: {
    position: string
    values: number[]
  }[]
}) {
  // Configurar los datos para el gráfico de barras
  const xAxisData = series.map((item) => item.position)
  const barSeries = series.map((item) => ({
    data: item.values,
    label: item.position,
  }))

  return (
    <BarChart xAxis={[{ data: xAxisData }]} series={barSeries} height={300} />
  )
}
