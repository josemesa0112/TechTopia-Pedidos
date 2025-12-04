import Layout from "@/components/Organisms/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ConfirmacionPage() {
  const router = useRouter()
  const { pedidoId } = router.query
  const [form, setForm] = useState<any>(null)
  const [productos, setProductos] = useState<any[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true)
      const storedForm = localStorage.getItem("checkoutForm")
      const storedCart = localStorage.getItem("cart")
      if (storedForm) setForm(JSON.parse(storedForm))
      if (storedCart) setProductos(JSON.parse(storedCart))
    }
  }, [router.isReady])

  if (!isReady) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-500">
          Cargando confirmación del pedido...
        </div>
      </Layout>
    )
  }

  const fecha = new Date().toLocaleString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const subtotal = productos.reduce((acc, p) => acc + (p.precio || 0), 0)
  const iva = subtotal * 0.21
  const envio = 0
  const totalFinal = subtotal + iva + envio

  return (
    <Layout>
      <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-600 mb-4">¡Pedido Confirmado!</h1>
        <p className="mb-6">Gracias por tu compra. Tu pedido ha sido recibido.</p>

        {/* Información del pedido */}
        <div className="mb-4">
          <p><strong>Número de pedido:</strong> #{pedidoId || "N/A"}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Estado:</strong> Procesando</p>
        </div>

        {/* Dirección de envío */}
        {form && (
          <div className="mb-4">
            <h2 className="font-bold mb-2">Dirección de Envío</h2>
            <p>{form.nombre} {form.apellido}</p>
            <p>{form.direccion}</p>
            <p>{form.ciudad}, {form.provincia} {form.postal}</p>
            <p>Tel: {form.telefono}</p>
          </div>
        )}

        {/* Productos */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">Productos</h2>
          {productos.length > 0 ? (
            productos.map((p, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{p.nombre} x 1</span>
                <span>${p.precio?.toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No se encontraron productos</p>
          )}
        </div>

        {/* Totales */}
        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>IVA (21%):</span><span>${iva.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Envío:</span><span>Gratis</span></div>
          <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
            <span>Total:</span>
            <span>${totalFinal.toFixed(2)}</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Imprimir
          </button>
          <button
            onClick={() => router.push("/dashboard/productos")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continuar Comprando
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </Layout>
  )
}

