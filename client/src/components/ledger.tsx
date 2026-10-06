import { SEASON_PHASES } from "@shared/territories";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Wordmark                                                            */
/* ------------------------------------------------------------------ */

/**
 * The mark reads three ways: the numeral 1, the letter I, and — rotated — a
 * surveyor's stake on a property line. It sits inside a thin brass square, like a seal.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center border border-brass/70",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" role="presentation">
        <line x1="3" y1="17" x2="21" y2="17" stroke="#B0801F" strokeWidth="1.5" />
        <line x1="12" y1="4" x2="12" y2="20" stroke="#2F6B4F" strokeWidth="2" />
      </svg>
    </span>
  );
}

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark />
      <span className="leading-none">
        <span
          className="block font-display text-[1.0625rem] font-semibold tracking-[0.18em] text-ink uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Kimosabe
        </span>
        {!compact && (
          <span className="data mt-1 block text-[0.6875rem] tracking-[0.28em] text-field uppercase">
            Commons · PBC
          </span>
        )}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section rules                                                       */
/* ------------------------------------------------------------------ */

export function SectionRule({
  numeral,
  label,
  className,
}: {
  numeral: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("rule-mark", className)}>
      <span className="rule-draw">{numeral}</span>
      {label && <span className="text-ink-soft/80 normal-case tracking-[0.08em]">{label}</span>}
    </div>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Section wrapper — the ledger spine                                  */
/* ------------------------------------------------------------------ */

export function LedgerSection({
  numeral,
  label,
  children,
  id,
  className,
  fieldClassName,
  tone = "paper",
}: {
  numeral: string;
  label?: string;
  children: ReactNode;
  id?: string;
  className?: string;
  fieldClassName?: string;
  tone?: "paper" | "deep" | "ink";
}) {
  const toneClass =
    tone === "ink" ? "bg-ink text-paper" : tone === "deep" ? "bg-paper-deep" : "bg-transparent";
  return (
    <section
      id={id}
      className={cn("border-b border-border py-12 sm:py-16", toneClass, className)}
    >
      <div className="container">
        <div className="ledger-grid">
          <div className="pt-1">
            <SectionRule numeral={numeral} label={label} />
          </div>
          <div className={cn("ledger-field", fieldClassName)}>{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Address field texture band                                          */
/* ------------------------------------------------------------------ */

export function AddressField({
  children,
  className,
  nodes = 96,
}: {
  children?: ReactNode;
  className?: string;
  nodes?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-paper-deep", className)}>
      <div className="address-field absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-2 pt-2"
        aria-hidden="true"
      >
        {Array.from({ length: Math.min(nodes, 40) }).map((_, index) => (
          <span
            key={index}
            className="block h-1.5 w-1.5 rounded-[1px] bg-field"
            style={{
              opacity: 0.18 + (index % 5) * 0.06,
              animation: index % 3 === 0 ? "rise 4s ease-in-out infinite alternate" : undefined,
            }}
          />
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Season band                                                         */
/* ------------------------------------------------------------------ */

export function SeasonBand({
  activeIndex,
  className,
  compact = false,
}: {
  activeIndex?: number;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("w-full", className)}>
      <ol
        className="grid grid-cols-1 gap-px overflow-hidden border border-border sm:grid-cols-5"
        aria-label="The seasonal clock"
      >
        {SEASON_PHASES.map((phase, index) => {
          const active = activeIndex === index;
          return (
            <li
              key={phase.key}
              className={cn(
                "season-seg bg-card px-3 py-3",
                active && "bg-field text-primary-foreground",
                activeIndex !== undefined && !active && "opacity-70",
              )}
              aria-current={active ? "step" : undefined}
            >
              <span className="data block text-[0.6875rem] tracking-[0.16em] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="mt-1 block text-[0.9375rem] font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {phase.label}
              </span>
              {!compact && (
                <>
                  <span className={cn("data mt-1 block", active ? "opacity-90" : "text-muted-foreground")}>
                    {phase.window}
                  </span>
                  <span className={cn("mt-2 block text-[0.8125rem] leading-snug", active ? "opacity-95" : "text-ink-soft")}>
                    {phase.detail}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small primitives                                                    */
/* ------------------------------------------------------------------ */

export function StatLine({
  value,
  label,
  note,
  className,
}: {
  value: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t-2 border-brass/60 pt-3", className)}>
      <div className="data text-[1.75rem] leading-none text-ink" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
      <div className="mt-2 text-[0.875rem] font-medium text-ink">{label}</div>
      {note && <div className="mt-1 text-[0.8125rem] text-muted-foreground">{note}</div>}
    </div>
  );
}

export function SampleDataNotice({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-2 border-l-2 border-clay bg-clay/5 px-3 py-2 text-[0.8125rem] text-ink-soft",
        className,
      )}
    >
      <span className="data shrink-0 tracking-[0.12em] text-clay uppercase">Illustrative</span>
      <span>
        {children ??
          "Every roster, seat and availability figure shown here is illustrative sample data used to demonstrate the system. It is not a statement of actual holdings."}
      </span>
    </p>
  );
}

export function Callout({
  title,
  children,
  tone = "brass",
  className,
}: {
  title: string;
  children: ReactNode;
  tone?: "brass" | "clay" | "field";
  className?: string;
}) {
  const border = tone === "clay" ? "border-clay" : tone === "field" ? "border-field" : "border-brass";
  const text = tone === "clay" ? "text-clay" : tone === "field" ? "text-field" : "text-brass";
  return (
    <aside className={cn("border-l-2 bg-card px-4 py-3", border, className)}>
      <p className={cn("data mb-1 tracking-[0.12em] uppercase", text)}>{title}</p>
      <div className="text-[0.9375rem] text-ink-soft [&_p]:mb-2 [&_p:last-child]:mb-0">{children}</div>
    </aside>
  );
}

export function PageHeader({
  numeral,
  eyebrow,
  title,
  lede,
  children,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-paper-deep">
      <div className="container py-12 sm:py-16">
        <div className="ledger-grid">
          <div className="pt-1">
            <SectionRule numeral={numeral} label={eyebrow} />
          </div>
          <div className="ledger-field">
            <h1 className="measure-wide">{title}</h1>
            <p className="measure mt-4 text-[1.125rem] text-ink-soft">{lede}</p>
            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}

export function NumberedList({
  items,
  className,
}: {
  items: Array<{ title: string; body: string }>;
  className?: string;
}) {
  return (
    <ol className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, index) => (
        <li key={item.title} className="grid gap-2 py-4 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-4">
          <span className="data pt-1 text-brass">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-[1.0625rem]">{item.title}</h3>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function DefinitionRow({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <div className="hairline-row grid gap-1 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-[0.9375rem] font-semibold text-ink">{term}</dt>
      <dd className="text-[0.9375rem] text-ink-soft">{children}</dd>
    </div>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "measure text-[1.0625rem] text-ink-soft [&_a]:text-field [&_a]:underline",
        "[&_h2]:mt-8 [&_h2]:text-ink [&_h2:first-child]:mt-0",
        "[&_h3]:mt-6 [&_h3]:text-ink",
        "[&_li]:mb-1.5 [&_p]:mb-4 [&_p:last-child]:mb-0",
        "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5",
        "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
