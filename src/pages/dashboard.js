import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) return <p>Cargando...</p>

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-6">
          <p className="font-bold">{user.name}</p>
          <p className="text-sm">{user.email}</p>
        </div>
        <nav>
          <a href="/dashboard/transacciones" className="block py-2">Transacciones</a>
          <a href="/dashboard/maestros" className="block py-2">Maestros</a>
          {user.role === "ADMIN" && (
            <a href="/dashboard/usuarios" className="block py-2">Usuarios</a>
          )}
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
      </main>
    </div>
  )
}

