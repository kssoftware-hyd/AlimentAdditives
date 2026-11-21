# Advanced SEO Guide - Aliment Additives

What is already built into the code, and what still needs account access (Google, directories). Rankings are never guaranteed; results depend on competition, content and time.

## 1. Keyword plan (UAE and GCC food ingredients)

| Page | Primary keyword | Supporting keywords |
|---|---|---|
| Home | food ingredients supplier UAE | food additives supplier UAE, food ingredient trading company UAE, food raw materials UAE, food additives GCC |
| Products | food additives supplier UAE | specialty food ingredients UAE, food ingredients list, food grade additives UAE |
| About | food ingredient trading company UAE | food ingredient sourcing UAE, food additives trading Umm Al Quwain |
| Industries | food ingredients for food manufacturers UAE | bakery ingredients UAE, dairy ingredients UAE, beverage ingredients UAE, meat processing additives UAE |
| Contact | request a quote food ingredients UAE | food additives supplier Umm Al Quwain, buy food ingredients UAE |

Product keywords (from the client's list; use as headings, FAQ, blog or Google Business Profile product names):
citric acid supplier UAE, xanthan gum supplier UAE, guar gum supplier UAE, carrageenan supplier UAE, pectin supplier UAE, sucralose supplier UAE, stevia supplier UAE, whey powder supplier UAE, skimmed milk powder supplier UAE, palm oil RBD supplier UAE, soya lecithin supplier UAE, food enzymes supplier UAE, transglutaminase supplier UAE, modified starch supplier UAE, calcium propionate supplier UAE.

Use "Dubai", "Sharjah", "Ajman" and other GCC countries only where the client truly supplies them.

## 2. On-page SEO done in the code
- Unique title (under about 65 characters) and meta description (under 160) on every page
- One H1 per page, logical H2 and H3 structure, keyword-led headings and intro copy
- Home: supplier overview, popular ingredient links (`products.html?q=...`), visible FAQ
- Products: keyword intro, search deep links, no-JS product list for crawlers
- Descriptive image alt text, image width and height set, lazy loading, optimised logo sizes
- Breadcrumb navigation on inner pages, internal links between pages
- Custom 404 page (noindex)

## 3. Technical SEO done in the code
- Canonical URLs, hreflang (en), robots meta, `robots.txt`, `sitemap.xml` with lastmod and priority
- Open Graph and Twitter cards with a 1200x630 social image
- JSON-LD structured data: Organization + LocalBusiness (address, hours, phone, email, area served), WebSite, WebPage types, BreadcrumbList, ItemList (products and industries), FAQPage
- Favicons, web manifest, preload of the header logo, `font-display: swap`
- Caching and security headers (`_headers` for Netlify, `.htaccess` for Apache)
- Mobile-first responsive layout, no layout shift from images, accessible headings, labels and focus states

## 4. Setup tasks (need client or agency accounts)
1. Google Search Console: add the domain property, verify through DNS (GoDaddy), submit `https://alimentad.com/sitemap.xml`, request indexing for the 5 pages.
2. Google Business Profile: claim and verify; use the exact name, address, phone and hours shown on the site; choose a food ingredients supplier or wholesaler style category; add products, photos of the logo, premises and packaging, a service area, and the website link; post updates regularly; answer Q&A.
3. Bing Webmaster Tools: import from Search Console.
4. Citations: list the same name, address and phone on UAE and B2B directories; keep them identical to the website.
5. Analytics: add Google Analytics 4 (and optionally Microsoft Clarity); track clicks on WhatsApp and email.

## 5. Competitor analysis (to do)
Review the client's competitors (for example Atom Chemie, Golden Falcon, Medist FZE, Taj Chem) for: ranking keywords, page titles, product pages, content depth, backlinks and Google Business Profile reviews. Record gaps and ideas in a sheet and add one improvement per month.

## 6. Content ideas
Product guides (what is xanthan gum used for, citric acid in beverages), industry pages (bakery, dairy, beverages), application notes, and an FAQ per product category. Only publish facts the client can confirm; no certification, brand or stock claims without proof.

## 7. Monthly performance report (template)
- Impressions, clicks, average position and top queries (Search Console)
- Top landing pages and enquiries (WhatsApp, email, form)
- Google Business Profile views, calls, direction requests
- Pages indexed, errors, Core Web Vitals
- Work done this month and plan for next month


---

## 8. Competitor findings (checked 20 November 2026)

| Competitor | What I found | What we do better / next step |
|---|---|---|
| Taj Chem (tajchem.com) | Large chemical distributor (WordPress). Has a dedicated Food and Feed Ingredients page, PDF brochures, news feed, social profiles, Google Search Console verification, ISO and credit-rating badges. Title format "Global Chemical Distributor & Raw Material Supplier". | We focus on food ingredients only, with one landing page per category and a juice concentrate page. Add brochures, social profiles and a news/blog section when the client has real content. Show certificates only if the client holds them. |
| Golden Falcon (goldenfalcon-uae.com) | WordPress site. Home page title is "Golden Falcon - An Industry" and no meta description was visible. Category pages for Food & Beverages, a Downloads page, an Arabic version. | Our titles and descriptions are keyword-led. Consider an Arabic version of the key pages for GCC searches. |
| Atom Chemie (atomchemie.com) | The home page returned no readable text, title or description to my crawler, which suggests content loaded by JavaScript only. | Our pages are plain HTML that every search engine can read. |
| Medist FZE | The shared link could not be opened by my tools, so it was not analysed. | Review it manually in the competitor sheet. |

Your own site (alimentad.com): my tools could not fetch it and a web search showed no results for it, so it may not be live or indexed yet. Publishing the site and completing section 4 above is the first step.

## 9. Branded and product search plan (aim: rank first for our own name)

Branded queries (the easiest to win): "Aliment Additives", "Aliment Additives FZE", "Aliment Additives UAE", "Aliment Additives Umm Al Quwain", "alimentad", "alimentad.com".
- Brand-first home title, Organization schema with `legalName` and `alternateName` (the FZE name is kept in invisible structured data only).
- Claim Google Business Profile with the exact business name; keep name, address and phone identical everywhere.
- Create profiles on LinkedIn, Facebook, Instagram, YouTube and link them from the footer and in the `sameAs` field of the Organization schema (ask the client for the real links).
- List the company in UAE and B2B directories (UAE Chamber of Commerce directories, Kompass, Alibaba, TradeKey, ExportHub or similar) with the website link.

Product queries (competitive, need time and links): each of the 12 category pages and the juice concentrate page targets "[category] supplier UAE" plus ingredient names such as citric acid, xanthan gum, pectin, whey powder and sucralose.
- Build links: directory listings, supplier and trade association pages, press or event mentions, guest articles.
- Add one useful article per month (for example "What is xanthan gum used for in beverages?") and link it to the matching category page.
- Collect Google reviews from real customers.

Nobody can guarantee the number one position. Brand searches usually rank first once the site is indexed and the Google Business Profile is live; product searches depend on competition, content and links over several months.

## 10. Beverage juice concentrate page (target keywords)
Primary: beverage juice concentrate supplier UAE, juice concentrate supplier UAE.
Supporting: fruit juice concentrate UAE, apple juice concentrate, mango juice concentrate, orange juice concentrate, pineapple juice concentrate, juice concentrate for beverage manufacturers, Brix juice concentrate, juice concentrate GCC.
The page is linked from the header menu on every page, the footer, Home, Industries and Products. Alias URLs (`/juice-concentrate` and similar) redirect to it with a 301 through `_redirects` (Netlify) or `.htaccess` (Apache).

## 11. Juice concentrate section (family page + 8 fruit pages)
The page `beverage-juice-concentrate.html` follows a product-family layout (breadcrumb, intro with quote button, read-more text, filter chips with counts, product cards, applications, enquiry checklist, related products, why-us block, FAQ). Each card links to its own fruit page:
orange, apple, mango, pineapple, grape, pomegranate, guava and lemon juice concentrate.
Target keywords per page: "[fruit] juice concentrate supplier UAE", "[fruit] juice concentrate UAE", "[fruit] concentrate for beverage manufacturers".
Content rules: do not add Brix values, certificates, packaging sizes or stock claims unless the client confirms them. Add real specification sheets and photos when available, and update the FAQ and JSON-LD to match.
