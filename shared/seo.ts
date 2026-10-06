/**
 * Single source of truth for route metadata and crawler-visible content summaries.
 *
 * Consumed by:
 *  - server/seo.ts        (injects real head tags + readable body content into index.html)
 *  - server/routes-manifest.ts (serves /manus-routes.json)
 *  - client/src/components/Seo.tsx (keeps client-side navigation titles consistent)
 *
 * Absolute canonical and og:url values are emitted only when PUBLIC_SITE_ORIGIN is
 * configured. Until then they are omitted rather than guessed from the request host.
 */

export type RouteMeta = {
  /** Route path as served. Dynamic segments use `:param`. */
  path: string;
  title: string;
  /** 50–160 characters. */
  description: string;
  /** H1 rendered in the crawler-visible summary block. */
  heading: string;
  /** Plain-language paragraphs a crawler can index without executing JavaScript. */
  summary: string[];
  /** Route is indexable. Admin routes are not. */
  indexable: boolean;
};

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "Kimosabe Commons — The Recruiting Layer for a Verified Map",
    description:
      "A proposed Delaware public benefit corporation building the recruiting, promotion and stewardship layer for the Human Blockchain: a verified roster of people and addresses.",
    heading: "Every address is a stakeholder. Every stakeholder gets a job.",
    summary: [
      "Kimosabe Commons, PBC is a proposed Delaware public benefit corporation. Its purpose is to build the recruiting, promotion and stewardship layer for the Human Blockchain, turning a map of people and addresses into a verified roster: who is licensed, who owns the claim, who can act, what territory they hold, and what they completed this season.",
      "The company runs four programs — recruiting and roster operations, promotion and campaign production, territory stewardship, and attestation and verification — on a five-phase seasonal clock of pre-season, season, cool-down, dispute resolution and reset.",
      "Participation is described as sponsorship or participation. Kimosabe Commons does not offer investments, does not sell tokens, and is not an insurer, adjuster, escrow agent or money transmitter.",
    ],
    indexable: true,
  },
  {
    path: "/how-it-works",
    title: "How It Works — Discovery to Retained Participation",
    description:
      "The six-step funnel Kimosabe Commons runs in every territory: discovery, verification, onboarding, territory assignment, campaign execution and retained participation.",
    heading: "A six-step funnel, run the same way in every county",
    summary: [
      "Discovery finds the people a territory actually needs. Verification checks identity, licence and organisation at the level of risk involved. Onboarding establishes the role, the agreement and the permissions. Territory assignment records who holds which ground, and until when. Campaign execution produces and runs the promotion that the territory needs. Retained participation measures who is still active at the end of the season.",
      "Each step produces a record. Nothing in the funnel depends on the founder remembering it personally.",
    ],
    indexable: true,
  },
  {
    path: "/programs",
    title: "Programs — Recruiting, Promotion, Stewardship, Attestation",
    description:
      "Four programs: recruiting and roster operations, promotion and campaign production, territory stewardship, and attestation and verification. What each delivers and how it is priced.",
    heading: "Four programs. One operating spine.",
    summary: [
      "Recruiting and roster operations builds the verified roster for a territory: sourcing, reference checks, licence verification and role assignment.",
      "Promotion and campaign production produces the outreach a territory needs: local campaigns, content, direct mail, events and the seasonal announcement cycle.",
      "Territory stewardship holds the ground: seat allocation, renewals, dispute handling and seasonal reset, recorded against a territory register.",
      "Attestation and verification confirms that claimed work happened, producing the attestations that sponsors and institutions rely on. Kimosabe Commons attests to its own process; it does not certify professional licensure, insurance coverage or legal compliance.",
    ],
    indexable: true,
  },
  {
    path: "/participate",
    title: "Participate — Season 1 Participation and Sponsorship Tiers",
    description:
      "Participation tiers for Season 1, what each includes, what each costs, and what Kimosabe Commons never asks for. Sponsorship and participation only — never investment.",
    heading: "Take a seat. Hold a territory. Fund the season.",
    summary: [
      "Participation is sold as sponsorship or participation with a defined deliverable. It is never an investment and confers no equity, token, return or share of revenue.",
      "Tiers describe what the participant receives — roster access, campaign production, territory seats, attestation reports — and the fee for each season.",
    ],
    indexable: true,
  },
  {
    path: "/who-we-serve",
    title: "Who We Serve — Contractors, Sponsors, Counties, Builders",
    description:
      "The four audiences of Kimosabe Commons: contractors and crews, sponsors and institutions, civic and county partners, and engineers and agent builders.",
    heading: "Four audiences. One verified roster.",
    summary: [
      "Contractors and crews get a declared territory, a season and a roster of people who can actually work it. Sponsors and institutions get measured exposure to a verified network and an independent attestation of what was delivered. Civic and county partners get a verified roster against a real map. Engineers and agent builders get the recruiting layer that sits in front of a ledger which resets every year.",
    ],
    indexable: true,
  },
  {
    path: "/governance",
    title: "Governance and Public Benefit — Kimosabe Commons, PBC",
    description:
      "The chartered public benefit of Kimosabe Commons, PBC, how the board is constituted, how benefits are measured and published, and how conflicts are handled.",
    heading: "A chartered benefit, measured and published",
    summary: [
      "Kimosabe Commons is proposed as a Delaware public benefit corporation. Its intended chartered benefit is increasing the number of verified, address-anchored, lawfully organised participants who can convert a documented community Need into a documented, evidenced Done.",
      "That benefit is measured as verified stakeholder activations, evidenced completions and retained participation per territory per season, and published in an annual benefit report. Governance, conflict-of-interest rules and the boundary between this company and the founder's other interests are stated publicly.",
    ],
    indexable: true,
  },
  {
    path: "/benefit-report",
    title: "Benefit Report — Published Seasonal Metrics",
    description:
      "The published benefit report of Kimosabe Commons, PBC: what is measured, how it is verified, and the current reported state for the season in progress.",
    heading: "What we measure, and the current published state",
    summary: [
      "The benefit report publishes verified activations, evidenced completions, retained participation and territory coverage by season. Every figure on this page is labelled with the period it covers and whether it is reported, verified or still in progress.",
      "Where a figure is not yet available, this page says so rather than estimating silently.",
    ],
    indexable: true,
  },
  {
    path: "/territories",
    title: "Territories — Browse County Availability for Season 1",
    description:
      "Browse U.S. states and counties and see which territories are open, held or on a waitlist for the coming season. All territory data shown is illustrative sample data.",
    heading: "Find your county. See who holds the ground.",
    summary: [
      "Territory availability is shown by state and county with three states: open, held and waitlist. A held territory is under an active seasonal assignment; a waitlist territory has more qualified demand than seats.",
      "Every roster and availability figure on this page is illustrative sample data used to demonstrate the system. It is not a statement of actual holdings.",
    ],
    indexable: true,
  },
  {
    path: "/territories/:state",
    title: "Territory Detail — Counties, Codes and Availability",
    description:
      "The illustrative territory register for one state: counties, territory codes, availability states and open seats. All figures shown are sample data.",
    heading: "State territory register",
    summary: [
      "Each state page lists the counties in the sample register with their territory code, availability state, open seats and held seats. Territory nests from state to county to zip code to carrier route.",
      "Availability is shown as open, held or waitlist. A seasonal seat is a licence to work the ground for one season, renewed against performance at the season boundary; it is not ownership of the ground.",
      "All territory, seat and availability figures shown are illustrative sample data used to demonstrate the system, and are not a statement of actual holdings.",
    ],
    indexable: true,
  },
  {
    path: "/apply",
    title: "Apply — Join the Season 1 Roster",
    description:
      "Apply to join the Kimosabe Commons roster as a contractor, crew member, independent sales representative, sponsor, civic partner or builder.",
    heading: "Apply to the roster",
    summary: [
      "The application captures who you are, what you are licensed to do, which county you intend to work, and what you want to contribute. Submissions are stored and reviewed by a person.",
      "Applying does not create a contract and does not guarantee a territory seat.",
    ],
    indexable: true,
  },
  {
    path: "/sponsor",
    title: "Sponsor Inquiry — Fund a Season in a Territory",
    description:
      "Open a sponsorship inquiry with Kimosabe Commons: program of interest, budget range and the territory or outcome you want measured.",
    heading: "Fund a season. Get the measurement.",
    summary: [
      "Sponsorship is a defined research, implementation, measurement and recognition package. It is not an investment and returns no equity, token or share of revenue.",
      "Tell us the program, the budget range and the outcome you want measured, and a person will follow up.",
    ],
    indexable: true,
  },
  {
    path: "/resources",
    title: "Resources — Research and the Ecosystem Knowledge Bundle",
    description:
      "Open research from Kimosabe Commons: the open-source DAO management landscape, the Human Blockchain knowledge bundle, and the seasonal operating model.",
    heading: "Show the work",
    summary: [
      "This page links the research that informed the company's design, including a comparative study of five open-source DAO management platforms and the public knowledge bundle for the Human Blockchain operating system.",
    ],
    indexable: true,
  },
  {
    path: "/contact",
    title: "Contact Kimosabe Commons, PBC",
    description:
      "Contact Kimosabe Commons about territory availability, sponsorship, county partnerships, the roster or the research.",
    heading: "Reach a person",
    summary: [
      "Contact paths are grouped by reason: territory and roster questions, sponsorship and institutional inquiries, county and civic partnership, and press or research.",
    ],
    indexable: true,
  },
  {
    path: "/admin",
    title: "Admin Review — Kimosabe Commons",
    description: "Internal review of roster applications and sponsor inquiries.",
    heading: "Admin review",
    summary: ["Restricted to administrators."],
    indexable: false,
  },
];

/** Routes a crawler should be offered directly; dynamic patterns are excluded. */
export const PUBLIC_ROUTES = ROUTES.filter(r => r.indexable && !r.path.includes(":"));

export function findRoute(pathname: string): RouteMeta | undefined {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const exact = ROUTES.find(r => r.path === clean);
  if (exact) return exact;
  const segments = clean.split("/").filter(Boolean);
  if (segments.length > 0) {
    return ROUTES.find(r => {
      const rp = r.path.split("/").filter(Boolean);
      if (rp.length !== segments.length) return false;
      return rp.every((seg, i) => seg.startsWith(":") || seg === segments[i]);
    });
  }
  return undefined;
}

export function canonicalPath(path: string): string {
  return path === "/" ? "/" : path.replace(/\/+$/, "");
}

export function pageTitle(meta: RouteMeta): string {
  return meta.title;
}
