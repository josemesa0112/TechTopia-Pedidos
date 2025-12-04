import { useState } from "react"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { clearCart } from "@/utils/cart"

export default function CheckoutForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    email: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    postal: "",
    tarjeta: "",
    titular: "",
    vencimiento: "",
    cvv: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let responsableId = null
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      responsableId = storedUser ? JSON.parse(storedUser).id : null
    }

    // Recuperar carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, productos: cart, responsableId }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Pedido confirmado 🎉")

        // Guardar datos para la página de confirmación
        localStorage.setItem("checkoutForm", JSON.stringify(form))
        localStorage.setItem("cart", JSON.stringify(cart))

        // Redirigir a confirmación con el ID del movimiento
        router.push(`/dashboard/confirmacion?pedidoId=${data.movimientoId}`)

        // Limpiar carrito
        clearCart()
      } else {
        toast.error(data.error || "Error al confirmar el pedido")
      }
    } catch {
      toast.error("Error de conexión con el servidor")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 space-y-6"
    >
      <h2 className="text-xl font-bold">Finalizar Compra</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="email" placeholder="Correo Electrónico *" value={form.email} onChange={handleChange} required className="input" />
        <input name="telefono" placeholder="Teléfono *" value={form.telefono} onChange={handleChange} required className="input" />
        <input name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} required className="input" />
        <input name="apellido" placeholder="Apellido *" value={form.apellido} onChange={handleChange} required className="input" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="direccion" placeholder="Dirección *" value={form.direccion} onChange={handleChange} required className="input" />
        <input name="ciudad" placeholder="Ciudad *" value={form.ciudad} onChange={handleChange} required className="input" />
        <input name="provincia" placeholder="Provincia *" value={form.provincia} onChange={handleChange} required className="input" />
        <input name="postal" placeholder="Código Postal *" value={form.postal} onChange={handleChange} required className="input" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="tarjeta" placeholder="Número de Tarjeta *" value={form.tarjeta} onChange={handleChange} required className="input" />
        <input name="titular" placeholder="Nombre en la Tarjeta *" value={form.titular} onChange={handleChange} required className="input" />
        <input name="vencimiento" placeholder="Vencimiento (MM/AA) *" value={form.vencimiento} onChange={handleChange} required className="input" />
        <input name="cvv" placeholder="CVV *" value={form.cvv} onChange={handleChange} required className="input" />
      </div>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        Confirmar Pedido
      </button>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Al confirmar aceptas nuestros términos y condiciones
      </p>
    </form>
  )
}

