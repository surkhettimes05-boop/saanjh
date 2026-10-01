import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter, Noto_Sans_Devanagari } from 'next/font/google'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: { default: 'SAANJH by Pasalho', template: '%s | SAANJH by Pasalho' },
  description:
    'Clean, carefully packed pulses and household staples with correct weight and fair everyday pricing in Nepal.',
  applicationName: 'SAANJH by Pasalho',
  icons: { icon: '/icon.svg' },
  verification: siteConfig.analytics.searchConsoleVerification
    ? { google: siteConfig.analytics.searchConsoleVerification }
    : undefined,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers()
  const lang = requestHeaders.get('x-saanjh-locale') === 'ne' ? 'ne' : 'en'

  return (
    <html lang={lang} className={`${inter.variable} ${devanagari.variable}`}>
      <body>{children}</body>
    </html>
  )
}
