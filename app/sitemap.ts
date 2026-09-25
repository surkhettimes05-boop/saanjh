import type { MetadataRoute } from 'next'
import { products } from '@/lib/products'
import { siteConfig } from '@/lib/site-config'
export const dynamic = 'force-static'
export default function sitemap():MetadataRoute.Sitemap{const base=siteConfig.baseUrl;const routes=['','/products','/about','/retailers','/contact','/faq','/privacy','/terms'];return ['en','ne'].flatMap(locale=>[...routes.map(route=>({url:`${base}/${locale}${route}`,lastModified:new Date(),changeFrequency:route===''?'weekly' as const:'monthly' as const,priority:route===''?1:(route==='/products' ? .9 : .7)})),...products.map(p=>({url:`${base}/${locale}/products/${p.slug}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.8}))])}
