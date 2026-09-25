# SAANJH by Pasalho website

A fast, bilingual product-information website for SAANJH. It uses Next.js App Router, TypeScript and Tailwind CSS and exports as a static site. There is no cart, checkout or payment flow.

## Local development

1. Copy `.env.example` to `.env.local` and replace the placeholders.
2. Run `npm install`.
3. Run `npm run dev`.
4. Build with `npm run build`; the deployable output is written to `out/`.

The retailer form is only enabled when `NEXT_PUBLIC_INQUIRY_ENDPOINT` is configured. Until then, the page clearly directs inquiries to WhatsApp and does not show a fake success state. The receiving endpoint should validate fields again, reject the hidden `website` honeypot when filled, apply IP-based rate limiting and store or email the submission securely.

Analytics integration points are environment variables. Add the matching provider scripts only after consent and privacy requirements are confirmed.

## SAANJH Content Management

### Add a new SKU

Add one object to `lib/products.ts`. Keep the slug unique and fill both English and Nepali fields, pack sizes, accent colours, storage, usage and status. Static product pages and the sitemap are generated from this file.

### Change a product image

Place the final optimized image in `public/images/products/`, then set the product's `image` value in `lib/products.ts`. If `image` is omitted, the site shows a branded fallback pack. Use descriptive filenames and keep the pack isolated on a clean background.

### Change phone or WhatsApp

Set `NEXT_PUBLIC_PHONE` and `NEXT_PUBLIC_WHATSAPP` in the environment. WhatsApp must use country code plus number with digits only, for example `97798XXXXXXXX`. All contact links read from `lib/site-config.ts`.

### Add social media links

Set `NEXT_PUBLIC_FACEBOOK` and `NEXT_PUBLIC_INSTAGRAM`. Empty values are not rendered.

### Change SEO text

Page metadata lives beside each route under `app/[locale]/`. Global defaults are in `app/layout.tsx`. Update `public/llms.txt` when brand facts or important routes change.

### Update translations

Shared interface text is in `lib/i18n.ts`. Page-specific bilingual copy is kept in each route file. Keep facts aligned between English and Nepali.

### Add a new product category

Extend the `category` union in `lib/products.ts`, assign the category to relevant products, and add the category label to the Products page. Avoid empty category pages.

### Add a future location page

Add a real, useful route such as `app/[locale]/nepal/surkhet/page.tsx` only when there is verified local availability, contact or distribution information. Give it unique local content, metadata and internal links; do not mass-produce thin location pages.

### Contact and business identity

All phone, email, WhatsApp, location, social and analytics placeholders are centralized in `lib/site-config.ts` and environment variables. Replace them before public launch.
