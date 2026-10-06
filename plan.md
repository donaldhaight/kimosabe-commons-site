# Implementation Plan — Kimosabe Commons Public Website & Recruiting Funnel

Project: `commons` (Manus Webdev, Cloud, React/Express/tRPC/Drizzle, server + database enabled)
Governing document: `/home/ubuntu/hb-discovery/00-PROJECT-INSTRUCTION-MANUAL.md`

## 1. What is being built

The public face and top of funnel for **Kimosabe Commons, PBC** — a public benefit corporation
that runs recruiting, promotion, territory stewardship, attestation and stakeholder operations for
the Kimosabe App and the Human Blockchain. The site must explain the proposition in contractor
English, convert four audiences into persisted intake records, and publish governance and benefit
information without making a single prohibited claim.

This build is the public site only. The back-office operations system is specified separately
(`20-product/SRS.md`, `20-product/PRD.md`) and is out of scope here.

## 2. Design — "Civic Ledger"

Fixed by the engagement instruction manual; reproduced here because it governs every component.

- **Design movement:** the visual language of a county records office, a union hall, and a
  well-kept field notebook, translated to screen. Explicitly not cyberpunk, not fintech dark-mode.
- **Core principles:** ledger honesty (visible rules and lines), territory warmth (maps and land,
  not surveillance), roster clarity (humans as roles with authority, never as metrics), quiet
  authority (reads like an institution that already exists).
- **Color philosophy:** ledger paper rather than white; green as land and tenure; brass as the
  metal of seals and certification; clay reserved for deadlines and warnings; institutional blue
  for sponsor-facing and reference surfaces.
- **Palette:** ink `#1B2A2F` · paper `#F6F2E9` · field (signature) `#2F6B4F` · brass `#B0801F`
  · clay `#9C4A2F` · sky `#4A6E8A`.
- **Layout paradigm:** a two-column ledger spine. A narrow sticky left rail carries section
  numerals and brass rule marks; a wide right field carries content at varying measures. Hairline
  separators instead of floating cards. Deliberate asymmetry: content starts at the rail and ends
  short of the right edge on prose sections, full-bleed on map and data bands.
- **Signature elements:** (1) brass rule marks with numerals used as section markers and bullets;
  (2) the address field — a faint grid of small squares used as background texture, individual
  nodes lighting on scroll; (3) the season band — a segmented five-phase bar reused as a progress
  indicator and as the seasonal explainer.
- **Interaction philosophy:** restraint. Hover reveals a source or a role definition, not a
  flourish. Every interactive element is keyboard operable. Motion shows sequence.
- **Animation:** fade-and-rise on section entry (200–320 ms ease-out, 12 px); brass rules draw in
  from the left over 240 ms; season band fill tied to scroll; hero address nodes breathe at
  0.35→0.55 opacity over 4 s. All disabled under `prefers-reduced-motion: reduce`.
- **Typography:** display — Fraunces (warm institutional serif) for wordmark, numerals and
  headlines; text — Inter; data — JetBrains Mono for territory codes and identifiers.
  Scale: display 56/64 · h1 40/48 · h2 30/38 · h3 22/30 · body 17/28 · data 14/22 · caption 13/20.
- **Brand essence:** the recruiting and stewardship institution for a verified map of people and
  addresses. Personality: **accountable, plainspoken, territorial**.
- **Brand voice:** contractor-literal. *"A county is not a market. It is a roster waiting to be
  written."* / CTA: *"Claim your territory for Season 1."* No generic filler.
- **Wordmark and mark:** *KIMOSABE* in Fraunces, tight tracking, preceded by a brass rule crossed
  by a short vertical tick — readable as numeral 1, as the letter I, and, rotated, as a surveyor's
  stake on a property line — set inside a thin brass square like a seal.
- **Signature brand color:** `--field` `#2F6B4F`.

## 3. Technical approach

- **Stack:** existing `web-db-user` starter — React 19 + Tailwind 4 + wouter on the client;
  Express + tRPC + Drizzle/MySQL on the server. No new framework.
- **Data:** three new tables — `intake_submissions`, `sponsor_inquiries`, `submission_notes`.
  Territory availability is served from a shared sample dataset (`shared/territories.ts`) that is
  also compiled into the client, so the ticker and the API cannot disagree.
- **Intake:** public tRPC mutations (`intake.submit`, `sponsor.submit`) validate with Zod, write
  the record, capture `source` and `referrer` from the client, and record consent explicitly.
- **Admin:** `adminProcedure`-guarded queries for listing, filtering, status transitions and notes.
  Access is by Manus OAuth plus the `admin` role already present in the `users` table.
- **Crawler-visible HTML:** the Express layer injects route-specific `<title>`, description,
  canonical, Open Graph, Twitter Card, and a readable static content summary into the built
  `index.html` for every known public route (`server/seo.ts`), instead of serving an empty mount
  element. Unknown routes return a real 404 status with `noindex`. `GET /sitemap.xml` and
  `GET /robots.txt` are served by the application so the gateway has a project document to serve.
  Absolute canonical URLs are emitted only when `PUBLIC_SITE_ORIGIN` is configured; otherwise the
  tags are omitted rather than guessed.
- **Accessibility:** semantic landmarks, one `h1` per route, visible focus rings, `aria-current`
  navigation, labelled form fields with inline error text, `aria-live` submission status, and
  `prefers-reduced-motion` overrides globally.

## 4. Project structure

```
shared/
  seo.ts             Route metadata + crawler content summaries (single source of truth)
  territories.ts     Illustrative sample territory dataset (states, counties, availability)
  const.ts           (existing) shared constants
drizzle/
  schema.ts          users (existing) + intake_submissions, sponsor_inquiries, submission_notes
server/
  db.ts              Query helpers for submissions, inquiries and notes
  routers.ts         tRPC: intake.*, sponsor.*, territories.*, admin.*
  seo.ts             Head injection, content summary injection, sitemap.xml, robots.txt
  routes-manifest.ts Serves /manus-routes.json
  _core/index.ts     Wires the SEO middleware ahead of Vite/static serving
client/src/
  App.tsx            Route table for all public pages plus admin
  index.css          Civic Ledger theme tokens (paper, ink, field, brass, clay, sky)
  components/
    layout/ SiteHeader, SiteFooter, LedgerSpine, SectionRule, SeasonBand, AddressField
    Seo.tsx            Client-side head sync for SPA navigation
    forms/ IntakeForm, SponsorForm, Field
    data/ TerritoryTable, AvailabilityBadge, StatLine
  pages/
    Home, HowItWorks, Programs, Participate, WhoWeServe, Governance, BenefitReport,
    Resources, Contact, Territories, TerritoryDetail, Apply, Sponsor, Admin, NotFound
  data/articles.ts   Program, tier, audience and benefit-report content
public/
  manus-routes.json  Route manifest for the platform
```

## 5. Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, proposition, four audiences, season clock, published metrics, CTA |
| `/how-it-works` | How It Works | Six-step funnel: discovery → retention |
| `/programs` | Programs | Four programs with deliverables and pricing posture |
| `/participate` | Participate | Participation tiers, what's included, what it costs |
| `/who-we-serve` | Who We Serve | Stakeholder groups and role families |
| `/territories` | Territories | State/county browser, availability, per-territory CTA |
| `/territories/:state` | Territory Detail | Counties within a state, seats, availability |
| `/governance` | Governance & Public Benefit | Chartered benefit, board, reporting, conflicts |
| `/benefit-report` | Benefit Report | Published seasonal metrics, labelled as current state |
| `/resources` | Resources | Ecosystem knowledge bundle + DAO landscape research |
| `/apply` | Apply | Recruiting intake (persisted) |
| `/sponsor` | Sponsor Inquiry | Sponsor/institution intake (persisted) |
| `/contact` | Contact | Plainspoken contact paths |
| `/admin` | Admin Review | OAuth + admin role; submissions, inquiries, status, notes |

## 6. Explicit non-goals

No payments, no checkout, no token, no investment pathway, no member area beyond the admin review
screen, no CMS, no third-party marketing scripts, and no real stakeholder data.