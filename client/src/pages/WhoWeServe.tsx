import { Link } from "wouter";
import { AUDIENCES } from "@/data/content";
import { DefinitionRow, LedgerSection, PageHeader } from "@/components/ledger";

const ROLE_FAMILIES = [
  {
    family: "Work",
    roles: "Licensed Contractor · Crew Member · Independent Sales Representative",
    note: "The people who hold ground and do the work. Verified licence and organisation, a season, and a record of what they completed.",
  },
  {
    family: "Stewardship",
    roles: "Captain · Territory Steward · Company Admin",
    note: "The people accountable for a place and for a company's obligations: seats, renewals, disputes and the seasonal close-out.",
  },
  {
    family: "Verification",
    roles: "ClaimBuddy · Verifier",
    note: "Independent confirmation that work happened. A verifier never confirms their own work, and never confirms work they were paid to produce.",
  },
  {
    family: "Support and capacity",
    roles: "Recruiter · Campaign Producer · Administrator",
    note: "The Kimosabe Commons side: sourcing, verification support, campaign production, review and reporting.",
  },
  {
    family: "Participation",
    roles: "Sponsor · Civic Partner",
    note: "The people who fund a measured season or bring a county, a program or a map into the network.",
  },
  {
    family: "Machine",
    roles: "Company Agent",
    note: "A bounded assistant that prepares, summarises, monitors and recommends. It never binds the company, moves money, grants authority or makes a coverage decision.",
  },
];

export default function WhoWeServe() {
  return (
    <>
      <PageHeader
        numeral="04"
        eyebrow="Who we serve"
        title="Four audiences. One verified roster."
        lede="Different people want different things from a map of people and addresses. Here is what each of them actually gets."
      >
        <Link
          href="/territories"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          Look at territory availability
        </Link>
      </PageHeader>

      {AUDIENCES.map((audience, index) => (
        <LedgerSection
          key={audience.key}
          numeral={String(index + 1).padStart(2, "0")}
          label={audience.title}
          id={audience.key}
          tone={index % 2 === 1 ? "deep" : "paper"}
        >
          <h2 className="measure-wide">{audience.line}</h2>
          <p className="measure mt-4 text-[1.0625rem] text-ink-soft">{audience.body}</p>
          <div className="measure mt-6 grid gap-3 sm:grid-cols-3">
            {audience.wants.map(want => (
              <div key={want} className="border-t-2 border-brass/60 pt-3">
                <p className="text-[0.9375rem] text-ink">{want}</p>
              </div>
            ))}
          </div>
          <Link href={audience.cta.href} className="mt-6 inline-block font-medium text-field underline">
            {audience.cta.label}
          </Link>
        </LedgerSection>
      ))}

      <LedgerSection numeral="05" label="Role families" tone="deep">
        <h2 className="measure">Roles are structural, not decorative</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Every role belongs either to a Group — a structural category with its own administration,
          accounts and rules — or is a Designation inside one: a function with territory scope and,
          usually, a time limit. The difference decides what a person can see and do.
        </p>
        <dl className="measure-wide mt-8 border-t border-border">
          {ROLE_FAMILIES.map(item => (
            <DefinitionRow key={item.family} term={item.family}>
              <span className="block font-medium text-ink">{item.roles}</span>
              <span className="mt-1 block">{item.note}</span>
            </DefinitionRow>
          ))}
        </dl>
        <p className="measure mt-6 text-[0.9375rem] text-muted-foreground">
          Licensing and professional responsibility stay with the participant. A role label on this
          platform never authorises adjusting, legal advice, coverage decisions or payment approval.
        </p>
      </LedgerSection>
    </>
  );
}