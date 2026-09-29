import React, { useState } from 'react'

export interface ProductItem {
  id: string
  name: string
  price: string
  tag: string
  stock: number
  imageUrl: string
}

export function InteractiveMotionCatalogExample({ product }: { product: ProductItem }) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const handleToggleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <article className="catalog-product-card cojeev-card-hover group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl">
      {/* Visual Art with Zoom & Shimmer */}
      <div className="relative aspect-[4/4.5] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Shimmer Light-Sweep Badge */}
        <span className="cojeev-shimmer absolute top-3 left-3 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 shadow-sm">
          {product.tag}
        </span>

        {/* Reactive Heart Burst Tag */}
        {likes > 0 && (
          <span
            key={likes}
            className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-lg bg-slate-900/80 px-2 py-1 text-xs font-bold text-white shadow-sm"
          >
            <span className="cojeev-heart-burst inline-block text-rose-400">♥</span>
            {likes}
          </span>
        )}
      </div>

      {/* Card Body & Tactile Flow-Press Button */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-bold text-slate-900">{product.name}</h3>
        <p className="mt-1 text-xs text-slate-500">Stock: {product.stock} disponibles</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <strong className="text-lg font-extrabold text-slate-900">{product.price}</strong>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleLike}
              className="flow-press grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-slate-100"
              aria-label="Dar me gusta"
            >
              <span className={isLiked ? 'cojeev-heart-burst text-rose-500' : ''}>♥</span>
            </button>

            <button
              type="button"
              className="flow-press rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-indigo-700"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
