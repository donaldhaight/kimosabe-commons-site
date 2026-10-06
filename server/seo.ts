import type { Request, Response } from "express";
import { PUBLIC_ROUTES, ROUTES, canonicalPath, findRoute, type RouteMeta } from "@shared/seo";

const SITE_NAME = "Kimosabe Commons, PBC";

/**
 * Absolute canonical/og:url values are emitted only when a real public origin is
 * configured. Until then they are omitted rather than guessed from the internal
 * request host.
 */
export function siteOrigin(): string | null {
  const raw = (process.env.PUBLIC_SITE_ORIGIN ?? "").trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * The request path as the visitor asked for it. `req.path` is rewritten relative
 * to the mount point, so under a wildcard mount it collapses to "/" and every
 * route would receive the home metadata. `req.originalUrl` is the real path.
 */
export function requestPath(req: Request): string {
  const raw = req.originalUrl || req.url || "/";
  const withoutQuery = raw.split("?")[0].split("#")[0];
  return withoutQuery || "/";
}

/** A GET that a browser or crawler will treat as a document, not an asset. */
export function isHtmlRequest(req: Request): boolean {
  if (req.method !== "GET" && req.method !== "HEAD") return false;
  const path = requestPath(req);
  if (path.startsWith("/api/")) return false;
  if (path.startsWith("/manus-oauth/")) return false;
  if (path === "/manus-routes.json") return false;
  if (path === "/sitemap.xml" || path === "/robots.txt") return false;
  // Reject anything that looks like a file with an extension we serve as an asset.
  if (/\.[a-zA-Z0-9]{1,8}$/.test(path)) return false;
  const accept = req.headers.accept ?? "";
  return accept === "" || accept.includes("text/html") || accept.includes("*/*");
}

export type InjectionResult = { html: string; meta?: RouteMeta; status: number };

/**
 * Inject route-specific head metadata and a crawler-readable content block into
 * the application HTML template. The content block lives inside #root and is
 * replaced when the client application mounts.
 */
export function injectSeo(html: string, pathname: string): InjectionResult {
  const meta = findRoute(pathname);
  const clean = canonicalPath(pathname.replace(/\/+$/, "") || "/");
  const origin = siteOrigin();

  const head: string[] = [];
  const status = meta ? 200 : 404;

  if (meta) {
    head.push(`<title>${escapeHtml(meta.title)}</title>`);
    head.push(`<meta name="description" content="${escapeHtml(meta.description)}" />`);
    head.push(
      `<meta name="keywords" content="stakeholder roster, territory, county operations, public benefit corporation, seasonal operations, contractor recruiting" />`,
    );
    head.push(`<meta property="og:type" content="website" />`);
    head.push(`<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`);
    head.push(`<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
    head.push(`<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
    head.push(`<meta name="twitter:card" content="summary_large_image" />`);
    head.push(`<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
    head.push(`<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
    if (origin) {
      head.push(`<link rel="canonical" href="${escapeHtml(origin + clean)}" />`);
      head.push(`<meta property="og:url" content="${escapeHtml(origin + clean)}" />`);
    }
    if (!meta.indexable) {
      head.push(`<meta name="robots" content="noindex, nofollow" />`);
    }
  } else {
    head.push(`<title>Page not found — ${escapeHtml(SITE_NAME)}</title>`);
    head.push(
      `<meta name="description" content="The page you requested does not exist on the Kimosabe Commons website." />`,
    );
    head.push(`<meta name="robots" content="noindex, nofollow" />`);
  }

  let output = html.replace(/<title>[\s\S]*?<\/title>/i, "");
  output = output.replace(
    /<meta\s+name=["']description["'][^>]*>\s*/gi,
    "",
  );
  output = output.replace(/<\/head>/i, `${head.join("\n    ")}\n  </head>`);

  const fallback = meta
    ? renderFallback(meta)
    : renderFallback({
        path: clean,
        title: "Page not found",
        description: "",
        heading: "That page is not on the roster",
        summary: [
          "The page you requested does not exist. Return to the home page to find territory availability, programs, participation and the roster application.",
        ],
        indexable: false,
      });

  output = output.replace(
    /<div id="root">\s*<\/div>/i,
    `<div id="root">${fallback}</div>`,
  );

  return { html: output, meta, status };
}

function renderFallback(meta: RouteMeta): string {
  const body = meta.summary.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("");
  return (
    `<div class="kc-fallback">` +
    `<h1>${escapeHtml(meta.heading)}</h1>` +
    body +
    `<p><a href="/">Kimosabe Commons home</a> &middot; <a href="/territories">Territory availability</a> &middot; <a href="/apply">Apply to the roster</a> &middot; <a href="/sponsor">Sponsor inquiry</a></p>` +
    `</div>`
  );
}

/** Static styling for the pre-hydration block so a slow connection still reads well. */
export const FALLBACK_STYLE = `
.kc-fallback{font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;max-width:44rem;margin:0 auto;padding:4rem 1.5rem;color:#1B2A2F;background:#F6F2E9;line-height:1.65}
.kc-fallback h1{font-family:Georgia,"Times New Roman",serif;font-size:2rem;line-height:1.15;margin:0 0 1.25rem;color:#1B2A2F}
.kc-fallback p{margin:0 0 1rem;font-size:1.0625rem}
.kc-fallback a{color:#2F6B4F;text-decoration:underline;text-underline-offset:2px}
`.trim();

export function sitemapXml(): string {
  const origin = siteOrigin();
  const urls = PUBLIC_ROUTES.map(route => {
    const loc = origin ? `${origin}${canonicalPath(route.path)}` : canonicalPath(route.path);
    return `  <url>\n    <loc>${escapeHtml(loc)}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.w3.org/1999/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function robotsTxt(): string {
  const origin = siteOrigin();
  const lines = ["User-Agent: *", "Allow: /", "Disallow: /api/*", "Disallow: /admin"];
  if (origin) {
    lines.push(`Sitemap: ${origin}/sitemap.xml`);
  } else {
    lines.push("Sitemap: /sitemap.xml");
  }
  return `${lines.join("\n")}\n`;
}

export function registerSeoRoutes(app: {
  get: (path: string, handler: (req: Request, res: Response) => void) => void;
}) {
  app.get("/sitemap.xml", (_req, res) => {
    res
      .status(200)
      .set({ "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-cache" })
      .send(sitemapXml());
  });
  app.get("/robots.txt", (_req, res) => {
    res
      .status(200)
      .set({ "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" })
      .send(robotsTxt());
  });
}

/** Every route currently declared, for the platform route manifest. */
export const routeManifest = {
  routes: ROUTES.map(route => ({ path: route.path, title: route.title })),
};
