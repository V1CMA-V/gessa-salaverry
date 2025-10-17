'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertCircle, Lock, Mail, Phone } from 'lucide-react'
import { logout } from '../login/actions'

export default function InactivePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              GRUPO EMPRESARIAL
            </h1>
            <h2 className="text-5xl md:text-6xl font-black text-blue-900 tracking-tight">
              GESSA SALAVERRY
            </h2>
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-2 border-amber-200 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center animate-pulse">
              <Lock className="w-10 h-10 text-amber-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800">
              Cuenta Inactiva
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Su acceso al sistema se encuentra temporalmente suspendido
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Alert Message */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 mb-2">
                    ¿Por qué no puedo acceder?
                  </h3>
                  <p className="text-amber-800 leading-relaxed">
                    Su cuenta ha sido marcada como inactiva. Esto puede deberse
                    a políticas de la empresa, cambios en su rol o estado
                    laboral, o medidas de seguridad temporales.
                  </p>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3 text-lg">
                ¿Qué debo hacer?
              </h3>
              <p className="text-blue-800 leading-relaxed mb-4">
                Para reactivar su cuenta o resolver esta situación, por favor
                contacte con su supervisor inmediato o con el departamento de
                Recursos Humanos.
              </p>

              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 text-blue-900">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">
                    Contacte a su supervisor directo
                  </span>
                </div>
                <div className="flex items-center gap-3 text-blue-900">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">
                    Envíe un correo al departamento de RR.HH.
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                onClick={() => logout()}
              >
                Volver al inicio de sesión
              </Button>

              <p className="text-center text-sm text-slate-500 mt-2">
                Si cree que esto es un error, contacte inmediatamente con su
                supervisor
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Grupo Empresarial GESSA Salaverry</p>
          <p className="mt-1">Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  )
}
