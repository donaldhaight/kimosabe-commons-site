import { COMPANY, NAV } from "@/data/content";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Hairline, Mark, Wordmark } from "./ledger";

function usePathname() {
  const [location] = useLocation();
  return location.replace(/\/+$/, "") || "/";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur",
        scrolled && "shadow-[0_1px_0_0_rgba(27,42,47,0.06)]",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-field focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-3">
          <Link href="/" aria-label={`${COMPANY.shortName} home`} className="shrink-0 no-underline">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map(item => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block border-b-2 px-3 py-2 text-[0.9375rem] no-underline transition-colors",
                        active
                          ? "border-brass font-semibold text-ink"
                          : "border-transparent text-ink-soft hover:border-border hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/apply"
              className="hidden border border-field bg-field px-4 py-2 text-[0.9375rem] font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep sm:block"
            >
              Claim your territory
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(value => !value)}
              className="flex items-center gap-2 border border-border px-3 py-2 text-[0.875rem] lg:hidden"
            >
              <span className="data tracking-[0.12em] uppercase">{open ? "Close" : "Menu"}</span>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                {open ? (
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" fill="none" />
                ) : (
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" fill="none" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-paper lg:hidden">
          <div className="container">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-border">
                {NAV.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-3 text-[1.0625rem] text-ink no-underline"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/apply" className="block py-3 text-[1.0625rem] font-semibold text-field no-underline">
                    Claim your territory
                  </Link>
                </li>
                <li>
                  <Link href="/sponsor" className="block py-3 text-[1.0625rem] text-ink no-underline">
                    Sponsor a season
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="block py-3 text-[1.0625rem] text-ink no-underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "The company",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/programs", label: "Programs" },
      { href: "/who-we-serve", label: "Who we serve" },
      { href: "/participate", label: "Participate" },
    ],
  },
  {
    title: "Participate",
    links: [
      { href: "/apply", label: "Apply to the roster" },
      { href: "/territories", label: "Territory availability" },
      { href: "/sponsor", label: "Sponsor a season" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Accountability",
    links: [
      { href: "/governance", label: "Governance and public benefit" },
      { href: "/benefit-report", label: "Benefit report" },
      { href: "/resources", label: "Research and resources" },
      { href: "/admin", label: "Admin review" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper-deep">
      <div className="container py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-3">
              <Mark />
              <div>
                <p
                  className="text-[1.0625rem] font-semibold tracking-[0.16em] text-ink uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Kimosabe
                </p>
                <p className="data text-[0.6875rem] tracking-[0.24em] text-field uppercase">
                  Commons · PBC
                </p>
              </div>
            </div>
            <p className="measure mt-4 text-[0.9375rem] text-ink-soft">
              {COMPANY.tagline} A public benefit corporation building the recruiting, promotion and
              stewardship layer for a verified map of people and addresses.
            </p>
          </div>

          {FOOTER_COLUMNS.map(column => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="data mb-3 text-[0.6875rem] tracking-[0.18em] text-brass uppercase">
                {column.title}
              </h2>
              <ul className="space-y-2">
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.9375rem] text-ink-soft no-underline hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Hairline className="my-8" />

        <div className="grid gap-4 text-[0.8125rem] text-muted-foreground lg:grid-cols-2">
          <p className="measure">
            {COMPANY.legalName} is a proposed Delaware public benefit corporation. It is not a token
            issuer, an investment vehicle, an insurer, an adjuster, an escrow agent, a money
            transmitter, a bank, a law firm or a fiduciary. It does not move money and it does not
            handle claims. Sponsorship and participation are defined packages and confer no equity,
            token, return or share of revenue.
          </p>
          <p className="measure">
            Nothing on this site is legal, accounting, insurance, securities or professional advice.
            Territory, roster and availability figures shown anywhere on this site are illustrative
            sample data used to demonstrate the system and are not a statement of actual holdings.
            Corrections are welcome:{" "}
            <a href={`mailto:${COMPANY.pressingEmail}`} className="text-field underline">
              {COMPANY.pressingEmail}
            </a>
            .
          </p>
        </div>

        <p className="data mt-8 text-[0.75rem] tracking-[0.08em] text-muted-foreground">
          &copy; {new Date().getFullYear()} Kimosabe Commons, PBC — proposed. Seasonal clock: Pre-Season
          · Season · Cool-Down · Dispute · Reset.
        </p>
      </div>
    </footer>
  );
}
