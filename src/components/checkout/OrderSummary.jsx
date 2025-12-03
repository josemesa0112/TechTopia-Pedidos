export default function OrderSummary({ productos }) {
  const subtotal = productos.reduce((acc, p) => acc + p.precio, 0)
  const iva = subtotal * 0.21
  const envio = 0
  const total = subtotal + iva + envio

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
      <ul className="text-sm text-gray-700 mb-4 space-y-1">
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} x 1: ${p.precio.toFixed(2)}
          </li>
        ))}
      </ul>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>IVA (21%):</span>
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
    </div>
  )
}
