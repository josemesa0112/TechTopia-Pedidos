import Layout from "@/components/organisms/Layout"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function TransaccionesPage() {
  const [transacciones, setTransacciones] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [cantidad, setCantidad] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  const fetchTransacciones = async () => {
    try {
      const res = await fetch("/api/transacciones")
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Error al cargar transacciones")
      setTransacciones(data)
    } catch (err) {
      setError("No se pudo cargar la lista de transacciones")
    }
  }

  useEffect(() => {
    fetchTransacciones()
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleAddMovimiento = async () => {
    const cantidadNum = parseInt(cantidad, 10)
    if (!cantidadNum || cantidadNum <= 0) {
      setError("La cantidad debe ser mayor a 0")
      return
    }

    const storedUser = localStorage.getItem("user")
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    if (!parsedUser || !parsedUser.id) {
      setError("Debes estar logueado para crear un movimiento")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/transacciones/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cantidad: cantidadNum,
          responsableId: parsedUser.id,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "No se pudo crear el movimiento")

      setShowModal(false)
      setCantidad("")
      await fetchTransacciones()
      toast.success("Movimiento agregado con éxito 🎉")
    } catch (err) {
      toast.error("Error al agregar movimiento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Toaster position="top-right" /> {/* 👈 Toasts visibles */}
      <h1 className="text-2xl font-bold mb-4">Transacciones</h1>

      {user?.role === "ADMIN" && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Agregar movimiento
        </button>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="mb-4">Procesando...</p>}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition">
          <div className="bg-white p-6 rounded shadow-md w-96 transform scale-95 transition">
            <h2 className="text-xl font-bold mb-4">Agregar Movimiento</h2>

            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="border p-2 mb-2 w-full rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Cantidad"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddMovimiento}
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
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Responsable</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((t) => (
            <tr key={t.id} className="hover:bg-gray-100 transition">
              <td className="p-2 border">{t.id}</td>
              <td className="p-2 border">{t.fecha}</td>
              <td className="p-2 border">{t.cantidad}</td>
              <td className="p-2 border">{t.responsable?.email || "Sin datos"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

