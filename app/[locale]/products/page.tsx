import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { ProductCatalog } from '@/components/ProductCatalog'
import { isLocale } from '@/lib/i18n'
import { catalog } from '@/lib/content-repository'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === 'en'
  return pageMetadata(
    locale,
    '/products',
    en ? 'Packaged pulses and staples in Nepal' : 'नेपालमा प्याक गरिएका दाल तथा खाद्यान्न',
    en
      ? 'Explore SAANJH packaged dal, pulses, chickpeas and beans for households and retailers in Nepal.'
      : 'नेपालका घरपरिवार तथा विक्रेताका लागि SAANJH का प्याक गरिएका दाल र गेडागुडी हेर्नुहोस्।',
  )
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const en = locale === 'en'
  const publishedProducts = [...catalog.listPublishedProducts()]

  return (
    <>
      <PageHero
        eyebrow={en ? 'Product catalogue' : 'उत्पादन सूची'}
        title={en ? 'Everyday staples, clearly presented.' : 'दैनिक खाद्यान्न, स्पष्ट जानकारीसहित।'}
        text={
          en
            ? 'Browse SAANJH pulses and beans. Current pack sizes are shown clearly; verified retail pricing is confirmed through the buying path until MRPs are entered in the catalogue.'
            : 'SAANJH का दाल तथा गेडागुडी हेर्नुहोस्। हालको प्याक साइज स्पष्ट देखाइन्छ; सूचीमा प्रमाणित MRP प्रविष्ट नभएसम्म खरीद मार्गबाट हालको मूल्य पुष्टि गरिन्छ।'
        }
      />
      <section className="section">
        <div className="container">
          <ProductCatalog products={publishedProducts} locale={locale} />
        </div>
      </section>
    </>
  )
}
