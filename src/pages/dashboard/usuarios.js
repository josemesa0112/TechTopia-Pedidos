import DashboardLayout from "@/components/ui/DashboardLayout"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("USER")
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
    if (res.ok) {
      setUsuarios(
        usuarios.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      )
    }
  }

  const handleAddUsuario = async () => {
    const res = await fetch("/api/usuarios/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role })
    })
    const data = await res.json()
    if (res.ok) {
      setUsuarios([...usuarios, data])
      setShowModal(false)
      setName("")
      setEmail("")
      setPassword("")
      setRole("USER")
    }
  }

  if (!user) return <p>Cargando...</p>

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Agregar Usuario
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Usuario</h2>

            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Nombre"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Email"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Contraseña"
              required
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 mb-2 w-full"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUsuario}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

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

