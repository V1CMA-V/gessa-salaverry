import { createClient } from "@/app/utils/supabase/server"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddData from "./add-data"
import BarGraf, { LineGraf, ScatterGraf } from "./graficos"

const rowColors = [
  "bg-blue-100", // Posición 1 y 2
  "bg-blue-200", // Posición 3 y 4
  "bg-blue-300", // Posición 5 y 6
  "bg-blue-400" // Posición 7 y 8
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
  const allValues: number[] = data.flatMap(row => row.values)
  const min: number = Math.min(...allValues)
  const max: number = Math.max(...allValues)
  const range: number = max - min
  const mode: Record<number, number> = allValues.reduce((acc: Record<number, number>, val: number) => {
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {})
  const modeValue: number = Number(Object.keys(mode).reduce((a, b) => (mode[Number(a)] > mode[Number(b)] ? a : b)))
  const average: number = allValues.reduce((sum, val) => sum + val, 0) / allValues.length

  return { min, max, range, mode: modeValue, average }
}

export default async function Table({ page_id }: { page_id: string }) {
  const supabase = await createClient()

  const { data: pageData, error } = await supabase
    .from("valores")
    .select("*")
    .eq("parametro_id", page_id)
    .order("position", { ascending: true })

  if (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading data</div>
  }

  // Transformar los datos al formato esperado por la tabla
  const transformedData = pageData.map(item => ({
    position: `Posición ${item.position}`,
    values: [item.valor1, item.valor2, item.valor3, item.valor4, item.valor5, item.valor6, item.valor7, item.valor8]
  }))

  // Calcular estadísticas con los datos transformados
  const stats = calculateStats(transformedData)

  return (
    <div className="w-full object-contain flex flex-col gap-8">
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
                  <th className="border border-gray-300 px-4 py-2">Rol/Flecha</th>
                  {[...Array(8)].map((_, index) => (
                    <th key={index} className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transformedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowColors[Math.floor(rowIndex / 2)]}>
                    <td className="border border-gray-300 px-4 py-2 font-medium">{row.position}</td>
                    {row.values.map((value, valueIndex) => (
                      <td key={valueIndex} className="border border-gray-300 px-4 py-2 text-center">
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

      <Card className="w-full max-w-xl m-auto">
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-medium">Mínimo:</div>
            <div className="text-right">
              <strong>{stats.min.toLocaleString()}</strong>
            </div>
            <div className="font-medium">Máximo:</div>
            <div className="text-right">
              <strong>{stats.max.toLocaleString()}</strong>
            </div>
            <div className="font-medium">Rango:</div>
            <div className="text-right">
              <strong>{stats.range.toLocaleString()}</strong>
            </div>
            <div className="font-medium">Moda:</div>
            <div className="text-right">
              <strong>{stats.mode.toLocaleString()}</strong>
            </div>
            <div className="font-medium">Promedio:</div>
            <div className="text-right">
              <strong>{stats.average.toLocaleString()}</strong>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Graficas de Muestreo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="lines">
              <TabsList>
                <TabsTrigger value="lines" className="cursor-pointer">
                  Lineas
                </TabsTrigger>
                <TabsTrigger value="scatter" className="cursor-pointer">
                  Puntos
                </TabsTrigger>
                <TabsTrigger value="bars" className="cursor-pointer">
                  Barras
                </TabsTrigger>
              </TabsList>
              <TabsContent value="lines">
                <LineGraf series={transformedData} />
              </TabsContent>
              <TabsContent value="scatter">
                <ScatterGraf series={transformedData} />
              </TabsContent>
              <TabsContent value="bars">
                <BarGraf series={transformedData} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
