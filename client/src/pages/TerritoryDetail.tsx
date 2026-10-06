import { Link, useParams } from "wouter";
import { AVAILABILITY_LABEL, AVAILABILITY_MEANING, findState, type Availability } from "@shared/territories";
import { Callout, LedgerSection, PageHeader, SampleDataNotice, StatLine } from "@/components/ledger";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";

const BADGE_CLASS: Record<Availability, string> = {
  open: "border-field text-field",
  held: "border-ink-soft text-ink-soft",
  waitlist: "border-clay text-clay",
};

export default function TerritoryDetail() {
  const params = useParams<{ state: string }>();
  const state = findState(params.state ?? "");

  if (!state) return <NotFound />;

  const counts = state.counties.reduce(
    (acc, county) => {
      acc[county.availability] += 1;
      acc.seatsOpen += county.seatsOpen;
      return acc;
    },
    { open: 0, held: 0, waitlist: 0, seatsOpen: 0 },
  );

  return (
    <>
      <PageHeader
        numeral={state.code}
        eyebrow="Territory detail"
        title={`${state.name} — ${state.counties.length} sample counties`}
        lede={`Illustrative territory register for ${state.name}, showing the availability states, seat counts and territory codes used across the platform.`}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/apply"
            className="border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
          >
            Apply for a {state.name} county
          </Link>
          <Link
            href="/territories"
            className="border border-ink/25 px-5 py-3 font-medium text-ink no-underline transition-colors hover:border-ink hover:bg-card"
          >
            Back to all territories
          </Link>
        </div>
      </PageHeader>

      <LedgerSection numeral="01" label="Summary">
        <SampleDataNotice>
          This territory register is illustrative sample data used to demonstrate the system. It is
          not a statement of actual holdings or capacity.
        </SampleDataNotice>
        <div className="mt-8 grid gap-6 sm:grid-cols-4">
          <StatLine value={String(counts.open)} label="Shown open" />
          <StatLine value={String(counts.held)} label="Shown held" />
          <StatLine value={String(counts.waitlist)} label="Shown on waitlist" />
          <StatLine value={String(counts.seatsOpen)} label="Sample seats open" />
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="County register" tone="deep">
        <h2 className="measure">Counties in the sample register</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Illustrative sample territory availability for {state.name}</caption>
            <thead>
              <tr className="border-y border-border">
                <th scope="col" className="py-3 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                  County
                </th>
                <th scope="col" className="py-3 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                  Territory code
                </th>
                <th scope="col" className="py-3 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                  Availability
                </th>
                <th scope="col" className="py-3 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                  Seats open
                </th>
                <th scope="col" className="py-3 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                  Seats held
                </th>
                <th scope="col" className="py-3 text-[0.75rem] font-semibold text-ink uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {state.counties.map(county => (
                <tr key={county.slug} className="border-b border-border">
                  <th scope="row" className="py-3 pr-4 text-[0.9375rem] font-medium text-ink">
                    {county.name}
                  </th>
                  <td className="data py-3 pr-4 text-[0.75rem] text-muted-foreground">{county.code}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "data inline-block border px-2 py-0.5 text-[0.6875rem] tracking-[0.12em] uppercase",
                        BADGE_CLASS[county.availability],
                      )}
                    >
                      {AVAILABILITY_LABEL[county.availability]}
                    </span>
                  </td>
                  <td className="data py-3 pr-4 text-[0.8125rem] text-ink">{county.seatsOpen}</td>
                  <td className="data py-3 pr-4 text-[0.8125rem] text-ink">{county.seatsHeld}</td>
                  <td className="py-3">
                    <Link
                      href={`/apply?county=${state.code}-${county.slug}`}
                      className="text-[0.875rem] font-medium text-field underline"
                    >
                      {county.availability === "open" ? "Apply" : "Join waitlist"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[0.875rem] text-muted-foreground">
          {AVAILABILITY_MEANING.open} {AVAILABILITY_MEANING.held} {AVAILABILITY_MEANING.waitlist}
        </p>
      </LedgerSection>

      <LedgerSection numeral="03" label="Applying here">
        <h2 className="measure">What happens if you apply for {state.name}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Callout title="Open counties" tone="field">
            <p>
              Verification first: identity, organisation and licence at the level of risk involved.
              Then a role and territory scope for the season. You are told which county you hold and
              until when.
            </p>
          </Callout>
          <Callout title="Held and waitlist counties" tone="clay">
            <p>
              Your application is reviewed and queued. Because ground is renewed at cool-down rather
              than held forever, a waitlist position is a real position — it is not a polite refusal.
            </p>
          </Callout>
        </div>
        <Link href="/apply" className="mt-8 inline-block font-medium text-field underline">
          Apply to the roster
        </Link>
      </LedgerSection>
    </>
  );
}