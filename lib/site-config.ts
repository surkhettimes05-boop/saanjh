const clean = (value: string | undefined) => value?.trim() || ''

function normalizeBaseUrl(value: string | undefined) {
  const raw = clean(value)
  if (!raw) return ''
  try {
    const url = new URL(raw)
    return url.toString().replace(/\/$/, '')
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL.')
  }
}

const configuredBaseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL)
const phone = clean(process.env.NEXT_PUBLIC_PHONE)
const whatsapp = clean(process.env.NEXT_PUBLIC_WHATSAPP).replace(/\D/g, '')
const email = clean(process.env.NEXT_PUBLIC_EMAIL)
const requireProductionConfig =
  process.env.VERCEL_ENV === 'production' || process.env.SAANJH_REQUIRE_CONFIG === 'true'

if (requireProductionConfig && !configuredBaseUrl) {
  throw new Error('Production deployment blocked: NEXT_PUBLIC_SITE_URL is required.')
}

if (requireProductionConfig && !phone && !whatsapp && !email) {
  throw new Error(
    'Production deployment blocked: configure NEXT_PUBLIC_PHONE, NEXT_PUBLIC_WHATSAPP or NEXT_PUBLIC_EMAIL.',
  )
}

export const siteConfig = {
  name: 'SAANJH',
  legalName: 'SAANJH by Pasalho',
  baseUrl: configuredBaseUrl || 'http://localhost:3000',
  phone,
  whatsapp,
  email,
  location: clean(process.env.NEXT_PUBLIC_LOCATION),
  facebook: clean(process.env.NEXT_PUBLIC_FACEBOOK),
  instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM),
  inquiryEndpoint: clean(process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT),
  analytics: {
    googleAnalyticsId: clean(process.env.NEXT_PUBLIC_GA_ID),
    metaPixelId: clean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
    searchConsoleVerification: clean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  },
} as const

export function whatsappUrl(message: string): string | null {
  if (!siteConfig.whatsapp) return null
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}

export function emailUrl(subject?: string, body?: string): string | null {
  if (!siteConfig.email) return null
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const suffix = params.toString()
  return `mailto:${siteConfig.email}${suffix ? `?${suffix}` : ''}`
}

export const hasConfiguredContact = Boolean(phone || whatsapp || email)
