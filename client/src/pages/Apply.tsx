import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ALL_COUNTIES, TERRITORIES } from "@shared/territories";
import { APPLICANT_TYPES, INTEREST_OPTIONS } from "@/data/content";
import { Callout, LedgerSection, PageHeader, SampleDataNotice } from "@/components/ledger";
import {
  CheckboxGroup,
  ConsentBox,
  Field,
  FormStatus,
  Select,
  SubmitButton,
  TextArea,
  TextInput,
} from "@/components/forms";

type FormState = {
  applicantType: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  orgRole: string;
  stateCode: string;
  countySlug: string;
  licenses: string;
  note: string;
  interests: string[];
  consent: boolean;
};

const EMPTY: FormState = {
  applicantType: "contractor",
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  orgRole: "",
  stateCode: "",
  countySlug: "",
  licenses: "",
  note: "",
  interests: [],
  consent: false,
};

function readCountyParam(): { stateCode: string; countySlug: string } | null {
  if (typeof window === "undefined") return null;
  const param = new URLSearchParams(window.location.search).get("county");
  if (!param) return null;
  const [stateCode, ...rest] = param.split("-");
  const countySlug = rest.join("-").toLowerCase();
  const county = ALL_COUNTIES.find(c => c.stateCode === stateCode && c.slug === countySlug);
  if (!county) return null;
  return { stateCode: county.stateCode, countySlug: county.slug };
}

export default function Apply() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const prefilled = useMemo(readCountyParam, []);
  const [submitted, setSubmitted] = useState<{ refCode: string } | null>(null);

  useEffect(() => {
    if (prefilled) {
      setForm(current => ({
        ...current,
        stateCode: prefilled.stateCode,
        countySlug: prefilled.countySlug,
      }));
    }
  }, [prefilled]);

  const countiesForState = useMemo(
    () => TERRITORIES.find(state => state.code === form.stateCode)?.counties ?? [],
    [form.stateCode],
  );

  const mutation = trpc.intake.submit.useMutation({
    onSuccess: data => setSubmitted({ refCode: data.refCode }),
  });

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) next.fullName = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.stateCode) next.stateCode = "Select the state you intend to work in.";
    if (!form.countySlug) next.countySlug = "Select the county, or the nearest one to your area.";
    if (!form.consent) next.consent = "We need your consent to review the application.";
    setErrors(next);
    return next;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = validate();
    const firstKey = Object.keys(next)[0];
    if (firstKey) {
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }
    const county = countiesForState.find(c => c.slug === form.countySlug);
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    mutation.mutate({
      applicantType: form.applicantType as never,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      organization: form.organization.trim(),
      orgRole: form.orgRole.trim(),
      stateCode: form.stateCode,
      countySlug: form.countySlug,
      countyName: county?.name ?? form.countySlug,
      licenses: form.licenses.trim(),
      interests: form.interests,
      note: form.note.trim(),
      consent: form.consent,
      source: "apply-page",
      referrer,
    });
  };

  if (submitted) {
    return (
      <>
        <PageHeader
          numeral="10"
          eyebrow="Application received"
          title="Your application is in review"
          lede="A person reads every application. You will get an answer, including if the answer is that we cannot place you this season."
        />
        <LedgerSection numeral="01" label="Reference">
          <FormStatus kind="success">
            <p className="font-medium">
              Your reference is <span className="data">{submitted.refCode}</span>.
            </p>
            <p className="mt-2 text-[0.9375rem]">
              Keep it. Quoting it gets you straight to your file without re-explaining who you are. A
              copy of this reference has not been emailed automatically — write it down or screenshot it.
            </p>
          </FormStatus>
          <h2 className="measure mt-10">What happens next</h2>
          <ol className="measure-wide mt-4 divide-y divide-border border-y border-border">
            {[
              { title: "Acknowledgement", body: "Within two working days, by a person, to the email you gave us." },
              {
                title: "Verification",
                body: "We check identity, organisation and licence at the level of risk involved, and we record what we checked.",
              },
              {
                title: "Territory decision",
                body: "You are told which county you hold for the season and until when — or that there is no seat this season, and why.",
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
              href="/territories"
              className="border border-field bg-field px-5 py-3 font-medium text-primary-foreground no-underline transition-colors hover:bg-field-deep"
            >
              Check another territory
            </Link>
            <Link
              href="/how-it-works"
              className="border border-ink/25 px-5 py-3 font-medium text-ink no-underline transition-colors hover:border-ink hover:bg-card"
            >
              Read how the season runs
            </Link>
          </div>
        </LedgerSection>
      </>
    );
  }

  return (
    <>
      <PageHeader
        numeral="10"
        eyebrow="Apply"
        title="Apply to the roster"
        lede="This is the only place we ask for your details. Applying creates no contract, no fee and no obligation on either side — it starts a review."
      />

      <LedgerSection numeral="01" label="Before you begin">
        <div className="grid gap-5 md:grid-cols-2">
          <Callout title="What we need">
            <p>
              Who you are, how to reach you, what you are licensed to do, and the county you intend to
              work. Everything else is optional and can wait until verification.
            </p>
          </Callout>
          <Callout title="What we will never ask for" tone="clay">
            <p>
              Your social security number on this form, your bank details, a payment, or a
              commitment to exclusivity. Those belong to verification and contracting, handled
              separately and with your written consent.
            </p>
          </Callout>
        </div>
      </LedgerSection>

      <LedgerSection numeral="02" label="The form" tone="deep">
        <form onSubmit={onSubmit} noValidate className="measure-wide">
          <div className="grid gap-6">
            <Field label="What best describes you" required>
              {({ id, describedBy, invalid }) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  invalid={invalid}
                  value={form.applicantType}
                  onChange={event => update("applicantType", event.target.value)}
                >
                  {APPLICANT_TYPES.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              )}
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" required error={errors.fullName} fieldId="fullName">
                {props => (
                  <TextInput
                    {...props}
                    name="fullName"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={event => update("fullName", event.target.value)}
                  />
                )}
              </Field>
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
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Phone" hint="Optional. Used only for scheduling verification.">
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
              <Field label="Organisation" hint="Optional. Your company, crew or affiliation.">
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
            </div>

            <Field label="Your role in that organisation" hint="Optional. For example: owner, foreman, estimator.">
              {props => (
                <TextInput
                  {...props}
                  name="orgRole"
                  value={form.orgRole}
                  onChange={event => update("orgRole", event.target.value)}
                />
              )}
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="State you intend to work in"
                required
                error={errors.stateCode}
                fieldId="stateCode"
              >
                {props => (
                  <Select
                    {...props}
                    value={form.stateCode}
                    onChange={event => {
                      update("stateCode", event.target.value);
                      update("countySlug", "");
                    }}
                  >
                    <option value="">Select a state</option>
                    {TERRITORIES.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field
                label="County"
                required
                error={errors.countySlug}
                fieldId="countySlug"
                hint="Sample counties are listed. If yours is missing, choose the nearest and name it in the note."
              >
                {props => (
                  <Select
                    {...props}
                    value={form.countySlug}
                    disabled={!form.stateCode}
                    onChange={event => update("countySlug", event.target.value)}
                  >
                    <option value="">{form.stateCode ? "Select a county" : "Select a state first"}</option>
                    {countiesForState.map(county => (
                      <option key={county.slug} value={county.slug}>
                        {county.name}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
            </div>

            <SampleDataNotice>
              The county list is illustrative sample data used to demonstrate the territory system.
              Naming a county that is not listed does not disqualify your application.
            </SampleDataNotice>

            <Field
              label="Licences you hold"
              hint="Optional here. For example: state general contractor licence number, roofing licence, adjuster licence. Verified later against the register."
            >
              {props => (
                <TextInput
                  {...props}
                  name="licenses"
                  value={form.licenses}
                  onChange={event => update("licenses", event.target.value)}
                />
              )}
            </Field>

            <CheckboxGroup
              legend="What do you want to do in the network?"
              hint="Choose everything that applies. This routes your application to the right reviewer."
              options={INTEREST_OPTIONS}
              selected={form.interests}
              onToggle={value =>
                update(
                  "interests",
                  form.interests.includes(value)
                    ? form.interests.filter(item => item !== value)
                    : [...form.interests, value],
                )
              }
            />

            <Field
              label="Anything else we should know"
              hint="Optional. Maximum 2,000 characters. Do not include personal financial or claim details."
            >
              {props => (
                <TextArea
                  {...props}
                  name="note"
                  maxLength={2000}
                  value={form.note}
                  onChange={event => update("note", event.target.value)}
                />
              )}
            </Field>

            <Field label="Consent" required error={errors.consent} fieldId="consent">
              {props => (
                <ConsentBox
                  {...props}
                  checked={form.consent}
                  onChange={value => update("consent", value)}
                >
                  I agree that Kimosabe Commons may store the information in this application, review
                  it, and contact me about it. I understand that applying creates no contract, no fee
                  and no obligation, and that I can ask for the record to be corrected or deleted. I
                  have not been promised a territory, a licence decision, insurance coverage, income
                  or an investment.
                </ConsentBox>
              )}
            </Field>

            {mutation.isError && (
              <FormStatus kind="error">
                <p className="font-medium">We could not save the application.</p>
                <p className="mt-1">
                  {mutation.error?.message ||
                    "Something went wrong on our side. Nothing was submitted. Please try again, or email us and we will take it from there."}
                </p>
              </FormStatus>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <SubmitButton pending={mutation.isPending}>
                {mutation.isPending ? "Submitting" : "Submit application"}
              </SubmitButton>
              <p className="text-[0.875rem] text-muted-foreground">
                No payment is taken. Nothing auto-renews.
              </p>
            </div>
          </div>
        </form>
      </LedgerSection>
    </>
  );
}
