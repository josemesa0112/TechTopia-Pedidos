import Layout from "@/components/Organisms/Layout"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("USER")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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
  }, [router])

  useEffect(() => {
    const fetchUsuarios = async () => {
      const res = await fetch("/api/usuarios")
      const data = await res.json()
      setUsuarios(data)
    }
    fetchUsuarios()
  }, [])

  const handleChangeRole = async (id, newRole) => {
    const res = await fetch("/api/usuarios/updateRol", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, nuevoRol: newRole }),
    })
    if (res.ok) {
      const actualizado = await res.json()
      setUsuarios((prev) =>
        prev.map((u) => (u.id === actualizado.id ? actualizado : u))
      )
      toast.success("Rol actualizado ✅")
    } else {
      toast.error("Error al cambiar el rol")
    }
  }

  const handleAddUsuario = async () => {
    if (!email || !password || !name) {
      setError("Todos los campos son obligatorios")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/usuarios/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "No se pudo crear el usuario")

      setUsuarios([...usuarios, data])
      setShowModal(false)
      setName("")
      setEmail("")
      setPassword("")
      setRole("USER")
      toast.success("Usuario creado con éxito 🎉")
    } catch (err) {
      toast.error("Error al crear usuario")
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <p>Cargando...</p>

  return (
    <Layout>
      <Toaster position="top-right" /> {/* 👈 Toasts visibles */}
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Agregar Usuario
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition">
          <div className="bg-white p-6 rounded shadow-md w-96 transform scale-95 transition">
            <h2 className="text-xl font-bold mb-4">Agregar Usuario</h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 mb-2 w-full rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Nombre"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 mb-2 w-full rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-2 w-full rounded focus:ring-2 focus:ring-purple-400"
              placeholder="Contraseña"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 mb-2 w-full rounded"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUsuario}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
              >
                {loading ? (
                  <span className="loader border-2 border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
                ) : (
                  "Crear"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full border rounded overflow-hidden">
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
            <tr key={u.id} className="hover:bg-gray-100 transition">
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">
                {user?.role === "ADMIN" && (
                  u.role === "USER" ? (
                    <button
                      onClick={() => handleChangeRole(u.id, "ADMIN")}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Hacer ADMIN
                    </button>
                  ) : (
                    <button
                      onClick={() => handleChangeRole(u.id, "USER")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Hacer USER
                    </button>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}




