import { useState } from "react"
import toast from "react-hot-toast"

export default function CheckoutForm({ productos }) {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Pedido confirmado 🎉")
    // Aquí podrías enviar a backend o limpiar carrito
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
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
