import { useRouter } from "next/router"
import { clearCart } from "@/utils/cart"

const router = useRouter()

const handleSubmit = async (e) => {
  e.preventDefault()

  const storedUser = localStorage.getItem("user")
  const responsableId = storedUser ? JSON.parse(storedUser).id : null

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form, productos, responsableId }),
    })

    const data = await res.json()

    if (res.ok) {
      toast.success("Pedido confirmado 🎉")
      clearCart()
      router.push("/dashboard/transacciones")
    } else {
      toast.error(data.error || "Error al confirmar el pedido")
    }
  } catch {
    toast.error("Error de conexión con el servidor")
  }
}

