import { Link } from "wouter";
import { RESOURCES } from "@/data/content";
import { Callout, LedgerSection, PageHeader } from "@/components/ledger";

const PLATFORMS = [
  {
    name: "Aragon (OSx and App)",
    licence: "AGPL-3.0",
    took: "Function-level separation of powers, so an approval and an execution are different acts by different authorities.",
    refused: "Token-weighted governance as the default representation for a public benefit.",
  },
  {
    name: "DAOhaus (Moloch v3 / Baal)",
    licence: "GPL-3.0",
    took: "Segregated funds and differentiated rights — a voting position and an economic position can be different things.",
    refused: "Exit rights that drain a shared pool, and unrestricted privileged execution.",
  },
  {
    name: "Colony",
    licence: "GPL-3.0",
    took: "Scoped teams and budgets, task specifications, independent evaluation, and contribution records that are not transferable capital.",
    refused: "Reputation bought with stake, and a wallet-first membership model.",
  },
  {
    name: "DAOstack (Alchemy / Arc)",
    licence: "GPL-3.0",
    took: "Explicit authority, constrained actions and auditable proposal lifecycles — read from a dormant codebase, adopted as a pattern, not as code.",
    refused: "Any dependency on it. Default-branch work stopped in 2021–2022.",
  },
  {
    name: "Snapshot and Tally/Cactus",
    licence: "MIT (Snapshot)",
    took: "Gasless signal votes, delegate transparency, lifecycle notification, and a public read path that survives.",
    refused: "Treating an off-chain vote as automatic binding financial or legal authority.",
  },
  {
    name: "Open Collective, Loomio, Decidim",
    licence: "MIT · AGPL-3.0 · AGPL-3.0",
    took: "Fiscal-host separation and dual approval of real money; durable decision records; a participation lifecycle with verified tiers and public accountability.",
    refused: "Using any of them as the system of record, or treating community credits as cash by default.",
  },
];

export default function Resources() {
  return (
    <>
      <PageHeader
        numeral="07"
        eyebrow="Resources"
        title="Show the work"
        lede="We read what other people built before we decided what to build. Here is what we found, what we took, and what we refused."
      >
        <Link
          href="/governance"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          See how those decisions became governance
        </Link>
      </PageHeader>

      <LedgerSection numeral="01" label="Reading list">
        <h2 className="measure">Documents and research</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {RESOURCES.map(resource => (
            <article key={resource.title} className="flex flex-col border border-border bg-card p-5">
              <span className="data text-[0.6875rem] tracking-[0.16em] text-brass uppercase">
                {resource.kind}
              </span>
              <h3 className="mt-2 text-[1.0625rem]">{resource.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] text-ink-soft">{resource.body}</p>
              {resource.external ? (
                <a
                  href={resource.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="mt-4 font-medium text-field underline"
                >
                  Open {resource.title} <span className="sr-only">(external, opens in a new tab)</span>
                </a>
              ) : (
                <Link href={resource.href} className="mt-4 font-medium text-field underline">
                  Open {resource.title}
                </Link>
              )}
            </article>
          ))}
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="The landscape" id="landscape" tone="deep">
        <h2 className="measure">What five open-source DAO platforms already solved</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          We studied five open-source DAO management platforms and one adjacent public-benefit and
          civic set. The finding that shaped this company is a gap, not a feature: none of them
          provides a recruiting funnel, campaign attribution, territory administration, seasonal
          credit accounting, verified real-world identity, or a general ledger. Every one of them is
          a governance tool. None of them finds the people.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Platform research summary: what each platform contributed and what we refused
            </caption>
            <thead>
              <tr className="border-y border-border">
                <th scope="col" className="py-3 pr-4 text-[0.8125rem] font-semibold text-ink">
                  Platform
                </th>
                <th scope="col" className="py-3 pr-4 text-[0.8125rem] font-semibold text-ink">
                  Licence
                </th>
                <th scope="col" className="py-3 pr-4 text-[0.8125rem] font-semibold text-ink">
                  What we took
                </th>
                <th scope="col" className="py-3 text-[0.8125rem] font-semibold text-ink">
                  What we refused
                </th>
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map(row => (
                <tr key={row.name} className="border-b border-border align-top">
                  <th scope="row" className="py-4 pr-4 text-[0.9375rem] font-medium text-ink">
                    {row.name}
                  </th>
                  <td className="data py-4 pr-4 text-[0.75rem] text-muted-foreground">{row.licence}</td>
                  <td className="py-4 pr-4 text-[0.875rem] text-ink-soft">{row.took}</td>
                  <td className="py-4 text-[0.875rem] text-ink-soft">{row.refused}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="measure mt-6 text-[0.875rem] text-muted-foreground">
          Licences and maintenance status as observed in the research on 6 October 2026. Adoption
          figures reported by the projects themselves are not reproduced here, because we could not
          verify them.
        </p>
      </LedgerSection>

      <LedgerSection numeral="03" label="Method">
        <h2 className="measure">How we research, so you can discount it properly</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Callout title="Labelled claims">
            <p>
              Every material claim in our research is labelled observed, reported, inferred or
              assumed. Where a number could not be verified, it is written as not verified rather
              than estimated.
            </p>
          </Callout>
          <Callout title="Primary sources">
            <p>
              Official documentation, public repositories, public pricing and governance pages, with
              the access date recorded. Vendor-reported adoption figures are treated as claims, not
              facts.
            </p>
          </Callout>
          <Callout title="Independence" tone="field">
            <p>
              We adopt patterns and we do not reproduce another project's interface, copy, code or
              identity. Where a licence is copyleft, we treat that as a constraint, not a detail.
            </p>
          </Callout>
          <Callout title="No manufactured findings" tone="field">
            <p>
              Our adversarial review reports what the evidence supports. It is not padded with
              invented critical risks to look thorough.
            </p>
          </Callout>
        </div>
      </LedgerSection>

      <LedgerSection numeral="04" label="Open questions" tone="deep">
        <h2 className="measure">What we still do not know</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          The research and the specifications produced in this engagement each end with an open
          questions block, and those blocks are part of the deliverable rather than a caveat. If you
          are evaluating this company, the open questions are the most useful thing we can give you:
          they tell you exactly which claims are not yet settled.
        </p>
        <Link href="/contact" className="mt-6 inline-block font-medium text-field underline">
          Ask us for the specific open question list
        </Link>
      </LedgerSection>
    </>
  );
}