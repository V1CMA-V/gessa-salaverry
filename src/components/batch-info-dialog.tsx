'use client'

import { IconInfoCircle, IconNotes, IconWeight } from '@tabler/icons-react'
import { useState } from 'react'
import { Badge } from './ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Separator } from './ui/separator'

interface BatchInfo {
  batch_code: string
  notes: string | null
  target_lot_weight_kg: number | null
  target_weight_per_roll_kg: number | null
}

interface BatchInfoDialogProps {
  batchCode: string
  batchInfo: BatchInfo | null
}

export function BatchInfoDialog({
  batchCode,
  batchInfo,
}: BatchInfoDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge
          variant="outline"
          className="text-base font-medium cursor-pointer hover:bg-accent transition-colors"
        >
          {batchCode}
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconInfoCircle className="size-5" />
            Información del Lote
          </DialogTitle>
          <DialogDescription>
            Detalles completos del lote {batchCode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Código del Lote */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Código del Lote
            </p>
            <Badge variant="default" className="text-base px-3 py-1.5">
              {batchInfo?.batch_code || 'N/A'}
            </Badge>
          </div>

          <Separator />

          {/* Pesos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <IconWeight className="size-4" />
                <span>Peso Objetivo del Lote</span>
              </div>
              <p className="text-lg font-semibold">
                {batchInfo?.target_lot_weight_kg
                  ? `${batchInfo.target_lot_weight_kg} kg`
                  : 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <IconWeight className="size-4" />
                <span>Peso por Rollo</span>
              </div>
              <p className="text-lg font-semibold">
                {batchInfo?.target_weight_per_roll_kg
                  ? `${batchInfo.target_weight_per_roll_kg} kg`
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* Notas del Lote */}
          {batchInfo?.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <IconNotes className="size-4" />
                  <span>Notas del Lote</span>
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap bg-muted p-3 rounded-md">
                  {batchInfo.notes}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
