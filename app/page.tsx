import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Choose language',
  robots: { index: false, follow: true },
  alternates: {
    languages: {
      en: '/en',
      ne: '/ne',
      'x-default': '/ne',
    },
  },
}

export default function RootPage() {
  return (
    <main className="not-found">
      <div>
        <Image src="/icon.svg" alt="" width={96} height={96} priority />
        <h1>SAANJH · साँझ</h1>
        <p>Choose your language / भाषा छान्नुहोस्</p>
        <div className="actions">
          <Link className="button nepali" href="/ne">
            नेपाली
          </Link>
          <Link className="button secondary" href="/en">
            English
          </Link>
        </div>
      </div>
    </main>
  )
}
