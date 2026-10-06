import { Link } from "wouter";
import { AUDIENCES, BENEFIT_METRICS, COMPANY, NEVER_SAY, PROGRAMS } from "@/data/content";
import {
  AddressField,
  Callout,
  Hairline,
  LedgerSection,
  SampleDataNotice,
  SeasonBand,
  SectionRule,
  StatLine,
} from "@/components/ledger";
import { territoryTotals } from "@shared/territories";

const totals = territoryTotals();

const proposition = [
  {
    title: "We find the people",
    body: "Recruiting a territory is a real job: sourcing, reference checks, licence verification and role assignment. We do it against named open seats, not a job board.",
  },
  {
    title: "We promote the work",
    body: "Campaigns, content, direct mail and the seasonal announcement cycle, with source attribution on every response so no one loses credit for the lead they originated.",
  },
  {
    title: "We hold the ground",
    body: "A territory register for state, county, zip and carrier route, with seat allocation, renewal decisions and a dispute process that closes before the season ends.",
  },
  {
    title: "We verify what happened",
    body: "Completion confirmed by someone who did not do the work, an attestation with a date on it, and a published benefit report that shows what we could not measure.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <AddressField className="border-b border-border">
        <div className="container py-16 sm:py-24">
          <div className="ledger-grid">
            <div className="pt-2">
              <SectionRule numeral="00" label="Kimosabe Commons, PBC" />
            </div>
            <div className="ledger-field">
              <p className="data text-[0.75rem] tracking-[0.2em] text-field uppercase">
                A proposed Delaware public benefit corporation
              </p>
              <h1 className="measure-wide mt-4">
                Every address is a stakeholder. Every stakeholder gets a job.
              </h1>
              <p className="measure mt-6 text-[1.125rem] text-ink-soft">
                Kimosabe Commons builds the recruiting, promotion and stewardship layer for the
                Human Blockchain. We turn a map of people and addresses into a verified roster: who
                is licensed, who owns the claim, who can act, what territory they hold, and what they
                completed this season.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
                >
                  Claim your territory for Season 1
                </Link>
                <Link
                  href="/how-it-works"
                  className="border border-ink/25 px-5 py-3 font-medium text-ink no-underline transition-colors hover:border-ink hover:bg-card"
                >
                  See how the season runs
                </Link>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatLine
                  value="3,143"
                  label="U.S. county equivalents"
                  note="Every one of them is a roster that has not been written."
                />
                <StatLine value="5" label="Phases in the season" note="Pre-Season through Reset." />
                <StatLine value="4" label="Programs" note="Recruit, promote, steward, attest." />
                <StatLine
                  value="0"
                  label="Published figures until verified"
                  note="We report the measured state, including the gaps."
                />
              </div>
            </div>
          </div>
        </div>
      </AddressField>

      {/* Proposition */}
      <LedgerSection numeral="01" label="What we do">
        <h2 className="measure">The bottleneck was never the ledger. It was the roster.</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          A map of people and addresses only means something if somebody finds the people, verifies
          them, gives them ground to hold and confirms what they finished. That is the work we do,
          in four parts.
        </p>
        <Hairline className="my-8" />
        <ol className="divide-y divide-border border-y border-border">
          {proposition.map((item, index) => (
            <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
              <span className="data pt-1 text-brass">{String(index + 1).padStart(2, "0")}</span>
              <div className="measure-wide">
                <h3 className="text-[1.125rem]">{item.title}</h3>
                <p className="mt-1.5 text-[1rem] text-ink-soft">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </LedgerSection>

      {/* Audiences */}
      <LedgerSection numeral="02" label="Who we serve" tone="deep">
        <h2 className="measure">Four audiences. One verified roster.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {AUDIENCES.map(audience => (
            <article key={audience.key} className="border border-border bg-card p-5">
              <h3 className="text-[1.125rem]">{audience.title}</h3>
              <p className="mt-1 text-[0.9375rem] font-medium text-field">{audience.line}</p>
              <p className="mt-3 text-[0.9375rem] text-ink-soft">{audience.body}</p>
              <ul className="mt-4 space-y-1">
                {audience.wants.map(want => (
                  <li key={want} className="flex gap-2 text-[0.8125rem] text-muted-foreground">
                    <span aria-hidden="true" className="text-brass">
                      —
                    </span>
                    {want}
                  </li>
                ))}
              </ul>
              <Link
                href={audience.cta.href}
                className="mt-5 inline-block text-[0.9375rem] font-medium text-field underline"
              >
                {audience.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </LedgerSection>

      {/* The season */}
      <LedgerSection numeral="03" label="The seasonal clock" id="season">
        <h2 className="measure">The year has five phases, and everyone knows which one we are in.</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Work is seasonal, so the company is seasonal. Ground is allocated before the season opens,
          commitments are closed at cool-down, disputes are settled against the record by a deadline,
          and then every address returns to Need. Nothing is erased — the history stays, the
          entitlement does not.
        </p>
        <div className="mt-8">
          <SeasonBand activeIndex={0} />
        </div>
        <Callout title="Why the reset matters" className="mt-8 max-w-2xl">
          <p>
            A permanent claim on a territory is how a network stops recruiting. The reset renews
            roles, seats and comparative baselines at the season boundary while preserving every
            record, every obligation and every earned result. It is not a punishment and it is not a
            giveaway — it is the reason there is always room for a new person to earn a season.
          </p>
        </Callout>
      </LedgerSection>

      {/* Programs */}
      <LedgerSection numeral="04" label="Programs" tone="deep">
        <h2 className="measure">Four programs. One operating spine.</h2>
        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
          {PROGRAMS.map(program => (
            <article key={program.key} className="bg-card p-5">
              <span className="data text-[0.6875rem] tracking-[0.18em] text-brass">
                PROGRAM {program.numeral}
              </span>
              <h3 className="mt-2 text-[1.0625rem]">{program.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">{program.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/programs" className="font-medium text-field underline">
            Read what each program delivers
          </Link>
        </div>
      </LedgerSection>

      {/* Territory */}
      <LedgerSection numeral="05" label="Territory">
        <h2 className="measure">Find your county. See who holds the ground.</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Territory nests: state, then county, then zip, then carrier route. Browse availability
          before you apply, so you are asking for ground that exists.
        </p>
        <div className="mt-6">
          <SampleDataNotice>
            {`The ${totals.total} counties shown in the territory browser are illustrative sample data used to demonstrate the system — ${totals.open} marked open, ${totals.held} held and ${totals.waitlist} on a waitlist. They are not a statement of actual holdings.`}
          </SampleDataNotice>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <StatLine value={String(totals.open)} label="Territories shown open" note="Illustrative sample data" />
          <StatLine value={String(totals.held)} label="Territories shown held" note="Illustrative sample data" />
          <StatLine
            value={String(totals.waitlist)}
            label="Territories shown on waitlist"
            note="Illustrative sample data"
          />
        </div>
        <div className="mt-6">
          <Link href="/territories" className="font-medium text-field underline">
            Open the territory browser
          </Link>
        </div>
      </LedgerSection>

      {/* Accountability */}
      <LedgerSection numeral="06" label="Accountability" tone="deep">
        <h2 className="measure">The published state, including what we cannot yet measure.</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Our chartered benefit is specific and both the board and the public can hold us to it.
          Every figure below carries the period it covers and whether it is reported, verified or
          still in progress.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFIT_METRICS.map(metric => (
            <div key={metric.key} className="border-t-2 border-brass/60 bg-card p-4">
              <p className="data text-[0.6875rem] tracking-[0.14em] text-clay uppercase">
                {metric.status}
              </p>
              <h3 className="mt-2 text-[1rem]">{metric.label}</h3>
              <p className="mt-2 text-[0.8125rem] text-ink-soft">{metric.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/benefit-report" className="font-medium text-field underline">
            Read the benefit report
          </Link>
          <Link href="/governance" className="font-medium text-field underline">
            Read the governance and public benefit statement
          </Link>
        </div>
      </LedgerSection>

      {/* What we are not */}
      <LedgerSection numeral="07" label="What we are not">
        <h2 className="measure">Ten things you will never hear us say.</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Most of the harm in a network like this comes from a sentence somebody was allowed to say.
          So we publish the wall.
        </p>
        <ul className="measure-wide mt-6 divide-y divide-border border-y border-border">
          {NEVER_SAY.map(item => (
            <li key={item.claim} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:gap-6">
              <span className="text-[0.9375rem] text-ink line-through decoration-clay/60 decoration-1">
                {item.claim}
              </span>
              <span className="text-[0.875rem] text-muted-foreground">{item.reason}</span>
            </li>
          ))}
        </ul>
      </LedgerSection>

      {/* CTA */}
      <section className="border-b border-border bg-ink py-16 text-paper">
        <div className="container">
          <div className="ledger-grid">
            <div className="pt-1">
              <div className="rule-mark">
                <span className="rule-draw">08</span>
                <span className="text-paper/70 normal-case tracking-[0.08em]">Start here</span>
              </div>
            </div>
            <div className="ledger-field">
              <h2 className="measure text-paper">A county is not a market. It is a roster waiting to be written.</h2>
              <p className="measure mt-4 text-[1.0625rem] text-paper/80">
                If you hold a licence, run a crew, originate work, steward ground or fund measured
                seasons — there is a seat with your name on it in the coming season. Applications are
                read by a person, and applying creates no obligation on either side.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="border border-paper bg-paper px-5 py-3 font-medium text-ink no-underline transition-colors hover:bg-paper-deep"
                >
                  Apply to the roster
                </Link>
                <Link
                  href="/sponsor"
                  className="border border-paper/40 px-5 py-3 font-medium text-paper no-underline transition-colors hover:border-paper hover:bg-paper/10"
                >
                  Sponsor a season
                </Link>
              </div>
              <p className="data mt-6 text-[0.75rem] tracking-[0.08em] text-paper/60">
                {COMPANY.legalName} · {COMPANY.jurisdiction} · Proposed
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
