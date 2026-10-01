'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const other: Locale = locale === 'en' ? 'ne' : 'en'
  const segments = pathname.split('/')

  if (segments[1] === 'en' || segments[1] === 'ne') {
    segments[1] = other
  } else {
    segments.splice(1, 0, other)
  }

  const href = segments.join('/') || `/${other}`

  return (
    <Link className="lang" href={href} hrefLang={other}>
      {other === 'ne' ? 'नेपाली' : 'English'}
    </Link>
  )
}
