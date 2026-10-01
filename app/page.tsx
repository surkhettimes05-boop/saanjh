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
      'x-default': '/en',
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
          <Link className="button" href="/en">
            English
          </Link>
          <Link className="button secondary nepali" href="/ne">
            नेपाली
          </Link>
        </div>
      </div>
    </main>
  )
}
