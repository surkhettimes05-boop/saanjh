import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaqList } from '@/components/FaqList'
import { JsonLd } from '@/components/JsonLd'
import { ProductCard } from '@/components/ProductCard'
import { catalog } from '@/lib/content-repository'
import { isLocale, locales } from '@/lib/i18n'
import { siteConfig, whatsappUrl } from '@/lib/site-config'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    catalog.listPublishedProducts().map((product) => ({ locale, slug: product.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const product = catalog.findPublishedProduct(slug)
  if (!product) return {}
  const en = locale === 'en'
  const title = `${en ? product.nameEnglish : product.nameNepali} — ${product.packSizes.join(', ')}`
  const description = en ? product.descriptionEnglish : product.descriptionNepali

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/products/${slug}`,
      languages: {
        en: `/en/products/${slug}`,
        ne: `/ne/products/${slug}`,
        'x-default': `/en/products/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | SAANJH`,
      description,
      images: product.image ? [product.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SAANJH`,
      description,
      images: product.image ? [product.image] : [],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const product = catalog.findPublishedProduct(slug)
  if (!product) notFound()

  const en = locale === 'en'
  const name = en ? product.nameEnglish : product.nameNepali
  const description = en ? product.descriptionEnglish : product.descriptionNepali
  const wa = whatsappUrl(`Hello SAANJH, I would like to know about ${product.nameEnglish}.`)
  const faq = en
    ? [
        { q: `What is ${product.nameEnglish}?`, a: description },
        {
          q: `What pack size is available for ${product.nameEnglish}?`,
          a: `The current catalogue lists ${product.packSizes.join(', ')}. Contact SAANJH to confirm availability.`,
        },
        { q: `How should ${product.nameEnglish} be stored?`, a: product.storageEnglish },
      ]
    : [
        { q: `${product.nameNepali} के हो?`, a: description },
        {
          q: `${product.nameNepali} कुन प्याक साइजमा उपलब्ध छ?`,
          a: `हालको सूचीमा ${product.packSizes.join(', ')} प्याक उल्लेख छ। उपलब्धता पुष्टि गर्न SAANJH लाई सम्पर्क गर्नुहोस्।`,
        },
        { q: `${product.nameNepali} कसरी राख्ने?`, a: product.storageNepali },
      ]

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameEnglish,
    alternateName: product.nameNepali,
    description: product.descriptionEnglish,
    image: product.image ? `${siteConfig.baseUrl}${product.image}` : undefined,
    brand: { '@type': 'Brand', name: 'SAANJH by Pasalho' },
    category: product.category,
    sku: product.sku,
    size: product.packSizes.join(', '),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.baseUrl}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${siteConfig.baseUrl}/${locale}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.nameEnglish,
        item: `${siteConfig.baseUrl}/${locale}/products/${product.slug}`,
      },
    ],
  }
  const related = catalog
    .listPublishedProducts(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      <JsonLd data={[productSchema, breadcrumb]} />
      <section className="section detail">
        <div className="container">
          <nav className="breadcrumbs">
            <Link href={`/${locale}`}>{en ? 'Home' : 'गृहपृष्ठ'}</Link> /{' '}
            <Link href={`/${locale}/products`}>{en ? 'Products' : 'उत्पादन'}</Link> / {name}
          </nav>
          <div className="detail-grid">
            <div className="detail-image" style={{ background: product.accentSoft }}>
              {product.image ? (
                <Image src={product.image} alt={`${product.nameEnglish} SAANJH pack`} width={760} height={980} priority />
              ) : (
                <div
                  className="product-fallback"
                  style={{ '--accent': product.accentColor } as React.CSSProperties}
                >
                  <div>
                    SAANJH<span>{product.nameEnglish}</span>
                    <small>{product.nameNepali}</small>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className="eyebrow">SAANJH · {product.category}</span>
              <h1>{name}</h1>
              <p className="nepali">{en ? product.nameNepali : product.nameEnglish}</p>
              <p className="lead">{description}</p>
              <div className="pills">
                <span className="pill">{en ? 'Clean' : 'सफा'}</span>
                <span className="pill">{en ? 'Correct Weight' : 'पूरा तौल'}</span>
                <span className="pill">{en ? 'Fair Price' : 'सही दाम'}</span>
              </div>
              <div className="info-grid">
                <div className="info-box">
                  <strong>{en ? 'Available pack size' : 'उपलब्ध प्याक साइज'}</strong>
                  {product.packSizes.join(', ')}
                </div>
                <div className="info-box">
                  <strong>{en ? 'Storage' : 'भण्डारण'}</strong>
                  {en ? product.storageEnglish : product.storageNepali}
                </div>
                <div className="info-box">
                  <strong>{en ? 'Everyday use' : 'दैनिक प्रयोग'}</strong>
                  {en ? product.useEnglish : product.useNepali}
                </div>
                <div className="info-box">
                  <strong>{en ? 'Availability' : 'उपलब्धता'}</strong>
                  {en
                    ? 'Ask us for current retail or trade availability.'
                    : 'हालको खुद्रा वा व्यापारिक उपलब्धताबारे हामीलाई सोध्नुहोस्।'}
                </div>
              </div>
              <div className="actions">
                {wa && (
                  <a className="button" href={wa} target="_blank" rel="noreferrer">
                    {en ? 'Ask on WhatsApp' : 'ह्वाट्सएपमा सोध्नुहोस्'}
                  </a>
                )}
                <Link className="button secondary" href={`/${locale}/retailers`}>
                  {en ? 'Retailer inquiry' : 'विक्रेता इन्क्वायरी'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section story">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2>{en ? `About ${product.nameEnglish}` : `${product.nameNepali} बारे`}</h2>
            </div>
          </div>
          <FaqList items={faq} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'More staples' : 'थप खाद्यान्न'}</span>
              <h2>{en ? 'Related products' : 'सम्बन्धित उत्पादन'}</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
