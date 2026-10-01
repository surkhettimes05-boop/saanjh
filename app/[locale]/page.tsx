import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { FaqList } from '@/components/FaqList'
import { catalog } from '@/lib/content-repository'
import { isLocale, messages } from '@/lib/i18n'
import { whatsappUrl } from '@/lib/site-config'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const m = messages[locale]
  const en = locale === 'en'
  const featuredProducts = [...catalog.listFeaturedProducts(8)]
  const productWa = whatsappUrl(
    en
      ? 'Hello SAANJH, I would like to know more about your products.'
      : 'नमस्ते SAANJH, म तपाईंका उत्पादनबारे थप जान्न चाहन्छु।',
  )
  const retailerWa = whatsappUrl(
    en
      ? 'Hello SAANJH, I am interested in stocking SAANJH products in my store.'
      : 'नमस्ते SAANJH, म मेरो पसलमा SAANJH उत्पादन राख्न इच्छुक छु।',
  )
  const faqs = en
    ? [
        {
          q: 'What is SAANJH?',
          a: 'SAANJH is an everyday staples brand by Pasalho offering packaged pulses and household staples.',
        },
        {
          q: 'What products does SAANJH offer?',
          a: 'SAANJH currently offers Masoor Dal, Moong Dal, Chana Dal, Rahar Dal, Maas Dal and several beans and chickpeas.',
        },
        {
          q: 'Where can I buy SAANJH?',
          a: 'Use the Contact page to ask about current retail availability near you.',
        },
        {
          q: 'Does SAANJH supply retailers?',
          a: 'Yes. Retailers and business buyers can use the retailer inquiry page or a configured direct contact channel.',
        },
        {
          q: 'What pack sizes are available?',
          a: 'The current product catalogue lists 1 kg packs. Contact SAANJH to confirm availability.',
        },
      ]
    : [
        {
          q: 'SAANJH के हो?',
          a: 'SAANJH by Pasalho प्याक गरिएका दाल तथा घरायसी खाद्यान्न उपलब्ध गराउने दैनिक खाद्यान्न ब्रान्ड हो।',
        },
        {
          q: 'SAANJH ले के–के उत्पादन बिक्री गर्छ?',
          a: 'SAANJH ले मसुरो, मुग, चना, रहर, मास दाल तथा विभिन्न गेडागुडी उपलब्ध गराउँछ।',
        },
        {
          q: 'SAANJH कहाँ किन्न पाइन्छ?',
          a: 'तपाईंको नजिकको उपलब्धताबारे जान्न सम्पर्क पृष्ठ प्रयोग गर्नुहोस्।',
        },
        {
          q: 'SAANJH ले विक्रेतालाई आपूर्ति गर्छ?',
          a: 'गर्छ। विक्रेता तथा व्यावसायिक खरिदकर्ताले विक्रेता इन्क्वायरी पृष्ठ वा उपलब्ध प्रत्यक्ष सम्पर्क माध्यम प्रयोग गर्न सक्छन्।',
        },
        {
          q: 'कुन प्याक साइज उपलब्ध छ?',
          a: 'हालको उत्पादन सूचीमा १ केजी प्याक उल्लेख छ। उपलब्धता पुष्टि गर्न SAANJH लाई सम्पर्क गर्नुहोस्।',
        },
      ]

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">SAANJH · साँझ · by Pasalho</span>
            <h1>{m.heroTitle}</h1>
            <p>{m.heroText}</p>
            <div className="actions">
              <Link className="button" href={`/${locale}/products`}>
                {m.explore}
              </Link>
              {productWa && (
                <a className="button secondary" href={productWa} target="_blank" rel="noreferrer">
                  {m.whatsapp}
                </a>
              )}
            </div>
          </div>
          <div className="hero-visual">
            <div className="sun" />
            <Image
              className="hero-pack"
              src="/images/products/chana-dal.png"
              alt="SAANJH Chana Dal 1 kg pack"
              width={800}
              height={1000}
              priority
              sizes="(max-width: 720px) 80vw, 42vw"
            />
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          {m.trust.map((x, i) => (
            <div className="trust-item" key={x}>
              <span className="trust-icon">{['✦', '⚖', '◉'][i]}</span>
              <div>
                <strong>{x}</strong>
                <span className="nepali">{m.trustNe[i]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Products' : 'उत्पादन'}</span>
              <h2>{m.everyday}</h2>
            </div>
            <p>{m.everydayText}</p>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
          <div className="actions">
            <Link className="button secondary" href={`/${locale}/products`}>
              {m.allProducts} →
            </Link>
          </div>
        </div>
      </section>

      <section className="section story">
        <div className="container story-grid">
          <div className="grain-panel">
            <div>
              <Image src="/icon.svg" alt="" width={160} height={160} />
              <p>Clean · Correct Weight · Fair Price</p>
            </div>
          </div>
          <div>
            <span className="eyebrow">{en ? 'Our promise' : 'हाम्रो प्रतिबद्धता'}</span>
            <div className="section-head" style={{ display: 'block' }}>
              <h2>{m.storyTitle}</h2>
            </div>
            <p>{m.story}</p>
            <Link className="text-link" href={`/${locale}/about`}>
              {en ? 'About SAANJH' : 'SAANJH बारे'} →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Made for everyday life' : 'दैनिक जीवनका लागि'}</span>
              <h2>{m.why}</h2>
            </div>
          </div>
          <div className="values">
            {m.values.map((value, index) => (
              <article className="value" key={index}>
                <h3>{value[0]}</h3>
                <p>{value[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section retailer">
        <div className="container retailer-box">
          <div>
            <h2>{m.retailerTitle}</h2>
            <p>{m.retailerText}</p>
          </div>
          <div className="actions">
            <Link className="button" href={`/${locale}/retailers`}>
              {m.become}
            </Link>
            {retailerWa && (
              <a className="button secondary" href={retailerWa} target="_blank" rel="noreferrer">
                {m.whatsapp}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2>{en ? 'Straight answers to common questions' : 'सामान्य प्रश्नका स्पष्ट उत्तर'}</h2>
            </div>
          </div>
          <FaqList items={faqs} />
          <div className="actions">
            <Link className="text-link" href={`/${locale}/faq`}>
              {en ? 'Read all FAQs' : 'सबै प्रश्न पढ्नुहोस्'} →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
