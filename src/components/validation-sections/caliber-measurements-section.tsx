'use client'

import { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { ControlChartSection } from './control-chart-section'

interface CaliberMeasurementsSectionProps {
  id: string
  isEditing?: boolean
  data?: number[][]
  config?: String
  onDataChange?: (rowIdx: number, cellIdx: number, value: number) => void
}

export function CaliberMeasurementsSection({
  id,
  isEditing = false,
  data = [],
  config,
  onDataChange,
}: CaliberMeasurementsSectionProps) {
  const handleCellChange = (rowIdx: number, cellIdx: number, value: number) => {
    if (onDataChange) {
      onDataChange(rowIdx, cellIdx, value)
    }
  }

  // Calcular estadísticas globales
  const statistics = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        minimo: 0,
        maximo: 0,
        rango: 0,
        moda: 0,
        promedio: 0,
        desviacionEstandar: 0,
        limiteInferior: 0,
        limiteSuperior: 0,
      }
    }

    // Aplanar todos los valores
    const allValues = data.flat()
    const n = allValues.length

    if (n === 0) {
      return {
        minimo: 0,
        maximo: 0,
        rango: 0,
        moda: 0,
        promedio: 0,
        desviacionEstandar: 0,
        limiteInferior: 0,
        limiteSuperior: 0,
      }
    }

    // Mínimo y Máximo
    const minimo = Math.min(...allValues)
    const maximo = Math.max(...allValues)
    const rango = maximo - minimo

    // Promedio
    const suma = allValues.reduce((acc, val) => acc + val, 0)
    const promedio = suma / n

    // Moda (valor más frecuente)
    const frecuencias: { [key: number]: number } = {}
    allValues.forEach((val) => {
      frecuencias[val] = (frecuencias[val] || 0) + 1
    })
    const moda = parseInt(
      Object.keys(frecuencias).reduce((a, b) =>
        frecuencias[parseInt(a)] > frecuencias[parseInt(b)] ? a : b
      )
    )

    // Desviación Estándar
    const varianza =
      allValues.reduce((acc, val) => acc + Math.pow(val - promedio, 2), 0) / n
    const desviacionEstandar = Math.sqrt(varianza)

    // Límites de Control (promedio ± 3 * desviación estándar)
    const limiteInferior = promedio - 3 * desviacionEstandar
    const limiteSuperior = promedio + 3 * desviacionEstandar

    return {
      minimo,
      maximo,
      rango,
      moda,
      promedio,
      desviacionEstandar,
      limiteInferior,
      limiteSuperior,
    }
  }, [data])

  console.log('value', data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mediciones de Calibre: Liberación/Parada 1</CardTitle>
        <CardDescription>
          Rollos Por Flecha/Posición - 10 Posiciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32 bg-blue-200">Posición</TableHead>
                <TableHead className="text-center bg-blue-200/80">1</TableHead>
                <TableHead className="text-center bg-blue-200/80">2</TableHead>
                <TableHead className="text-center bg-blue-200/80">3</TableHead>
                <TableHead className="text-center bg-blue-200/80">4</TableHead>
                <TableHead className="text-center bg-blue-200/80">5</TableHead>
                <TableHead className="text-center bg-blue-200/80">6</TableHead>
                <TableHead className="text-center bg-blue-200/80">7</TableHead>
                <TableHead className="text-center bg-blue-200/80">8</TableHead>
                <TableHead className="bg-amber-100 text-center">
                  Medida de Ancho
                </TableHead>
                <TableHead className="bg-gray-200 text-center">
                  Resultados
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, idx) => {
                const min = Math.min(...row)
                const max = Math.max(...row)
                const sum = row.reduce((a, b) => a + b, 0)
                const avg = (sum / row.length).toFixed(1)
                const range = max - min

                const pairParity = Math.floor(idx / 2) % 2
                const rowBg =
                  pairParity === 0 ? 'bg-blue-200/30' : 'bg-blue-200/20'

                return (
                  <TableRow key={idx} className={rowBg}>
                    <TableCell className={`font-medium `}>
                      Posición {idx + 1}
                    </TableCell>
                    {row.map((val, cellIdx) => (
                      <TableCell key={cellIdx} className="text-center p-1">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={val}
                            onChange={(e) =>
                              handleCellChange(
                                idx,
                                cellIdx,
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-16 h-8 text-center mx-auto"
                          />
                        ) : (
                          val
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="bg-amber-50 text-center">
                      {avg}
                    </TableCell>
                    <TableCell className="bg-gray-50 text-center font-medium">
                      {idx === 0
                        ? 'Mínimo'
                        : idx === 1
                        ? statistics.minimo
                        : idx === 2
                        ? 'Máximo'
                        : idx === 3
                        ? statistics.maximo
                        : idx === 4
                        ? 'Rango'
                        : idx === 5
                        ? statistics.rango
                        : idx === 6
                        ? 'Moda'
                        : idx === 7
                        ? statistics.moda
                        : idx === 8
                        ? 'Promedio'
                        : statistics.promedio.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Estadísticas adicionales */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 flex items-center justify-between">
                <Label className="text-sm font-semibold">
                  Desviación Estándar
                </Label>
                <div className="flex items-center justify-center">
                  {isEditing ? (
                    <Input
                      type="text"
                      value={statistics.desviacionEstandar.toFixed(2)}
                      className="w-32 h-10 text-center font-mono"
                      readOnly
                    />
                  ) : (
                    <span className="text-lg font-mono">
                      {statistics.desviacionEstandar.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 flex items-center justify-between">
                <Label className="text-sm font-semibold">
                  Límites De Control
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Inferior
                    </Label>
                    <div className="flex items-center justify-center">
                      {isEditing ? (
                        <Input
                          type="text"
                          value={statistics.limiteInferior.toFixed(2)}
                          className="w-full h-10 text-center font-mono"
                          readOnly
                        />
                      ) : (
                        <span className="text-lg font-mono">
                          {statistics.limiteInferior.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Superior
                    </Label>
                    <div className="flex items-center justify-center">
                      {isEditing ? (
                        <Input
                          type="text"
                          value={statistics.limiteSuperior.toFixed(2)}
                          className="w-full h-10 text-center font-mono"
                          readOnly
                        />
                      ) : (
                        <span className="text-lg font-mono">
                          {statistics.limiteSuperior.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="col-span-2">
            <ControlChartSection value={data} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
