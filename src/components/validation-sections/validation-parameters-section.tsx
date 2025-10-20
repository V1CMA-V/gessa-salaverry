'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

interface ValidationParametersSectionProps {
  id: string
  isEditing?: boolean
  data?: {
    kilogramosHora: number
    velocidadMotorA: number
    velocidadMotorB: number
    velocidadMotorC: number
    velocidadTurbo: number
    velocidadJalador: number
    tensionBobinador1: number
    tensionBobinador2: number
    prearrastre: number
    presionBobinadorIzq: number
    presionBobinadorDer: number
    temperaturaCañonA: number
    temperaturaCañonB: number
    temperaturaCañonC: number
  }
  onDataChange?: (field: string, value: number) => void
}

export function ValidationParametersSection({
  id,
  isEditing = false,
  data = {
    kilogramosHora: 0,
    velocidadMotorA: 0,
    velocidadMotorB: 0,
    velocidadMotorC: 0,
    velocidadTurbo: 0,
    velocidadJalador: 0,
    tensionBobinador1: 0,
    tensionBobinador2: 0,
    prearrastre: 0,
    presionBobinadorIzq: 0,
    presionBobinadorDer: 0,
    temperaturaCañonA: 0,
    temperaturaCañonB: 0,
    temperaturaCañonC: 0,
  },
  onDataChange,
}: ValidationParametersSectionProps) {
  const handleChange = (field: string, value: number) => {
    if (onDataChange) {
      onDataChange(field, value)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parámetros de Validación</CardTitle>
        <CardDescription>
          Mediciones de velocidades, tensiones, presiones y temperaturas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center bg-slate-100">
                  KILOGRAMOS HORA
                </TableHead>
                <TableHead colSpan={3} className="text-center bg-blue-100">
                  VELOCIDAD DE MOTOR
                </TableHead>
                <TableHead className="text-center bg-slate-100">
                  VELOCIDAD DE TURBO
                </TableHead>
                <TableHead className="text-center bg-slate-100">
                  VELOCIDAD DEL JALADOR
                </TableHead>
                <TableHead colSpan={2} className="text-center bg-green-100">
                  TENSIÓN DE BOBINADOR
                </TableHead>
                <TableHead className="text-center bg-slate-100">
                  PREARRASTRE
                </TableHead>
                <TableHead colSpan={2} className="text-center bg-purple-100">
                  PRESIÓN BOBINADOR
                </TableHead>
                <TableHead colSpan={3} className="text-center bg-amber-100">
                  TEMPERATURAS CAÑONES
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="bg-slate-50"></TableHead>
                <TableHead className="text-center bg-blue-50">A</TableHead>
                <TableHead className="text-center bg-blue-50">B</TableHead>
                <TableHead className="text-center bg-blue-50">C</TableHead>
                <TableHead className="bg-slate-50"></TableHead>
                <TableHead className="bg-slate-50"></TableHead>
                <TableHead className="text-center bg-green-50">1</TableHead>
                <TableHead className="text-center bg-green-50">2</TableHead>
                <TableHead className="bg-slate-50"></TableHead>
                <TableHead className="text-center bg-purple-50">
                  IZQUIERDO
                </TableHead>
                <TableHead className="text-center bg-purple-50">
                  DERECHO
                </TableHead>
                <TableHead className="text-center bg-amber-50">A</TableHead>
                <TableHead className="text-center bg-amber-50">B</TableHead>
                <TableHead className="text-center bg-amber-50">C</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center p-2">
                  {isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={data.kilogramosHora}
                      onChange={(e) =>
                        handleChange(
                          'kilogramosHora',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.kilogramosHora
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-blue-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.velocidadMotorA}
                      onChange={(e) =>
                        handleChange(
                          'velocidadMotorA',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.velocidadMotorA
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-blue-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.velocidadMotorB}
                      onChange={(e) =>
                        handleChange(
                          'velocidadMotorB',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.velocidadMotorB
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-blue-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.velocidadMotorC}
                      onChange={(e) =>
                        handleChange(
                          'velocidadMotorC',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.velocidadMotorC
                  )}
                </TableCell>
                <TableCell className="text-center p-2">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.velocidadTurbo}
                      onChange={(e) =>
                        handleChange(
                          'velocidadTurbo',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.velocidadTurbo
                  )}
                </TableCell>
                <TableCell className="text-center p-2">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.velocidadJalador}
                      onChange={(e) =>
                        handleChange(
                          'velocidadJalador',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.velocidadJalador
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-green-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.tensionBobinador1}
                      onChange={(e) =>
                        handleChange(
                          'tensionBobinador1',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.tensionBobinador1
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-green-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.tensionBobinador2}
                      onChange={(e) =>
                        handleChange(
                          'tensionBobinador2',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.tensionBobinador2
                  )}
                </TableCell>
                <TableCell className="text-center p-2">
                  {isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={data.prearrastre}
                      onChange={(e) =>
                        handleChange(
                          'prearrastre',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.prearrastre
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-purple-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={data.presionBobinadorIzq}
                      onChange={(e) =>
                        handleChange(
                          'presionBobinadorIzq',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.presionBobinadorIzq
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-purple-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={data.presionBobinadorDer}
                      onChange={(e) =>
                        handleChange(
                          'presionBobinadorDer',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.presionBobinadorDer
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-amber-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.temperaturaCañonA}
                      onChange={(e) =>
                        handleChange(
                          'temperaturaCañonA',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.temperaturaCañonA
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-amber-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.temperaturaCañonB}
                      onChange={(e) =>
                        handleChange(
                          'temperaturaCañonB',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.temperaturaCañonB
                  )}
                </TableCell>
                <TableCell className="text-center p-2 bg-amber-50/50">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={data.temperaturaCañonC}
                      onChange={(e) =>
                        handleChange(
                          'temperaturaCañonC',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-20 h-8 text-center mx-auto"
                    />
                  ) : (
                    data.temperaturaCañonC
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
