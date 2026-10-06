import { Link } from "wouter";
import { FUNNEL } from "@/data/content";
import { Callout, LedgerSection, PageHeader, SeasonBand } from "@/components/ledger";

const stageDetail = [
  {
    title: "Discovery",
    body: "Territory recruiting starts from a named list of open seats, not a general advertisement. We work from the licence registers, the current operating companies, county relationships and the content network. Every candidate carries the source they came from.",
    notThis: "We do not buy a list and call it recruiting.",
  },
  {
    title: "Verification",
    body: "We check identity, organisation and licence at the level of risk involved, and we record what we checked and where the check came from. Verification is done once and reused for the season, so a contractor is not asked for the same licence five times.",
    notThis: "We do not treat an unverified self-description as a licence.",
  },
  {
    title: "Onboarding",
    body: "Role, agreement, permissions and conflict disclosures are established explicitly, with consent recorded. A person who has not completed onboarding has no access to another entity's data and no authority to act on anyone's behalf.",
    notThis: "Nobody is onboarded by implication.",
  },
  {
    title: "Territory assignment",
    body: "We record who holds which ground and until when, and we distinguish a group's permanent structural right from a temporary, territory-restricted seasonal seat. Both are visible in the register.",
    notThis: "A seasonal seat is not ownership of the ground.",
  },
  {
    title: "Campaign execution",
    body: "The promotion a territory actually needs: local campaigns, content, direct mail and events, run to the seasonal calendar, with source attribution preserved on every response.",
    notThis: "Attention is not the product. Attributed response is.",
  },
  {
    title: "Retained participation",
    body: "At cool-down we measure who is still active, who renewed and who left. We publish the departures alongside the renewals, because a retention rate without its losses is a marketing number.",
    notThis: "We do not report retention without the losses.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        numeral="01"
        eyebrow="How it works"
        title="A six-step funnel, run the same way in every county"
        lede="Recruiting a territory is ordinary operational work done carefully. Here is the whole funnel, with the artefact each stage produces and the thing we refuse to do."
      >
        <Link
          href="/apply"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          Start at step one — apply
        </Link>
      </PageHeader>

      <LedgerSection numeral="02" label="The stages">
        <ol className="divide-y divide-border border-y border-border">
          {stageDetail.map((stage, index) => (
            <li key={stage.title} className="grid gap-3 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6">
              <span className="data pt-1 text-brass">{String(index + 1).padStart(2, "0")}</span>
              <div className="measure-wide">
                <h2 className="text-[1.25rem]">{stage.title}</h2>
                <p className="mt-2 text-[1rem] text-ink-soft">{stage.body}</p>
                <p className="mt-3 border-l-2 border-clay pl-3 text-[0.875rem] text-ink-soft">
                  <span className="data mr-2 tracking-[0.12em] text-clay uppercase">We do not</span>
                  {stage.notThis}
                </p>
                <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div>
                    <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                      Produces
                    </dt>
                    <dd className="mt-1 text-[0.875rem] text-ink">{FUNNEL[index].artefact}</dd>
                  </div>
                  <div>
                    <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                      Measured by
                    </dt>
                    <dd className="mt-1 text-[0.875rem] text-ink">{FUNNEL[index].measure}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </LedgerSection>

      <LedgerSection numeral="03" label="The season" id="season" tone="deep">
        <h2 className="measure">The funnel fits inside a five-phase year</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Steps one through four happen in Pre-Season. Step five runs from March to November. Step
          six is measured at Cool-Down. Any dispute is settled against the record before the
          deadline, and then the calendar resets.
        </p>
        <div className="mt-8">
          <SeasonBand />
        </div>
      </LedgerSection>

      <LedgerSection numeral="04" label="Rules of the road">
        <h2 className="measure">Six rules we hold ourselves to</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Callout title="One">Consent is explicit and recorded. Nobody joins by implication.</Callout>
          <Callout title="Two">
            Verification happens once and is reused. Re-asking for the same licence is a process
            failure, not diligence.
          </Callout>
          <Callout title="Three" tone="field">
            Completion is confirmed by someone who did not do the work.
          </Callout>
          <Callout title="Four" tone="field">
            Source attribution is preserved on every lead, so credit is never silently absorbed.
          </Callout>
          <Callout title="Five" tone="clay">
            A seasonal seat is a licence to work the ground for one season, not ownership of it.
          </Callout>
          <Callout title="Six" tone="clay">
            We publish the losses with the wins, and we publish the figures we could not measure.
          </Callout>
        </div>
      </LedgerSection>

      <LedgerSection numeral="05" label="Boundaries">
        <h2 className="measure">What this company does not do</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          The boundary is deliberate, because crossing it would make us something we are not
          equipped or permitted to be.
        </p>
        <ul className="measure-wide mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "We do not move money, hold funds or act as an escrow agent.",
            "We do not adjust, underwrite or handle claims.",
            "We do not offer investments, tokens, equity or a share of revenue.",
            "We do not put personal operational data on a public chain.",
            "We do not claim regulator, insurer or institutional endorsement.",
            "We do not certify your licence, your insurance or your legal compliance.",
          ].map(item => (
            <li key={item} className="flex gap-2 border-t border-border pt-3 text-[0.9375rem] text-ink-soft">
              <span aria-hidden="true" className="text-clay">
                ×
              </span>
              {item}
            </li>
          ))}
        </ul>
      </LedgerSection>
    </>
  );
}