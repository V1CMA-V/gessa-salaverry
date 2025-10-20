'use client'

import { PageTitle } from '@/components/page-title'
import { PalletPlanner } from '@/components/sampling/pallet-planner'
import { PalletRunner } from '@/components/sampling/pallet-runner'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BatchConfig,
  SamplingSession,
  initializeSamplingSession,
} from '@/types/sampling'
import { ClipboardListIcon, PlayIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SamplingClientProps {
  inspectionId: string
  inspectionData: {
    customer: string
  }
  config: BatchConfig
}

export function SamplingClient({
  inspectionId,
  inspectionData,
  config,
}: SamplingClientProps) {
  const [session, setSession] = useState<SamplingSession | null>(null)
  const [mode, setMode] = useState<'plan' | 'run'>('plan')

  useEffect(() => {
    // Inicializar sesión
    const newSession = initializeSamplingSession(inspectionId, config)
    setSession(newSession)
  }, [inspectionId, config])

  const handleModeChange = (newMode: 'plan' | 'run') => {
    setMode(newMode)
    if (session) {
      setSession({ ...session, mode: newMode })
    }
  }

  const handleUpdateSession = (newSession: SamplingSession) => {
    setSession(newSession)
    // Aquí podrías guardar en la BD
  }

  if (!session) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <PageTitle title={`Muestreo - ${inspectionData.customer}`} />
          <Tabs value={mode} onValueChange={(v) => handleModeChange(v as any)}>
            <TabsList>
              <TabsTrigger value="plan" className="gap-2">
                <ClipboardListIcon className="h-4 w-4" />
                Plan
              </TabsTrigger>
              <TabsTrigger value="run" className="gap-2">
                <PlayIcon className="h-4 w-4" />
                Registro
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="px-4 lg:px-6">
        {mode === 'plan' ? (
          <PalletPlanner session={session} />
        ) : (
          <PalletRunner
            session={session}
            onUpdateSession={handleUpdateSession}
          />
        )}
      </div>
    </div>
  )
}
