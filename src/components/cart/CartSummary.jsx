import React from "react"

export default function CartSummary({ productos }) {
  const subtotal = productos.reduce((acc, p) => acc + p.precio, 0)
  const iva = subtotal * 0.19
  const envio = 0
  const total = subtotal + iva + envio

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>IVA (19%):</span>
          <span>${iva.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío:</span>
          <span>Gratis</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {/* ✅ Botón corregido: redirige a checkout */}
        <a
          href="/dashboard/checkout"
          className="block w-full bg-green-600 text-white py-2 rounded text-center hover:bg-green-700 transition"
        >
          Proceder al Pago
        </a>

        <a
          href="/dashboard/productos"
          className="text-center text-blue-600 hover:underline text-sm"
        >
          Continuar Comprando
        </a>
      </div>
    </div>
  )
}

