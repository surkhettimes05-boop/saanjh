export const siteConfig = {
  name: 'SAANJH',
  legalName: 'SAANJH by Pasalho',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://saanjh.pasalho.com',
  phone: process.env.NEXT_PUBLIC_PHONE || '+977-XXXXXXXXXX',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '977XXXXXXXXXX',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hello@example.com',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Surkhet, Nepal',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
  inquiryEndpoint: process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || '',
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    searchConsoleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
} as const

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}
