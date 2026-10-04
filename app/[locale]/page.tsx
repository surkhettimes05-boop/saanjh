import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaqList } from '@/components/FaqList'
import { catalog } from '@/lib/content-repository'
import { isLocale } from '@/lib/i18n'
import { siteConfig, whatsappUrl } from '@/lib/site-config'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const en = locale === 'en'
  const dalProducts = [...catalog.listPublishedProducts('pulses')]
  const consumerWa = whatsappUrl(
    en
      ? 'Hello SAANJH, I want to buy SAANJH dal. Please share the current price and nearest place to buy.'
      : 'नमस्ते SAANJH, म SAANJH दाल किन्न चाहन्छु। कृपया हालको मूल्य र नजिकै कहाँ पाइन्छ जानकारी दिनुहोस्।',
  )
  const retailerWa = whatsappUrl(
    en
      ? 'Hello SAANJH, I want to stock SAANJH in my shop. Please share the current retailer price, MOQ, margin structure and supply details.'
      : 'नमस्ते SAANJH, म मेरो पसलमा SAANJH राख्न चाहन्छु। कृपया हालको विक्रेता मूल्य, न्यूनतम अर्डर, मार्जिन संरचना र आपूर्ति विवरण पठाउनुहोस्।',
  )

  const promises = en
    ? [
        ['01', 'CLEAN', 'सफा', 'Packed for everyday household confidence with clear storage guidance.'],
        ['02', 'CORRECT WEIGHT', 'पूरा तौल', 'The pack size is stated clearly: the current dal catalogue is 1 kg.'],
        ['03', 'FAIR PRICE', 'सही दाम', 'No invented MRP. We confirm the current price before you buy.'],
      ]
    : [
        ['01', 'सफा', 'CLEAN', 'दैनिक घरायसी भरोसाका लागि प्याकिङ र स्पष्ट भण्डारण जानकारी।'],
        ['02', 'पूरा तौल', 'CORRECT WEIGHT', 'प्याक साइज स्पष्ट: हालको दाल सूची १ केजी हो।'],
        ['03', 'सही दाम', 'FAIR PRICE', 'बनावटी MRP होइन। किन्नुअघि हालको मूल्य पुष्टि गरिन्छ।'],
      ]

  const faqs = en
    ? [
        {
          q: 'What exactly is SAANJH?',
          a: 'SAANJH by Pasalho is a packaged everyday staples brand focused on dal and other familiar household staples for Nepali kitchens.',
        },
        {
          q: 'What does “correct weight” mean?',
          a: 'It means the stated pack quantity is the quantity SAANJH commits to pack. The current dal catalogue is clearly labelled as 1 kg instead of relying on an informal loose-weight estimate.',
        },
        {
          q: 'Where can I buy SAANJH?',
          a: siteConfig.location
            ? `Ask for SAANJH in ${siteConfig.location}, or message us with your location so we can confirm current availability.`
            : 'Ask for SAANJH at your local store, or message us with your location so we can confirm current availability.',
        },
        {
          q: 'Can my shop stock SAANJH?',
          a: 'Yes. Retailers and distributors can request the current trade price, margin structure, minimum order and supply availability from the retailer page.',
        },
      ]
    : [
        {
          q: 'SAANJH वास्तवमा के हो?',
          a: 'SAANJH by Pasalho नेपाली भान्साका लागि दाल तथा परिचित दैनिक खाद्यान्न प्याक गरेर उपलब्ध गराउने ब्रान्ड हो।',
        },
        {
          q: '“पूरा तौल” भनेको के हो?',
          a: 'प्याकमा लेखिएको परिमाण नै SAANJH ले प्याक गर्ने प्रतिबद्धता हो। हालको दाल सूची १ केजी भनेर स्पष्ट लेखिन्छ; अनौपचारिक खुला तौलमा निर्भर हुँदैन।',
        },
        {
          q: 'SAANJH कहाँ किन्न पाइन्छ?',
          a: siteConfig.location
            ? `${siteConfig.location} मा SAANJH माग्नुहोस्, वा आफ्नो स्थान ह्वाट्सएप गरेर हालको उपलब्धता पुष्टि गर्नुहोस्।`
            : 'आफ्नो स्थानीय पसलमा SAANJH माग्नुहोस्, वा आफ्नो स्थान ह्वाट्सएप गरेर हालको उपलब्धता पुष्टि गर्नुहोस्।',
        },
        {
          q: 'मेरो पसलले SAANJH स्टक गर्न सक्छ?',
          a: 'सक्छ। विक्रेता तथा वितरकले retailer page बाट हालको व्यापारिक मूल्य, मार्जिन संरचना, न्यूनतम अर्डर र आपूर्ति उपलब्धता माग्न सक्छन्।',
        },
      ]

  return (
    <>
      <section className="hero hero-commerce">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">SAANJH · साँझ · by Pasalho</span>
            <h1>
              <span className="hero-primary">
                {en ? 'Everyday dal. No confusion.' : 'दैनिक दाल। कुनै अलमल बिना।'}
              </span>
              <span className="hero-secondary nepali">
                {en ? 'सफा · पूरा तौल · सही दाम' : 'Clean · Correct Weight · Fair Price'}
              </span>
            </h1>
            <p className="hero-lead">
              {en
                ? 'Packaged dal for Nepali households and the retailers who serve them — clear 1 kg packs, direct buying help and a separate trade supply path.'
                : 'नेपाली घरपरिवार र उनीहरूलाई सेवा दिने विक्रेताका लागि प्याक गरिएको दाल — स्पष्ट १ केजी प्याक, सजिलो खरीद सहायता र छुट्टै व्यापारिक आपूर्ति मार्ग।'}
            </p>

            <div className="hero-facts" aria-label={en ? 'Product summary' : 'उत्पादन सारांश'}>
              <div><span>{en ? 'Product' : 'उत्पादन'}</span><strong>{en ? 'Packaged dals' : 'प्याक गरिएको दाल'}</strong></div>
              <div><span>{en ? 'For' : 'कसका लागि'}</span><strong>{en ? 'Homes + retailers' : 'घरपरिवार + विक्रेता'}</strong></div>
              <div><span>{en ? 'Pack size' : 'प्याक साइज'}</span><strong>{en ? '1 kg' : '१ केजी'}</strong></div>
              <div><span>{en ? 'Buy' : 'किन्ने तरिका'}</span><strong>{en ? 'Local store / WhatsApp' : 'स्थानीय पसल / ह्वाट्सएप'}</strong></div>
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
                    {en ? 'See retailer terms' : 'विक्रेता सर्त हेर्नुहोस्'}
                  </Link>
                  {retailerWa && (
                    <a className="text-link path-wa" href={retailerWa} target="_blank" rel="noreferrer">
                      {en ? 'Ask margin & trade price →' : 'मार्जिन र व्यापारिक मूल्य सोध्नुहोस् →'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual hero-pack-card">
            <div className="sun" />
            <Image
              className="hero-pack"
              src="/images/products/rahar-dal.png"
              alt="SAANJH Rahar Dal 1 kg front pack"
              width={800}
              height={1000}
              priority
              sizes="(max-width: 720px) 86vw, 42vw"
            />
            <div className="pack-caption">
              <strong>{en ? 'Rahar Dal / रहर दाल' : 'रहर दाल / Rahar Dal'}</strong>
              <span>{en ? 'Front pack • 1 kg' : 'अगाडिको प्याक • १ केजी'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="promise-stage" aria-label={en ? 'SAANJH promises' : 'SAANJH का प्रतिबद्धता'}>
        <div className="container promise-stage-grid">
          {promises.map(([number, title, alt, text]) => (
            <article className="promise-card" key={number}>
              <span className="promise-number">{number}</span>
              <div className="promise-mark">✓</div>
              <h2>{title}</h2>
              <strong className="promise-alt nepali">{alt}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section dal-showcase">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'The dal shelf' : 'हाम्रो दाल सूची'}</span>
              <h2>{en ? 'See every SAANJH dal pack.' : 'हरेक SAANJH दाल प्याक हेर्नुहोस्।'}</h2>
            </div>
            <p>
              {en
                ? 'Front-pack assets are shown at large size with the current 1 kg pack weight visible beside each product.'
                : 'हरेक उत्पादनसँग हालको १ केजी प्याक तौल स्पष्ट देखिने गरी अगाडिको प्याक सम्पत्ति ठूलो आकारमा राखिएको छ।'}
            </p>
          </div>

          <div className="dal-pack-grid">
            {dalProducts.map((product) => (
              <article className="dal-pack-card" key={product.slug} style={{ '--accent-soft': product.accentSoft } as React.CSSProperties}>
                <div className="dal-pack-visual">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={`${product.nameEnglish} / ${product.nameNepali} SAANJH front pack`}
                      width={620}
                      height={800}
                      sizes="(max-width: 720px) 92vw, (max-width: 1100px) 44vw, 30vw"
                    />
                  ) : (
                    <div className="photo-pending">
                      <strong>{en ? 'Pack photo pending' : 'प्याक फोटो आउन बाँकी'}</strong>
                      <span>{en ? 'We will not substitute a fake pack photo.' : 'नक्कली प्याक फोटो राखिँदैन।'}</span>
                    </div>
                  )}
                </div>
                <div className="dal-pack-info">
                  <div>
                    <h3>{en ? product.nameEnglish : product.nameNepali}</h3>
                    <span className="nepali">{en ? product.nameNepali : product.nameEnglish}</span>
                  </div>
                  <strong className="weight-badge">{en ? '1 KG' : '१ केजी'}</strong>
                </div>
                <Link className="text-link" href={`/${locale}/products/${product.slug}`}>
                  {en ? 'View product details' : 'उत्पादन विवरण हेर्नुहोस्'} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section weight-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'What correct weight means for you' : 'पूरा तौलले तपाईंलाई के दिन्छ?'}</span>
              <h2>{en ? 'You should know what quantity you are paying for.' : 'तपाईंले कति परिमाणका लागि पैसा तिर्दै हुनुहुन्छ भन्ने स्पष्ट हुनुपर्छ।'}</h2>
            </div>
          </div>

          <div className="weight-compare">
            <article className="weight-side loose-side">
              <span className="compare-label">{en ? 'Loose / informal purchase' : 'खुला / अनौपचारिक खरीद'}</span>
              <div className="scale-visual">?</div>
              <h3>{en ? 'The quantity can be harder to verify.' : 'परिमाण तुरुन्त जाँच्न गाह्रो हुन सक्छ।'}</h3>
              <p>
                {en
                  ? 'Loose dal may be weighed differently from shop to shop. The customer has to rely on the measurement made at the counter.'
                  : 'खुला दाल पसलअनुसार फरक तरिकाले तौलिन सक्छ। ग्राहकले काउन्टरमा गरिएको तौलमा भरोसा गर्नुपर्छ।'}
              </p>
            </article>
            <article className="weight-side saanjh-side">
              <span className="compare-label">{en ? 'SAANJH packed dal' : 'SAANJH प्याक गरिएको दाल'}</span>
              <div className="scale-visual">1 KG</div>
              <h3>{en ? 'The pack quantity is stated before you buy.' : 'किन्नुअघि नै प्याक परिमाण स्पष्ट हुन्छ।'}</h3>
              <p>
                {en
                  ? 'The current dal catalogue is sold as a clearly stated 1 kg pack. That is what “Correct Weight” means in the SAANJH promise.'
                  : 'हालको दाल सूची स्पष्ट रूपमा १ केजी प्याकमा छ। SAANJH को “पूरा तौल” प्रतिबद्धताको अर्थ यही हो।'}
              </p>
            </article>
          </div>
          <p className="comparison-note">
            {en
              ? 'This is a comparison of buying formats, not a claim that every loose-dal seller under-weighs products.'
              : 'यो खरीद शैलीको तुलना हो; हरेक खुला दाल विक्रेताले कम तौल दिन्छ भन्ने दाबी होइन।'}
          </p>
        </div>
      </section>

      <section className="section availability-section">
        <div className="container availability-box">
          <div>
            <span className="eyebrow light-eyebrow">{en ? 'Find SAANJH' : 'SAANJH खोज्नुहोस्'}</span>
            <h2>
              {siteConfig.location
                ? en
                  ? `Currently serving enquiries in ${siteConfig.location}.`
                  : `हाल ${siteConfig.location} मा इन्क्वायरी सेवा।`
                : en
                  ? 'Ask for SAANJH at your local store.'
                  : 'आफ्नो स्थानीय पसलमा SAANJH माग्नुहोस्।'}
            </h2>
            <p>
              {en
                ? 'Send your area or store name and we will confirm current availability rather than showing an unverified stockist list.'
                : 'आफ्नो क्षेत्र वा पसलको नाम पठाउनुहोस्। अप्रमाणित स्टकिस्ट सूची देखाउनुको सट्टा हामी हालको उपलब्धता पुष्टि गर्छौं।'}
            </p>
          </div>
          <div className="actions">
            {consumerWa && (
              <a className="button" href={consumerWa} target="_blank" rel="noreferrer">
                {en ? 'Check nearest availability' : 'नजिकको उपलब्धता जाँच्नुहोस्'}
              </a>
            )}
            <Link className="button secondary" href={`/${locale}/contact`}>
              {en ? 'Where to buy' : 'कहाँ किन्ने'}
            </Link>
          </div>
        </div>
      </section>

      <section className="section retailer">
        <div className="container retailer-box retailer-box-strong">
          <div>
            <span className="eyebrow light-eyebrow">{en ? 'For retailers' : 'विक्रेताका लागि'}</span>
            <h2>{en ? 'Know the margin logic before you stock.' : 'स्टक गर्नुअघि मार्जिनको हिसाब बुझ्नुहोस्।'}</h2>
            <p>
              {en
                ? 'The retailer page now explains margin calculation, what to ask for in a trade quote, and how availability and reordering are handled.'
                : 'विक्रेता पृष्ठमा अब मार्जिन गणना, व्यापारिक कोटेसनमा के माग्ने र उपलब्धता/पुनःअर्डर कसरी सम्हालिन्छ भन्ने स्पष्ट छ।'}
            </p>
          </div>
          <div className="actions">
            <Link className="button" href={`/${locale}/retailers`}>
              {en ? 'Retailer margin & supply →' : 'विक्रेता मार्जिन र आपूर्ति →'}
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
              <h2>{en ? 'Clear answers before you buy or stock.' : 'किन्नु वा स्टक गर्नु अघि स्पष्ट उत्तर।'}</h2>
            </div>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  )
}
