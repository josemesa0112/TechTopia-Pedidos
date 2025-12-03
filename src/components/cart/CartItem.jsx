export default function CartItem({ product, onRemove }) {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div>
        <h3 className="font-semibold text-gray-800">{product.nombre}</h3>
        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
      </div>
      <div className="text-right">
        <p className="text-gray-800 font-medium">${product.precio.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Subtotal: ${product.precio.toFixed(2)}</p>
        <button
          onClick={() => onRemove(product.id)}
          className="text-red-500 text-sm mt-1 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
