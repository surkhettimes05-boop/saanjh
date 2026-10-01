import { products } from '@/lib/products'
import { emailUrl, siteConfig, whatsappUrl } from '@/lib/site-config'
import type { Locale } from '@/lib/i18n'

export function InquiryForm({ locale }: { locale: Locale }) {
  const en = locale === 'en'
  const wa = whatsappUrl(
    en
      ? 'Hello SAANJH, I am interested in stocking SAANJH products in my store.'
      : 'नमस्ते SAANJH, म मेरो पसलमा SAANJH उत्पादन राख्न इच्छुक छु।',
  )
  const email = emailUrl(
    'SAANJH retailer inquiry',
    en ? 'I am interested in stocking SAANJH products.' : 'म SAANJH उत्पादन बिक्री गर्न इच्छुक छु।',
  )

  if (!siteConfig.inquiryEndpoint) {
    return (
      <div>
        <p className="form-note">
          {en
            ? 'Online form delivery is not configured yet. Use one of the verified contact channels below; the site will not simulate a successful submission.'
            : 'अनलाइन फारम डेलिभरी अझै कन्फिगर गरिएको छैन। तल उपलब्ध वास्तविक सम्पर्क माध्यम प्रयोग गर्नुहोस्; साइटले नक्कली सफल सन्देश देखाउने छैन।'}
        </p>
        <div className="actions">
          {wa && (
            <a className="button" href={wa} target="_blank" rel="noreferrer">
              {en ? 'Send retailer inquiry on WhatsApp' : 'ह्वाट्सएपमा विक्रेता इन्क्वायरी पठाउनुहोस्'}
            </a>
          )}
          {email && (
            <a className="button secondary" href={email}>
              {en ? 'Send inquiry by email' : 'इमेलबाट इन्क्वायरी पठाउनुहोस्'}
            </a>
          )}
        </div>
        {!wa && !email && (
          <p className="form-note">
            {en
              ? 'No inquiry channel is configured. Please check back after contact details are published.'
              : 'कुनै इन्क्वायरी सम्पर्क माध्यम कन्फिगर गरिएको छैन। सम्पर्क विवरण प्रकाशित भएपछि पुनः प्रयास गर्नुहोस्।'}
          </p>
        )}
      </div>
    )
  }

  return (
    <form action={siteConfig.inquiryEndpoint} method="post" className="form-grid">
      <div className="field">
        <label htmlFor="business">{en ? 'Business Name' : 'व्यवसायको नाम'}</label>
        <input id="business" name="businessName" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="person">{en ? 'Contact Person' : 'सम्पर्क व्यक्ति'}</label>
        <input id="person" name="contactPerson" required maxLength={100} />
      </div>
      <div className="field">
        <label htmlFor="phone">{en ? 'Phone' : 'फोन'}</label>
        <input id="phone" name="phone" type="tel" required pattern="[+0-9 -]{7,20}" />
      </div>
      <div className="field">
        <label htmlFor="wa">{en ? 'WhatsApp Number' : 'ह्वाट्सएप नम्बर'}</label>
        <input id="wa" name="whatsapp" type="tel" pattern="[+0-9 -]{7,20}" />
      </div>
      <div className="field">
        <label htmlFor="city">{en ? 'City / District' : 'सहर / जिल्ला'}</label>
        <input id="city" name="city" required maxLength={100} />
      </div>
      <div className="field">
        <label htmlFor="type">{en ? 'Business Type' : 'व्यवसाय प्रकार'}</label>
        <select id="type" name="businessType" required defaultValue="">
          <option value="" disabled>
            {en ? 'Choose one' : 'एक छान्नुहोस्'}
          </option>
          {['Kirana store', 'Mini mart', 'Wholesaler', 'Hotel / Restaurant', 'Institution', 'Other'].map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="products">{en ? 'Products Interested In' : 'रुचि भएका उत्पादन'}</label>
        <select id="products" name="products">
          <option value="multiple">{en ? 'Multiple / not sure' : 'धेरै / निश्चित छैन'}</option>
          {products.map((p) => (
            <option key={p.slug} value={p.sku}>
              {p.nameEnglish} / {p.nameNepali}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="estimate">{en ? 'Estimated Monthly Requirement' : 'अनुमानित मासिक आवश्यकता'}</label>
        <input id="estimate" name="estimatedMonthlyRequirement" maxLength={100} />
      </div>
      <div className="field full">
        <label htmlFor="message">{en ? 'Message' : 'सन्देश'}</label>
        <textarea id="message" name="message" maxLength={1500} />
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field full">
        <button className="button" type="submit">
          {en ? 'Submit Inquiry' : 'इन्क्वायरी पठाउनुहोस्'}
        </button>
      </div>
    </form>
  )
}
