# Aliment Additives Website (Final - Sky Blue)

Static website: HTML5, CSS3 and vanilla JavaScript. No build step, no framework.

## Structure
- `index.html`, `about.html`, `products.html`, `industries.html`, `contact.html`, `beverage-juice-concentrate.html`, 12 product category pages (`acids-and-acidulants.html` and so on), `404.html`
- `assets/css/` style.css (layout and colours), animations.css (loader and motion), responsive.css (breakpoints)
- `assets/js/` main.js (header, footer, form, settings), loader.js (intro), animations.js (scroll effects), products.js (product data), icons.js (inline icons)
- `assets/images/` logo.jpeg (original), logo-hd.png / logo-hd-light.png (HD), logo.png (web), logo-sm.png (header and footer), logo-light.png, og-image.png (1200x630 social card), favicons
- SEO and server files: `robots.txt`, `sitemap.xml`, `site.webmanifest`, `_headers` (Netlify), `.htaccess` (Apache/cPanel), `SEO-GUIDE.md`

## Run locally
    python3 -m http.server 8000
Open http://localhost:8000 (use a local server, not a double-click).

## Settings (top of `assets/js/main.js`)
- `CFG.whatsapp`: 971585589794 (+971 58 558 9794). All WhatsApp buttons and the contact form use it.
- Contact form: validated in the browser, then opens WhatsApp with the enquiry pre-filled. The visitor must tap Send in WhatsApp.
- If the number changes, also update the visible text in `contact.html` (WhatsApp tile), the FAQ answer in `index.html`, and the `telephone` fields in the JSON-LD blocks of each page.

## Edit products
Edit the `PRODUCTS` list in `assets/js/products.js`. Cards, filters, search, footer links, the contact dropdown, stats and the marquee update automatically. For SEO, also update the product list inside `<noscript>` and the JSON-LD ItemList in `products.html`.

## Deploy
Upload the whole folder to a static host (Netlify, Cloudflare Pages, GitHub Pages or cPanel `public_html`) with `index.html` at the root.
Before launch:
1. Domain: canonical tags, `sitemap.xml`, `robots.txt` and the social image URL assume `https://alimentad.com`. Replace it everywhere if the final domain differs.
2. Turn on HTTPS and redirect one version of the domain (with or without www) to the other.
3. Follow `SEO-GUIDE.md` (Search Console, sitemap submission, Google Business Profile, reporting).

## Notes
- Loader: first page in a session shows the full 00-100% intro (about 3 seconds); later pages show a quick loader. Reduced-motion users skip it.
- Stats and the ingredient marquee are computed from `products.js`, so they only show real data.
- The HD logo is a clean, smoothed enlargement of the supplied JPEG. For true vector quality, ask the designer for the SVG/AI source.
- Colours: tokens at the top of `assets/css/style.css`.

## Category and juice concentrate pages
- Category pages are generated from the same data as `products.js` (name, slug, items). If you add or rename products, update the matching category page, the JSON-LD on it and `sitemap.xml`.
- Enquiry links such as `contact.html?product=Enquiry&item=Citric%20Acid` pre-select the product and pre-fill the message.
- Add real brochures, photos and certificates later only if the client can supply them.
