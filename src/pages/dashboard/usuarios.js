import DashboardLayout from "@/components/ui/DashboardLayout"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
    } else {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      if (parsedUser.role !== "ADMIN") {
        router.push("/dashboard")
      }
    }
  }, [])

  useEffect(() => {
    const fetchUsuarios = async () => {
      const res = await fetch("/api/usuarios")
      const data = await res.json()
      setUsuarios(data)
    }
    fetchUsuarios()
  }, [])

  const handleChangeRole = async (id, newRole) => {
    const res = await fetch("/api/usuarios/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role: newRole })
    })
    const data = await res.json()
    if (res.ok) {
      setUsuarios(
        usuarios.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      )
    }
  }

  if (!user) return <p>Cargando...</p>

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Rol</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">
                {u.role === "USER" ? (
                  <button
                    onClick={() => handleChangeRole(u.id, "ADMIN")}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Hacer ADMIN
                  </button>
                ) : (
                  <button
                    onClick={() => handleChangeRole(u.id, "USER")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Hacer USER
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  )
}
