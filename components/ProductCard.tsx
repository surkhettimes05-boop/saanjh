import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import type { Locale } from '@/lib/i18n'
import { messages } from '@/lib/i18n'

export function ProductCard({product,locale}:{product:Product;locale:Locale}){const isEn=locale==='en';return <article className="product-card" style={{'--accent':product.accentColor,'--accent-soft':product.accentSoft} as React.CSSProperties}><div className="product-image-wrap">{product.image?<Image className="product-image" src={product.image} alt={`${product.nameEnglish} ${product.packSizes[0]} SAANJH pack`} width={600} height={760}/>:<div className="product-fallback"><div>SAANJH<span>{product.nameEnglish}</span><small>{product.nameNepali}</small></div></div>}</div><div className="product-body"><h3>{isEn?product.nameEnglish:product.nameNepali}</h3><div className="meta">{isEn?product.nameNepali:product.nameEnglish} · {product.packSizes.join(', ')}</div><Link className="text-link" href={`/${locale}/products/${product.slug}`}>{messages[locale].view} →</Link></div></article>}
