import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { messages } from '@/lib/i18n'
import { whatsappUrl } from '@/lib/site-config'
import { LocaleSwitcher } from './LocaleSwitcher'

export function Header({ locale }: { locale: Locale }) {
  const m = messages[locale]
  const en = locale === 'en'
  const links = [
    ['', m.nav.home],
    ['/products', m.nav.products],
    ['/about', m.nav.about],
    ['/retailers', m.nav.retailers],
    ['/faq', m.nav.faq],
    ['/contact', m.nav.contact],
  ] as const

  const wa = whatsappUrl(
    en
      ? 'Hello SAANJH, I want to buy SAANJH products. Please share the current price and nearest availability.'
      : 'नमस्ते SAANJH, म SAANJH उत्पादन किन्न चाहन्छु। कृपया हालको मूल्य र नजिकको उपलब्धता बताउनुहोस्।',
  )

  return (
    <header className="header">
      <div className="container header-row">
        <Link className="brand" href={`/${locale}`}>
          <Image className="brand-mark" src="/icon.svg" alt="" width={44} height={44} priority />
          <span className="brand-name">
            SAANJH<small>साँझ · by Pasalho</small>
          </span>
        </Link>

        <nav className="nav" aria-label={en ? 'Main navigation' : 'मुख्य नेभिगेसन'}>
          {links.map(([href, label]) => (
            <Link key={href} href={`/${locale}${href}`}>
              {label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} />
          {wa && (
            <a className="button whatsapp-button" href={wa} target="_blank" rel="noreferrer">
              {en ? 'Buy on WhatsApp' : 'ह्वाट्सएपबाट किन्नुहोस्'}
            </a>
          )}
        </nav>

        <details className="mobile-panel">
          <summary aria-label={en ? 'Open navigation' : 'नेभिगेसन खोल्नुहोस्'}>
            {en ? 'Menu' : 'मेनु'} ☰
          </summary>
          <nav aria-label={en ? 'Mobile navigation' : 'मोबाइल नेभिगेसन'}>
            {links.map(([href, label]) => (
              <Link key={href} href={`/${locale}${href}`}>
                {label}
              </Link>
            ))}
            <LocaleSwitcher locale={locale} />
            {wa && (
              <a className="button whatsapp-button mobile-buy-button" href={wa} target="_blank" rel="noreferrer">
                {en ? 'WhatsApp to buy' : 'किन्न ह्वाट्सएप'}
              </a>
            )}
            <Link className="button secondary mobile-stock-button" href={`/${locale}/retailers`}>
              {en ? 'Stock SAANJH' : 'SAANJH स्टक गर्नुहोस्'}
            </Link>
          </nav>
        </details>
      </div>
    </header>
  )
}
