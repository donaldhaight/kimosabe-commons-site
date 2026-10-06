import { Link } from "wouter";
import { BENEFIT_METRICS, COMPANY } from "@/data/content";
import { Callout, LedgerSection, PageHeader, SampleDataNotice } from "@/components/ledger";

const PUBLICATION_RULES = [
  "Every figure states the period it covers.",
  "Every figure is labelled reported, verified, or in progress.",
  "A figure that has not been verified is published as unverified, not as an estimate of a different number.",
  "Where a figure does not exist yet, the report says so rather than omitting the section.",
  "Losses are published alongside gains: departures, non-renewals, disputes and reversals.",
  "Corrections are published against the original figure; the original is never silently replaced.",
  "No personal data of any participant, property owner or claimant appears in a published report.",
];

export default function BenefitReport() {
  return (
    <>
      <PageHeader
        numeral="06"
        eyebrow="Benefit report"
        title="What we measure, and the current published state"
        lede="This is the standing structure of the seasonal benefit report. The first operating season has not closed, so most figures are published as not yet reported — which is itself the current published state."
      >
        <Link
          href="/governance"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          Read the chartered benefit
        </Link>
      </PageHeader>

      <LedgerSection numeral="01" label="Current state">
        <h2 className="measure">The honest current state</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          {COMPANY.legalName} is a proposed entity. It has not run an operating season. No
          activation, completion, retention or coverage figure has been measured, verified or
          published. Everything below defines what will be published and how it will be verified,
          not what has happened.
        </p>
        <div className="mt-6">
          <SampleDataNotice>
            No participant, roster or territory figure on this website is real. Territory and roster
            data shown elsewhere on this site is illustrative sample data used to demonstrate the
            system.
          </SampleDataNotice>
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="The four measures" tone="deep">
        <h2 className="measure">One measure per promise</h2>
        <div className="mt-8 space-y-6">
          {BENEFIT_METRICS.map(metric => (
            <article key={metric.key} className="border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[1.125rem]">{metric.label}</h3>
                <span className="data border border-clay px-2 py-0.5 text-[0.6875rem] tracking-[0.12em] text-clay uppercase">
                  {metric.status}
                </span>
              </div>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                    What counts
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-soft">{metric.what}</dd>
                </div>
                <div>
                  <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                    How it is verified
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-soft">{metric.verify}</dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-border pt-3 text-[0.875rem] text-muted-foreground">
                {metric.note}
              </p>
            </article>
          ))}
        </div>
      </LedgerSection>

      <LedgerSection numeral="03" label="Publication rules">
        <h2 className="measure">Seven rules the report is written to</h2>
        <ol className="measure-wide mt-6 divide-y divide-border border-y border-border">
          {PUBLICATION_RULES.map((rule, index) => (
            <li key={rule} className="grid gap-1 py-3 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
              <span className="data text-brass">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[0.9375rem] text-ink-soft">{rule}</span>
            </li>
          ))}
        </ol>
      </LedgerSection>

      <LedgerSection numeral="04" label="What we will publish beyond the four" tone="deep">
        <h2 className="measure">The uncomfortable numbers</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          A benefit report that only lists successes is a brochure. Alongside the four measures, the
          report will publish the numbers a reader is most likely to want and least likely to get.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Callout title="Applications and outcomes" tone="clay">
            <p>
              Applications received, applications verified, applications declined — and the reason
              categories for the declines.
            </p>
          </Callout>
          <Callout title="Verification integrity" tone="clay">
            <p>
              Attestations issued, attestations disputed, and attestations reversed. All three,
              together, every season.
            </p>
          </Callout>
          <Callout title="Territory disputes" tone="clay">
            <p>Disputes opened, disputes closed before the deadline, and disputes that ran past it.</p>
          </Callout>
          <Callout title="Sponsor reporting" tone="clay">
            <p>
              Sponsor packages sold, packages where the agreed measurement could not be produced,
              and what was done about it.
            </p>
          </Callout>
        </div>
      </LedgerSection>

      <LedgerSection numeral="05" label="Correct the record">
        <h2 className="measure">If a number here is wrong</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Write to us with the figure and the period. We will tell you what it rests on. If we were
          wrong, the correction is published against the original rather than replacing it, so the
          record shows both.
        </p>
        <a
          href={`mailto:${COMPANY.pressingEmail}`}
          className="mt-6 inline-block border border-ink/25 px-5 py-3 font-medium text-ink no-underline transition-colors hover:border-ink hover:bg-card"
        >
          Email a correction to {COMPANY.pressingEmail}
        </a>
      </LedgerSection>
    </>
  );
}