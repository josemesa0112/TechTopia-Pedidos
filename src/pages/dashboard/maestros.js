import DashboardLayout from "@/components/ui/DashboardLayout"
import { useEffect, useState } from "react"

export default function MaestrosPage() {
  const [maestros, setMaestros] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchMaestros = async () => {
    try {
      const res = await fetch("/api/maestros")
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Error al cargar maestros")
      setMaestros(data)
    } catch (err) {
      setError("No se pudo cargar la lista de maestros")
    }
  }

  useEffect(() => {
    fetchMaestros()
  }, [])

  const handleAddMaestro = async () => {
    const nombreTrim = nombre.trim()
    if (!nombreTrim) {
      setError("El nombre es obligatorio")
      return
    }

    // Obtener usuario logueado desde localStorage
    const storedUser = localStorage.getItem("user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    if (!parsedUser || !parsedUser.id) {
      setError("Debes estar logueado para crear un maestro")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/maestros/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreTrim, creadorId: parsedUser.id })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "No se pudo crear el maestro")

      setShowModal(false)
      setNombre("")
      await fetchMaestros()
    } catch (err) {
      setError("Error al crear el maestro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Maestros</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Agregar Maestro
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="mb-4">Procesando...</p>}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Maestro</h2>

            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Nombre"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddMaestro}
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
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {maestros.map((m) => (
            <tr key={m.id}>
              <td className="p-2 border">{m.id}</td>
              <td className="p-2 border">{m.nombre}</td>
              <td className="p-2 border">
                {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  )
}
