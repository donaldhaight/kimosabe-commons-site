import { Link } from "wouter";
import { COMPANY, CONTACT_REASONS } from "@/data/content";
import { Callout, LedgerSection, PageHeader } from "@/components/ledger";

export default function Contact() {
  return (
    <>
      <PageHeader
        numeral="08"
        eyebrow="Contact"
        title="Reach a person"
        lede="There is no chatbot gatekeeping this. Pick the reason you are writing and it goes to the right queue, where a person reads it."
      >
        <a
          href={`mailto:${COMPANY.contactEmail}`}
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          Email {COMPANY.contactEmail}
        </a>
      </PageHeader>

      <LedgerSection numeral="01" label="By reason">
        <div className="grid gap-5 md:grid-cols-2">
          {CONTACT_REASONS.map(reason => (
            <article key={reason.title} className="flex flex-col border border-border bg-card p-5">
              <h2 className="text-[1.125rem]">{reason.title}</h2>
              <p className="mt-2 flex-1 text-[0.9375rem] text-ink-soft">{reason.body}</p>
              {reason.href.startsWith("mailto:") ? (
                <a href={reason.href} className="mt-4 font-medium text-field underline">
                  {reason.action}
                </a>
              ) : (
                <Link href={reason.href} className="mt-4 font-medium text-field underline">
                  {reason.action}
                </Link>
              )}
            </article>
          ))}
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="What happens next" tone="deep">
        <h2 className="measure">The honest service commitment</h2>
        <ol className="measure-wide mt-6 divide-y divide-border border-y border-border">
          {[
            { title: "Within two working days", body: "A person acknowledges your message, by name." },
            {
              title: "Within five working days",
              body: "You get a substantive answer, or a plain statement of what we still have to find out before we can give you one.",
            },
            {
              title: "If we cannot help",
              body: "We say so, and we tell you who might be able to.",
            },
            {
              title: "If we make a mistake",
              body: "We tell you what went wrong, not just that it went wrong.",
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
      </LedgerSection>

      <LedgerSection numeral="03" label="Before you write">
        <div className="grid gap-5 md:grid-cols-2">
          <Callout title="If you want a seat">
            <p>
              Apply through the roster form instead of emailing. It captures the licence, the county
              and the role in one pass, and it reaches review faster.
            </p>
            <p className="mt-3">
              <Link href="/apply" className="font-medium text-field underline">
                Apply to the roster
              </Link>
            </p>
          </Callout>
          <Callout title="If you want to fund a season" tone="field">
            <p>
              Use the sponsor inquiry. Sponsorship is a defined package with a defined measurement,
              and we would rather scope it in writing than over a call.
            </p>
            <p className="mt-3">
              <Link href="/sponsor" className="font-medium text-field underline">
                Open a sponsor inquiry
              </Link>
            </p>
          </Callout>
          <Callout title="If you have a correction" tone="clay">
            <p>
              Corrections to anything we have published are welcome and are logged. Write to{" "}
              <a href={`mailto:${COMPANY.pressingEmail}`} className="text-field underline">
                {COMPANY.pressingEmail}
              </a>
              .
            </p>
          </Callout>
          <Callout title="What we will not do by email" tone="clay">
            <p>
              We will not accept investment instructions, take custody of funds, give legal,
              insurance or securities advice, or confirm a licence or coverage status. Those belong
              with licensed professionals and the relevant register.
            </p>
          </Callout>
        </div>
      </LedgerSection>
    </>
  );
}