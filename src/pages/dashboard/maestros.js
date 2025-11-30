import DashboardLayout from "@/components/DashLayout"
import { useEffect, useState } from "react"

export default function MaestrosPage() {
  const [maestros, setMaestros] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")

  useEffect(() => {
    const fetchMaestros = async () => {
      const res = await fetch("/api/maestros")
      const data = await res.json()
      setMaestros(data)
    }
    fetchMaestros()
  }, [])

  const handleAddMaestro = async () => {
    const res = await fetch("/api/maestros/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, descripcion })
    })
    const data = await res.json()
    if (res.ok) {
      setShowModal(false)
      setNombre("")
      setDescripcion("")
      setMaestros([...maestros, data])
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

            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Descripción"
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
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {maestros.map((m) => (
            <tr key={m.id}>
              <td className="p-2 border">{m.id}</td>
              <td className="p-2 border">{m.nombre}</td>
              <td className="p-2 border">{m.descripcion}</td>
              <td className="p-2 border">
                {new Date(m.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  )
}
