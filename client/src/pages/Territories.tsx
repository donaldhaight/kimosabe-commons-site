import { Link } from "wouter";
import { useMemo, useState } from "react";
import {
  AVAILABILITY_LABEL,
  AVAILABILITY_MEANING,
  TERRITORIES,
  territoryTotals,
  type Availability,
} from "@shared/territories";
import { Callout, LedgerSection, PageHeader, SampleDataNotice, StatLine } from "@/components/ledger";
import { cn } from "@/lib/utils";

const totals = territoryTotals();

const BADGE_CLASS: Record<Availability, string> = {
  open: "border-field text-field",
  held: "border-ink-soft text-ink-soft",
  waitlist: "border-clay text-clay",
};

function AvailabilityBadge({ availability }: { availability: Availability }) {
  return (
    <span
      className={cn(
        "data inline-block border px-2 py-0.5 text-[0.6875rem] tracking-[0.12em] uppercase",
        BADGE_CLASS[availability],
      )}
    >
      {AVAILABILITY_LABEL[availability]}
    </span>
  );
}

export default function Territories() {
  const [availability, setAvailability] = useState<Availability | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return TERRITORIES.map(state => ({
      ...state,
      counties: state.counties.filter(county => {
        const matchesAvailability = availability === "all" || county.availability === availability;
        const matchesQuery =
          term.length === 0 ||
          county.name.toLowerCase().includes(term) ||
          state.name.toLowerCase().includes(term) ||
          county.code.toLowerCase().includes(term);
        return matchesAvailability && matchesQuery;
      }),
    })).filter(state => state.counties.length > 0);
  }, [availability, query]);

  const shown = filtered.reduce((sum, state) => sum + state.counties.length, 0);

  return (
    <>
      <PageHeader
        numeral="09"
        eyebrow="Territories"
        title="Find your county. See who holds the ground."
        lede="Territory nests: state, then county, then zip, then carrier route. Browse before you apply so you are asking for ground that exists."
      >
        <Link
          href="/apply"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          Claim your territory for Season 1
        </Link>
      </PageHeader>

      <LedgerSection numeral="01" label="Availability">
        <SampleDataNotice>
          The {totals.total} counties listed on this page are illustrative sample data used to
          demonstrate the territory system. Availability, seat counts and territory codes are not a
          statement of actual holdings, capacity or membership.
        </SampleDataNotice>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <StatLine value={String(totals.open)} label="Shown open" note="Seats available (sample data)" />
          <StatLine value={String(totals.held)} label="Shown held" note="Active assignment (sample data)" />
          <StatLine value={String(totals.waitlist)} label="Shown on waitlist" note="Reviewed, no seat yet (sample data)" />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {(["open", "held", "waitlist"] as Availability[]).map(state => (
            <div key={state} className="border-t-2 border-brass/60 pt-3">
              <AvailabilityBadge availability={state} />
              <p className="mt-2 text-[0.875rem] text-ink-soft">{AVAILABILITY_MEANING[state]}</p>
            </div>
          ))}
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="Browse" tone="deep">
        <h2 className="measure">Filter the register</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="territory-search" className="text-[0.9375rem] font-medium text-ink">
              Search by county, state or territory code
            </label>
            <input
              id="territory-search"
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="e.g. Hillsborough, Georgia, FL-HILLSB"
              className="w-full border border-input bg-card px-3 py-2.5 text-[1rem] text-ink placeholder:text-muted-foreground/70 focus:border-field focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="territory-availability" className="text-[0.9375rem] font-medium text-ink">
              Availability
            </label>
            <select
              id="territory-availability"
              value={availability}
              onChange={event => setAvailability(event.target.value as Availability | "all")}
              className="w-full border border-input bg-card px-3 py-2.5 text-[1rem] text-ink focus:border-field focus:outline-none"
            >
              <option value="all">All availability states</option>
              <option value="open">Open</option>
              <option value="held">Held</option>
              <option value="waitlist">Waitlist</option>
            </select>
          </div>
        </div>

        <p role="status" aria-live="polite" className="data mt-4 text-[0.8125rem] text-muted-foreground">
          Showing {shown} of {totals.total} sample territories
        </p>

        {filtered.length === 0 ? (
          <div className="mt-8 border border-border bg-card p-6">
            <p className="text-[1rem] text-ink">
              No sample territory matches that filter.
            </p>
            <p className="mt-2 text-[0.9375rem] text-ink-soft">
              The browser only contains the sample counties listed here. If your county is not shown,
              apply anyway and name it — a real territory register extends to every county.
            </p>
            <Link href="/apply" className="mt-4 inline-block font-medium text-field underline">
              Apply and name your county
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-8">
            {filtered.map(state => (
              <li key={state.slug}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2">
                  <h3 className="text-[1.125rem]">
                    {state.name}{" "}
                    <span className="data ml-1 text-[0.8125rem] text-muted-foreground">{state.code}</span>
                  </h3>
                  <Link href={`/territories/${state.slug}`} className="text-[0.875rem] font-medium text-field underline">
                    View {state.name} detail
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <caption className="sr-only">
                      Illustrative sample territory availability for {state.name}
                    </caption>
                    <thead>
                      <tr className="border-b border-border">
                        <th scope="col" className="py-2 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                          County
                        </th>
                        <th scope="col" className="py-2 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                          Code
                        </th>
                        <th scope="col" className="py-2 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                          Availability
                        </th>
                        <th scope="col" className="py-2 pr-4 text-[0.75rem] font-semibold text-ink uppercase">
                          Seats open
                        </th>
                        <th scope="col" className="py-2 text-[0.75rem] font-semibold text-ink uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.counties.map(county => (
                        <tr key={county.slug} className="border-b border-border">
                          <th scope="row" className="py-2.5 pr-4 text-[0.9375rem] font-medium text-ink">
                            {county.name}
                          </th>
                          <td className="data py-2.5 pr-4 text-[0.75rem] text-muted-foreground">{county.code}</td>
                          <td className="py-2.5 pr-4">
                            <AvailabilityBadge availability={county.availability} />
                          </td>
                          <td className="data py-2.5 pr-4 text-[0.8125rem] text-ink">{county.seatsOpen}</td>
                          <td className="py-2.5">
                            <Link
                              href={`/apply?county=${state.code}-${county.slug}`}
                              className="text-[0.875rem] font-medium text-field underline"
                            >
                              {county.availability === "open" ? "Apply for this county" : "Join the waitlist"}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </li>
            ))}
          </ul>
        )}
      </LedgerSection>

      <LedgerSection numeral="03" label="How allocation works">
        <h2 className="measure">A seat is a season, not a title</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Callout title="Open">
            <p>
              Seats are available. Applying puts you in review for the coming season. Verification
              comes first, and a licence check is done once rather than at every step.
            </p>
          </Callout>
          <Callout title="Held" tone="field">
            <p>
              The ground is under an active seasonal assignment. Apply and you join the waitlist: if
              the seat is not renewed at cool-down, the waitlist is the first place we look.
            </p>
          </Callout>
          <Callout title="Waitlist" tone="clay">
            <p>
              More qualified demand than seats. Applications are still reviewed, and a strong
              applicant can create a new seat in a neighbouring route.
            </p>
          </Callout>
          <Callout title="Permanent rights" tone="clay">
            <p>
              A structural group can hold a permanent right to a territory. That is different from a
              seasonal seat, and the two are recorded separately so neither is confused for the other.
            </p>
          </Callout>
        </div>
      </LedgerSection>
    </>
  );
}