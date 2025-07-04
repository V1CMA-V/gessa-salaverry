'use client'

import { createClient } from '@/app/utils/supabase/client'
import Stepper, { Step } from '@/components/form-stiper'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function NewForms() {
  const [calibre, setCalibre] = useState(0)
  const [caracteristicas, setCaracteristicas] = useState('')
  const [codigoFormulacion, setCodigoFormulacion] = useState('')
  const [configuracion, setConfiguracion] = useState('')
  const [fecha, setFecha] = useState('')
  const [lote, setLote] = useState(0)
  const [medida, setMedida] = useState(0)
  const [cliente, setCliente] = useState('')

  async function handleSubmit() {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('peliculas')
      .insert([
        {
          calibre,
          caracteristicas,
          codigo_formulacion: codigoFormulacion,
          configuracion,
          fecha,
          lote,
          medida,
          cliente,
        },
      ])
      .select()
    if (error) {
      console.error('Error inserting data:', error)
      return
    }

    redirect(`/dashboard/peliculas/${data[0].id}`)
  }

  return (
    <Stepper
      initialStep={1}
      onFinalStepCompleted={() => handleSubmit()}
      backButtonText="Previous"
      nextButtonText="Next"
    >
      <Step>
        <h2 className="text-xl md:text-2xl font-bold mt-8">Bienvenido!</h2>
        <p className="text-muted-foreground">Crea una película</p>
      </Step>

      <Step>
        <h2 className="text-xl font-bold">Paso 1</h2>
        <div className="flex flex-col gap-4 ">
          <Label>Medida</Label>
          <Input
            type="text"
            value={medida}
            onChange={(e) => setMedida(Number(e.target.value))}
            placeholder="Medida"
          />
          <Label>Calibre</Label>
          <Input
            type="text"
            value={calibre}
            onChange={(e) => setCalibre(Number(e.target.value))}
            placeholder="Calibre"
          />

          <Label>Lote</Label>
          <Input
            type="text"
            value={lote}
            onChange={(e) => setLote(Number(e.target.value))}
            placeholder="Lote"
          />
        </div>
      </Step>
      <Step>
        <h2 className="text-xl font-bold mb-2">Paso 2</h2>
        <div className="flex flex-col md:flex-row items-center justify-between mb-3 gap-2 md:gap-0">
          <div className="">
            <Label>Caracteristicas</Label>
            <Select
              onValueChange={setCaracteristicas}
              defaultValue={caracteristicas}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="caracteristicas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="punteado">punteado</SelectItem>
                <SelectItem value="abierto por un lado">
                  Abierto por un lado
                </SelectItem>
                <SelectItem value="abierto por los dos lados">
                  Abierto por los dos lados
                </SelectItem>
                <SelectItem value="tratado">Tratado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Configuracion</Label>
            <Select
              onValueChange={setConfiguracion}
              defaultValue={configuracion}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="configuracion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sencillo">Sencillo</SelectItem>
                <SelectItem value="doble">Doble </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Label>Codigo Formulacion</Label>
        <Input
          type="text"
          value={codigoFormulacion}
          onChange={(e) => setCodigoFormulacion(e.target.value)}
          placeholder="Codigo Formulacion"
        />
      </Step>
      <Step>
        <h2 className="text-xl font-bold">Ultimo Paso</h2>
        <Label className="mb-3">Fecha</Label>
        <Input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          placeholder="Fecha"
        />
        <Label>Cliente</Label>
        <Input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Cliente"
        />
      </Step>
    </Stepper>
  )
}
