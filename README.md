# PPC Site Template

A single-page PPC landing site template built with Astro. Designed so a new
client site takes minutes, not hours: all practice-specific content lives in
**two files**, tracking is plug-and-play, and page sections are composed in
markdown.

## Quick Start

```bash
# Requires Node.js >= 24
npm install
npm run dev        # http://localhost:4321
npm run build      # production build to dist/
```

## New Client Checklist

Everything client-specific lives in these places:

| Step | File                            | What to change                                                                         |
| ---- | ------------------------------- | -------------------------------------------------------------------------------------- |
| 1    | `src/content/client/client.yml` | Practice name, phone, address, hours, booking link, brand colors, footer, tracking IDs |
| 2    | `src/content/pages/index.md`    | Page headline, copy, offers, testimonial, form — the whole page, section by section    |
| 3    | `src/assets/images/`            | Replace `placeholder-hero.jpg`, `placeholder-office.jpg`, `placeholder-team.jpg`       |
| 4    | `public/images/`                | Replace `logo.svg` (and add a footer logo if different)                                |
| 5    | `src/data/seo.json`             | Site name, canonical URL, meta description                                             |
| 6    | `astro.config.mjs`              | Set `site:` to the production URL                                                      |

Then search the project for `555` to catch the placeholder phone number used
inside page buttons (`index.md` uses literal `tel:` links so each button can be
customized independently).

Every field in `client.yml` is **validated at build time** (`src/content.config.ts`).
A typo'd hex color or missing required field fails the build with a clear
message instead of shipping broken.

## How Pages Work

The page is assembled from component blocks listed in the `pageSections`
frontmatter of `src/content/pages/index.md`. Each block names a component and
passes its props:

```yaml
pageSections:
  - _component: page-sections/heroes/hero-split
    heading: Your City's Top-Rated Dental Experts
    subtext: Comprehensive dental care for the whole family.
    imageSource: /src/assets/images/placeholder-hero.jpg
    ...
```

Reorder, remove, or duplicate blocks freely — the renderer
(`src/components/utils/renderBlock.astro`) resolves each `_component` path
automatically. Text props (`heading`, `subtext`, descriptions) support inline
markdown.

### Section Catalog

Common sections for PPC pages (see `src/components/page-sections/` for all
props; each folder's `*.cloudcannon.structure-value.yml` shows a working
example config):

| Section         | `_component`                               | Use for                           |
| --------------- | ------------------------------------------ | --------------------------------- |
| Hero (split)    | `page-sections/heroes/hero-split`          | Headline + image + CTA buttons    |
| Hero (centered) | `page-sections/heroes/hero-center`         | Headline-only hero                |
| Feature grid    | `page-sections/features/feature-grid`      | "3 reasons to choose us" cards    |
| Feature split   | `page-sections/features/feature-split`     | Image + text ("your first visit") |
| Feature slider  | `page-sections/features/feature-slider`    | Carousel of features              |
| Testimonial     | `page-sections/people/testimonial-section` | Single featured review            |
| Team grid       | `page-sections/people/team-grid`           | Doctor/staff photos               |
| FAQ             | `page-sections/info-blocks/faq-section`    | Accordion Q&A                     |
| CTA (centered)  | `page-sections/ctas/cta-center`            | Final "book now" banner           |
| CTA (split)     | `page-sections/ctas/cta-split`             | CTA with image                    |
| CTA + form      | `page-sections/ctas/cta-form`              | Contact/appointment request form  |
| Custom          | `page-sections/builders/custom-section`    | Freeform wrapper                  |

Give any section `id: contact` (or any id) to make it an anchor target — the
template's buttons and sticky bar link to `#contact` by default.

## Theming

Brand colors are set once in `client.yml` under `theme:` and injected as CSS
variables (`--ppc-brand`, `--ppc-accent`, ...) that the PPC header, footer, and
sticky bar consume. The default palette is the TNT-inspired navy + red; swap in
the client's brand hex codes and the whole chrome recolors.

Deeper design tokens (typography, spacing, the component library's own color
system) live in `src/styles/variables/` and `src/styles/themes/` if a site
needs more than a palette swap.

## Tracking (Plug and Play)

Fill in IDs under `tracking:` in `client.yml`; anything left blank simply isn't
loaded. Supported out of the box:

| Key                | Service                                                      |
| ------------------ | ------------------------------------------------------------ |
| `ga4MeasurementId` | Google Analytics 4 (`G-...`)                                 |
| `gtmContainerId`   | Google Tag Manager (`GTM-...`)                               |
| `googleAdsId`      | Google Ads conversion tag (`AW-...`)                         |
| `metaPixelId`      | Meta / Facebook Pixel                                        |
| `callTrackingSrc`  | CallRail (or similar) script URL for dynamic number swapping |
| `clarityId`        | Microsoft Clarity                                            |

With `trackConversions: true` (default), clicks on any `tel:` link and any
booking button fire events automatically:

- **GA4 / Google Ads:** `phone_call_click` and `booking_click` events (mark
  them as conversions in GA4 or import into Google Ads)
- **GTM:** the same events are pushed to `dataLayer` for custom triggers
- **Meta Pixel:** `Contact` / `Schedule` standard events

To make any custom link count as a booking conversion, add the
`data-track-booking` attribute to it.

## CTAs

- **Header book button** and phone link come from `client.yml`
- **Mobile sticky bar** (call + book, fixed to the bottom of the screen) is
  controlled by `cta.stickyBar` in `client.yml` — set `enabled: false` to
  remove it
- **In-page buttons** are defined per-section in `index.md`

## CloudCannon

The template keeps the upstream CloudCannon integration: `pages` (visual
editor) and `client` + `data` (data editors) are configured in
`cloudcannon.config.yml`, and each component ships its editor config
(`*.cloudcannon.inputs.yml`, etc.). Connect the repo to CloudCannon and
non-developers can edit the page and client settings visually.

## Project Structure

```
src/
├── assets/images/       # Page images (hero, office, team) — swap per client
├── components/
│   ├── building-blocks/ # Buttons, headings, forms, wrappers
│   ├── navigation/      # Nav components (available, unused by default)
│   ├── page-sections/   # Full-width sections composed via index.md
│   ├── ppc/             # PPC chrome: Header, Footer, Analytics, StickyCallBar
│   └── utils/           # renderBlock (frontmatter → components)
├── content/
│   ├── client/client.yml   # ★ Per-client config (validated)
│   └── pages/index.md      # ★ Page composition + copy
├── content.config.ts    # Zod schemas for client + pages
├── data/seo.json        # Site metadata
├── layouts/
│   ├── BaseLayout.astro # <head>, SEO, global styles
│   └── PPCLayout.astro  # Header/footer/analytics/sticky-bar shell
├── pages/index.astro    # Route → renders content/pages/index.md
└── styles/              # Design tokens, cascade layers, themes
```

## Scripts

- `npm run dev` / `build` / `preview`
- `npm run lint` / `lint:fix` — ESLint (JS + YAML) and Stylelint
- `npm run format` / `format:fix` — Prettier
