import { Database } from "@/app/types/database";
import { createClient } from "@/app/utils/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import MuestreoTables from "./components/tables";

type PeliculaType = Database["public"]["Tables"]["peliculas"]["Row"];
type LoteType = Database["public"]["Tables"]["lote"]["Row"];
type SchemaType = PeliculaType & { lote: LoteType };

export default async function MuestreoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: pelicula, error: peliculaError } = await supabase
    .from("peliculas")
    .select("lote (num, peso_objetivo, peso_rollo), *")
    .eq("id", id)
    .single();

  if (peliculaError) {
    console.error("Error fetching pelicula:", peliculaError);
    return <div>Error loading pelicula</div>;
  }

  const data = pelicula as SchemaType;
  return (
    <SidebarInset>
      <SiteHeader route="Muestreo de Pelicula" />
      <div className="flex flex-col items-center gap-10 px-8 py-8">
        <h2 className="text-2xl font-bold">Muestreo</h2>

        <Card className="w-full max-w-xl m-auto">
          <CardHeader>
            <CardTitle className="text-center">Informacion General</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">
                Lote: {pelicula?.lote?.num}
              </p>
              <p className="text-muted-foreground">
                Peso Objetivo: {pelicula?.lote?.peso_objetivo}
              </p>
              <p className="text-muted-foreground">
                Peso Rollo: {pelicula?.lote?.peso_rollo}
              </p>
              <p className="text-muted-foreground">
                Configuracion: {pelicula?.configuracion}
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="w-full" />

        <MuestreoTables
          category={pelicula?.configuracion}
          peso_objetivo={pelicula?.lote?.peso_objetivo}
          peso_rollo={pelicula?.lote?.peso_rollo}
        />
      </div>
    </SidebarInset>
  );
}
