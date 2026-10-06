import { Link } from "wouter";
import { COMPANY, GOVERNANCE_FACTS } from "@/data/content";
import { Callout, DefinitionRow, LedgerSection, PageHeader } from "@/components/ledger";

const NOT_ADOPTED = [
  {
    pattern: "Token-weighted representation",
    reason:
      "A vote you can buy is not a stake held by the people doing the work. Contribution records may inform decisions; they are not for sale and they are not equity.",
  },
  {
    pattern: "Transferable governance rights sold for cash",
    reason: "It converts a public benefit obligation into an asset class.",
  },
  {
    pattern: "Exit rights that drain a shared pool",
    reason:
      "A participant leaving must not be able to take other participants' committed funds with them.",
  },
  {
    pattern: "Insider-controlled upgrade authority",
    reason:
      "Whoever can silently change the rules holds the real power, regardless of what the charter says.",
  },
  {
    pattern: "Off-chain signalling treated as automatic binding authority",
    reason:
      "A poll is a signal. Binding consequences require a separately accountable decision with a named owner.",
  },
  {
    pattern: "Permanent exclusive title to a territory",
    reason:
      "It ends recruitment. Ground is held for a season and renewed against performance, on the record.",
  },
];

export default function Governance() {
  return (
    <>
      <PageHeader
        numeral="05"
        eyebrow="Governance and public benefit"
        title="A chartered benefit, measured and published"
        lede="A public benefit corporation owes more than a mission statement. It owes a stated benefit, a board that balances it, and a report the public can check."
      >
        <Link
          href="/benefit-report"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          Read the benefit report
        </Link>
      </PageHeader>

      <LedgerSection numeral="01" label="The charter">
        <h2 className="measure">The benefit we are chartered to produce</h2>
        <blockquote className="measure-wide mt-6 border-l-2 border-brass bg-card p-5 text-[1.125rem] text-ink">
          {COMPANY.charteredBenefit}
        </blockquote>
        <p className="measure mt-6 text-[1.0625rem] text-ink-soft">
          That wording is a charter obligation, a measurement definition and a public claim at the
          same time. It fails if activations are not verified, if completions are not independently
          confirmed, or if the participants we count are not actually still present at the end of the
          season.
        </p>
        <Callout title="Draft language" tone="clay" className="mt-8 max-w-2xl">
          <p>
            The formal charter clause, the benefit-reporting obligation and the fiduciary balancing
            obligation are drafted for review by counsel and are published in the entity and
            governance document of this engagement. Nothing on this page is legal advice, and the
            entity described here is proposed, not formed.
          </p>
        </Callout>
      </LedgerSection>

      <LedgerSection numeral="02" label="How the company is run" tone="deep">
        <h2 className="measure">Structure, board and conflicts</h2>
        <dl className="measure-wide mt-8 border-t border-border">
          {GOVERNANCE_FACTS.map(fact => (
            <DefinitionRow key={fact.term} term={fact.term}>
              {fact.body}
            </DefinitionRow>
          ))}
        </dl>
      </LedgerSection>

      <LedgerSection numeral="03" label="Prohibited designs">
        <h2 className="measure">Six governance designs we will not adopt</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Each of these has been tried by someone else and each of them is a way for a public
          benefit to quietly become a private one.
        </p>
        <ul className="measure-wide mt-8 divide-y divide-border border-y border-border">
          {NOT_ADOPTED.map((item, index) => (
            <li key={item.pattern} className="grid gap-2 py-4 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
              <span className="data pt-0.5 text-brass">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[1.0625rem]">{item.pattern}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">{item.reason}</p>
              </div>
            </li>
          ))}
        </ul>
      </LedgerSection>

      <LedgerSection numeral="04" label="Correcting the record" tone="deep">
        <h2 className="measure">How to challenge a number we publish</h2>
        <ol className="measure-wide mt-6 divide-y divide-border border-y border-border">
          {[
            {
              title: "Cite the figure and the period",
              body: "Every published figure carries the season it covers and whether it is reported, verified or still in progress.",
            },
            {
              title: "Ask for the basis",
              body: "We will tell you what records the figure rests on, and what verification step produced it.",
            },
            {
              title: "Dispute it in writing",
              body: "A written challenge is logged, answered, and — if we were wrong — the correction is published against the original figure rather than replacing it silently.",
            },
            {
              title: "Escalate to the board",
              body: "If the challenge concerns whether the chartered benefit is being met, it goes to the board, and the board's response is recorded.",
            },
          ].map((step, index) => (
            <li key={step.title} className="grid gap-1 py-4 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
              <span className="data text-brass">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[1rem]">{step.title}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${COMPANY.pressingEmail}`} className="font-medium text-field underline">
            Email a correction
          </a>
          <Link href="/resources" className="font-medium text-field underline">
            Read the research behind these decisions
          </Link>
        </div>
      </LedgerSection>
    </>
  );
}