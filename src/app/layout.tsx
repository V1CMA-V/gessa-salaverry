import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body className="min-h-screen flex flex-col">
				<header className="bg-slate-800 text-white p-4">
					<div className="container mx-auto">Gessa Salaverry</div>
				</header>
				<main className="flex-1 container mx-auto p-6">{children}</main>
				<footer className="bg-slate-100 text-slate-600 p-4">
					<div className="container mx-auto text-sm">© {new Date().getFullYear()} gessa-salaverry</div>
				</footer>
			</body>
		</html>
	)
}