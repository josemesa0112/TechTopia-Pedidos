import React from 'react'

const CATEGORIAS = ['Electrónica', 'Accesorios', 'Audio', 'Muebles', 'Iluminación']

export default function ProductFilters({
  filtros,
  setFiltros,
}) {
  const handleCategoriaToggle = (cat) => {
    const set = new Set(filtros.categorias)
    if (set.has(cat)) set.delete(cat)
    else set.add(cat)
    setFiltros({ ...filtros, categorias: Array.from(set) })
  }

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="rounded border bg-white p-4 shadow-sm">
        <h4 className="mb-3 font-semibold text-gray-800">Categorías</h4>
        <ul className="space-y-2 mb-4">
          {CATEGORIAS.map((cat) => (
            <li key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`cat-${cat}`}
                checked={filtros.categorias.includes(cat)}
                onChange={() => handleCategoriaToggle(cat)}
              />
              <label htmlFor={`cat-${cat}`} className="text-sm text-gray-700">{cat}</label>
            </li>
          ))}
        </ul>

        <h4 className="mb-3 font-semibold text-gray-800">Rango de precio</h4>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            placeholder="Mín $0"
            className="w-full rounded border px-2 py-1"
            value={filtros.min}
            onChange={(e) => setFiltros({ ...filtros, min: Number(e.target.value || 0) })}
          />
          <input
            type="number"
            placeholder="Máx $9999"
            className="w-full rounded border px-2 py-1"
            value={filtros.max}
            onChange={(e) => setFiltros({ ...filtros, max: Number(e.target.value || 0) })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="inStock"
            checked={filtros.inStock}
            onChange={(e) => setFiltros({ ...filtros, inStock: e.target.checked })}
          />
          <label htmlFor="inStock" className="text-sm text-gray-700">
            Solo productos en stock
          </label>
        </div>
      </div>
    </aside>
  )
}
