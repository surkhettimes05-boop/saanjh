'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from './ProductCard'
import type { Locale } from '@/lib/i18n'
import type { Product, ProductCategory } from '@/lib/products'

type Filter = 'all' | ProductCategory

export function ProductCatalog({ products, locale }: { products: Product[]; locale: Locale }) {
  const [filter, setFilter] = useState<Filter>('all')
  const en = locale === 'en'
  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((product) => product.category === filter)),
    [filter, products],
  )

  const filters: Array<[Filter, string]> = [
    ['all', en ? 'All products' : 'सबै उत्पादन'],
    ['pulses', en ? 'Pulses' : 'दाल'],
    ['beans', en ? 'Beans' : 'गेडागुडी'],
  ]

  return (
    <>
      <div className="filters" aria-label={en ? 'Product categories' : 'उत्पादन श्रेणी'}>
        {filters.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`filter${filter === value ? ' active' : ''}`}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} locale={locale} />
        ))}
      </div>
      {visible.length === 0 && <p>{en ? 'No products in this category yet.' : 'यस श्रेणीमा अहिले उत्पादन छैन।'}</p>}
    </>
  )
}
