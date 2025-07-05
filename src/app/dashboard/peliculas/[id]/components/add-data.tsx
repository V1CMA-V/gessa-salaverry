'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Plus } from 'lucide-react'
import FormData from './add-form'

export default function AddData({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus /> <span className="hidden md:inline">Añadir Datos</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DrawerTitle>Ingreso de datos via Micrometro Digital</DrawerTitle>
            <DrawerDescription>
              Debes ingresar todos los valores de la posición y enviarlos.
            </DrawerDescription>
          </DialogHeader>

          <FormData id={id} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Ingreso de datos via Micrometro Digital</DrawerTitle>
          <DrawerDescription>
            Debes ingresar todos los valores de la posición y enviarlos.
          </DrawerDescription>
        </DrawerHeader>

        <FormData id={id} />

        <DrawerFooter className="pt-2 px-5">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
