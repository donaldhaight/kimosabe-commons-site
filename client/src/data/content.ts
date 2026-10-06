/**
 * Site content. Written to the Civic Ledger voice: contractor-literal, plainspoken,
 * institutional. No prohibited claims (see the engagement's prohibited-claims register).
 */

export const COMPANY = {
  legalName: "Kimosabe Commons, PBC",
  shortName: "Kimosabe Commons",
  nickname: "The Commons",
  platformName: "The Commons Engine",
  tagline: "Every address is a stakeholder. Every stakeholder gets a job.",
  charteredBenefit:
    "Increasing the number of verified, address-anchored, lawfully organized participants who can convert a documented community Need into a documented, evidenced Done — measured as verified stakeholder activations, evidenced completions, and retained participation per territory per season.",
  /** Sponsor and institutional contact. Replace with the live mailbox before launch. */
  contactEmail: "hello@kimosabecommons.org",
  pressingEmail: "press@kimosabecommons.org",
  jurisdiction: "Delaware",
};

export const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/programs", label: "Programs" },
  { href: "/participate", label: "Participate" },
  { href: "/territories", label: "Territories" },
  { href: "/governance", label: "Governance" },
  { href: "/resources", label: "Resources" },
];

export const AUDIENCES = [
  {
    key: "contractors",
    title: "Contractors and crews",
    line: "Declare your territory. Earn your season.",
    body: "Declare the county you can actually work. Get a season, a roster of people who can hold a shovel, and a record of what you completed. Your licence, your insurance and your crew list are verified once and reused all season.",
    wants: ["A defined territory", "Crew that shows up", "Work that pays on a schedule"],
    cta: { href: "/apply", label: "Apply as a contractor" },
  },
  {
    key: "sponsors",
    title: "Sponsors and institutions",
    line: "Fund the network that proves its own work.",
    body: "Fund a measured season in a named territory. You get a published roster, an evidence trail for every completion, and a report you can hand to your own board. Sponsorship is a defined package, not an investment.",
    wants: ["Verified reach", "Independent measurement", "Defensible public reporting"],
    cta: { href: "/sponsor", label: "Open a sponsor inquiry" },
  },
  {
    key: "civic",
    title: "Civic and county partners",
    line: "A verified roster for every address on your map.",
    body: "See who is licensed, who holds which ground and what got finished this season — in your county, against your map. Useful for storm response, licensing outreach and neighbourhood programs.",
    wants: ["A verified local roster", "Seasonal reporting", "No new bureaucracy"],
    cta: { href: "/contact", label: "Talk to us about your county" },
  },
  {
    key: "builders",
    title: "Engineers and agent builders",
    line: "The recruiting layer for a ledger that resets every year.",
    body: "The honest bottleneck in this system was never the ledger. It was finding, verifying and keeping the people who make the ledger mean something. That is the layer we are building.",
    wants: ["A real domain problem", "Clear interfaces", "Work that compounds"],
    cta: { href: "/apply", label: "Apply as a builder" },
  },
];

export const FUNNEL = [
  {
    title: "Discovery",
    body: "We find the people a territory actually needs — contractors, crews, representatives, captains and partners — through direct outreach, county relationships, current operating companies and the content network.",
    artefact: "Sourced candidate list for the territory",
    measure: "Qualified candidates per open seat",
  },
  {
    title: "Verification",
    body: "We check identity, organisation and licence at the level of risk involved, and we record what we checked. A person's licence status is verified once and reused for the season rather than re-asked at every step.",
    artefact: "Verification record with the source of each check",
    measure: "Verification completion rate and time to verify",
  },
  {
    title: "Onboarding",
    body: "We establish the role, the agreement, the permissions and the conflict disclosures. Consent is explicit and recorded. Nobody is onboarded by implication.",
    artefact: "Role assignment, consent record, conflict disclosure",
    measure: "Onboarding completion without a support ticket",
  },
  {
    title: "Territory assignment",
    body: "We record who holds which ground and until when — state, county, zip or carrier route — and we log the difference between a permanent group right and a temporary seasonal seat.",
    artefact: "Territory allocation with a start and end date",
    measure: "Seats allocated versus seats open",
  },
  {
    title: "Campaign execution",
    body: "We produce and run the promotion the territory needs: local campaigns, direct mail, events, the seasonal announcement cycle and the content that explains the work.",
    artefact: "Campaign record with source attribution",
    measure: "Responses per campaign, attributed to source",
  },
  {
    title: "Retained participation",
    body: "At cool-down we measure who is still active, who renewed and who left — and we publish the result rather than describing it.",
    artefact: "Season close-out and retention report",
    measure: "Retention rate and renewals per territory",
  },
];

export const PROGRAMS = [
  {
    key: "recruiting",
    numeral: "01",
    title: "Recruiting and Roster Operations",
    summary:
      "The verified roster for a territory: sourcing, reference checks, licence verification and role assignment.",
    deliverables: [
      "Sourced and screened candidates against the named open seats",
      "Identity, organisation and licence verification at the level of risk involved",
      "Role assignment with consent and conflict disclosure on the record",
      "A seasonal roster with named roles and territory scope",
    ],
    who: "Contractors, crews, sales representatives, captains and civic partners.",
    metric: "Verified roster seats filled per territory per season.",
  },
  {
    key: "promotion",
    numeral: "02",
    title: "Promotion and Campaign Production",
    summary:
      "The outreach a territory needs, produced and attributed rather than described.",
    deliverables: [
      "Territory campaign plan tied to the seasonal calendar",
      "Content, direct mail, event support and the seasonal announcement cycle",
      "Source attribution on every response so credit is not lost",
      "A campaign record showing what ran, when and to whom",
    ],
    who: "Contractors seeking work, property owners with a Need, and civic partners with a program.",
    metric: "Attributed responses per campaign, and cost per attributed response.",
  },
  {
    key: "stewardship",
    numeral: "03",
    title: "Territory Stewardship",
    summary:
      "Holding the ground: seat allocation, renewals, dispute handling and the seasonal reset, on the record.",
    deliverables: [
      "A territory register for state, county, zip and carrier route",
      "Seat allocation with start and end dates and a renewal decision",
      "Dispute intake, evidence and resolution before the seasonal deadline",
      "A reset that renews commitments and preserves history",
    ],
    who: "Territory holders, groups and the county partners who care about who is working where.",
    metric: "Allocation coverage, dispute close rate and renewals.",
  },
  {
    key: "attestation",
    numeral: "04",
    title: "Attestation and Verification",
    summary:
      "Confirming that claimed work happened, and producing the attestation a sponsor or institution can rely on.",
    deliverables: [
      "Independent verification of completion against defined evidence",
      "A dated attestation referencing the underlying evidence records",
      "Ledger candidates handed to a qualified accounting function — we do not move money",
      "A published benefit report with each figure's period and status",
    ],
    who: "Sponsors, institutions and any partner who needs a defensible record.",
    metric: "Attestations issued, disputed and reversed — all three published.",
  },
];

export const TIERS = [
  {
    key: "scout",
    name: "Scout",
    audience: "Crew members, individual contributors and interested neighbours",
    price: "No fee for the first season",
    term: "One season",
    includes: [
      "A public profile with your verified role and licence status",
      "Access to the territory roster for your own county",
      "Notification when a seat opens in a county you declared",
      "The seasonal benefit report before it is published",
    ],
    excludes: ["A territory seat", "Campaign production", "Attestation services"],
  },
  {
    key: "seat",
    name: "Roster Seat",
    audience: "Licensed contractors, independent representatives and their crews",
    price: "Per seat, per season — published in the season terms",
    term: "One season, renewable",
    includes: [
      "A named role with territory scope for the season",
      "Your crew members verified and listed under your seat",
      "Recruiting support against your named open seats",
      "Territory campaign production and attribution",
      "An attestation record of your completed work",
    ],
    excludes: ["Permanent territory title", "Any share of another participant's revenue"],
  },
  {
    key: "steward",
    name: "Territory Steward",
    audience: "Organisations holding ground across a county or a multi-county area",
    price: "Annual stewardship fee — published in the season terms",
    term: "Annual, with a seasonal renewal decision",
    includes: [
      "Allocation of a named territory with a defined boundary",
      "Priority on renewals and the right to propose new seats",
      "A sponsor-ready reporting pack for your territory",
      "Input into the territory dispute process",
    ],
    excludes: ["Exclusive ownership of the ground", "Any authority over another group's permanent right"],
  },
  {
    key: "founding",
    name: "Founding Seat",
    audience: "Institutions, insurers, suppliers, foundations and county bodies",
    price: "By agreement, for a defined season package",
    term: "One season, with an evaluation at cool-down",
    includes: [
      "Participation in the research and design working group",
      "Implementation and integration support for your own systems",
      "Training for your staff on reading the roster and the evidence",
      "A measured seat in a named set of territories",
      "A published case study and an independent measurement report",
      "Public recognition of your participation",
    ],
    excludes: [
      "Equity, tokens or any share of revenue",
      "Control of the territory, the roster or the published measures",
    ],
  },
];

export const TIER_DISCLOSURE =
  "Participation is sold as sponsorship or participation with a defined deliverable. It is never an investment, and it confers no equity, token, return or share of revenue. Any pathway that would create economic rights requires securities counsel and appropriate disclosures before it is offered to anyone.";

export const BENEFIT_METRICS = [
  {
    key: "activations",
    label: "Verified stakeholder activations",
    what: "A person or organisation that completed identity, organisation and licence verification and holds a named role with territory scope for the season.",
    verify: "Verification record with the source of each check retained.",
    status: "Not yet reported",
    note: "The first operating season has not closed. No figure is published until it is verified.",
  },
  {
    key: "completions",
    label: "Evidenced completions",
    what: "A work item that reached Done against defined evidence and was confirmed by a verifier who did not perform the work.",
    verify: "Evidence record plus the independent verification record.",
    status: "Not yet reported",
    note: "Verification is deliberate; a completion without independent confirmation is not counted.",
  },
  {
    key: "retention",
    label: "Retained participation",
    what: "Roster seats still active at cool-down and seats renewed for the following season, measured per territory.",
    verify: "Season close-out record and renewal decisions.",
    status: "Not yet reported",
    note: "Retention is published with the departures, not only the renewals.",
  },
  {
    key: "coverage",
    label: "Territory coverage",
    what: "Counties with at least one allocated seat and at least one evidenced completion in the season.",
    verify: "Territory register plus the completion records for the county.",
    status: "Not yet reported",
    note: "A county with allocated seats but no completions is reported as allocated, not as covered.",
  },
];

export const GOVERNANCE_FACTS = [
  {
    term: "Legal form",
    body: "A Delaware public benefit corporation. It has a chartered public benefit, and the directors must report on it and balance it against the interests of the company and its participants.",
  },
  {
    term: "Chartered benefit",
    body: COMPANY.charteredBenefit,
  },
  {
    term: "The board",
    body: "Initial composition is the founder plus two independent directors, none of whom holds an interest in the founder's other operating companies. Independent directors are appointed before the first sponsored season closes.",
  },
  {
    term: "Conflicts",
    body: "Any decision touching the founder's other entities — including Roofing & Reconstruction Contractors of America — requires disclosure, recusal and a written record of the recusal.",
  },
  {
    term: "Sponsorship is not investment",
    body: TIER_DISCLOSURE,
  },
  {
    term: "The IP boundary",
    body: "Founder intellectual property, domain names, brands and the narrative corpus are licensed or contributed under a written agreement. They are not silently absorbed, and a business name filed as an assumed name is not a separate legal entity.",
  },
  {
    term: "What this company is not",
    body: "It is not a token issuer, an investment vehicle, an insurer, an adjuster, an escrow agent, a money transmitter, a bank, a law firm or a fiduciary. It does not move money and it does not handle claims.",
  },
  {
    term: "Benefit reporting",
    body: "The seasonal benefit report is published once the season closes. Every figure carries the period it covers and whether it is reported, verified or still in progress. Where a figure is unavailable, the report says so rather than estimating silently.",
  },
];

export const RESOURCES = [
  {
    title: "The DAO management landscape",
    kind: "Research",
    body: "A comparative study of five open-source DAO management platforms — Aragon, DAOhaus, Colony, DAOstack and Snapshot with Tally — plus the adjacent public-benefit and civic set: Open Collective, Loomio and Decidim. What each one solved, what none of them solved, and what we chose to adopt and to refuse.",
    href: "/resources#landscape",
    external: false,
  },
  {
    title: "Human Blockchain operating-system knowledge bundle",
    kind: "External",
    body: "The public knowledge bundle behind the operating model: the master continuity brief, the commercial object model, the role and designation model, the ledger framework and the seasonal plan.",
    href: "https://github.com/donaldhaight/human-blockchain-operating-system",
    external: true,
  },
  {
    title: "The seasonal model",
    kind: "Method",
    body: "Why the year is divided into pre-season, season, cool-down, dispute resolution and reset — and why every address returns to Need at the boundary instead of becoming permanent entitlement.",
    href: "/how-it-works#season",
    external: false,
  },
  {
    title: "The benefit report",
    kind: "Report",
    body: "What we measure, how each figure is verified, and the current published state. Includes what we could not yet measure and why.",
    href: "/benefit-report",
    external: false,
  },
];

export const CONTACT_REASONS = [
  {
    title: "Territory and roster questions",
    body: "Availability in your county, seat terms, crew requirements, or how verification works.",
    href: "/apply",
    action: "Apply to the roster",
  },
  {
    title: "Sponsorship and institutional inquiries",
    body: "Funding a season, participating in the research group, or commissioning a case study.",
    href: "/sponsor",
    action: "Open a sponsor inquiry",
  },
  {
    title: "County and civic partnership",
    body: "Storm response, licensing outreach, neighbourhood programs or a county-wide roster.",
    href: "/sponsor",
    action: "Start a partnership inquiry",
  },
  {
    title: "Press, research and corrections",
    body: "Corrections to anything we have published are welcome and are logged publicly.",
    href: `mailto:${COMPANY.pressingEmail}`,
    action: "Email press and research",
  },
];

export const INTEREST_OPTIONS = [
  { value: "roster_seat", label: "Hold a roster seat" },
  { value: "crew_work", label: "Work on a crew" },
  { value: "sales", label: "Originate leads and offers" },
  { value: "captain", label: "Serve as a neighbourhood captain" },
  { value: "verify", label: "Verify completed work independently" },
  { value: "campaign", label: "Produce campaigns and content" },
  { value: "territory_steward", label: "Steward a territory" },
  { value: "civic", label: "Civic or county partnership" },
  { value: "sponsor", label: "Sponsor a season" },
  { value: "engineering", label: "Build the platform" },
];

export const APPLICANT_TYPES = [
  { value: "contractor", label: "Licensed contractor" },
  { value: "crew", label: "Crew member" },
  { value: "sales_rep", label: "Independent sales representative" },
  { value: "sponsor", label: "Sponsor or institution" },
  { value: "civic_partner", label: "Civic or county partner" },
  { value: "builder", label: "Engineer or agent builder" },
  { value: "other", label: "Something else" },
];

export const SPONSOR_ORG_TYPES = [
  { value: "insurer", label: "Insurer" },
  { value: "supplier_manufacturer", label: "Supplier or manufacturer" },
  { value: "financial_institution", label: "Financial institution" },
  { value: "municipality_or_county", label: "Municipality or county" },
  { value: "nonprofit_or_association", label: "Nonprofit or association" },
  { value: "foundation", label: "Foundation" },
  { value: "media", label: "Media" },
  { value: "other", label: "Other" },
];

export const SPONSOR_PROGRAMS = [
  { value: "recruiting_and_roster", label: "Recruiting and roster operations" },
  { value: "promotion_and_campaigns", label: "Promotion and campaign production" },
  { value: "territory_stewardship", label: "Territory stewardship" },
  { value: "attestation_and_verification", label: "Attestation and verification" },
  { value: "research_and_case_study", label: "Research and case study" },
  { value: "undecided", label: "Not decided yet" },
];

export const BUDGET_RANGES = [
  { value: "under_10k", label: "Under $10,000" },
  { value: "10k_25k", label: "$10,000 – $25,000" },
  { value: "25k_50k", label: "$25,000 – $50,000" },
  { value: "50k_100k", label: "$50,000 – $100,000" },
  { value: "100k_250k", label: "$100,000 – $250,000" },
  { value: "over_250k", label: "Over $250,000" },
  { value: "not_disclosed", label: "Prefer not to say" },
];

export const NEVER_SAY = [
  { claim: "Any endorsement by a regulator, insurer, bank or institution", reason: "No such authorization exists." },
  { claim: "That a valuation, price or return is established or guaranteed", reason: "We publish estimates only, labelled as such." },
  { claim: "Investment, equity, ROI, yield or token language", reason: "We sell defined sponsorship, not securities." },
  { claim: "Coverage, underwriting or claims handling", reason: "We are not an insurer or an adjuster." },
  { claim: "A guaranteed income or recruitment compensation", reason: "Participation is work, not a scheme." },
  { claim: "That participation substitutes for licensure or insurance", reason: "Licensing and cover remain the participant's own obligation." },
  { claim: "A real stakeholder's personal data", reason: "Demonstration environments use synthetic data only." },
  { claim: "That a projected number is a result", reason: "Targets and models are labelled as targets and models." },
  { claim: "Another platform's interface or copy as our own", reason: "Our design is independently authored." },
  { claim: "A material limitation by silence", reason: "If a reader would rely on the omission, we state it." },
];