import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { InquiryForm } from '@/components/InquiryForm'
import { PageHero } from '@/components/PageHero'
import { catalog } from '@/lib/content-repository'
import { isLocale } from '@/lib/i18n'
import { siteConfig, whatsappUrl } from '@/lib/site-config'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(
    locale,
    '/retailers',
    locale === 'en' ? 'Retailer margin and SAANJH supply' : 'SAANJH विक्रेता मार्जिन तथा आपूर्ति',
    locale === 'en'
      ? 'Understand SAANJH retailer margin logic, trade pricing, ordering and supply availability for packaged dal and staples.'
      : 'SAANJH प्याक गरिएको दाल तथा खाद्यान्नका लागि विक्रेता मार्जिन, व्यापारिक मूल्य, अर्डर र आपूर्ति उपलब्धता बुझ्नुहोस्।',
  )
}

export default async function Retailers({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const en = locale === 'en'
  const dals = [...catalog.listPublishedProducts('pulses')]
  const wa = whatsappUrl(
    en
      ? 'Hello SAANJH, I want to stock SAANJH. Please share the current trade price, MRP, retailer margin, MOQ, available SKUs and supply schedule for my area.'
      : 'नमस्ते SAANJH, म SAANJH स्टक गर्न चाहन्छु। कृपया मेरो क्षेत्रका लागि हालको व्यापारिक मूल्य, MRP, विक्रेता मार्जिन, न्यूनतम अर्डर, उपलब्ध SKU र आपूर्ति तालिका पठाउनुहोस्।',
  )

  return (
    <>
      <PageHero
        eyebrow={en ? 'For retailers & distributors' : 'विक्रेता तथा वितरकका लागि'}
        title={en ? 'Stock SAANJH with the numbers clear.' : 'हिसाब स्पष्ट राखेर SAANJH स्टक गर्नुहोस्।'}
        text={
          en
            ? 'Before you buy stock, know the trade price, MRP, rupee margin, margin percentage, MOQ and current supply availability.'
            : 'स्टक किन्नुअघि व्यापारिक मूल्य, MRP, रुपैयाँ मार्जिन, मार्जिन प्रतिशत, न्यूनतम अर्डर र हालको आपूर्ति उपलब्धता बुझ्नुहोस्।'
        }
      />

      <section className="section retailer-economics-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Margin logic' : 'मार्जिनको हिसाब'}</span>
              <h2>{en ? 'Do not judge a product only by the margin percentage.' : 'मार्जिन प्रतिशत मात्र हेरेर उत्पादन नछान्नुहोस्।'}</h2>
            </div>
            <p>
              {en
                ? 'Retail profit depends on margin per pack, how fast the SKU sells, how much cash stays tied in stock, and how reliably it can be reordered.'
                : 'विक्रेता नाफा प्रति प्याक मार्जिन, कति छिटो बिक्री हुन्छ, स्टकमा कति नगद अड्किन्छ र पुनःअर्डर कति भरपर्दो हुन्छ भन्नेमा निर्भर हुन्छ।'}
            </p>
          </div>

          <div className="margin-formula-grid">
            <article className="margin-formula primary-formula">
              <span>01</span>
              <h3>{en ? 'Rupee margin per pack' : 'प्रति प्याक रुपैयाँ मार्जिन'}</h3>
              <div className="formula">MRP − {en ? 'Retailer buy price' : 'विक्रेता खरीद मूल्य'}</div>
              <p>{en ? 'This is the gross rupee amount left before your own shop costs.' : 'यो तपाईंको पसल खर्च काट्नुअघि बाँकी रहने सकल रुपैयाँ हो।'}</p>
            </article>

            <article className="margin-formula">
              <span>02</span>
              <h3>{en ? 'Margin percentage' : 'मार्जिन प्रतिशत'}</h3>
              <div className="formula">({en ? 'Rupee margin' : 'रुपैयाँ मार्जिन'} ÷ MRP) × 100</div>
              <p>{en ? 'Useful for comparison, but it does not tell you how quickly the cash comes back.' : 'तुलना गर्न उपयोगी, तर नगद कति छिटो फर्किन्छ भन्ने यसले एक्लै बताउँदैन।'}</p>
            </article>

            <article className="margin-formula">
              <span>03</span>
              <h3>{en ? 'Cash productivity' : 'नगद उत्पादकता'}</h3>
              <div className="formula">{en ? 'Margin per pack × packs sold' : 'प्रति प्याक मार्जिन × बिक्री प्याक'}</div>
              <p>{en ? 'A slightly lower-margin staple can still be better if it turns much faster.' : 'थोरै कम मार्जिन भएको दैनिक खाद्यान्न पनि छिटो बिक्री भए राम्रो हुन सक्छ।'}</p>
            </article>
          </div>

          <div className="retailer-trade-checklist">
            <div>
              <span className="eyebrow">{en ? 'Ask us for these 6 numbers' : 'यी ६ कुरा हामीसँग माग्नुहोस्'}</span>
              <h2>{en ? 'A trade quote should be usable, not vague.' : 'व्यापारिक कोटेसन स्पष्ट र काम लाग्ने हुनुपर्छ।'}</h2>
            </div>
            <ol>
              <li><strong>1.</strong> {en ? 'Current retailer buy price per SKU' : 'प्रत्येक SKU को हालको विक्रेता खरीद मूल्य'}</li>
              <li><strong>2.</strong> {en ? 'Current MRP / recommended selling price' : 'हालको MRP / सिफारिस बिक्री मूल्य'}</li>
              <li><strong>3.</strong> {en ? 'Rupee margin and margin %' : 'रुपैयाँ मार्जिन र मार्जिन %'}</li>
              <li><strong>4.</strong> {en ? 'MOQ / minimum opening order' : 'MOQ / न्यूनतम प्रारम्भिक अर्डर'}</li>
              <li><strong>5.</strong> {en ? 'Which SKUs are available now' : 'अहिले कुन SKU उपलब्ध छन्'}</li>
              <li><strong>6.</strong> {en ? 'Expected reorder / delivery arrangement for your area' : 'तपाईंको क्षेत्रका लागि पुनःअर्डर / डेलिभरी व्यवस्था'}</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section retailer-supply-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Supply reliability' : 'आपूर्ति भरपर्दोपन'}</span>
              <h2>{en ? 'We would rather confirm stock than over-promise.' : 'अतिरञ्जित वाचा भन्दा स्टक पुष्टि गर्नु राम्रो।'}</h2>
            </div>
            <p>
              {en
                ? 'The retailer flow is designed around clear SKU availability and reordering, not a promise that every SKU is always in stock.'
                : 'विक्रेता प्रवाह स्पष्ट SKU उपलब्धता र पुनःअर्डरमा आधारित छ; हरेक SKU सधैं स्टकमा हुन्छ भन्ने वाचा होइन।'}
            </p>
          </div>

          <div className="supply-principles">
            <article>
              <span>✓</span>
              <h3>{en ? 'Availability before commitment' : 'प्रतिबद्धताअघि उपलब्धता'}</h3>
              <p>{en ? 'We confirm which SKUs are currently available before finalizing the order.' : 'अर्डर अन्तिम गर्नु अघि कुन SKU उपलब्ध छन् भन्ने पुष्टि गरिन्छ।'}</p>
            </article>
            <article>
              <span>✓</span>
              <h3>{en ? 'SKU-based ordering' : 'SKU आधारित अर्डर'}</h3>
              <p>{en ? 'Each dal has a clear product/SKU identity so ordering and reordering are less ambiguous.' : 'हरेक दालको स्पष्ट उत्पादन/SKU पहिचान छ, जसले अर्डर र पुनःअर्डरमा अलमल घटाउँछ।'}</p>
            </article>
            <article>
              <span>✓</span>
              <h3>{en ? 'Reorder contact stays simple' : 'पुनःअर्डर सम्पर्क सरल'}</h3>
              <p>{en ? 'Retailers can use the same retailer/WhatsApp route for repeat stock requests.' : 'दोहोरो स्टक मागका लागि विक्रेताले यही retailer/WhatsApp मार्ग प्रयोग गर्न सक्छन्।'}</p>
            </article>
            <article>
              <span>✓</span>
              <h3>{en ? 'Pasalho supply coordination' : 'Pasalho आपूर्ति समन्वय'}</h3>
              <p>{en ? 'SAANJH is supplied through Pasalho’s operating and distribution setup, with area availability confirmed at order time.' : 'SAANJH को आपूर्ति Pasalho को सञ्चालन तथा वितरण व्यवस्थामार्फत समन्वय हुन्छ; क्षेत्रीय उपलब्धता अर्डरको समयमा पुष्टि गरिन्छ।'}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section retailer-range-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{en ? 'Current dal range' : 'हालको दाल दायरा'}</span>
              <h2>{en ? 'Know what you are putting on the shelf.' : 'शेल्फमा के राख्दै हुनुहुन्छ स्पष्ट बुझ्नुहोस्।'}</h2>
            </div>
          </div>

          <div className="retailer-sku-grid">
            {dals.map((product) => (
              <article key={product.slug}>
                <div>
                  <strong>{en ? product.nameEnglish : product.nameNepali}</strong>
                  <span className="nepali">{en ? product.nameNepali : product.nameEnglish}</span>
                </div>
                <div>
                  <span>{product.sku}</span>
                  <b>{product.packSizes.join(', ')}</b>
                </div>
              </article>
            ))}
          </div>

          <div className="actions">
            <Link className="button secondary" href={`/${locale}/products`}>
              {en ? 'View customer-facing catalogue' : 'ग्राहक उत्पादन सूची हेर्नुहोस्'}
            </Link>
          </div>
        </div>
      </section>

      <section className="section retailer-contact-section">
        <div className="container detail-grid retailer-contact-grid">
          <div className="content">
            <span className="eyebrow">{en ? 'Start a trade conversation' : 'व्यापारिक छलफल सुरु गर्नुहोस्'}</span>
            <h1>{en ? 'Tell us your shop and area.' : 'आफ्नो पसल र क्षेत्र बताउनुहोस्।'}</h1>
            <p>
              {en
                ? 'We can then respond with the current trade quote and the availability relevant to your location.'
                : 'त्यसपछि तपाईंको स्थानअनुसार हालको व्यापारिक कोटेसन र उपलब्धता दिन सकिन्छ।'}
            </p>

            <div className="retailer-availability-note">
              <strong>{en ? 'Current service area' : 'हालको सेवा क्षेत्र'}</strong>
              <p>
                {siteConfig.location
                  ? siteConfig.location
                  : en
                    ? 'Not published yet — send your location and we will confirm.'
                    : 'अझै प्रकाशित गरिएको छैन — आफ्नो स्थान पठाउनुहोस्, हामी पुष्टि गर्छौं।'}
              </p>
            </div>

            {wa && (
              <a className="button whatsapp-button retailer-wa-large" href={wa} target="_blank" rel="noreferrer">
                {en ? 'Ask trade price, margin & availability on WhatsApp' : 'व्यापारिक मूल्य, मार्जिन र उपलब्धता ह्वाट्सएपमा सोध्नुहोस्'}
              </a>
            )}
          </div>
          <div>
            <InquiryForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  )
}
