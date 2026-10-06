import { Link } from "wouter";
import { LedgerSection, PageHeader } from "@/components/ledger";

export default function NotFound() {
  return (
    <>
      <PageHeader
        numeral="404"
        eyebrow="Not on the register"
        title="That page is not on the roster"
        lede="The address you asked for does not exist on this site. Nothing is broken — the page was never written, or it has moved."
      />
      <LedgerSection numeral="01" label="Where to go next">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/", title: "Home", body: "What the company does and who it serves." },
            {
              href: "/territories",
              title: "Territory availability",
              body: "Browse the sample county register and see what is open.",
            },
            {
              href: "/apply",
              title: "Apply to the roster",
              body: "Start a review for the coming season.",
            },
            { href: "/programs", title: "Programs", body: "The four programs and what each delivers." },
            {
              href: "/governance",
              title: "Governance",
              body: "The chartered benefit and how it is measured.",
            },
            { href: "/contact", title: "Contact", body: "Reach a person about anything else." },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-border bg-card p-4 no-underline transition-colors hover:border-field"
            >
              <h2 className="text-[1.0625rem] text-ink">{item.title}</h2>
              <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{item.body}</p>
            </Link>
          ))}
        </div>
      </LedgerSection>
    </>
  );
}