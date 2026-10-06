import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectSeo, isHtmlRequest, requestPath } from "../seo";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Non-document requests are not ours to answer: public assets and anything
      // else must fall through rather than receive the application shell.
      if (!isHtmlRequest(req)) return next();

      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      let page = await vite.transformIndexHtml(url, template);

      // Route-specific head metadata and a crawler-readable body block.
      const injected = injectSeo(page, requestPath(req));
      page = injected.html;
      const status = injected.status;

      res.status(status).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // Fall through to the application shell for document requests, injecting
  // route-specific metadata and crawler-readable content. Unknown routes keep a
  // real 404 status while still letting the client render its not-found page.
  const indexPath = path.resolve(distPath, "index.html");
  let cached: { html: string; mtimeMs: number } | null = null;

  const readShell = (): string => {
    const stat = fs.statSync(indexPath);
    if (!cached || cached.mtimeMs !== stat.mtimeMs) {
      cached = { html: fs.readFileSync(indexPath, "utf-8"), mtimeMs: stat.mtimeMs };
    }
    return cached.html;
  };

  app.use((req, res, next) => {
    if (!isHtmlRequest(req)) return next();
    try {
      const { html, status } = injectSeo(readShell(), requestPath(req));
      res.status(status).set({ "Content-Type": "text/html; charset=utf-8" }).end(html);
    } catch (error) {
      next(error);
    }
  });

  app.use("*", (_req, res) => {
    res.sendFile(indexPath);
  });
}
