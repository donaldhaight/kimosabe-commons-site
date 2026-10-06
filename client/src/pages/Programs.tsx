import { Link } from "wouter";
import { PROGRAMS } from "@/data/content";
import { Callout, Hairline, LedgerSection, PageHeader } from "@/components/ledger";

export default function Programs() {
  return (
    <>
      <PageHeader
        numeral="02"
        eyebrow="Programs"
        title="Four programs. One operating spine."
        lede="Everything the company sells is one of these four programs. Each has named deliverables, a definition of who it serves, and one measure we publish."
      >
        <Link
          href="/participate"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          See what participation includes
        </Link>
      </PageHeader>

      {PROGRAMS.map((program, index) => (
        <LedgerSection
          key={program.key}
          numeral={String(index + 1).padStart(2, "0")}
          label={program.title}
          id={program.key}
          tone={index % 2 === 1 ? "deep" : "paper"}
        >
          <span className="data text-[0.6875rem] tracking-[0.18em] text-brass">
            PROGRAM {program.numeral}
          </span>
          <h2 className="measure-wide mt-2">{program.title}</h2>
          <p className="measure mt-3 text-[1.0625rem] text-ink-soft">{program.summary}</p>

          <Hairline className="my-7" />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <h3 className="text-[1.0625rem]">What you receive</h3>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {program.deliverables.map(item => (
                  <li key={item} className="flex gap-3 py-3">
                    <span aria-hidden="true" className="data pt-0.5 text-brass">
                      —
                    </span>
                    <span className="text-[0.9375rem] text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="space-y-5">
              <div>
                <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Who it serves
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] text-ink-soft">{program.who}</dd>
              </div>
              <div>
                <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                  Published measure
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] text-ink-soft">{program.metric}</dd>
              </div>
            </dl>
          </div>
        </LedgerSection>
      ))}

      <LedgerSection numeral="05" label="Pricing posture" tone="deep">
        <h2 className="measure">How these programs are priced</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Seat subscription, campaign production and attestation are priced per season and published
          in the season terms before they are sold. Founding seats are priced by agreement for a
          defined package with a defined measurement. Nothing here is priced as an investment,
          because nothing here is one.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Callout title="Revenue streams">
            <p>
              Four, all disclosed: sponsor and founding-seat programs; territory and seat
              subscription; campaign and content production; and attestation and verification
              services.
            </p>
          </Callout>
          <Callout title="What we will not sell" tone="clay">
            <p>
              Equity, tokens, a share of revenue, an exclusive permanent claim on a territory, or a
              favourable number in a published report.
            </p>
          </Callout>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/sponsor" className="font-medium text-field underline">
            Open a sponsor inquiry
          </Link>
          <Link href="/territories" className="font-medium text-field underline">
            Check territory availability
          </Link>
        </div>
      </LedgerSection>
    </>
  );
}