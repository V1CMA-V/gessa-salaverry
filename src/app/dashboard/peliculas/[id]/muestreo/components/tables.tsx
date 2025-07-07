import { createClient } from "@/app/utils/supabase/server"

const categories = {
  Sencillo: 2,
  Doble: 4,
  Triple: 6,
  Cuadruple: 8,
  Quintuple: 10
}

export default async function MuestreoTables({
  peso_objetivo,
  peso_rollo,
  category,
  id
}: {
  peso_objetivo: number
  peso_rollo: number
  category: string
  id: string
}) {
  const ColumnInto = categories[category as keyof typeof categories]

  const supabase = await createClient()

  const { data: parametros, error } = await supabase.from("parametros").select("id").eq("pelicula_id", id)

  if (error) {
    console.error("Error fetching parametros:", error)
    return <div>Error loading parametros</div>
  }

  const parametroId = parametros?.map(parametro => parametro.id)

  const { data: valores, error: valoresError } = await supabase
    .from("valores")
    .select("*")
    .in("parametro_id", parametroId)

  if (valoresError) {
    console.error("Error fetching valores:", valoresError)
    return <div>Error loading valores</div>
  }

  const paradasPorTarima = Math.floor(peso_objetivo / (peso_rollo * ColumnInto))
  console.log(paradasPorTarima)

  // Utilidad para dividir en chunks
  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }

  const tarimas = chunkArray(parametros, paradasPorTarima).slice(0, 4)

  return (
    <div className="w-full overflow-x-auto">
      {tarimas.map((tarimaParadas, tarimaIdx) => (
        <div key={tarimaIdx} className="mb-12">
          <h2 className="text-center text-2xl mb-6 font-semibold">
            Tarima {tarimaIdx + 1} Peso Objetivo: {peso_objetivo * (tarimaIdx + 1)} Kg | Peso Rollo: {peso_rollo} Kg
          </h2>
          <div className="min-w-max">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600/75 text-white">
                  <th className="p-2 border">Paradas</th>
                  {[...Array(ColumnInto)].map((_, i) => (
                    <th key={i} className="p-2 border min-w-[100px]">
                      Rollo {i + 1}
                    </th>
                  ))}
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Expectativa</th>
                </tr>
              </thead>
              <tbody>
                {tarimaParadas.map((parametro, rowIndex) => {
                  const paradaIndex = tarimaIdx * paradasPorTarima + rowIndex
                  const totalRollo: number[] = []
                  const paradaValores = valores
                    .filter(v => v.parametro_id === parametro.id)
                    .sort((a, b) => (a.position || 0) - (b.position || 0))

                  for (const v of paradaValores) {
                    let sumRollo = 0
                    for (let i = 1; i <= ColumnInto; i++) {
                      const key = `valor${i}`
                      if (v[key] !== undefined && v[key] !== null) {
                        sumRollo += v[key]
                      }
                    }
                    totalRollo.push(sumRollo)
                  }
                  const totalParadaVal = totalRollo.reduce((a, b) => a + b, 0)

                  return (
                    <tr key={parametro.id}>
                      <td className="p-2 border font-medium text-center text-white bg-blue-500/60">
                        Parada {paradaIndex + 1}
                      </td>
                      {Array.from({ length: ColumnInto }).map((_, colIndex) => (
                        <td key={colIndex} className="p-2 border text-center">
                          {totalRollo[colIndex] !== undefined ? totalRollo[colIndex] : `Rollo ${colIndex + 1}`}
                        </td>
                      ))}
                      <td className="p-2 border font-medium text-center">{totalParadaVal} Kg</td>
                      <td className="p-2 border font-medium text-center">{peso_rollo * ColumnInto} Kg</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
