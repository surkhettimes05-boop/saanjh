import type { Metadata } from 'next'
import { Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const devanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://saanjh.pasalho.com'),
  title: { default: 'SAANJH by Pasalho', template: '%s | SAANJH by Pasalho' },
  description: 'Clean, carefully packed pulses and household staples with correct weight and fair everyday pricing in Nepal.',
  applicationName: 'SAANJH by Pasalho',
  icons: { icon: '/icon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${inter.variable} ${devanagari.variable}`}><body>{children}</body></html>
}
