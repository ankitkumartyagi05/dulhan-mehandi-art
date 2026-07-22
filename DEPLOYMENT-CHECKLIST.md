# Go-Live Checklist — Dulhan Mehndi Art

Work top-to-bottom. Everything before "Launch day" can be done in one sitting.

## 1. Domain
- [ ] Buy the domain (e.g. `www.dulhanmehandiart.in`) at Namecheap / GoDaddy / Google-successor registrar
- [ ] Enable auto-renew and WHOIS privacy
- [ ] Save registrar login details somewhere safe (password manager)

## 2. Hosting (Vercel)
- [ ] Create Vercel account
- [ ] Deploy: `vercel --prod` from the project folder (or drag-and-drop at vercel.com/new)
- [ ] Verify the preview URL works: all 7 pages, gallery lightbox, video embeds, WhatsApp buttons
- [ ] Add custom domain in Project → Settings → Domains; set both `www.dulhanmehandiart.in` and `www.`
- [ ] Update DNS at the registrar as instructed by Vercel (A record `76.76.21.21` / CNAME `cname.vercel-dns.com`)

## 3. SSL
- [ ] Vercel issues SSL automatically once DNS resolves — confirm the padlock on https://www.yourdomain.com
- [ ] Confirm http:// redirects to https:// (automatic on Vercel)
- [ ] HSTS is already sent via `vercel.json`; after 2–4 weeks of stable HTTPS, optionally submit the domain at https://hstspreload.org

## 4. Cloudflare (optional but recommended)
- [ ] Add site at https://dash.cloudflare.com → change nameservers at the registrar
- [ ] SSL/TLS mode: **Full (Strict)**
- [ ] Speed → Optimization: Brotli **on** (default)
- [ ] Caching: default "Standard" is fine — `vercel.json` already sends correct Cache-Control headers that Cloudflare respects
- [ ] Firewall: enable Bot Fight Mode (free)
- Note: if using Cloudflare in front of Vercel, keep the DNS records proxied (orange cloud) and use Vercel's domain-verification TXT record

## 5. Find-and-replace placeholders (before or right after first deploy)
- [ ] Replace `https://www.dulhanmehandiart.in` with the real domain in: all `.html` files, `robots.txt`, `sitemap.xml`
- [ ] Replace geo coordinates in `index.html` schema with exact studio location

## 6. Google Analytics
- [ ] Create GA4 property at https://analytics.google.com
- [ ] Copy Measurement ID (`G-…`) into `assets/ga.js` (replace `G-XXXXXXXXXX`)
- [ ] Redeploy, then confirm "Realtime" shows your own visit

## 7. Google Search Console
- [ ] Add property at https://search.google.com/search-console
- [ ] Copy the HTML-tag verification code into the `google-site-verification` meta tag on all pages (find-and-replace `PASTE-YOUR-VERIFICATION-CODE-HERE`)
- [ ] Redeploy → click Verify
- [ ] Submit `sitemap.xml`
- [ ] Request indexing for the home page

## 8. Local SEO (biggest traffic driver for this business)
- [ ] Claim/update Google Business Profile at https://business.google.com
- [ ] Set website URL, hours (24×7), photos, and service area (Patna)
- [ ] Ask happy clients for Google reviews (link is on the reviews page)

## 9. Backups
- [ ] Keep a copy of this folder in Google Drive / Dropbox / a private GitHub repo
- [ ] Git is the best backup: `git init && git add -A && git commit -m "launch"` then push to a private GitHub repo (also enables 1-click Vercel redeploys)
- [ ] Re-download a backup after every content change

## 10. Monitoring
- [ ] UptimeRobot (free) → monitor `https://www.yourdomain.com` with email alert
- [ ] Run https://pagespeed.web.dev after launch; keep scores ≥ 90
- [ ] Check Search Console monthly for crawl errors
- [ ] Test the WhatsApp booking flow from a phone once a month

## 11. Renewals calendar
- [ ] Domain renewal — yearly (auto-renew on)
- [ ] Google Business Profile — refresh photos quarterly
- [ ] Drive media — don't delete the shared Drive files that power gallery/videos

## Launch-day smoke test
- [ ] All 7 pages load over HTTPS on mobile + desktop
- [ ] Favicon shows in the browser tab
- [ ] Share the URL in a WhatsApp chat — logo preview card appears (og-image)
- [ ] Gallery lightbox: open, arrows, Esc
- [ ] Booking form opens WhatsApp with the message pre-filled
- [ ] `https://yourdomain.com/robots.txt` and `/sitemap.xml` load
- [ ] A wrong URL (e.g. `/xyz`) shows the branded 404 page


