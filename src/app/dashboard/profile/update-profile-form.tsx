'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateProfile } from './actions'

interface UpdateProfileFormProps {
  currentName: string
}

export function UpdateProfileForm({ currentName }: UpdateProfileFormProps) {
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(currentName)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await updateProfile(formData)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo"
          required
          disabled={isPending}
        />
      </div>

      <Button type="submit" disabled={isPending || name === currentName}>
        {isPending ? 'Actualizando...' : 'Actualizar Nombre'}
      </Button>
    </form>
  )
}
