import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { BUDGET_RANGES, SPONSOR_ORG_TYPES, SPONSOR_PROGRAMS, TIERS } from "@/data/content";
import { Callout, LedgerSection, PageHeader } from "@/components/ledger";
import {
  ConsentBox,
  Field,
  FormStatus,
  Select,
  SubmitButton,
  TextArea,
  TextInput,
} from "@/components/forms";

type FormState = {
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  orgType: string;
  program: string;
  budgetRange: string;
  territory: string;
  outcome: string;
  message: string;
  consent: boolean;
};

const EMPTY: FormState = {
  organization: "",
  contactName: "",
  email: "",
  phone: "",
  orgType: "insurer",
  program: "undecided",
  budgetRange: "not_disclosed",
  territory: "",
  outcome: "",
  message: "",
  consent: false,
};

export default function Sponsor() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<{ refCode: string } | null>(null);

  const mutation = trpc.sponsor.submit.useMutation({
    onSuccess: data => setSubmitted({ refCode: data.refCode }),
  });

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.organization.trim().length < 2) next.organization = "Please enter your organisation.";
    if (form.contactName.trim().length < 2) next.contactName = "Please enter a contact name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.consent) next.consent = "We need your consent to follow up.";
    setErrors(next);
    const firstKey = Object.keys(next)[0];
    if (firstKey) {
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    mutation.mutate({
      organization: form.organization.trim(),
      contactName: form.contactName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      orgType: form.orgType as never,
      program: form.program as never,
      budgetRange: form.budgetRange as never,
      territory: form.territory.trim(),
      outcome: form.outcome.trim(),
      message: form.message.trim(),
      consent: form.consent,
      source: "sponsor-page",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    });
  };

  if (submitted) {
    return (
      <>
        <PageHeader
          numeral="11"
          eyebrow="Inquiry received"
          title="Your inquiry is with a person"
          lede="Sponsorship is scoped in writing, because a package with a defined measurement is the only kind we can honestly deliver."
        />
        <LedgerSection numeral="01" label="Reference">
          <FormStatus kind="success">
            <p className="font-medium">
              Your reference is <span className="data">{submitted.refCode}</span>.
            </p>
            <p className="mt-2 text-[0.9375rem]">
              Write it down. It gets you to your file without repeating yourself.
            </p>
          </FormStatus>
          <h2 className="measure mt-10">What happens next</h2>
          <ol className="measure-wide mt-4 divide-y divide-border border-y border-border">
            {[
              { title: "Acknowledgement", body: "Within two working days, from a named person." },
              {
                title: "A written scope",
                body: "Before anything is agreed, you receive a written package: what is delivered, in which territories, measured how, by when and at what fee.",
              },
              {
                title: "A measurement plan",
                body: "You agree the measures before the season starts, so the report at the end is a report on an agreed question — not a story about whatever went well.",
              },
              {
                title: "No obligation",
                body: "Nothing is payable and nothing is committed until a written agreement is signed by both sides.",
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
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/benefit-report"
              className="border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
            >
              See what we publish
            </Link>
            <Link
              href="/programs"
              className="border border-ink/25 px-5 py-3 font-medium text-ink no-underline transition-colors hover:border-ink hover:bg-card"
            >
              Read the four programs
            </Link>
          </div>
        </LedgerSection>
      </>
    );
  }

  return (
    <>
      <PageHeader
        numeral="11"
        eyebrow="Sponsor inquiry"
        title="Fund a season. Get the measurement."
        lede="Sponsorship is a defined research, implementation, measurement and recognition package. It is not an investment, and it returns no equity, token or share of revenue."
      >
        <Link
          href="/participate"
          className="inline-block border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
        >
          See the participation tiers
        </Link>
      </PageHeader>

      <LedgerSection numeral="01" label="What you are buying">
        <div className="grid gap-5 md:grid-cols-2">
          <Callout title="A measured seat">
            <p>
              A named set of territories for one season, with the roster, the evidence trail and a
              report against measures you agreed before the season opened.
            </p>
          </Callout>
          <Callout title="Participation in the research" tone="field">
            <p>
              A seat in the working group that reviews the design, the registry rules and the
              published measures — so you can challenge the method rather than receive the output.
            </p>
          </Callout>
          <Callout title="Recognition, disclosed" tone="clay">
            <p>
              Public recognition of your participation, in the form you approve. Never an implied
              endorsement, and never a claim of regulator or institutional approval.
            </p>
          </Callout>
          <Callout title="What it is not" tone="clay">
            <p>
              Not equity. Not a token. Not a share of revenue. Not control of the territory, the
              roster or the published figures. Not a guarantee of any commercial outcome.
            </p>
          </Callout>
        </div>
        <div className="mt-8 border border-border bg-card p-5">
          <h3 className="text-[1.0625rem]">Founding Seat — what the package contains</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {TIERS.find(tier => tier.key === "founding")?.includes.map(item => (
              <li key={item} className="flex gap-2 text-[0.9375rem] text-ink-soft">
                <span aria-hidden="true" className="text-field">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="The inquiry" tone="deep">
        <form onSubmit={onSubmit} noValidate className="measure-wide">
          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Organisation" required error={errors.organization} fieldId="organization">
                {props => (
                  <TextInput
                    {...props}
                    name="organization"
                    autoComplete="organization"
                    value={form.organization}
                    onChange={event => update("organization", event.target.value)}
                  />
                )}
              </Field>
              <Field label="Contact name" required error={errors.contactName} fieldId="contactName">
                {props => (
                  <TextInput
                    {...props}
                    name="contactName"
                    autoComplete="name"
                    value={form.contactName}
                    onChange={event => update("contactName", event.target.value)}
                  />
                )}
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Email" required error={errors.email} fieldId="email">
                {props => (
                  <TextInput
                    {...props}
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={event => update("email", event.target.value)}
                  />
                )}
              </Field>
              <Field label="Phone" hint="Optional.">
                {props => (
                  <TextInput
                    {...props}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={event => update("phone", event.target.value)}
                  />
                )}
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Type of organisation" required>
                {props => (
                  <Select
                    {...props}
                    value={form.orgType}
                    onChange={event => update("orgType", event.target.value)}
                  >
                    {SPONSOR_ORG_TYPES.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field label="Program of interest" required>
                {props => (
                  <Select
                    {...props}
                    value={form.program}
                    onChange={event => update("program", event.target.value)}
                  >
                    {SPONSOR_PROGRAMS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Budget range" hint="Indicative only. It helps us scope honestly.">
                {props => (
                  <Select
                    {...props}
                    value={form.budgetRange}
                    onChange={event => update("budgetRange", event.target.value)}
                  >
                    {BUDGET_RANGES.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field label="Territory or market of interest" hint="Optional. State, county or region.">
                {props => (
                  <TextInput
                    {...props}
                    name="territory"
                    value={form.territory}
                    onChange={event => update("territory", event.target.value)}
                  />
                )}
              </Field>
            </div>

            <Field
              label="What outcome do you want measured?"
              hint="This becomes the measurement plan. The more specific it is, the more useful the report."
            >
              {props => (
                <TextArea
                  {...props}
                  name="outcome"
                  maxLength={2000}
                  value={form.outcome}
                  onChange={event => update("outcome", event.target.value)}
                />
              )}
            </Field>

            <Field label="Anything else" hint="Optional. Maximum 2,000 characters.">
              {props => (
                <TextArea
                  {...props}
                  name="message"
                  maxLength={2000}
                  value={form.message}
                  onChange={event => update("message", event.target.value)}
                />
              )}
            </Field>

            <Field label="Consent" required error={errors.consent} fieldId="consent">
              {props => (
                <ConsentBox {...props} checked={form.consent} onChange={value => update("consent", value)}>
                  I agree that Kimosabe Commons may store and review this inquiry and contact me about
                  it. I understand that this is an inquiry, not a subscription or an investment; that
                  no money is taken here; that sponsorship confers no equity, token, return or share
                  of revenue; and that nothing is agreed until a written agreement is signed.
                </ConsentBox>
              )}
            </Field>

            {mutation.isError && (
              <FormStatus kind="error">
                <p className="font-medium">We could not save the inquiry.</p>
                <p className="mt-1">
                  {mutation.error?.message ||
                    "Something went wrong on our side. Nothing was submitted. Please try again, or email us directly."}
                </p>
              </FormStatus>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <SubmitButton pending={mutation.isPending}>
                {mutation.isPending ? "Sending" : "Send sponsor inquiry"}
              </SubmitButton>
              <p className="text-[0.875rem] text-muted-foreground">
                No payment is taken and nothing auto-renews.
              </p>
            </div>
          </div>
        </form>
      </LedgerSection>
    </>
  );
}
