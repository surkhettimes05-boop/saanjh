import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { messages } from '@/lib/i18n'
import { siteConfig, whatsappUrl } from '@/lib/site-config'

export function Footer({ locale }: { locale: Locale }) {
  const m = messages[locale]
  const isEn = locale === 'en'
  const wa = whatsappUrl('Hello SAANJH, I would like to know more about your products.')

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand-name" style={{ color: 'white' }}>
                SAANJH<small style={{ color: '#e8cfc2' }}>साँझ · by Pasalho</small>
              </div>
              <p>
                {isEn
                  ? 'A dependable everyday staples brand for value-conscious households.'
                  : 'दैनिक घरायसी किनमेलका लागि भरपर्दो र व्यावहारिक खाद्यान्न ब्रान्ड।'}
              </p>
            </div>
            <div>
              <h3>{isEn ? 'Quick links' : 'छिटो लिंक'}</h3>
              <div className="footer-links">
                <Link href={`/${locale}/products`}>{m.nav.products}</Link>
                <Link href={`/${locale}/about`}>{m.nav.about}</Link>
                <Link href={`/${locale}/faq`}>{m.nav.faq}</Link>
              </div>
            </div>
            <div>
              <h3>{isEn ? 'Business' : 'व्यवसाय'}</h3>
              <div className="footer-links">
                <Link href={`/${locale}/retailers`}>{m.nav.retailers}</Link>
                <Link href={`/${locale}/contact`}>{m.nav.contact}</Link>
                {wa && (
                  <a href={wa} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
            <div>
              <h3>{isEn ? 'Legal' : 'कानुनी'}</h3>
              <div className="footer-links">
                <Link href={`/${locale}/privacy`}>{isEn ? 'Privacy Policy' : 'गोपनीयता नीति'}</Link>
                <Link href={`/${locale}/terms`}>{isEn ? 'Terms' : 'सर्तहरू'}</Link>
                {siteConfig.facebook && (
                  <a href={siteConfig.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                )}
                {siteConfig.instagram && (
                  <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} SAANJH by Pasalho. {isEn ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}
          </div>
        </div>
      </footer>
      {wa && (
        <a className="floating-wa" aria-label="WhatsApp SAANJH" href={wa} target="_blank" rel="noreferrer">
          ◉
        </a>
      )}
    </>
  )
}
