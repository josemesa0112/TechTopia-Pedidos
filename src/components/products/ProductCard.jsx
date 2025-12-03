import React from 'react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="rounded border bg-white p-4 shadow-sm">
      <div className="mb-2">
        <h3 className="font-semibold text-gray-800">{product.nombre}</h3>
        <p className="text-sm text-gray-500">Categoría: {product.categoria}</p>
      </div>

      <div className="mb-2">
        <p className="text-sm">
          <span className="text-yellow-500">★</span> {product.rating} ({product.reviews} reseñas)
        </p>
      </div>

      <div className="mb-3">
        <p className="text-xl font-bold text-gray-900">${product.precio.toFixed(2)}</p>
        {product.precioAnterior && (
          <p className="text-sm text-gray-500 line-through">Antes: ${product.precioAnterior.toFixed(2)}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-medium ${
            product.inStock ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {product.inStock ? 'En stock' : 'Agotado'}
        </span>
        <button
          onClick={() => onAdd(product)}
          disabled={!product.inStock}
          className={`px-3 py-2 rounded text-white text-sm transition ${
            product.inStock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}
