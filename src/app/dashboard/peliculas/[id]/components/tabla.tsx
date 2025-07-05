import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AddData from './add-data'

const data = [
  {
    position: 'Posición 1',
    values: [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000],
  },
  {
    position: 'Posición 2',
    values: [
      900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000,
    ],
  },
  {
    position: 'Posición 3',
    values: [
      1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000,
    ],
  },
  {
    position: 'Posición 4',
    values: [
      2500000, 2600000, 2700000, 2800000, 2900000, 3000000, 3100000, 3200000,
    ],
  },
  {
    position: 'Posición 5',
    values: [
      3600000, 3700000, 3800000, 3900000, 4000000, 4100000, 4200000, 4300000,
    ],
  },
  {
    position: 'Posición 6',
    values: [
      4400000, 4500000, 4600000, 4700000, 4800000, 4900000, 5000000, 5100000,
    ],
  },
  {
    position: 'Posición 7',
    values: [
      5200000, 5300000, 5400000, 5500000, 5600000, 5700000, 5800000, 5900000,
    ],
  },
  {
    position: 'Posición 8',
    values: [
      6000000, 6100000, 6200000, 6300000, 6400000, 6500000, 6600000, 6700000,
    ],
  },
]

const rowColors = [
  'bg-blue-100', // Posición 1 y 2
  'bg-blue-200', // Posición 3 y 4
  'bg-blue-300', // Posición 5 y 6
  'bg-blue-400', // Posición 7 y 8
]

interface DataRow {
  position: string
  values: number[]
}

interface Stats {
  min: number
  max: number
  range: number
  mode: number
  average: number
}

const calculateStats = (data: DataRow[]): Stats => {
  const allValues: number[] = data.flatMap((row) => row.values)
  const min: number = Math.min(...allValues)
  const max: number = Math.max(...allValues)
  const range: number = max - min
  const mode: Record<number, number> = allValues.reduce(
    (acc: Record<number, number>, val: number) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    },
    {}
  )
  const modeValue: number = Number(
    Object.keys(mode).reduce((a, b) =>
      mode[Number(a)] > mode[Number(b)] ? a : b
    )
  )
  const average: number =
    allValues.reduce((sum, val) => sum + val, 0) / allValues.length

  return { min, max, range, mode: modeValue, average }
}

const stats = calculateStats(data)

export default function Table({ page_id }: { page_id: string }) {
  return (
    <div className="w-full object-contain">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Datos de Muestreo
          </CardTitle>
          <CardAction>
            <AddData id={page_id} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Rol/Flecha
                  </th>
                  {[...Array(8)].map((_, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowColors[Math.floor(rowIndex / 2)]}
                  >
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {row.position}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="border border-gray-300 px-4 py-2 text-right"
                      >
                        {value.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-medium">Mínimo:</div>
            <div className="text-right">{stats.min.toLocaleString()}</div>
            <div className="font-medium">Máximo:</div>
            <div className="text-right">{stats.max.toLocaleString()}</div>
            <div className="font-medium">Rango:</div>
            <div className="text-right">{stats.range.toLocaleString()}</div>
            <div className="font-medium">Moda:</div>
            <div className="text-right">{stats.mode.toLocaleString()}</div>
            <div className="font-medium">Promedio:</div>
            <div className="text-right">{stats.average.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
