export default function BienvenidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-orange-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tu Tienda de Tecnología de Confianza
        </h1>
        <p className="text-gray-600 mb-6">
          Envío rápido, garantía extendida y atención excepcional. ¡Explora lo mejor en tecnología!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a
            href="/dashboard/productos"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Explorar Catálogo
          </a>
          <a
            href="/dashboard/ayuda"
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Centro de Ayuda
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">🚚 Envío Rápido</h3>
            <p className="text-sm text-gray-600">
              Entrega en 24-48 horas en la mayoría de productos. Seguimiento en tiempo real.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">🔒 Compra Segura</h3>
            <p className="text-sm text-gray-600">
              Protección de comprador y garantía de devolución de dinero en 30 días.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">💬 Soporte Premium</h3>
            <p className="text-sm text-gray-600">
              Atención al cliente 24/7 para resolver todas tus dudas y consultas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

