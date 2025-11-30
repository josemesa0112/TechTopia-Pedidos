import DashboardLayout from "@/components/DashLayout"
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

export default function TransaccionesPage() {
  const [maestros, setMaestros] = useState([])
  const [selectedMaestro, setSelectedMaestro] = useState(null)
  const [movimientos, setMovimientos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [tipo, setTipo] = useState("entrada")
  const [cantidad, setCantidad] = useState(0)

  const handleAddMovimiento = async () => {
    if (!selectedMaestro) {
      alert("Debes seleccionar un Maestro primero")
      return
    }
    const res = await fetch("/api/transacciones/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ maestroId: selectedMaestro, tipo, cantidad })
    })
    const data = await res.json()
    if (res.ok) {
      setShowModal(false)
      setCantidad(0)
      setTipo("entrada")
      setMovimientos([...movimientos, data])
    }
  }

  useEffect(() => {
    const fetchMaestros = async () => {
      const res = await fetch("/api/maestros")
      const data = await res.json()
      setMaestros(data)
    }
    fetchMaestros()
  }, [])

  useEffect(() => {
    if (!selectedMaestro) return
    const fetchMovimientos = async () => {
      const res = await fetch(`/api/transacciones?maestroId=${selectedMaestro}`)
      const data = await res.json()
      setMovimientos(data)
    }
    fetchMovimientos()
  }, [selectedMaestro])

  const chartData = {
    labels: movimientos.map(m => new Date(m.fecha).toLocaleDateString()),
    datasets: [
      {
        label: "Saldo",
        data: movimientos.map(m => m.saldo ?? m.cantidad),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)",
        tension: 0.3,
        fill: true
      }
    ]
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Transacciones</h1>

      <select
        className="border p-2 mb-4"
        onChange={(e) => setSelectedMaestro(e.target.value)}
      >
        <option value="">Selecciona un Maestro</option>
        {maestros.map((m) => (
          <option key={m.id} value={m.id}>{m.nombre}</option>
        ))}
      </select>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Agregar movimiento
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Agregar movimiento</h2>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="border p-2 mb-2 w-full">
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="border p-2 mb-2 w-full"
              placeholder="Cantidad"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
              <button onClick={handleAddMovimiento} className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
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
            <tr key={mov.id}>
              <td className="p-2 border">{mov.id}</td>
              <td className="p-2 border">{new Date(mov.fecha).toLocaleDateString()}</td>
              <td className="p-2 border">{mov.cantidad}</td>
              <td className="p-2 border">{mov.usuario?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {movimientos.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md">
          <Line data={chartData} />
        </div>
      )}
    </DashboardLayout>
  )
}
