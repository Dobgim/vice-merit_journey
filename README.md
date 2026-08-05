# Merit Ledger

A premium, responsive marketing site for a scholarship consultancy serving undergraduate,
graduate, postgraduate and international students.

## Stack

- **React 18** with **react-router-dom** for multi-page routing
- **Tailwind CSS** for styling
- **Framer Motion** for page, scroll and hover animation
- **React Hook Form** for the consultation form
- **Vite** for dev server and builds
- **Supabase-ready** — `src/lib/supabase.js` falls back to demo mode until credentials are supplied

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, benefits, services, categories, process, featured scholarships, testimonials |
| `/about` | Who we are, method, testimonials |
| `/services` | The seven consultancy services |
| `/scholarships` | Filterable award listings and categories |
| `/countries` | Study destinations |
| `/faq` | Accordion FAQ |
| `/contact` | Consultation form, WhatsApp and email |

Unknown paths render a styled 404.

## Structure

```
src/
  components/
    layout/     Navbar, Footer, RootLayout, PageHeader, FloatingActions, Seo
    sections/   Composable page sections (Hero, Services, FAQ, Contact, …)
    ui/         Button, Card, Badge, Icon, Logo, Reveal and other primitives
  data/site.js  All copy and placeholder content in one place
  hooks/        useScroll, useCountUp
  lib/          Supabase client
  pages/        One file per route
```

All content lives in `src/data/site.js` — company details, navigation, services,
scholarships, countries, testimonials and FAQs. Edit there rather than in components.

## Backend

The contact form works without a backend. To persist submissions, copy `.env.example`
to `.env` and fill in your Supabase project URL and anon key; the client picks them up
automatically.

## Deployment

This is a single-page app, so the host must serve `index.html` for unknown paths or
refreshing a route like `/countries` will 404.

- **Netlify** — add `/* /index.html 200` to a `_redirects` file in `public/`
- **Vercel** — add a rewrite of `/(.*)` to `/index.html`
- **nginx** — `try_files $uri $uri/ /index.html;`

## Notes

The hero photograph (`public/hero-graduation.jpg`) is an Unsplash image used as a
placeholder. Replace it with licensed or original photography before a commercial launch.
