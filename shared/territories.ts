/**
 * ILLUSTRATIVE SAMPLE DATA.
 *
 * This dataset exists to demonstrate the territory browse experience. It is not a
 * statement of actual holdings, assignments, membership or capacity of Kimosabe
 * Commons, PBC or any other organisation. Every surface that renders it must label
 * it as illustrative sample data.
 *
 * Availability states:
 *   open      — seats available for the coming season
 *   held      — under an active seasonal assignment; waitlist only
 *   waitlist  — more qualified demand than seats; applications still reviewed
 */

export type Availability = "open" | "held" | "waitlist";

export type County = {
  name: string;
  slug: string;
  availability: Availability;
  seatsOpen: number;
  seatsHeld: number;
  /** Territory code used in rosters and ledgers. */
  code: string;
};

export type StateTerritory = {
  name: string;
  code: string;
  slug: string;
  counties: County[];
};

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  open: "Open",
  held: "Held",
  waitlist: "Waitlist",
};

export const AVAILABILITY_MEANING: Record<Availability, string> = {
  open: "Seats are available for the coming season.",
  held: "Under an active seasonal assignment. Applications join the waitlist.",
  waitlist: "More qualified demand than seats this season. Applications are still reviewed.",
};

function build(
  code: string,
  name: string,
  slug: string,
  rows: Array<[string, string, Availability, number, number]>,
): StateTerritory {
  return {
    name,
    code,
    slug,
    counties: rows.map(([countyName, countySlug, availability, seatsOpen, seatsHeld]) => ({
      name: countyName,
      slug: countySlug,
      availability,
      seatsOpen,
      seatsHeld,
      code: `${code}-${countySlug.toUpperCase().replace(/-/g, "").slice(0, 6)}`,
    })),
  };
}

export const TERRITORIES: StateTerritory[] = [
  build("FL", "Florida", "florida", [
    ["Miami-Dade", "miami-dade", "held", 0, 6],
    ["Broward", "broward", "held", 0, 4],
    ["Palm Beach", "palm-beach", "open", 3, 2],
    ["Hillsborough", "hillsborough", "open", 4, 1],
    ["Pinellas", "pinellas", "waitlist", 1, 3],
    ["Orange", "orange", "open", 5, 1],
    ["Duval", "duval", "open", 4, 0],
    ["Polk", "polk", "open", 6, 0],
  ]),
  build("TX", "Texas", "texas", [
    ["Harris", "harris", "held", 0, 7],
    ["Dallas", "dallas", "held", 0, 5],
    ["Tarrant", "tarrant", "open", 4, 2],
    ["Bexar", "bexar", "open", 5, 1],
    ["Travis", "travis", "open", 4, 1],
    ["Collin", "collin", "waitlist", 2, 3],
    ["Fort Bend", "fort-bend", "open", 5, 0],
    ["Nueces", "nueces", "open", 6, 0],
  ]),
  build("GA", "Georgia", "georgia", [
    ["Fulton", "fulton", "held", 0, 4],
    ["Gwinnett", "gwinnett", "open", 4, 1],
    ["Cobb", "cobb", "open", 3, 2],
    ["DeKalb", "dekalb", "waitlist", 1, 3],
    ["Chatham", "chatham", "open", 5, 0],
    ["Muscogee", "muscogee", "open", 6, 0],
  ]),
  build("NC", "North Carolina", "north-carolina", [
    ["Mecklenburg", "mecklenburg", "held", 0, 4],
    ["Wake", "wake", "open", 4, 1],
    ["Guilford", "guilford", "open", 5, 0],
    ["Forsyth", "forsyth", "open", 5, 0],
    ["New Hanover", "new-hanover", "waitlist", 1, 2],
    ["Buncombe", "buncombe", "open", 6, 0],
  ]),
  build("SC", "South Carolina", "south-carolina", [
    ["Greenville", "greenville", "open", 5, 1],
    ["Richland", "richland", "open", 4, 1],
    ["Charleston", "charleston", "held", 0, 3],
    ["Horry", "horry", "waitlist", 1, 2],
    ["Spartanburg", "spartanburg", "open", 6, 0],
  ]),
  build("TN", "Tennessee", "tennessee", [
    ["Davidson", "davidson", "held", 0, 4],
    ["Shelby", "shelby", "open", 4, 1],
    ["Knox", "knox", "open", 5, 0],
    ["Hamilton", "hamilton", "open", 5, 0],
    ["Rutherford", "rutherford", "waitlist", 1, 2],
  ]),
  build("AL", "Alabama", "alabama", [
    ["Jefferson", "jefferson", "open", 5, 1],
    ["Mobile", "mobile", "open", 4, 1],
    ["Montgomery", "montgomery", "waitlist", 1, 2],
    ["Madison", "madison", "open", 6, 0],
    ["Baldwin", "baldwin", "open", 6, 0],
  ]),
  build("LA", "Louisiana", "louisiana", [
    ["Orleans", "orleans", "held", 0, 3],
    ["East Baton Rouge", "east-baton-rouge", "open", 4, 1],
    ["Jefferson", "jefferson-la", "open", 5, 0],
    ["Caddo", "caddo", "waitlist", 1, 2],
    ["Calcasieu", "calcasieu", "open", 6, 0],
  ]),
  build("MS", "Mississippi", "mississippi", [
    ["Hinds", "hinds", "open", 5, 1],
    ["Harrison", "harrison", "waitlist", 1, 2],
    ["DeSoto", "desoto", "open", 6, 0],
    ["Rankin", "rankin", "open", 6, 0],
  ]),
  build("AZ", "Arizona", "arizona", [
    ["Maricopa", "maricopa", "held", 0, 6],
    ["Pima", "pima", "open", 4, 1],
    ["Pinal", "pinal", "open", 5, 0],
    ["Mohave", "mohave", "waitlist", 1, 2],
  ]),
  build("CO", "Colorado", "colorado", [
    ["Denver", "denver", "held", 0, 4],
    ["El Paso", "el-paso", "open", 4, 1],
    ["Arapahoe", "arapahoe", "open", 5, 0],
    ["Adams", "adams", "waitlist", 1, 2],
  ]),
  build("OH", "Ohio", "ohio", [
    ["Cuyahoga", "cuyahoga", "held", 0, 4],
    ["Franklin", "franklin", "open", 4, 1],
    ["Hamilton", "hamilton-oh", "open", 5, 0],
    ["Summit", "summit", "waitlist", 1, 2],
  ]),
  build("PA", "Pennsylvania", "pennsylvania", [
    ["Philadelphia", "philadelphia", "held", 0, 5],
    ["Allegheny", "allegheny", "open", 4, 1],
    ["Montgomery", "montgomery-pa", "open", 4, 1],
    ["Bucks", "bucks", "waitlist", 1, 2],
  ]),
  build("NY", "New York", "new-york", [
    ["Kings", "kings", "held", 0, 5],
    ["Queens", "queens", "held", 0, 4],
    ["Erie", "erie", "open", 5, 1],
    ["Monroe", "monroe", "waitlist", 1, 2],
  ]),
];

export const ALL_COUNTIES = TERRITORIES.flatMap(state =>
  state.counties.map(county => ({ ...county, stateName: state.name, stateSlug: state.slug, stateCode: state.code })),
);

export type FlatCounty = (typeof ALL_COUNTIES)[number];

export function findState(slug: string): StateTerritory | undefined {
  return TERRITORIES.find(s => s.slug === slug.toLowerCase());
}

export function territoryTotals() {
  return ALL_COUNTIES.reduce(
    (acc, c) => {
      acc.total += 1;
      acc[c.availability] += 1;
      acc.seatsOpen += c.seatsOpen;
      acc.seatsHeld += c.seatsHeld;
      return acc;
    },
    { total: 0, open: 0, held: 0, waitlist: 0, seatsOpen: 0, seatsHeld: 0 },
  );
}

/** The five phases of the seasonal clock. Shared by the season band and copy. */
export const SEASON_PHASES = [
  {
    key: "pre-season",
    label: "Pre-Season",
    window: "January – February",
    detail: "Territory allocation, roster recruiting, team formation and the season budget.",
  },
  {
    key: "season",
    label: "Season",
    window: "March – November",
    detail: "Active work, campaign execution, conversions, evidence and attestation.",
  },
  {
    key: "cool-down",
    label: "Cool-Down",
    window: "December 1",
    detail: "New work stops. Receivables are collected and the season is closed out.",
  },
  {
    key: "dispute",
    label: "Dispute Resolution",
    window: "December – February",
    detail: "Open questions are settled against the record. Deadline, then automatic close.",
  },
  {
    key: "reset",
    label: "Reset",
    window: "Season boundary",
    detail: "Every address returns to Need. Roles, seats and baselines renew. History is kept.",
  },
] as const;