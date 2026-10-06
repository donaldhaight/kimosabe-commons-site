import { Link } from "wouter";
import { NEVER_SAY, TIERS, TIER_DISCLOSURE } from "@/data/content";
import { Callout, LedgerSection, PageHeader } from "@/components/ledger";

export default function Participate() {
  return (
    <>
      <PageHeader
        numeral="03"
        eyebrow="Participate"
        title="Take a seat. Hold a territory. Fund the season."
        lede="Participation is sold as sponsorship or participation with a defined deliverable, priced per season, with the terms published before they are sold."
      >
        <Link
          href="/apply"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          Claim your territory for Season 1
        </Link>
      </PageHeader>

      <LedgerSection numeral="01" label="The disclosure that matters">
        <div className="measure-wide border-l-2 border-clay bg-clay/5 p-5">
          <p className="data mb-2 text-[0.6875rem] tracking-[0.16em] text-clay uppercase">
            Read this before the tiers
          </p>
          <p className="text-[1.0625rem] text-ink">{TIER_DISCLOSURE}</p>
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="Tiers" tone="deep">
        <h2 className="measure">Four ways to participate</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          Each tier lists what it includes and what it deliberately does not. If a tier promises
          something that is not on this page, it is not part of the agreement.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {TIERS.map(tier => (
            <article key={tier.key} className="flex flex-col border border-border bg-card p-6">
              <h3 className="text-[1.25rem]">{tier.name}</h3>
              <p className="mt-1.5 text-[0.875rem] text-muted-foreground">{tier.audience}</p>

              <dl className="mt-5 grid gap-3 border-y border-border py-4 sm:grid-cols-2">
                <div>
                  <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                    Fee
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink">{tier.price}</dd>
                </div>
                <div>
                  <dt className="data text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                    Term
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink">{tier.term}</dd>
                </div>
              </dl>

              <h4 className="data mt-5 text-[0.6875rem] tracking-[0.14em] text-field uppercase">
                Includes
              </h4>
              <ul className="mt-2 flex-1 space-y-2">
                {tier.includes.map(item => (
                  <li key={item} className="flex gap-2 text-[0.9375rem] text-ink-soft">
                    <span aria-hidden="true" className="text-field">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="data mt-5 text-[0.6875rem] tracking-[0.14em] text-clay uppercase">
                Does not include
              </h4>
              <ul className="mt-2 space-y-2">
                {tier.excludes.map(item => (
                  <li key={item} className="flex gap-2 text-[0.9375rem] text-ink-soft">
                    <span aria-hidden="true" className="text-clay">
                      ×
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </LedgerSection>

      <LedgerSection numeral="03" label="Fees">
        <h2 className="measure">Why the fees are not listed as numbers yet</h2>
        <p className="measure mt-4 text-[1.0625rem] text-ink-soft">
          A published price is a promise, and a promise made before the season budget exists is a
          promise we would have to break. The season terms — including the seat fee, the campaign
          production rates and the attestation fee — are published as a written schedule before any
          tier is sold for that season, and they are included in the agreement you sign. Ask for the
          current schedule and we will send it rather than paraphrase it here.
        </p>
        <Callout title="What that means for you" className="mt-6 max-w-2xl">
          <p>
            No fee is charged on this website, nothing is auto-renewed, and applying creates no
            financial obligation on either side. If the schedule for the coming season has not been
            published, we will tell you it has not been published.
          </p>
        </Callout>
      </LedgerSection>

      <LedgerSection numeral="04" label="The wall" tone="deep">
        <h2 className="measure">What participation will never be</h2>
        <ul className="measure-wide mt-6 divide-y divide-border border-y border-border">
          {NEVER_SAY.slice(0, 6).map(item => (
            <li key={item.claim} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:gap-6">
              <span className="text-[0.9375rem] text-ink line-through decoration-clay/60 decoration-1">
                {item.claim}
              </span>
              <span className="text-[0.875rem] text-muted-foreground">{item.reason}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/governance" className="font-medium text-field underline">
            Read the governance and public benefit statement
          </Link>
          <Link href="/contact" className="font-medium text-field underline">
            Ask for the current season terms
          </Link>
        </div>
      </LedgerSection>
    </>
  );
}