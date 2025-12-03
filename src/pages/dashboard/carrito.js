import { useEffect, useState } from "react"
import CartItem from "@/components/cart/CartItem"
import CartSummary from "@/components/cart/CartSummary"
import { getCart, removeFromCart } from "@/utils/cart"
import DashboardLayout from "@/components/ui/DashboardLayout"

export default function CarritoPage() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    setProductos(getCart())
  }, [])

  const handleRemove = (id) => {
    removeFromCart(id)
    setProductos(getCart())
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          {productos.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío.</p>
          ) : (
            productos.map((p) => (
              <CartItem key={p.id} product={p} onRemove={handleRemove} />
            ))
          )}
        </div>
        <CartSummary productos={productos} />
      </div>
    </DashboardLayout>
  )
}
