import { cn } from "@/lib/utils";
import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";

const controlClass =
  "w-full border border-input bg-card px-3 py-2.5 text-[1rem] text-ink placeholder:text-muted-foreground/70 focus:border-field focus:outline-none aria-[invalid=true]:border-clay";

let fieldCounter = 0;

export function Field({
  label,
  hint,
  error,
  required,
  children,
  className,
  fieldId,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
  className?: string;
  /**
   * A stable id for the control. Callers that need to move focus to the first
   * invalid control pass one, so the generated counter id is never depended on.
   */
  fieldId?: string;
}) {
  const id = fieldId ?? `field-${(fieldCounter += 1)}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[0.9375rem] font-medium text-ink">
        {label}
        {required && (
          <span className="ml-1 text-clay" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-[0.8125rem] text-muted-foreground">
          {hint}
        </p>
      )}
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error && (
        <p id={errorId} className="text-[0.8125rem] font-medium text-clay">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  id,
  describedBy,
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; describedBy?: string; invalid: boolean }) {
  return (
    <input
      id={id}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      className={cn(controlClass, className)}
      {...props}
    />
  );
}

export function TextArea({
  id,
  describedBy,
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; describedBy?: string; invalid: boolean }) {
  return (
    <textarea
      id={id}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      rows={4}
      className={cn(controlClass, "min-h-[6.5rem] resize-y", className)}
      {...props}
    />
  );
}

export function Select({
  id,
  describedBy,
  invalid,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { id: string; describedBy?: string; invalid: boolean }) {
  return (
    <select
      id={id}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      className={cn(controlClass, className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function ConsentBox({
  id,
  describedBy,
  invalid,
  checked,
  onChange,
  children,
}: {
  id: string;
  describedBy?: string;
  invalid: boolean;
  checked: boolean;
  onChange: (value: boolean) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        onChange={event => onChange(event.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 border border-input accent-[#2F6B4F]"
      />
      <label htmlFor={id} className="text-[0.875rem] leading-relaxed text-ink-soft">
        {children}
      </label>
    </div>
  );
}

export function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
  hint,
}: {
  legend: string;
  options: Array<{ value: string; label: string }>;
  selected: string[];
  onToggle: (value: string) => void;
  hint?: string;
}) {
  return (
    <fieldset className="border border-border bg-card p-4">
      <legend className="px-1 text-[0.9375rem] font-medium text-ink">{legend}</legend>
      {hint && <p className="mb-3 text-[0.8125rem] text-muted-foreground">{hint}</p>}
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map(option => {
          const id = `interest-${option.value}`;
          return (
            <div key={option.value} className="flex items-start gap-2.5">
              <input
                id={id}
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="mt-1 h-4.5 w-4.5 shrink-0 border border-input accent-[#2F6B4F]"
              />
              <label htmlFor={id} className="text-[0.875rem] text-ink-soft">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export function SubmitButton({
  pending,
  children,
  className,
}: {
  pending: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-2 border border-field bg-field px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-field-deep disabled:opacity-60",
        className,
      )}
    >
      {pending && (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
        />
      )}
      {children}
    </button>
  );
}

export function FormStatus({
  kind,
  children,
}: {
  kind: "success" | "error";
  children: ReactNode;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "border-l-2 px-4 py-3 text-[0.9375rem]",
        kind === "success" ? "border-field bg-field/5 text-ink" : "border-clay bg-clay/5 text-ink",
      )}
    >
      {children}
    </div>
  );
}
