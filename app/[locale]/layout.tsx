import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { isLocale, locales } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === 'en'
  return {
    title: {
      default: en ? 'Everyday staples you can trust' : 'हरेक दिनका भरपर्दा खाद्यान्न',
      template: '%s | SAANJH by Pasalho',
    },
    description: en
      ? 'Clean, carefully packed pulses and household staples with correct weight and fair everyday pricing in Nepal.'
      : 'सफा, सावधानीपूर्वक प्याक गरिएका दाल तथा घरायसी खाद्यान्न—पूरा तौल र सही मूल्यमा।',
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', ne: '/ne', 'x-default': '/ne' },
    },
    openGraph: {
      title: 'SAANJH by Pasalho',
      description: en ? 'Everyday staples you can trust.' : 'हरेक दिनका भरपर्दा खाद्यान्न।',
      type: 'website',
      locale: en ? 'en_NP' : 'ne_NP',
      images: ['/images/products/moong-dal.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SAANJH by Pasalho',
      description: en ? 'Everyday staples you can trust.' : 'हरेक दिनका भरपर्दा खाद्यान्न।',
      images: ['/images/products/moong-dal.png'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const hasContact = Boolean(siteConfig.phone || siteConfig.email)
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.legalName,
    brand: { '@type': 'Brand', name: 'SAANJH' },
    url: `${siteConfig.baseUrl}/${locale}`,
    logo: `${siteConfig.baseUrl}/icon.svg`,
    description:
      'SAANJH is an everyday staples brand by Pasalho offering packaged pulses and household staples.',
    ...(hasContact
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
            ...(siteConfig.email ? { email: siteConfig.email } : {}),
            contactType: 'customer service',
            availableLanguage: ['English', 'Nepali'],
          },
        }
      : {}),
  }

  return (
    <>
      <JsonLd data={organization} />
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  )
}
