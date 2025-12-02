import Layout from "@/components/Organisms/Layout"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import toast, { Toaster } from "react-hot-toast"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

export default function TransaccionesPage() {
  const [maestros, setMaestros] = useState([])
  const [selectedMaestro, setSelectedMaestro] = useState(null)
  const [movimientos, setMovimientos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [tipo, setTipo] = useState("ENTRADA")
  const [cantidad, setCantidad] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  // Fetch maestros
  useEffect(() => {
    const fetchMaestros = async () => {
      try {
        const res = await fetch("/api/maestros")
        const data = await res.json()
        setMaestros(data)
      } catch {
        toast.error("Error al cargar maestros")
      }
    }
    fetchMaestros()

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Fetch movimientos por maestro
  useEffect(() => {
    if (!selectedMaestro) return
    const fetchMovimientos = async () => {
      try {
        const res = await fetch(`/api/movimientos?maestroId=${selectedMaestro}`)
        const data = await res.json()
        setMovimientos(data)
      } catch {
        toast.error("Error al cargar movimientos")
      }
    }
    fetchMovimientos()
  }, [selectedMaestro])

  const handleAddMovimiento = async () => {
    if (!selectedMaestro) {
      setError("Debes seleccionar un Maestro primero")
      return
    }
    if (!cantidad || cantidad <= 0) {
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
      const res = await fetch("/api/movimientos/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maestroId: Number(selectedMaestro),
          tipo,
          cantidad,
          responsableId: parsedUser.id,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "No se pudo crear el movimiento")

      setShowModal(false)
      setCantidad(0)
      setTipo("ENTRADA")
      setMovimientos([...movimientos, data.movimiento])
      toast.success("Movimiento agregado con éxito 🎉")
    } catch (err) {
      toast.error("Error al agregar movimiento")
    } finally {
      setLoading(false)
    }
  }

  const chartData = {
    labels: movimientos.map((m) => new Date(m.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Cantidad",
        data: movimientos.map((m) => m.cantidad),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  return (
    <Layout>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Transacciones</h1>

      <select
        className="border p-2 mb-4"
        onChange={(e) => setSelectedMaestro(e.target.value)}
      >
        <option value="">Selecciona un Maestro</option>
        {maestros.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>

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
            <h2 className="text-xl font-bold mb-4">Agregar movimiento</h2>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="border p-2 mb-2 w-full"
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SALIDA">Salida</option>
            </select>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
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

      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Responsable</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((mov) => (
            <tr key={mov.id} className="hover:bg-gray-100 transition">
              <td className="p-2 border">{mov.id}</td>
              <td className="p-2 border">
                {new Date(mov.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 border">{mov.cantidad}</td>
              <td className="p-2 border">
                {mov.responsable?.name || mov.responsable?.email || "Sin datos"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {movimientos.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md">
          <Line data={chartData} />
        </div>
      )}
    </Layout>
  )
}


