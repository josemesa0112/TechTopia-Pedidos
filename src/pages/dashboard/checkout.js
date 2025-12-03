import { useEffect, useState } from "react"
import DashboardLayout from "@/components/ui/DashboardLayout"
import CheckoutForm from "@/components/checkout/CheckoutForm"
import OrderSummary from "@/components/checkout/OrderSummary"
import { getCart } from "@/utils/cart"

export default function CheckoutPage() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    setProductos(getCart())
  }, [])

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CheckoutForm productos={productos} />
        <OrderSummary productos={productos} />
      </div>
    </DashboardLayout>
  )
}
