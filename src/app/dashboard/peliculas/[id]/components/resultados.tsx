"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ResultadosProps {
  parametroId: string
}

export default function Resultados({ parametroId }: ResultadosProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Resultados:</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pregunta principal */}
        <div className="flex items-center space-x-2">
          <Label className="text-lg font-semibold">¿Se libera el producto?</Label>
        </div>

        {/* Primera fila de checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="muestreo-limites" />
            <Label htmlFor="muestreo-limites" className="text-sm">
              Muestreo Dentro de Límites de Especificación
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="rango-aceptado" />
            <Label htmlFor="rango-aceptado" className="text-sm">
              Rango Aceptado
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="acabados" />
            <Label htmlFor="acabados" className="text-sm">
              Acabados
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="planidad" />
            <Label htmlFor="planidad" className="text-sm">
              Planidad
            </Label>
          </div>
        </div>

        <Separator />

        {/* Sección de Temperaturas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Temperaturas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="canon-a">Cañón A</Label>
              <Input id="canon-a" type="number" placeholder="°C" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canon-b">Cañón B</Label>
              <Input id="canon-b" type="number" placeholder="°C" className="border-red-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canon-c">Cañón C</Label>
              <Input id="canon-c" type="number" placeholder="°C" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Sección de Coeficiente de Fricción */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Coeficiente de Fricción</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estatico">Estático</Label>
              <Input id="estatico" type="number" step="0.01" placeholder="0.00" className="border-red-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dinamico">Dinámico</Label>
              <Input id="dinamico" type="number" step="0.01" placeholder="0.00" className="border-red-500" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Sección de Nivel de Estática */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Nivel de Estática</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minimo">Mínimo</Label>
              <Input id="minimo" type="number" placeholder="0" className="border-red-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maximo">Máximo</Label>
              <Input id="maximo" type="number" placeholder="0" className="border-red-500" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Segunda fila de checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="libre-contaminantes" />
            <Label htmlFor="libre-contaminantes" className="text-sm">
              Libre de contaminantes físicos y/o químicos
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="apariencia" />
            <Label htmlFor="apariencia" className="text-sm">
              Apariencia
            </Label>
          </div>
        </div>

        <Separator />

        {/* Siguientes Pasos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Siguientes Pasos:</h3>
          <div className="border-b-2 border-black pb-4">
            <Input id="siguiente-paso" type="text" placeholder="" />
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="flex justify-center pt-4">
          <Button className="w-full md:w-auto px-8">Guardar Resultados</Button>
        </div>
      </CardContent>
    </Card>
  )
}
