import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import type { Locale } from '@/lib/i18n'

export function ProductCard({
  product,
  locale,
}: {
  product: Product
  locale: Locale
}) {
  const en = locale === 'en'

  return (
    <article
      className="product-card"
      style={
        {
          '--accent': product.accentColor,
          '--accent-soft': product.accentSoft,
        } as React.CSSProperties
      }
    >
      <Link href={`/${locale}/products/${product.slug}`} aria-label={`${product.nameEnglish} / ${product.nameNepali}`}>
        <div className="product-image-wrap">
          {product.image ? (
            <Image
              className="product-image"
              src={product.image}
              alt={`${product.nameEnglish} ${product.packSizes[0]} SAANJH pack`}
              width={600}
              height={760}
              sizes="(max-width: 430px) 92vw, (max-width: 720px) 46vw, 25vw"
            />
          ) : (
            <div className="product-fallback">
              <div>
                SAANJH<span>{product.nameEnglish}</span><small>{product.nameNepali}</small>
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="product-body">
        <span className="product-kicker">{en ? 'दैनिक खाद्यान्न' : 'Everyday staple'}</span>
        <h3>{en ? product.nameEnglish : product.nameNepali}</h3>
        <div className="product-bilingual-name nepali">
          {en ? product.nameNepali : product.nameEnglish}
        </div>
        <div className="product-card-facts">
          <span>{product.packSizes.join(', ')}</span>
          <span>{en ? 'Current price: ask' : 'हालको मूल्य: सोध्नुहोस्'}</span>
        </div>
        <Link className="text-link product-card-link" href={`/${locale}/products/${product.slug}`}>
          {en ? 'See pack & buying details' : 'प्याक र किन्ने विवरण हेर्नुहोस्'} →
        </Link>
      </div>
    </article>
  )
}
