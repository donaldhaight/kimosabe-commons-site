import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertIntakeSubmission,
  InsertSponsorInquiry,
  InsertUser,
  intakeSubmissions,
  sponsorInquiries,
  submissionNotes,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

function requireDb(db: Awaited<ReturnType<typeof getDb>>) {
  if (!db) {
    throw new Error("Database is not available");
  }
  return db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = requireDb(await getDb());

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/* ------------------------------------------------------------------ */
/* Reference codes                                                     */
/* ------------------------------------------------------------------ */

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/** Short, human-readable reference. Non-cryptographic; uniqueness enforced by the DB. */
export function makeRefCode(prefix: "A" | "S"): string {
  let tail = "";
  for (let i = 0; i < 4; i += 1) {
    tail += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `KC-${prefix}-${tail}`;
}

/* ------------------------------------------------------------------ */
/* Roster applications                                                 */
/* ------------------------------------------------------------------ */

export async function createIntakeSubmission(
  values: Omit<InsertIntakeSubmission, "refCode">,
): Promise<{ id: number; refCode: string }> {
  const db = requireDb(await getDb());
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const refCode = makeRefCode("A");
    try {
      const result = await db.insert(intakeSubmissions).values({ ...values, refCode });
      return { id: Number(result[0].insertId), refCode };
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes("Duplicate")) throw error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Could not allocate a reference code");
}

export type IntakeFilters = {
  status?: string;
  stateCode?: string;
  search?: string;
  limit?: number;
};

export async function listIntakeSubmissions(filters: IntakeFilters = {}) {
  const db = requireDb(await getDb());
  const conditions = [];
  if (filters.status && filters.status !== "all") {
    conditions.push(eq(intakeSubmissions.status, filters.status as never));
  }
  if (filters.stateCode && filters.stateCode !== "all") {
    conditions.push(eq(intakeSubmissions.stateCode, filters.stateCode));
  }
  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      or(
        like(intakeSubmissions.fullName, term),
        like(intakeSubmissions.email, term),
        like(intakeSubmissions.organization, term),
        like(intakeSubmissions.refCode, term),
        like(intakeSubmissions.countyName, term),
      ),
    );
  }

  const query = db.select().from(intakeSubmissions).orderBy(desc(intakeSubmissions.createdAt));
  const limited = query.limit(Math.min(filters.limit ?? 200, 500));
  return conditions.length > 0 ? limited.where(and(...conditions)) : limited;
}

export async function updateIntakeStatus(id: number, status: string) {
  const db = requireDb(await getDb());
  await db
    .update(intakeSubmissions)
    .set({ status: status as never })
    .where(eq(intakeSubmissions.id, id));
}

export async function intakeStats() {
  const db = requireDb(await getDb());
  const rows = await db
    .select({ status: intakeSubmissions.status, count: sql<number>`count(*)` })
    .from(intakeSubmissions)
    .groupBy(intakeSubmissions.status);
  return rows.map(row => ({ status: row.status, count: Number(row.count) }));
}

/* ------------------------------------------------------------------ */
/* Sponsor inquiries                                                   */
/* ------------------------------------------------------------------ */

export async function createSponsorInquiry(
  values: Omit<InsertSponsorInquiry, "refCode">,
): Promise<{ id: number; refCode: string }> {
  const db = requireDb(await getDb());
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const refCode = makeRefCode("S");
    try {
      const result = await db.insert(sponsorInquiries).values({ ...values, refCode });
      return { id: Number(result[0].insertId), refCode };
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes("Duplicate")) throw error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Could not allocate a reference code");
}

export type SponsorFilters = {
  status?: string;
  search?: string;
  limit?: number;
};

export async function listSponsorInquiries(filters: SponsorFilters = {}) {
  const db = requireDb(await getDb());
  const conditions = [];
  if (filters.status && filters.status !== "all") {
    conditions.push(eq(sponsorInquiries.status, filters.status as never));
  }
  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      or(
        like(sponsorInquiries.organization, term),
        like(sponsorInquiries.contactName, term),
        like(sponsorInquiries.email, term),
        like(sponsorInquiries.refCode, term),
      ),
    );
  }

  const query = db.select().from(sponsorInquiries).orderBy(desc(sponsorInquiries.createdAt));
  const limited = query.limit(Math.min(filters.limit ?? 200, 500));
  return conditions.length > 0 ? limited.where(and(...conditions)) : limited;
}

export async function updateSponsorStatus(id: number, status: string) {
  const db = requireDb(await getDb());
  await db
    .update(sponsorInquiries)
    .set({ status: status as never })
    .where(eq(sponsorInquiries.id, id));
}

export async function sponsorStats() {
  const db = requireDb(await getDb());
  const rows = await db
    .select({ status: sponsorInquiries.status, count: sql<number>`count(*)` })
    .from(sponsorInquiries)
    .groupBy(sponsorInquiries.status);
  return rows.map(row => ({ status: row.status, count: Number(row.count) }));
}

/* ------------------------------------------------------------------ */
/* Notes                                                               */
/* ------------------------------------------------------------------ */

export async function addSubmissionNote(values: {
  kind: "intake" | "sponsor";
  submissionId: number;
  note: string;
  authorOpenId?: string | null;
  authorName?: string | null;
}) {
  const db = requireDb(await getDb());
  await db.insert(submissionNotes).values(values);
}

export async function listSubmissionNotes(kind: "intake" | "sponsor", submissionId: number) {
  const db = requireDb(await getDb());
  return db
    .select()
    .from(submissionNotes)
    .where(and(eq(submissionNotes.kind, kind), eq(submissionNotes.submissionId, submissionId)))
    .orderBy(desc(submissionNotes.createdAt));
}