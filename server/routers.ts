import { COOKIE_NAME } from "@shared/const";
import { TERRITORIES, territoryTotals } from "@shared/territories";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  APPLICANT_TYPES,
  BUDGET_RANGES,
  INTAKE_STATUSES,
  SPONSOR_ORG_TYPES,
  SPONSOR_PROGRAMS,
  SPONSOR_STATUSES,
} from "../drizzle/schema";
import {
  addSubmissionNote,
  createIntakeSubmission,
  createSponsorInquiry,
  intakeStats,
  listIntakeSubmissions,
  listSponsorInquiries,
  listSubmissionNotes,
  sponsorStats,
  updateIntakeStatus,
  updateSponsorStatus,
} from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

const applicantType = z.enum([...APPLICANT_TYPES] as [string, ...string[]]);
const intakeStatus = z.enum([...INTAKE_STATUSES] as [string, ...string[]]);
const sponsorOrgType = z.enum([...SPONSOR_ORG_TYPES] as [string, ...string[]]);
const sponsorProgram = z.enum([...SPONSOR_PROGRAMS] as [string, ...string[]]);
const budgetRange = z.enum([...BUDGET_RANGES] as [string, ...string[]]);
const sponsorStatus = z.enum([...SPONSOR_STATUSES] as [string, ...string[]]);

const trimmed = (max: number) => z.string().trim().max(max);

const consent = z
  .boolean()
  .refine(value => value === true, { message: "Consent is required to submit." });

const intakeInput = z.object({
  applicantType,
  fullName: trimmed(160).min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  phone: trimmed(40).optional().or(z.literal("")),
  organization: trimmed(200).optional().or(z.literal("")),
  orgRole: trimmed(120).optional().or(z.literal("")),
  stateCode: trimmed(2).min(2, "Select a state."),
  countySlug: trimmed(80).min(1, "Select a county."),
  countyName: trimmed(120).min(1),
  licenses: trimmed(300).optional().or(z.literal("")),
  interests: z.array(z.string().max(60)).max(12).optional(),
  note: z.string().trim().max(2000).optional().or(z.literal("")),
  consent,
  source: trimmed(120).default("apply-page"),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
});

const sponsorInput = z.object({
  organization: trimmed(200).min(2, "Please enter your organisation."),
  contactName: trimmed(160).min(2, "Please enter a contact name."),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  phone: trimmed(40).optional().or(z.literal("")),
  orgType: sponsorOrgType,
  program: sponsorProgram,
  budgetRange: budgetRange.default("not_disclosed"),
  territory: trimmed(200).optional().or(z.literal("")),
  outcome: z.string().trim().max(2000).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent,
  source: trimmed(120).default("sponsor-page"),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
});

const blankToNull = (value?: string | null) => {
  const trimmedValue = (value ?? "").trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
};

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  /** Public territory registry (illustrative sample dataset). */
  territories: router({
    list: publicProcedure.query(() => ({ states: TERRITORIES, totals: territoryTotals() })),
  }),

  /** Roster applications. Submission is public; review is administrator-only. */
  intake: router({
    submit: publicProcedure.input(intakeInput).mutation(async ({ input }) => {
      const { id, refCode } = await createIntakeSubmission({
        applicantType: input.applicantType as never,
        fullName: input.fullName,
        email: input.email,
        phone: blankToNull(input.phone),
        organization: blankToNull(input.organization),
        orgRole: blankToNull(input.orgRole),
        stateCode: input.stateCode.toUpperCase(),
        countySlug: input.countySlug,
        countyName: input.countyName,
        licenses: blankToNull(input.licenses),
        interests: input.interests && input.interests.length > 0 ? input.interests.join(",") : null,
        note: blankToNull(input.note),
        consent: true,
        source: input.source,
        referrer: blankToNull(input.referrer),
      });
      return { id, refCode };
    }),

    list: adminProcedure
      .input(
        z
          .object({
            status: z.string().max(20).optional(),
            stateCode: z.string().max(2).optional(),
            search: z.string().max(120).optional(),
          })
          .optional(),
      )
      .query(({ input }) => listIntakeSubmissions(input ?? {})),

    stats: adminProcedure.query(() => intakeStats()),

    setStatus: adminProcedure
      .input(z.object({ id: z.number().int().positive(), status: intakeStatus }))
      .mutation(async ({ input }) => {
        await updateIntakeStatus(input.id, input.status);
        return { success: true } as const;
      }),

    notes: adminProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .query(({ input }) => listSubmissionNotes("intake", input.id)),

    addNote: adminProcedure
      .input(z.object({ id: z.number().int().positive(), note: z.string().trim().min(2).max(2000) }))
      .mutation(async ({ input, ctx }) => {
        await addSubmissionNote({
          kind: "intake",
          submissionId: input.id,
          note: input.note,
          authorOpenId: ctx.user?.openId ?? null,
          authorName: ctx.user?.name ?? null,
        });
        return { success: true } as const;
      }),
  }),

  /** Sponsor and institutional inquiries. */
  sponsor: router({
    submit: publicProcedure.input(sponsorInput).mutation(async ({ input }) => {
      if (input.orgType === "other" && !input.message) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please describe your organisation.",
        });
      }
      const { id, refCode } = await createSponsorInquiry({
        organization: input.organization,
        contactName: input.contactName,
        email: input.email,
        phone: blankToNull(input.phone),
        orgType: input.orgType as never,
        program: input.program as never,
        budgetRange: input.budgetRange as never,
        territory: blankToNull(input.territory),
        outcome: blankToNull(input.outcome),
        message: blankToNull(input.message),
        consent: true,
        source: input.source,
        referrer: blankToNull(input.referrer),
      });
      return { id, refCode };
    }),

    list: adminProcedure
      .input(
        z
          .object({ status: z.string().max(20).optional(), search: z.string().max(120).optional() })
          .optional(),
      )
      .query(({ input }) => listSponsorInquiries(input ?? {})),

    stats: adminProcedure.query(() => sponsorStats()),

    setStatus: adminProcedure
      .input(z.object({ id: z.number().int().positive(), status: sponsorStatus }))
      .mutation(async ({ input }) => {
        await updateSponsorStatus(input.id, input.status);
        return { success: true } as const;
      }),

    notes: adminProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .query(({ input }) => listSubmissionNotes("sponsor", input.id)),

    addNote: adminProcedure
      .input(z.object({ id: z.number().int().positive(), note: z.string().trim().min(2).max(2000) }))
      .mutation(async ({ input, ctx }) => {
        await addSubmissionNote({
          kind: "sponsor",
          submissionId: input.id,
          note: input.note,
          authorOpenId: ctx.user?.openId ?? null,
          authorName: ctx.user?.name ?? null,
        });
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;