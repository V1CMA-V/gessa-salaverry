export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold">Gessa Salaverry</div>
          <nav className="space-x-4 text-sm text-gray-600">
            <a href="/login" className="hover:underline">
              Iniciar sesión
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <section className="mx-auto max-w-5xl px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Bienvenido a Gessa Salaverry
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Tu plataforma de gestión de productos. Controla inventario,
              administra acciones y mantén todo centralizado para tu negocio.
            </p>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-3">Resumen rápido</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Ver y editar productos</li>
                <li>Gestionar inventario y precios</li>
                <li>Exportar reportes</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-gray-200">
          <div className="mx-auto max-w-5xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2">Inventario</h4>
              <p className="text-sm text-gray-600">
                Controla entradas y salidas de stock con historial completo.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2">Productos</h4>
              <p className="text-sm text-gray-600">
                Organiza tus productos por categorías y variantes.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold mb-2">Reportes</h4>
              <p className="text-sm text-gray-600">
                Genera reportes exportables en CSV o PDF.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-white border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Gessa Salaverry</div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Soporte
            </a>
            <a href="#" className="hover:underline">
              Privacidad
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
