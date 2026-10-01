import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
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
    '/contact',
    locale === 'en' ? 'Contact SAANJH' : 'SAANJH सम्पर्क',
    locale === 'en'
      ? 'Contact SAANJH by Pasalho for customer, retailer and distribution inquiries in Nepal.'
      : 'नेपालमा ग्राहक, विक्रेता तथा वितरणसम्बन्धी इन्क्वायरीका लागि SAANJH by Pasalho लाई सम्पर्क गर्नुहोस्।',
  )
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const en = locale === 'en'
  const wa = whatsappUrl('Hello SAANJH, I would like to know more about your products.')
  const hasDetails = Boolean(siteConfig.phone || siteConfig.whatsapp || siteConfig.email || siteConfig.location)

  return (
    <>
      <PageHero
        eyebrow={en ? 'Contact' : 'सम्पर्क'}
        title={en ? 'How can we help?' : 'हामी कसरी सहयोग गर्न सक्छौं?'}
        text={
          en
            ? 'Contact SAANJH for product information, retail availability or business supply inquiries.'
            : 'उत्पादन जानकारी, खुद्रा उपलब्धता वा व्यावसायिक आपूर्तिका लागि SAANJH लाई सम्पर्क गर्नुहोस्।'
        }
      />
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <article className="contact-card">
              <h2>{en ? 'Customer inquiries' : 'ग्राहक इन्क्वायरी'}</h2>
              <p>{en ? 'Ask about products and availability.' : 'उत्पादन र उपलब्धताबारे सोध्नुहोस्।'}</p>
              {wa ? (
                <a className="text-link" href={wa} target="_blank" rel="noreferrer">
                  WhatsApp →
                </a>
              ) : (
                <Link className="text-link" href={`/${locale}/products`}>
                  {en ? 'View products' : 'उत्पादन हेर्नुहोस्'} →
                </Link>
              )}
            </article>
            <article className="contact-card">
              <h2>{en ? 'Retailer inquiries' : 'विक्रेता इन्क्वायरी'}</h2>
              <p>{en ? 'For stores, wholesalers and business buyers.' : 'पसल, थोक विक्रेता र व्यावसायिक खरिदकर्ताका लागि।'}</p>
              <Link className="text-link" href={`/${locale}/retailers`}>
                {en ? 'Open inquiry page' : 'इन्क्वायरी पृष्ठ खोल्नुहोस्'} →
              </Link>
            </article>
            <article className="contact-card">
              <h2>{en ? 'Distribution inquiries' : 'वितरण इन्क्वायरी'}</h2>
              <p>{en ? 'Discuss supply and distribution opportunities.' : 'आपूर्ति तथा वितरण अवसरबारे छलफल गर्नुहोस्।'}</p>
              {siteConfig.email ? (
                <a className="text-link" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email} →
                </a>
              ) : (
                <Link className="text-link" href={`/${locale}/retailers`}>
                  {en ? 'Open business inquiry' : 'व्यावसायिक इन्क्वायरी खोल्नुहोस्'} →
                </Link>
              )}
            </article>
          </div>

          <div className="content" style={{ marginTop: '3rem' }}>
            <h2>{en ? 'Contact details' : 'सम्पर्क विवरण'}</h2>
            {hasDetails ? (
              <p>
                {siteConfig.phone && (
                  <>
                    <strong>{en ? 'Phone' : 'फोन'}:</strong> {siteConfig.phone}
                    <br />
                  </>
                )}
                {siteConfig.whatsapp && (
                  <>
                    <strong>WhatsApp:</strong> {siteConfig.whatsapp}
                    <br />
                  </>
                )}
                {siteConfig.email && (
                  <>
                    <strong>Email:</strong> {siteConfig.email}
                    <br />
                  </>
                )}
                {siteConfig.location && (
                  <>
                    <strong>{en ? 'Location' : 'स्थान'}:</strong> {siteConfig.location}
                  </>
                )}
              </p>
            ) : (
              <p className="form-note">
                {en
                  ? 'Contact details have not been published yet.'
                  : 'सम्पर्क विवरण अझै प्रकाशित गरिएको छैन।'}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
