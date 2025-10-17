import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function EquipoLegend() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Leyenda</CardTitle>
        <CardDescription>
          Información sobre roles y estados del equipo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Roles */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Roles</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="default">Admin</Badge>
              <span className="text-sm text-muted-foreground">
                Acceso completo al sistema
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">User</Badge>
              <span className="text-sm text-muted-foreground">
                Usuario estándar
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Analyst</Badge>
              <span className="text-sm text-muted-foreground">
                Acceso a análisis y reportes
              </span>
            </div>
          </div>
        </div>

        {/* Estados */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Estados</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <span className="text-sm">Activo</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Usuario habilitado
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <span className="text-sm">Inactivo</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Usuario deshabilitado
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
