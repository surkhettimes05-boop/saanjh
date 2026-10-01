import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { messages } from '@/lib/i18n'
import { whatsappUrl } from '@/lib/site-config'
import { LocaleSwitcher } from './LocaleSwitcher'

export function Header({ locale }: { locale: Locale }) {
  const m = messages[locale]
  const links = [
    ['', m.nav.home],
    ['/products', m.nav.products],
    ['/about', m.nav.about],
    ['/retailers', m.nav.retailers],
    ['/faq', m.nav.faq],
    ['/contact', m.nav.contact],
  ] as const
  const wa = whatsappUrl(
    locale === 'en'
      ? 'Hello SAANJH, I would like to know more about your products.'
      : 'नमस्ते SAANJH, म तपाईंका उत्पादनबारे थप जान्न चाहन्छु।',
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
        <nav className="nav" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={`/${locale}${href}`}>
              {label}
            </Link>
          ))}
          <LocaleSwitcher locale={locale} />
          {wa && (
            <a className="button" href={wa} target="_blank" rel="noreferrer">
              {m.whatsapp}
            </a>
          )}
        </nav>
        <details className="mobile-panel">
          <summary aria-label="Open navigation">Menu ☰</summary>
          <nav>
            {links.map(([href, label]) => (
              <Link key={href} href={`/${locale}${href}`}>
                {label}
              </Link>
            ))}
            <LocaleSwitcher locale={locale} />
          </nav>
        </details>
      </div>
    </header>
  )
}
