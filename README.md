# Bisket Labs Website

Marketing site for Bisket Labs — bio-based PCB substrates engineered from agricultural biomass.

## Pages

- `/` — parallax impact story (hero → problem → shift → product → proof → CTA)
- `/technology` — capability story + prototype gallery (no public datasheet)
- `/team` — four founders/scientists
- `/contact` — enquiry form with role selector

## Brand

- **Font:** Raleway
- **Primary:** Logo lime `#B4F01B` + ink `#0C0C0C`
- **Secondary:** Off-white beige `#F0EBE1`, forest `#142E24`, purple `#6B4580`

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

## Contact form

Submissions are logged server-side. Optional email delivery via Resend:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (default `bisket.innovation@gmail.com`)
- `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL` (for Open Graph / metadata base)

## Deploy

Designed for Vercel. Connect the repo and set the env vars above for production form delivery.
