import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { FaqList } from '@/components/FaqList'
import { catalog } from '@/lib/content-repository'
import { isLocale } from '@/lib/i18n'
import { whatsappUrl } from '@/lib/site-config'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const en = locale === 'en'
  const featuredProducts = [...catalog.listFeaturedProducts(8)]
  const heroProduct = featuredProducts[0]
  const consumerWa = whatsappUrl(
    en
      ? 'Hello SAANJH, I want to buy SAANJH dal/pulses. Please share the current price and nearest place to buy.'
      : 'नमस्ते SAANJH, म SAANJH दाल/गेडागुडी किन्न चाहन्छु। कृपया हालको मूल्य र नजिकै कहाँ पाइन्छ जानकारी दिनुहोस्।',
  )
  const retailerWa = whatsappUrl(
    en
      ? 'Hello SAANJH, I want to stock SAANJH in my shop. Please share the retailer/distributor price, MOQ and supply details.'
      : 'नमस्ते SAANJH, म मेरो पसलमा SAANJH राख्न चाहन्छु। कृपया विक्रेता/वितरक मूल्य, न्यूनतम अर्डर र आपूर्ति विवरण पठाउनुहोस्।',
  )

  const faqs = en
    ? [
        {
          q: 'What exactly is SAANJH?',
          a: 'SAANJH by Pasalho is a packaged everyday staples brand focused on dal, pulses, chickpeas and beans for Nepali kitchens.',
        },
        {
          q: 'Who is it for?',
          a: 'Households buying everyday staples and retailers, wholesalers, hotels, restaurants and institutions that want to stock them.',
        },
        {
          q: 'What pack size is available?',
          a: 'The published catalogue currently lists 1 kg packs.',
        },
        {
          q: 'What is the current price?',
          a: 'A verified retail MRP is not stored in the website data yet. Use WhatsApp for the current consumer price; business buyers can request the current trade quote.',
        },
        {
          q: 'Where can I buy SAANJH?',
          a: 'Use “Where to buy” or WhatsApp and share your location. We will point you to current availability instead of showing an unverified store list.',
        },
      ]
    : [
        {
          q: 'SAANJH वास्तवमा के हो?',
          a: 'SAANJH by Pasalho नेपाली भान्साका लागि दाल, गेडागुडी र चना जस्ता दैनिक खाद्यान्न प्याक गरेर उपलब्ध गराउने ब्रान्ड हो।',
        },
        {
          q: 'यो कसका लागि हो?',
          a: 'दैनिक खाद्यान्न किन्ने घरपरिवार तथा बिक्री/आपूर्ति गर्न चाहने किराना, मिनीमार्ट, थोक विक्रेता, होटल, रेस्टुरेन्ट र संस्थाका लागि।',
        },
        {
          q: 'कुन प्याक साइज उपलब्ध छ?',
          a: 'हाल प्रकाशित उत्पादन सूचीमा १ केजी प्याक उपलब्ध देखाइएको छ।',
        },
        {
          q: 'हालको मूल्य कति हो?',
          a: 'वेबसाइटको डाटामा प्रमाणित खुद्रा MRP अझै राखिएको छैन। हालको ग्राहक मूल्यका लागि ह्वाट्सएप गर्नुहोस्; व्यवसायिक खरिदकर्ताले व्यापारिक मूल्य माग्न सक्छन्।',
        },
        {
          q: 'SAANJH कहाँ किन्न पाइन्छ?',
          a: '“कहाँ किन्ने” वा ह्वाट्सएप प्रयोग गरेर आफ्नो स्थान पठाउनुहोस्। अप्रमाणित पसल सूची देखाउनुको सट्टा हामी हालको उपलब्धता बताउँछौं।',
        },
      ]

  const standard = en
    ? [
        ['Choose useful staples', 'Products are selected around familiar, repeat household use.'],
        ['State the pack clearly', 'The current catalogue uses a clearly stated 1 kg pack size.'],
        ['Pack for dependable everyday use', 'Clean handling, correct weight and practical product information are the operating promise.'],
        ['Make buying simple', 'Consumers get a direct availability path; retailers get a separate stock inquiry path.'],
      ]
    : [
        ['काम लाग्ने दैनिक खाद्यान्न छनोट', 'बारम्बार प्रयोग हुने परिचित घरायसी खाद्यान्नलाई प्राथमिकता।'],
        ['प्याक स्पष्ट लेख्ने', 'हालको सूचीमा १ केजी प्याक साइज स्पष्ट रूपमा उल्लेख गरिएको छ।'],
        ['दैनिक भरोसाका लागि प्याकिङ', 'सफा ह्यान्डलिङ, पूरा तौल र स्पष्ट उत्पादन जानकारी हाम्रो सञ्चालन प्रतिबद्धता हो।'],
        ['किन्न सजिलो बनाउने', 'ग्राहकका लागि उपलब्धता मार्ग र विक्रेताका लागि छुट्टै स्टक इन्क्वायरी मार्ग।'],
      ]

  return (
    <>
      <section className="hero hero-commerce">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{en ? 'दाल • गेडागुडी • दैनिक खाद्यान्न' : 'Pulses • beans • everyday staples'}</span>
            <h1>
              <span className="hero-primary">{en ? 'Everyday dal and pulses, packed simply.' : 'दैनिक दाल र गेडागुडी, भरोसाका साथ प्याक गरिएको।'}</span>
              <span className="hero-secondary nepali">
                {en ? 'दैनिक दाल र गेडागुडी, भरोसाका साथ प्याक गरिएको।' : 'Everyday dal and pulses, packed simply.'}
              </span>
            </h1>
            <p className="hero-lead">
              {en
                ? 'SAANJH by Pasalho is for Nepali households and the shops that serve them: familiar staples, clear 1 kg packs, direct availability and separate retailer supply.'
                : 'SAANJH by Pasalho नेपाली घरपरिवार र उनीहरूलाई सेवा दिने पसलका लागि हो—परिचित दैनिक खाद्यान्न, स्पष्ट १ केजी प्याक, सजिलो उपलब्धता र छुट्टै विक्रेता आपूर्ति।'}
            </p>

            <div className="hero-facts" aria-label={en ? 'Product summary' : 'उत्पादन सारांश'}>
              <div>
                <span>{en ? 'What' : 'के'}</span>
                <strong>{en ? 'Packaged dal & pulses' : 'प्याक गरिएको दाल/गेडागुडी'}</strong>
              </div>
              <div>
                <span>{en ? 'For' : 'कसका लागि'}</span>
                <strong>{en ? 'Homes + retailers' : 'घरपरिवार + विक्रेता'}</strong>
              </div>
              <div>
                <span>{en ? 'Size' : 'साइज'}</span>
                <strong>{en ? '1 kg packs' : '१ केजी प्याक'}</strong>
              </div>
              <div>
                <span>{en ? 'Price' : 'मूल्य'}</span>
                <strong>{en ? 'Confirm current price' : 'हालको मूल्य पुष्टि गर्नुहोस्'}</strong>
              </div>
            </div>

            <div className="purchase-paths">
              <div className="purchase-path">
                <span className="path-label">{en ? 'For customers' : 'ग्राहकका लागि'}</span>
                <div className="actions compact-actions">
                  <Link className="button" href={`/${locale}/contact`}>
                    {en ? 'Where to buy' : 'कहाँ किन्ने'}
                  </Link>
                  {consumerWa && (
                    <a className="button whatsapp-button" href={consumerWa} target="_blank" rel="noreferrer">
                      {en ? 'WhatsApp to buy' : 'किन्न ह्वाट्सएप'}
                    </a>
                  )}
                </div>
              </div>
              <div className="purchase-path">
                <span className="path-label">{en ? 'For retailers / distributors' : 'विक्रेता / वितरकका लागि'}</span>
                <div className="actions compact-actions">
                  <Link className="button secondary" href={`/${locale}/retailers`}>
                    {en ? 'Stock this brand' : 'यो ब्रान्ड स्टक गर्नुहोस्'}
                  </Link>
                  {retailerWa && (
                    <a className="text-link path-wa" href={retailerWa} target="_blank" rel="noreferrer">
                      {en ? 'Ask trade price on WhatsApp →' : 'व्यापारिक मूल्य ह्वाट्सएपमा सोध्नुहोस् →'}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <p className="price-note">
              {en
                ? 'Price transparency: verified MRPs are not stored in the site data yet, so we do not publish made-up prices.'
                : 'मूल्य पारदर्शिता: वेबसाइट डाटामा प्रमाणित MRP अझै राखिएको छैन, त्यसैले हामी बनावटी मूल्य देखाउँदैनौं।'}
            </p>
          </div>

          <div className="hero-visual hero-pack-card">
            <div className="sun" />
            <Image
              className="hero-pack"
              src="/images/products/chana-dal.png"
              alt="SAANJH Chana Dal 1 kg front pack"
              width={800}
              height={1000}
              priority
              sizes="(max-width: 720px) 86vw, 42vw"
            />
            <div className="pack-caption">
              <strong>{en ? 'Actual pack artwork in the catalogue' : 'उत्पादन सूचीमा रहेको वास्तविक प्याक आर्टवर्क'}</strong>
              <span>{en ? 'Chana Dal • चना दाल • 1 kg' : 'चना दाल • Chana Dal • १ केजी'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid trust-grid-four">
          {[
            [en ? 'Correct weight' : 'पूरा तौल', en ? 'पूरा तौल' : 'Correct weight'],
            [en ? 'Clear pack size' : 'स्पष्ट प्याक साइज', en ? '१ केजी' : '1 kg'],
            [en ? 'Product SKU' : 'उत्पादन SKU', heroProduct?.sku ?? 'SAANJH'],
            [en ? 'No inflated claims' : 'अतिरञ्जित दाबी छैन', en ? 'Facts before promises' : 'दाबीभन्दा पहिले तथ्य'],
          ].map(([title, sub]) => (
            <div className="trust-item" key={title}>
              <span className="trust-icon">✓</span>
              <div>
                <strong>{title}</strong>
                <span className="nepali">{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section proof-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Proof before promises' : 'दाबीभन्दा पहिले प्रमाण'}</span>
              <h2>{en ? 'See the pack. Check the facts.' : 'प्याक हेर्नुहोस्। तथ्य जाँच्नुहोस्।'}</h2>
            </div>
            <p>
              {en
                ? 'We show what can be verified from the current product records and pack artwork, and avoid pretending missing information is already finalized.'
                : 'हालको उत्पादन रेकर्ड र प्याक आर्टवर्कबाट जाँच्न मिल्ने कुरा मात्र देखाइन्छ; नभएको जानकारीलाई तयार भइसकेको जस्तो देखाइँदैन।'}
            </p>
          </div>

          <div className="pack-proof-grid">
            <article className="pack-proof-card">
              <span className="pack-side-label">{en ? 'Front pack' : 'अगाडिको प्याक'}</span>
              <Image
                src="/images/products/chana-dal.png"
                alt="SAANJH Chana Dal front pack"
                width={620}
                height={800}
                sizes="(max-width: 720px) 90vw, 42vw"
              />
            </article>
            <article className="pack-proof-card back-label-card">
              <span className="pack-side-label">{en ? 'Back-label facts' : 'पछाडिको लेबलका तथ्य'}</span>
              <div className="back-label-content">
                <span className="eyebrow">SAANJH · साँझ</span>
                <h3>{en ? 'Information we make easy to verify' : 'सजिलै जाँच्न मिल्ने जानकारी'}</h3>
                <dl className="proof-facts">
                  <div><dt>{en ? 'Product' : 'उत्पादन'}</dt><dd>{en ? 'Chana Dal / चना दाल' : 'चना दाल / Chana Dal'}</dd></div>
                  <div><dt>{en ? 'Pack size' : 'प्याक साइज'}</dt><dd>{en ? '1 kg' : '१ केजी'}</dd></div>
                  <div><dt>SKU</dt><dd>SAANJH-CHANA-DAL-1KG</dd></div>
                  <div><dt>{en ? 'Storage' : 'भण्डारण'}</dt><dd>{en ? 'Cool, dry place; keep sealed.' : 'चिसो, सुख्खा ठाउँमा बन्द गरेर राख्नुहोस्।'}</dd></div>
                </dl>
                <p className="evidence-note">
                  {en
                    ? 'A final production back-pack photograph is not in the repository yet, so we do not fake one. Add the real photo here when available.'
                    : 'अन्तिम उत्पादनको पछाडिको प्याक फोटो रिपोजिटरीमा अझै छैन, त्यसैले नक्कली फोटो देखाइएको छैन। वास्तविक फोटो आएपछि यहीँ राख्नुहोस्।'}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Products / उत्पादन' : 'उत्पादन / Products'}</span>
              <h2>{en ? 'Everyday staples for Nepali kitchens.' : 'नेपाली भान्साका दैनिक खाद्यान्न।'}</h2>
            </div>
            <p>
              {en
                ? 'Product names stay bilingual so customers and shopkeepers can recognize the item immediately.'
                : 'ग्राहक र पसलेले तुरुन्त चिन्न सकून् भनेर उत्पादन नाम नेपाली र अंग्रेजी दुवैमा राखिएको छ।'}
            </p>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
          <div className="actions">
            <Link className="button secondary" href={`/${locale}/products`}>
              {en ? 'See all products' : 'सबै उत्पादन हेर्नुहोस्'} →
            </Link>
          </div>
        </div>
      </section>

      <section className="section standard-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Our standard' : 'हाम्रो मापदण्ड'}</span>
              <h2>{en ? 'Simple food should have a simple standard.' : 'साधारण खाद्यान्नको मापदण्ड पनि स्पष्ट हुनुपर्छ।'}</h2>
            </div>
          </div>
          <div className="standard-steps">
            {standard.map(([title, body], index) => (
              <article className="standard-step" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section retailer">
        <div className="container retailer-box retailer-box-strong">
          <div>
            <span className="eyebrow light-eyebrow">{en ? 'For shops & distributors' : 'पसल तथा वितरकका लागि'}</span>
            <h2>{en ? 'Want to stock SAANJH?' : 'SAANJH स्टक गर्न चाहनुहुन्छ?'}</h2>
            <p>
              {en
                ? 'Use the business path for current trade price, MOQ, product availability and supply discussion.'
                : 'हालको व्यापारिक मूल्य, न्यूनतम अर्डर, उत्पादन उपलब्धता र आपूर्तिबारे व्यवसायिक मार्ग प्रयोग गर्नुहोस्।'}
            </p>
          </div>
          <div className="actions">
            <Link className="button" href={`/${locale}/retailers`}>
              {en ? 'Become a retailer / Stock SAANJH' : 'विक्रेता बन्नुहोस् / SAANJH स्टक गर्नुहोस्'}
            </Link>
            {retailerWa && (
              <a className="button secondary" href={retailerWa} target="_blank" rel="noreferrer">
                WhatsApp
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
              <h2>{en ? 'The buying questions, answered first.' : 'किन्ने बेला चाहिने प्रश्नको स्पष्ट उत्तर।'}</h2>
            </div>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
