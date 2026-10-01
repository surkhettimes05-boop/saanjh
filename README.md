# SAANJH by Pasalho website

Bilingual product-information and retailer-lead website for SAANJH, built with Next.js App Router, TypeScript and Tailwind CSS.

## Production model

The site runs as a normal Next.js deployment (recommended: Vercel). This intentionally keeps Next Image Optimization enabled so the large source product-pack PNGs are served to visitors as optimized AVIF/WebP derivatives instead of multi-megabyte originals.

There is no cart, checkout or payment flow.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Add the contact values you actually want published.
3. Run `npm ci`.
4. Run `npm run dev`.
5. Validate with `npm run check`.

Next.js 16 requires Node.js 20.9 or newer. The repository pins this requirement through `package.json#engines`.

## Production configuration

`NEXT_PUBLIC_SITE_URL` is required on a production Vercel deployment.

At least one of these must also be configured:

- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_WHATSAPP`
- `NEXT_PUBLIC_EMAIL`

The production deployment fails instead of publishing fake placeholder contact data when these requirements are not met.

For another hosting provider, set `SAANJH_REQUIRE_CONFIG=true` to enable the same guard.

The retailer form is enabled only when `NEXT_PUBLIC_INQUIRY_ENDPOINT` is configured. The receiver must independently validate fields, reject the hidden `website` honeypot, rate-limit abuse and store or forward data securely. Without an endpoint the site exposes only real configured WhatsApp/email alternatives and never simulates a successful form submission.

## Content architecture

Public pages consume products through `lib/content-repository.ts`, not directly from the storage format. Today the repository uses the static records in `lib/products.ts`. A future admin panel can replace that repository with a database/API-backed implementation without rewriting page components.

### Product fields

Each product includes:

- stable internal `id`
- commercial `sku`
- unique `slug`
- `sortOrder`
- `featured`
- category
- English and Nepali names/copy
- pack sizes
- storage/use guidance
- image
- `status`

Only products with `status: 'available'` are exposed through the public catalog, sitemap and product routes. This prevents an unfinished SKU from accidentally going live.

### Add or edit a SKU

Until the admin panel exists, update `lib/products.ts`. Keep IDs, SKUs and slugs unique. Set `featured` and `sortOrder` deliberately.

### Product images

Place source pack images under `public/images/products/`. Next/Image performs runtime optimization on supported deployments. Keep originals reasonably sized anyway; the source files should still be compressed when final packaging assets are available.

### Contact and social settings

All phone, email, WhatsApp, location and social values are centralized in `lib/site-config.ts` and environment variables. Empty values are hidden rather than rendered as placeholders.

### SEO and language

The site provides English and Nepali routes, canonical/hreflang metadata, sitemap, robots, structured product/FAQ data and Search Console verification through `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. The root language chooser is deliberately `noindex`.

A request proxy supplies the route locale to the root layout so the HTML `lang` attribute is correct for English and Nepali pages.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and pull requests:

- `npm ci`
- ESLint
- TypeScript typecheck
- production build

Do not merge changes that fail CI.

## Analytics

GA/Meta IDs remain reserved configuration only. Tracking scripts should be added together with the required consent/privacy handling rather than silently loading trackers.
