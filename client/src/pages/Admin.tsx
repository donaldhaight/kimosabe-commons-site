import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { LedgerSection, PageHeader, StatLine } from "@/components/ledger";
import { FormStatus } from "@/components/forms";
import { cn } from "@/lib/utils";

const INTAKE_STATUSES = ["new", "reviewing", "contacted", "qualified", "hold", "declined"] as const;
const SPONSOR_STATUSES = ["new", "reviewing", "in_discussion", "proposal_sent", "declined"] as const;

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  reviewing: "Reviewing",
  contacted: "Contacted",
  qualified: "Qualified",
  hold: "Hold",
  declined: "Declined",
  in_discussion: "In discussion",
  proposal_sent: "Proposal sent",
};

function formatDate(value: unknown): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "—";
  return date.toISOString().slice(0, 16).replace("T", " ");
}

export default function Admin() {
  const me = trpc.auth.me.useQuery();
  const utils = trpc.useUtils();
  const [tab, setTab] = useState<"intake" | "sponsor">("intake");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const isAdmin = me.data?.role === "admin";

  const intakeQuery = trpc.intake.list.useQuery(
    { status: statusFilter, search: search || undefined },
    { enabled: isAdmin && tab === "intake" },
  );
  const sponsorQuery = trpc.sponsor.list.useQuery(
    { status: statusFilter, search: search || undefined },
    { enabled: isAdmin && tab === "sponsor" },
  );

  const intakeStats = trpc.intake.stats.useQuery(undefined, { enabled: isAdmin });
  const sponsorStats = trpc.sponsor.stats.useQuery(undefined, { enabled: isAdmin });

  const invalidate = async () => {
    await Promise.all([
      utils.intake.list.invalidate(),
      utils.sponsor.list.invalidate(),
      utils.intake.stats.invalidate(),
      utils.sponsor.stats.invalidate(),
    ]);
  };

  const setIntakeStatus = trpc.intake.setStatus.useMutation({ onSuccess: invalidate });
  const setSponsorStatus = trpc.sponsor.setStatus.useMutation({ onSuccess: invalidate });

  const stats = useMemo(() => {
    const source = tab === "intake" ? intakeStats.data : sponsorStats.data;
    return source ?? [];
  }, [tab, intakeStats.data, sponsorStats.data]);

  if (me.isLoading) {
    return (
      <>
        <PageHeader
          numeral="12"
          eyebrow="Admin review"
          title="Review queue"
          lede="Roster applications and sponsor inquiries, with status transitions and internal notes."
        />
        <LedgerSection numeral="01" label="Session">
          <p role="status" aria-live="polite" className="text-ink-soft">
            Checking your session…
          </p>
        </LedgerSection>
      </>
    );
  }

  if (!me.data) {
    return (
      <>
        <PageHeader
          numeral="12"
          eyebrow="Admin review"
          title="Administrator sign-in required"
          lede="This screen reviews roster applications and sponsor inquiries. It is restricted to administrators."
        />
        <LedgerSection numeral="01" label="Sign in">
          <button
            type="button"
            onClick={() => startLogin()}
            className="border border-field bg-field px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-field-deep"
          >
            Sign in
          </button>
          <p className="measure mt-4 text-[0.9375rem] text-muted-foreground">
            Applications submitted through the public forms are stored whether or not anyone is
            signed in. Signing in does not change what was submitted.
          </p>
        </LedgerSection>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <PageHeader
          numeral="12"
          eyebrow="Admin review"
          title="You are signed in, but not as an administrator"
          lede="This screen is limited to accounts with the administrator role."
        />
        <LedgerSection numeral="01" label="Access">
          <FormStatus kind="error">
            Your account ({me.data.email ?? me.data.name ?? "(no email)"}) does not hold the
            administrator role. If you believe that is wrong, ask an administrator to update your
            role.
          </FormStatus>
        </LedgerSection>
      </>
    );
  }

  const rows = (tab === "intake" ? intakeQuery.data : sponsorQuery.data) ?? [];
  const statusOptions = tab === "intake" ? INTAKE_STATUSES : SPONSOR_STATUSES;
  const pending = tab === "intake" ? setIntakeStatus.isPending : setSponsorStatus.isPending;

  return (
    <>
      <PageHeader
        numeral="12"
        eyebrow="Admin review"
        title="Review queue"
        lede="Roster applications and sponsor inquiries, with status transitions and internal notes. Nothing here sends email automatically."
      />

      <LedgerSection numeral="01" label="Counts">
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {stats.length === 0 ? (
            <p className="text-[0.9375rem] text-muted-foreground">No records yet.</p>
          ) : (
            stats.map(entry => (
              <StatLine
                key={entry.status}
                value={String(entry.count)}
                label={STATUS_LABEL[entry.status] ?? entry.status}
                note={tab === "intake" ? "Applications" : "Inquiries"}
              />
            ))
          )}
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="Queue" tone="deep">
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
          {(["intake", "sponsor"] as const).map(value => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setTab(value);
                setStatusFilter("all");
              }}
              aria-pressed={tab === value}
              className={cn(
                "border px-4 py-2 text-[0.9375rem]",
                tab === value
                  ? "border-field bg-field text-primary-foreground"
                  : "border-border bg-card text-ink",
              )}
            >
              {value === "intake" ? "Roster applications" : "Sponsor inquiries"}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-search" className="text-[0.9375rem] font-medium text-ink">
              Search
            </label>
            <input
              id="admin-search"
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Name, organisation, email or reference"
              className="w-full border border-input bg-card px-3 py-2.5 text-[1rem] text-ink focus:border-field focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-status" className="text-[0.9375rem] font-medium text-ink">
              Status
            </label>
            <select
              id="admin-status"
              value={statusFilter}
              onChange={event => setStatusFilter(event.target.value)}
              className="w-full border border-input bg-card px-3 py-2.5 text-[1rem] text-ink focus:border-field focus:outline-none"
            >
              <option value="all">All statuses</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {STATUS_LABEL[status] ?? status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p role="status" aria-live="polite" className="data mt-4 text-[0.8125rem] text-muted-foreground">
          {rows.length} record{rows.length === 1 ? "" : "s"} shown
        </p>

        {(tab === "intake" ? intakeQuery.isLoading : sponsorQuery.isLoading) && (
          <p className="mt-6 text-ink-soft">Loading…</p>
        )}

        {rows.length === 0 && !(tab === "intake" ? intakeQuery.isLoading : sponsorQuery.isLoading) && (
          <p className="mt-6 border border-border bg-card p-4 text-[0.9375rem] text-ink-soft">
            Nothing matches this filter.
          </p>
        )}

        <ul className="mt-6 space-y-4">
          {tab === "intake"
            ? (intakeQuery.data ?? []).map(row => (
                <li key={row.id} className="border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[1.0625rem]">
                      {row.fullName}
                      {row.organization ? ` — ${row.organization}` : ""}
                    </h3>
                    <span className="data text-[0.75rem] text-muted-foreground">{row.refCode}</span>
                  </div>
                  <dl className="mt-3 grid gap-2 text-[0.875rem] sm:grid-cols-3">
                    <div>
                      <dt className="data text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                        Type
                      </dt>
                      <dd className="text-ink">{row.applicantType}</dd>
                    </div>
                    <div>
                      <dt className="data text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                        Territory
                      </dt>
                      <dd className="data text-ink">
                        {row.stateCode} · {row.countyName}
                      </dd>
                    </div>
                    <div>
                      <dt className="data text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                        Received
                      </dt>
                      <dd className="data text-ink">{formatDate(row.createdAt)}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-[0.875rem] text-ink-soft">
                    <span className="font-medium text-ink">Contact:</span> {row.email}
                    {row.phone ? ` · ${row.phone}` : ""}
                  </p>
                  {row.licenses && (
                    <p className="mt-1 text-[0.875rem] text-ink-soft">
                      <span className="font-medium text-ink">Licences:</span> {row.licenses}
                    </p>
                  )}
                  {row.interests && (
                    <p className="mt-1 text-[0.875rem] text-ink-soft">
                      <span className="font-medium text-ink">Interests:</span>{" "}
                      {row.interests.split(",").join(" · ")}
                    </p>
                  )}
                  {row.note && (
                    <p className="mt-2 border-l-2 border-border pl-3 text-[0.875rem] text-ink-soft">
                      {row.note}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label
                      htmlFor={`intake-status-${row.id}`}
                      className="text-[0.875rem] font-medium text-ink"
                    >
                      Status
                    </label>
                    <select
                      id={`intake-status-${row.id}`}
                      value={row.status}
                      disabled={pending}
                      onChange={event =>
                        setIntakeStatus.mutate({ id: row.id, status: event.target.value as never })
                      }
                      className="border border-input bg-paper px-3 py-2 text-[0.875rem] text-ink focus:border-field focus:outline-none"
                    >
                      {INTAKE_STATUSES.map(status => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status] ?? status}
                        </option>
                      ))}
                    </select>
                    <span className="text-[0.8125rem] text-muted-foreground">
                      Source: {row.source}
                      {row.referrer ? ` · from ${row.referrer}` : ""}
                    </span>
                  </div>
                </li>
              ))
            : (sponsorQuery.data ?? []).map(row => (
                <li key={row.id} className="border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[1.0625rem]">{row.organization}</h3>
                    <span className="data text-[0.75rem] text-muted-foreground">{row.refCode}</span>
                  </div>
                  <dl className="mt-3 grid gap-2 text-[0.875rem] sm:grid-cols-4">
                    <div>
                      <dt className="data text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                        Contact
                      </dt>
                      <dd className="text-ink">{row.contactName}</dd>
                    </div>
                    <div>
                      <dt className="data text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                        Organisation type
                      </dt>
                      <dd className="text-ink">{row.orgType}</dd>
                    </div>
                    <div>
                      <dt className="data text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                        Program
                      </dt>
                      <dd className="text-ink">{row.program}</dd>
                    </div>
                    <div>
                      <dt className="data text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
                        Received
                      </dt>
                      <dd className="data text-ink">{formatDate(row.createdAt)}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-[0.875rem] text-ink-soft">
                    <span className="font-medium text-ink">Contact:</span> {row.email}
                    {row.phone ? ` · ${row.phone}` : ""}
                    {row.territory ? ` · Territory: ${row.territory}` : ""} · Budget: {row.budgetRange}
                  </p>
                  {row.outcome && (
                    <p className="mt-2 text-[0.875rem] text-ink-soft">
                      <span className="font-medium text-ink">Outcome wanted:</span> {row.outcome}
                    </p>
                  )}
                  {row.message && (
                    <p className="mt-2 border-l-2 border-border pl-3 text-[0.875rem] text-ink-soft">
                      {row.message}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label
                      htmlFor={`sponsor-status-${row.id}`}
                      className="text-[0.875rem] font-medium text-ink"
                    >
                      Status
                    </label>
                    <select
                      id={`sponsor-status-${row.id}`}
                      value={row.status}
                      disabled={pending}
                      onChange={event =>
                        setSponsorStatus.mutate({ id: row.id, status: event.target.value as never })
                      }
                      className="border border-input bg-paper px-3 py-2 text-[0.875rem] text-ink focus:border-field focus:outline-none"
                    >
                      {SPONSOR_STATUSES.map(status => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status] ?? status}
                        </option>
                      ))}
                    </select>
                    <span className="text-[0.8125rem] text-muted-foreground">
                      Source: {row.source}
                      {row.referrer ? ` · from ${row.referrer}` : ""}
                    </span>
                  </div>
                </li>
              ))}
        </ul>
      </LedgerSection>

      <LedgerSection numeral="03" label="Boundaries">
        <h2 className="measure">What this screen deliberately does not do</h2>
        <ul className="measure-wide grid gap-2 sm:grid-cols-2">
          {[
            "It does not send email or any other automatic message.",
            "It does not change a person's licence or verification record.",
            "It does not move money, take a payment or create an invoice.",
            "It does not delete a submission — records are retained and status is changed instead.",
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
