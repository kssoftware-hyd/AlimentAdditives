# Aliment Additives FZE Website

Static website: HTML5, CSS3 and vanilla JavaScript. No build step, no framework.

## Structure
- `index.html`, `about.html`, `products.html`, `industries.html`, `contact.html`
- `assets/css/` style.css (layout), animations.css (loader and motion), responsive.css (breakpoints)
- `assets/js/` main.js (header, footer, form, config), loader.js (intro), animations.js (scroll effects), products.js (product data)
- `assets/images/` logo.jpeg (original), logo-hd.png (2115x1743 HD, transparent, dark text), logo-hd-light.png (HD, light text for dark backgrounds), logo.png (720px web version used by the site), logo-light.png (web version for dark backgrounds)
- `robots.txt`, `sitemap.xml`

## Run locally
    python3 -m http.server 8000
Open http://localhost:8000 (use a local server, not a double-click, so links and the map behave).

## Settings (top of `assets/js/main.js`)
- `CFG.whatsapp`: client WhatsApp number with country code, digits only. Until set, WhatsApp buttons open the contact page.
- `CFG.formEndpoint`: URL of your backend or form service that accepts JSON (name, company, email, phone, country, product, message). Empty = the form opens the visitor's email app. Never put API keys or email passwords in this file.
- reCAPTCHA: add the site key and server-side check in your backend; the page only shows the notice.

## Edit products
Edit the `PRODUCTS` list in `assets/js/products.js`. Cards, filters, search, footer links and the contact dropdown update automatically.

## Add photos
Put licensed photos in `assets/images/`. Hero: set `--hero-img: url("../images/hero.jpg")` in `:root` of style.css. Cards and industries use gradients; add `background-image` rules for photos when available.

## Deploy
Upload the whole folder to any static host (cPanel `public_html`, Netlify, Cloudflare Pages, GitHub Pages) with `index.html` at the root.
Before launch:
1. The domain in canonical tags, `sitemap.xml` and `robots.txt` is assumed to be `https://www.alimentad.com`. Replace it if different.
2. Set WhatsApp and the form endpoint (above).
3. Submit `sitemap.xml` in Google Search Console.
4. Icons are inline SVG (assets/js/icons.js), no third-party icon script.

## Notes
- Loader: first page in a session shows the full cinematic 00-100% intro (about 3 seconds); later pages show a quick 00-100% loader (under 1 second). Progress is gated by real readiness (logo, fonts, page load). Reduced-motion users skip it.
- Stats and the ingredient marquee are computed from `products.js`, so they only show real data.
- GSAP is not used; effects use CSS and IntersectionObserver for speed.

- Theme: white and off-white with soft pastel section tints. Colours are CSS variables at the top of `assets/css/style.css` (`--sage`, `--mist`, `--sand` for tints; `--forest`, `--olive`, `--lime` for accents).
- The HD logo is a clean, smoothed 6x enlargement of the supplied JPEG. For true vector quality (SVG/AI), ask the logo designer for the source file.
