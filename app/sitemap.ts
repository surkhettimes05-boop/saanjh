import type { MetadataRoute } from 'next'
import { catalog } from '@/lib/content-repository'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl
  const routes = ['', '/products', '/about', '/retailers', '/contact', '/faq', '/privacy', '/terms']
  const products = catalog.listPublishedProducts()

  return ['en', 'ne'].flatMap((locale) => [
    ...routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : route === '/products' ? 0.9 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${base}/${locale}/products/${product.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ])
}
