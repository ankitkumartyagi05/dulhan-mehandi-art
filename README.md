# Dulhan Mehndi Art — Website

Production-ready static website for **Dulhan Mehndi Art**, bridal mehndi studio in Kankarbagh, Patna.
Built with plain HTML, CSS and JavaScript — no build step, no framework, nothing to compile.

**Live domain (update after purchase):** `https://www.dulhanmehndiart.in`

> Updated domain: all site references now use `www.dulhanmehndiart.in`.

---

## Folder structure

```
/
├── index.html                  Home page
├── about.html                  About the studio
├── services.html               All six services
├── gallery.html                33-photo gallery (photos load from Google Drive)
├── videos.html                 14 video embeds (Google Drive)
├── reviews.html                Customer reviews
├── contact.html                Contact info + WhatsApp booking form
├── 404.html                    Not-found page (Vercel serves it automatically)
├── robots.txt                  Search engine crawling rules
├── sitemap.xml                 Page list for Google/Bing
├── site.webmanifest            PWA manifest (linked from every page)
├── manifest.json               Copy of the manifest (alternate standard name)
├── vercel.json                 Security headers, caching, clean URLs
├── favicon.ico                 Browser tab icon (multi-size)
├── favicon-16x16.png           Small favicon
├── favicon-32x32.png           Standard favicon
├── apple-touch-icon.png        iPhone/iPad home-screen icon
├── android-chrome-192x192.png  Android icon
├── android-chrome-512x512.png  Android icon (large / maskable)
├── og-image.png                Preview image for WhatsApp/Facebook/Twitter shares
├── README.md                   This file
├── DEPLOYMENT-CHECKLIST.md     Step-by-step go-live checklist
└── assets/
    ├── style.css               All styling
    ├── main.js                 Menu, gallery, lightbox, booking form
    ├── ga.js                   Google Analytics loader (inactive until ID is set)
    ├── logo.svg                Logo artwork
    └── dulhan.svg              Bride illustration
```

## Deployment (Vercel — recommended)

1. Create a free account at https://vercel.com (sign in with GitHub or email).
2. Install the CLI: `npm i -g vercel` — or simply drag-and-drop this folder at https://vercel.com/new.
3. From this folder run: `vercel --prod`. No build settings needed — it is a plain static site; `vercel.json` is picked up automatically (security headers, caching, clean URLs like `/about`).
4. Add your custom domain under **Project → Settings → Domains** and follow the DNS instructions.

The site also works unchanged on Netlify, Cloudflare Pages, or any ordinary web host
(for non-Vercel hosts, replicate the headers in `vercel.json` — see DEPLOYMENT-CHECKLIST.md).

## After deployment — 4 one-time replacements

| What | Where | Replace |
|---|---|---|
| Real domain | All `.html` files, `robots.txt`, `sitemap.xml` | `https://www.dulhanmehndiart.in` → your actual domain (simple find-and-replace) |
| Google Analytics | `assets/ga.js` | `G-XXXXXXXXXX` → your GA4 Measurement ID |
| Search Console | All `.html` files | `PASTE-YOUR-VERIFICATION-CODE-HERE` → code from https://search.google.com/search-console |
| Geo coordinates | `index.html` (JSON-LD block) | `25.5847, 85.1602` (Kankarbagh approx.) → exact studio coordinates from Google Maps |

## Updating the website

- **Phone number / WhatsApp**: search all files for `917428507199` and replace (appears in links on every page).
- **Email**: search for `ranjeetrk940030@gmail.com`.
- **Address**: search for `RMS Colony` (footer of every page + schema in `index.html`).
- **Gallery photos**: photos are Google Drive files. Add/remove IDs in the `PHOTO_IDS` array at the top of `assets/main.js`. Each Drive file must be shared as "Anyone with the link". The 8 preview thumbnails on the home page are hard-coded in `index.html`.
- **Videos**: each video is a `<div class="vframe">` block in `videos.html` (and 3 previews in `index.html`). Copy an existing block and swap the Drive file ID.
- **Reviews**: copy a `<div class="review">` block in `reviews.html`.
- **Sitemap**: if you add a page, add a matching `<url>` entry in `sitemap.xml` and a link in the nav/footer.

## Renewals (put these in your calendar)

| Item | Frequency | Where |
|---|---|---|
| Domain name | Yearly | Your registrar (GoDaddy/Namecheap/etc.) |
| Hosting | Free tier is fine for this site | Vercel |
| SSL certificate | Automatic | Vercel/Cloudflare issue and renew it for free |
| Google Business Profile | Keep photos/reviews fresh monthly | https://business.google.com |

## Notes

- Photos and videos are served from Google Drive. If a Drive file is deleted or its sharing is turned off, the gallery falls back to a branded placeholder image automatically (handled in `main.js`) — but re-check Drive sharing after any cleanup.
- The booking form sends the visitor to WhatsApp with a pre-filled message; there is no server and no data is stored — nothing to maintain and no privacy risk.
- The site is Cloudflare-ready: static files, correct `Cache-Control` headers, works behind Cloudflare proxy/SSL/Brotli with zero changes.

