import { products, type Product, type ProductCategory } from './products'

export interface CatalogRepository {
  listAllProducts(): readonly Product[]
  listPublishedProducts(category?: ProductCategory): readonly Product[]
  listFeaturedProducts(limit?: number): readonly Product[]
  findPublishedProduct(slug: string): Product | undefined
}

class StaticCatalogRepository implements CatalogRepository {
  constructor(private readonly records: readonly Product[]) {}

  listAllProducts() {
    return [...this.records].sort((a, b) => a.sortOrder - b.sortOrder)
  }

  listPublishedProducts(category?: ProductCategory) {
    return this.listAllProducts().filter(
      (product) => product.status === 'available' && (!category || product.category === category),
    )
  }

  listFeaturedProducts(limit = 8) {
    return this.listPublishedProducts()
      .filter((product) => product.featured)
      .slice(0, limit)
  }

  findPublishedProduct(slug: string) {
    return this.listPublishedProducts().find((product) => product.slug === slug)
  }
}

/**
 * Public pages depend on this repository instead of the storage format.
 * A future admin panel can replace StaticCatalogRepository with an API/database
 * implementation without rewriting the page components.
 */
export const catalog: CatalogRepository = new StaticCatalogRepository(products)
