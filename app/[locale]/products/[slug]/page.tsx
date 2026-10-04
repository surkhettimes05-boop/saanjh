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
        'x-default': `/ne/products/${slug}`,
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
  const alternateName = en ? product.nameNepali : product.nameEnglish
  const description = en ? product.descriptionEnglish : product.descriptionNepali
  const consumerWa = whatsappUrl(
    en
      ? `Hello SAANJH, I want to buy ${product.nameEnglish} (${product.packSizes.join(', ')}). Please share the current price and nearest availability.`
      : `नमस्ते SAANJH, म ${product.nameNepali} (${product.packSizes.join(', ')}) किन्न चाहन्छु। कृपया हालको मूल्य र नजिकको उपलब्धता बताउनुहोस्।`,
  )
  const retailerWa = whatsappUrl(
    en
      ? `Hello SAANJH, I want to stock ${product.nameEnglish} in my shop. Please share trade price, MOQ and supply details.`
      : `नमस्ते SAANJH, म मेरो पसलमा ${product.nameNepali} स्टक गर्न चाहन्छु। कृपया व्यापारिक मूल्य, न्यूनतम अर्डर र आपूर्ति विवरण पठाउनुहोस्।`,
  )

  const faq = en
    ? [
        { q: `What is ${product.nameEnglish}?`, a: description },
        {
          q: `What pack size is available?`,
          a: `The current catalogue lists ${product.packSizes.join(', ')}.`,
        },
        {
          q: 'What is the current price?',
          a: 'A verified retail MRP is not stored in the site data yet. Use the customer WhatsApp path for the current price; business buyers can request a trade quote.',
        },
        {
          q: `How should ${product.nameEnglish} be stored?`,
          a: product.storageEnglish,
        },
      ]
    : [
        { q: `${product.nameNepali} के हो?`, a: description },
        {
          q: 'कुन प्याक साइज उपलब्ध छ?',
          a: `हालको सूचीमा ${product.packSizes.join(', ')} प्याक उल्लेख छ।`,
        },
        {
          q: 'हालको मूल्य कति हो?',
          a: 'वेबसाइट डाटामा प्रमाणित खुद्रा MRP अझै राखिएको छैन। हालको मूल्यका लागि ग्राहक ह्वाट्सएप मार्ग प्रयोग गर्नुहोस्; व्यवसायिक खरिदकर्ताले व्यापारिक मूल्य माग्न सक्छन्।',
        },
        {
          q: `${product.nameNepali} कसरी राख्ने?`,
          a: product.storageNepali,
        },
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

      <section className="section detail product-detail-commerce">
        <div className="container">
          <nav className="breadcrumbs">
            <Link href={`/${locale}`}>{en ? 'Home' : 'गृहपृष्ठ'}</Link> /{' '}
            <Link href={`/${locale}/products`}>{en ? 'Products' : 'उत्पादन'}</Link> / {name}
          </nav>

          <div className="detail-grid">
            <div className="detail-image product-detail-image" style={{ background: product.accentSoft }}>
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.nameEnglish} SAANJH front pack`}
                  width={760}
                  height={980}
                  priority
                  sizes="(max-width: 720px) 92vw, 45vw"
                />
              ) : (
                <div
                  className="product-fallback"
                  style={{ '--accent': product.accentColor } as React.CSSProperties}
                >
                  <div>
                    SAANJH<span>{product.nameEnglish}</span><small>{product.nameNepali}</small>
                  </div>
                </div>
              )}
              <span className="pack-photo-tag">{en ? 'Front pack image' : 'अगाडिको प्याक फोटो'}</span>
            </div>

            <div className="product-buy-panel">
              <span className="eyebrow">SAANJH · साँझ · {product.category}</span>
              <h1>{name}</h1>
              <p className="product-alt-name nepali">{alternateName}</p>
              <p className="lead">{description}</p>

              <div className="detail-answer-grid">
                <div>
                  <span>{en ? 'What is it?' : 'यो के हो?'}</span>
                  <strong>{en ? 'Packaged everyday dal / pulse' : 'प्याक गरिएको दैनिक दाल / गेडागुडी'}</strong>
                </div>
                <div>
                  <span>{en ? 'Who is it for?' : 'कसका लागि?'}</span>
                  <strong>{en ? 'Homes + food retailers' : 'घरपरिवार + खाद्यान्न विक्रेता'}</strong>
                </div>
                <div>
                  <span>{en ? 'Pack size' : 'प्याक साइज'}</span>
                  <strong>{product.packSizes.join(', ')}</strong>
                </div>
                <div>
                  <span>{en ? 'Current price' : 'हालको मूल्य'}</span>
                  <strong>{en ? 'Confirm before buying' : 'किन्नुअघि पुष्टि गर्नुहोस्'}</strong>
                </div>
              </div>

              <div className="pills">
                <span className="pill">{en ? 'Correct weight promise' : 'पूरा तौलको प्रतिबद्धता'}</span>
                <span className="pill">{en ? 'Clear pack size' : 'स्पष्ट प्याक साइज'}</span>
                <span className="pill">SKU: {product.sku}</span>
              </div>

              <div className="buy-path-grid">
                <article className="buy-path-card">
                  <span className="path-label">{en ? 'Customer' : 'ग्राहक'}</span>
                  <h2>{en ? 'Want to buy this pack?' : 'यो प्याक किन्न चाहनुहुन्छ?'}</h2>
                  <p>
                    {en
                      ? 'Ask for the current price and nearest availability.'
                      : 'हालको मूल्य र नजिकको उपलब्धता सोध्नुहोस्।'}
                  </p>
                  <div className="actions compact-actions">
                    {consumerWa && (
                      <a className="button whatsapp-button" href={consumerWa} target="_blank" rel="noreferrer">
                        {en ? 'WhatsApp to buy' : 'किन्न ह्वाट्सएप'}
                      </a>
                    )}
                    <Link className="button secondary" href={`/${locale}/contact`}>
                      {en ? 'Where to buy' : 'कहाँ किन्ने'}
                    </Link>
                  </div>
                </article>

                <article className="buy-path-card trade-card">
                  <span className="path-label">{en ? 'Retailer / distributor' : 'विक्रेता / वितरक'}</span>
                  <h2>{en ? 'Want to stock it?' : 'स्टक गर्न चाहनुहुन्छ?'}</h2>
                  <p>
                    {en
                      ? 'Request current trade price, MOQ and supply details.'
                      : 'हालको व्यापारिक मूल्य, न्यूनतम अर्डर र आपूर्ति विवरण माग्नुहोस्।'}
                  </p>
                  <div className="actions compact-actions">
                    <Link className="button secondary" href={`/${locale}/retailers`}>
                      {en ? 'Stock this brand' : 'यो ब्रान्ड स्टक गर्नुहोस्'}
                    </Link>
                    {retailerWa && (
                      <a className="text-link path-wa" href={retailerWa} target="_blank" rel="noreferrer">
                        WhatsApp →
                      </a>
                    )}
                  </div>
                </article>
              </div>

              <p className="price-note detail-price-note">
                {en
                  ? 'We do not invent an MRP: a verified price has not yet been entered in the website data.'
                  : 'हामी बनावटी MRP राख्दैनौं: वेबसाइट डाटामा प्रमाणित मूल्य अझै प्रविष्ट गरिएको छैन।'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section product-standard">
        <div className="container detail-standard-grid">
          <div>
            <span className="eyebrow">{en ? 'Product facts' : 'उत्पादन तथ्य'}</span>
            <h2>{en ? 'What you can verify now.' : 'अहिले नै जाँच्न मिल्ने कुरा।'}</h2>
          </div>
          <div className="info-grid product-info-grid">
            <div className="info-box">
              <strong>{en ? 'Pack size' : 'प्याक साइज'}</strong>
              {product.packSizes.join(', ')}
            </div>
            <div className="info-box">
              <strong>SKU</strong>
              {product.sku}
            </div>
            <div className="info-box">
              <strong>{en ? 'Storage' : 'भण्डारण'}</strong>
              {en ? product.storageEnglish : product.storageNepali}
            </div>
            <div className="info-box">
              <strong>{en ? 'Everyday use' : 'दैनिक प्रयोग'}</strong>
              {en ? product.useEnglish : product.useNepali}
            </div>
          </div>
          <p className="evidence-note back-photo-note">
            {en
              ? 'The repository currently contains the front pack artwork, but no verified production back-pack photograph. We leave that evidence missing rather than presenting a mock as proof.'
              : 'रिपोजिटरीमा हाल अगाडिको प्याक आर्टवर्क छ, तर प्रमाणित उत्पादन पछाडिको प्याक फोटो छैन। प्रमाणको रूपमा नक्कली फोटो देखाउनुको सट्टा यो कुरा स्पष्ट राखिएको छ।'}
          </p>
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
