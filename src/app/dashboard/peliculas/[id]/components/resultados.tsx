"use client"

import { createClient } from "@/app/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface ResultadosProps {
  parametroId: string
}

interface ResultadoData {
  id?: string
  on_limit: boolean
  rango_acept: boolean
  acabados: boolean
  planidad: boolean
  canon_a?: number | null
  canon_b?: number | null
  canon_c?: number | null
  estatico: number | null
  dinamico: number | null
  min: number | null
  max: number | null
  contaminantes: boolean
  apariencia: boolean
  siguiente_paso: string
  parametro_id: string
}

export default function Resultados({ parametroId }: ResultadosProps) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [resultado, setResultado] = useState<ResultadoData>({
    on_limit: false,
    rango_acept: false,
    acabados: false,
    planidad: false,
    canon_a: null,
    canon_b: null,
    canon_c: null,
    estatico: null,
    dinamico: null,
    min: null,
    max: null,
    contaminantes: false,
    apariencia: false,
    siguiente_paso: "",
    parametro_id: parametroId
  })

  // Cargar datos existentes
  useEffect(() => {
    const loadResultados = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("resultados").select("*").eq("parametro_id", parametroId).single()

        if (error && error.code !== "PGRST116") {
          // PGRST116 = no rows found
          console.error("Error fetching resultados:", error)
          toast.error("Error al cargar los resultados")
          return
        }

        if (data) {
          console.log("Fetched resultados:", data)
          setResultado(data)
        }
      } catch (error) {
        console.error("Error loading resultados:", error)
        toast.error("Error al cargar los resultados")
      } finally {
        setLoading(false)
      }
    }

    loadResultados()
  }, [parametroId])

  // Manejar cambios en checkboxes
  const handleCheckboxChange = (field: keyof ResultadoData, checked: boolean) => {
    setResultado(prev => ({
      ...prev,
      [field]: checked
    }))
  }

  // Manejar cambios en inputs numéricos
  const handleNumberChange = (field: keyof ResultadoData, value: string) => {
    const numValue = value === "" ? null : parseFloat(value)
    setResultado(prev => ({
      ...prev,
      [field]: numValue
    }))
  }

  // Manejar cambios en inputs de texto
  const handleTextChange = (field: keyof ResultadoData, value: string) => {
    setResultado(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Guardar o actualizar resultados
  const onSubmit = async () => {
    setSaving(true)
    try {
      const supabase = createClient()

      if (resultado.id) {
        // Actualizar resultado existente
        const { error } = await supabase
          .from("resultados")
          .update({
            on_limit: resultado.on_limit,
            rango_acept: resultado.rango_acept,
            acabados: resultado.acabados,
            planidad: resultado.planidad,
            canon_a: resultado.canon_a,
            canon_b: resultado.canon_b,
            canon_c: resultado.canon_c,
            estatico: resultado.estatico,
            dinamico: resultado.dinamico,
            min: resultado.min,
            max: resultado.max,
            contaminantes: resultado.contaminantes,
            apariencia: resultado.apariencia,
            siguiente_paso: resultado.siguiente_paso
          })
          .eq("id", resultado.id)

        if (error) {
          console.error("Error updating resultado:", error)
          toast.error("Error al actualizar el resultado")
          return
        }

        toast.success("Resultado actualizado correctamente")
      } else {
        // Crear nuevo resultado
        const { data, error } = await supabase
          .from("resultados")
          .insert({
            parametro_id: parametroId,
            on_limit: resultado.on_limit,
            rango_acept: resultado.rango_acept,
            acabados: resultado.acabados,
            planidad: resultado.planidad,
            canon_a: resultado.canon_a,
            canon_b: resultado.canon_b,
            canon_c: resultado.canon_c,
            estatico: resultado.estatico,
            dinamico: resultado.dinamico,
            min: resultado.min,
            max: resultado.max,
            contaminantes: resultado.contaminantes,
            apariencia: resultado.apariencia,
            siguiente_paso: resultado.siguiente_paso
          })
          .select()
          .single()

        if (error) {
          console.error("Error creating resultado:", error)
          toast.error("Error al crear el resultado")
          return
        }

        setResultado(prev => ({ ...prev, id: data.id }))
        toast.success("Resultado creado correctamente")
      }
    } catch (error) {
      console.error("Error saving resultado:", error)
      toast.error("Error al guardar el resultado")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-8">
          <div>Cargando resultados...</div>
        </CardContent>
      </Card>
    )
  }

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
            <Checkbox
              id="on-limit"
              checked={resultado.on_limit}
              onCheckedChange={checked => handleCheckboxChange("on_limit", checked as boolean)}
            />
            <Label htmlFor="on-limit" className="text-sm">
              Muestreo Dentro de Límites de Especificación
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rango-acept"
              checked={resultado.rango_acept}
              onCheckedChange={checked => handleCheckboxChange("rango_acept", checked as boolean)}
            />
            <Label htmlFor="rango-acept" className="text-sm">
              Rango Aceptado
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acabados"
              checked={resultado.acabados}
              onCheckedChange={checked => handleCheckboxChange("acabados", checked as boolean)}
            />
            <Label htmlFor="acabados" className="text-sm">
              Acabados
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="planidad"
              checked={resultado.planidad}
              onCheckedChange={checked => handleCheckboxChange("planidad", checked as boolean)}
            />
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
              <Input
                id="canon-a"
                type="number"
                placeholder="°C"
                value={resultado.canon_a ?? ""}
                onChange={e => handleNumberChange("canon_a", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canon-b">Cañón B</Label>
              <Input
                id="canon-b"
                type="number"
                placeholder="°C"
                className="border-red-500"
                value={resultado.canon_b ?? ""}
                onChange={e => handleNumberChange("canon_b", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canon-c">Cañón C</Label>
              <Input
                id="canon-c"
                type="number"
                placeholder="°C"
                value={resultado.canon_c ?? ""}
                onChange={e => handleNumberChange("canon_c", e.target.value)}
              />
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
              <Input
                id="estatico"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="border-red-500"
                value={resultado.estatico ?? ""}
                onChange={e => handleNumberChange("estatico", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dinamico">Dinámico</Label>
              <Input
                id="dinamico"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="border-red-500"
                value={resultado.dinamico ?? ""}
                onChange={e => handleNumberChange("dinamico", e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Sección de Nivel de Estática */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Nivel de Estática</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min">Mínimo</Label>
              <Input
                id="min"
                type="number"
                placeholder="0"
                className="border-red-500"
                value={resultado.min ?? ""}
                onChange={e => handleNumberChange("min", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max">Máximo</Label>
              <Input
                id="max"
                type="number"
                placeholder="0"
                className="border-red-500"
                value={resultado.max ?? ""}
                onChange={e => handleNumberChange("max", e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Segunda fila de checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contaminantes"
              checked={resultado.contaminantes}
              onCheckedChange={checked => handleCheckboxChange("contaminantes", checked as boolean)}
            />
            <Label htmlFor="contaminantes" className="text-sm">
              Libre de contaminantes físicos y/o químicos
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="apariencia"
              checked={resultado.apariencia}
              onCheckedChange={checked => handleCheckboxChange("apariencia", checked as boolean)}
            />
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
            <Input
              id="siguiente-paso"
              type="text"
              placeholder="Describe los siguientes pasos..."
              value={resultado.siguiente_paso}
              onChange={e => handleTextChange("siguiente_paso", e.target.value)}
            />
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="flex justify-center pt-4">
          <Button className="w-full md:w-auto px-8" onClick={onSubmit} disabled={saving}>
            {saving ? "Guardando..." : resultado.id ? "Actualizar Resultados" : "Guardar Resultados"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
