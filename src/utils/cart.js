export const getCart = () => {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem("cart")
  return raw ? JSON.parse(raw) : []
}

export const addToCart = (product) => {
  const cart = getCart()
  const exists = cart.find((p) => p.id === product.id)
  if (!exists) {
    cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

export const removeFromCart = (id) => {
  const cart = getCart().filter((p) => p.id !== id)
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const clearCart = () => {
  localStorage.removeItem("cart")
}
