import { boolean, index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Applicant types accepted by the roster application. */
export const APPLICANT_TYPES = [
  "contractor",
  "crew",
  "sales_rep",
  "sponsor",
  "civic_partner",
  "builder",
  "other",
] as const;

export const INTAKE_STATUSES = [
  "new",
  "reviewing",
  "contacted",
  "qualified",
  "hold",
  "declined",
] as const;

export const SPONSOR_STATUSES = [
  "new",
  "reviewing",
  "in_discussion",
  "proposal_sent",
  "declined",
] as const;

export const SPONSOR_ORG_TYPES = [
  "insurer",
  "supplier_manufacturer",
  "financial_institution",
  "municipality_or_county",
  "nonprofit_or_association",
  "foundation",
  "media",
  "other",
] as const;

export const SPONSOR_PROGRAMS = [
  "recruiting_and_roster",
  "promotion_and_campaigns",
  "territory_stewardship",
  "attestation_and_verification",
  "research_and_case_study",
  "undecided",
] as const;

export const BUDGET_RANGES = [
  "under_10k",
  "10k_25k",
  "25k_50k",
  "50k_100k",
  "100k_250k",
  "over_250k",
  "not_disclosed",
] as const;

/**
 * Roster applications ("Apply"). One row per submission from the public form.
 * Contains no regulated, claim, or policyholder data by design.
 */
export const intakeSubmissions = mysqlTable(
  "intake_submissions",
  {
    id: int("id").autoincrement().primaryKey(),
    /** Human-readable reference shown to the applicant, e.g. KC-A-4F19. */
    refCode: varchar("refCode", { length: 24 }).notNull().unique(),
    applicantType: mysqlEnum("applicantType", APPLICANT_TYPES).notNull(),
    fullName: varchar("fullName", { length: 160 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 40 }),
    organization: varchar("organization", { length: 200 }),
    /** Free-text role inside the organisation, e.g. "owner", "foreman". */
    orgRole: varchar("orgRole", { length: 120 }),
    stateCode: varchar("stateCode", { length: 2 }).notNull(),
    countySlug: varchar("countySlug", { length: 80 }).notNull(),
    countyName: varchar("countyName", { length: 120 }).notNull(),
    /** Comma-separated licence identifiers the applicant holds. */
    licenses: varchar("licenses", { length: 300 }),
    /** Comma-separated interest keys. */
    interests: text("interests"),
    note: text("note"),
    consent: boolean("consent").notNull().default(false),
    /** Where the submission came from, e.g. "apply-page". */
    source: varchar("source", { length: 120 }).notNull(),
    referrer: varchar("referrer", { length: 500 }),
    status: mysqlEnum("status", INTAKE_STATUSES).notNull().default("new"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    index("intake_status_idx").on(table.status),
    index("intake_state_idx").on(table.stateCode),
    index("intake_created_idx").on(table.createdAt),
  ],
);

/**
 * Sponsor and institutional inquiries. Sponsorship is a defined deliverable
 * package; this table stores no investment, securities or payment instruction data.
 */
export const sponsorInquiries = mysqlTable(
  "sponsor_inquiries",
  {
    id: int("id").autoincrement().primaryKey(),
    refCode: varchar("refCode", { length: 24 }).notNull().unique(),
    organization: varchar("organization", { length: 200 }).notNull(),
    contactName: varchar("contactName", { length: 160 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 40 }),
    orgType: mysqlEnum("orgType", SPONSOR_ORG_TYPES).notNull(),
    program: mysqlEnum("program", SPONSOR_PROGRAMS).notNull(),
    budgetRange: mysqlEnum("budgetRange", BUDGET_RANGES).notNull().default("not_disclosed"),
    /** Free-text territory or market of interest. */
    territory: varchar("territory", { length: 200 }),
    /** The outcome the sponsor wants measured. */
    outcome: text("outcome"),
    message: text("message"),
    consent: boolean("consent").notNull().default(false),
    source: varchar("source", { length: 120 }).notNull(),
    referrer: varchar("referrer", { length: 500 }),
    status: mysqlEnum("status", SPONSOR_STATUSES).notNull().default("new"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    index("sponsor_status_idx").on(table.status),
    index("sponsor_created_idx").on(table.createdAt),
  ],
);

/** Internal notes attached to either kind of submission by a reviewing admin. */
export const submissionNotes = mysqlTable(
  "submission_notes",
  {
    id: int("id").autoincrement().primaryKey(),
    kind: mysqlEnum("kind", ["intake", "sponsor"]).notNull(),
    submissionId: int("submissionId").notNull(),
    note: text("note").notNull(),
    authorOpenId: varchar("authorOpenId", { length: 64 }),
    authorName: varchar("authorName", { length: 160 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [index("note_target_idx").on(table.kind, table.submissionId)],
);

export type IntakeSubmission = typeof intakeSubmissions.$inferSelect;
export type InsertIntakeSubmission = typeof intakeSubmissions.$inferInsert;
export type SponsorInquiry = typeof sponsorInquiries.$inferSelect;
export type InsertSponsorInquiry = typeof sponsorInquiries.$inferInsert;
export type SubmissionNote = typeof submissionNotes.$inferSelect;