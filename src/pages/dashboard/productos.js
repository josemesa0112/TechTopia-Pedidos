import React, { useEffect, useMemo, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import ProductFilters from "@/components/products/ProductFilters"
import ProductCard from "@/components/products/ProductCard"
import DashboardLayout from "@/components/ui/DashboardLayout"
import { addToCart } from "@/utils/cart" // 👈 integración con carrito

export default function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [orden, setOrden] = useState("relevancia") // relevancia | precio-asc | precio-desc | rating
  const [filtros, setFiltros] = useState({
    categorias: [],
    min: 0,
    max: 9999,
    inStock: false,
  })

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("/api/productos")
        const data = await res.json()
        setProductos(Array.isArray(data) ? data : [])
      } catch {
        toast.error("Error al cargar productos")
      }
    }
    fetchProductos()
  }, [])

  const productosFiltrados = useMemo(() => {
    let list = [...productos]

    // Búsqueda
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      list = list.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q)
      )
    }

    // Categorías
    if (filtros.categorias.length > 0) {
      list = list.filter((p) => filtros.categorias.includes(p.categoria))
    }

    // Stock
    if (filtros.inStock) {
      list = list.filter((p) => p.inStock)
    }

    // Precio
    list = list.filter(
      (p) => p.precio >= (filtros.min || 0) && p.precio <= (filtros.max || 999999)
    )

    // Orden
    switch (orden) {
      case "precio-asc":
        list.sort((a, b) => a.precio - b.precio)
        break
      case "precio-desc":
        list.sort((a, b) => b.precio - a.precio)
        break
      case "rating":
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return list
  }, [productos, busqueda, filtros, orden])

  // 👇 Aquí conectamos el botón con el carrito
  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`"${product.nombre}" agregado al carrito`)
  }

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Catálogo de Productos</h1>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="rounded border px-3 py-2 w-64"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="rounded border px-3 py-2"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            title="Ordenar por"
          >
            <option value="relevancia">Ordenar: Relevancia</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <ProductFilters filtros={filtros} setFiltros={setFiltros} />

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={handleAddToCart} />
          ))}
          {productosFiltrados.length === 0 && (
            <div className="col-span-full rounded border bg-white p-6 text-center text-gray-600">
              No se encontraron productos con los filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Botón flotante para acceder rápido al carrito */}
      <a
        href="/dashboard/carrito"
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        🛒 Ver Carrito
      </a>
    </DashboardLayout>
  )
}

