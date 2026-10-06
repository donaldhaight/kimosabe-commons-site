import { findRoute } from "@shared/seo";
import { useEffect } from "react";

/**
 * Keeps the document head consistent with the server-rendered metadata when the
 * visitor navigates client-side. The initial HTML already carries the correct
 * title, description, canonical and social tags.
 *
 * Canonical and og:url are only emitted by the server when a real public origin
 * is configured. When those tags are present, their path is rewritten on
 * navigation so a client-side route change never leaves the previous route's
 * URL behind. When they are absent, none is invented.
 */
export default function Seo({ path }: { path: string }) {
  useEffect(() => {
    const meta = findRoute(path);
    if (!meta) return;

    document.title = meta.title;

    const setNamed = (name: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setProperty = (property: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setNamed("description", meta.description);
    setProperty("og:title", meta.title);
    setProperty("og:description", meta.description);
    setProperty("twitter:title", meta.title);
    setProperty("twitter:description", meta.description);

    // Rewrite canonical/og:url against the origin the server already used,
    // rather than guessing one from the browser location.
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const existingOrigin =
      canonical?.href ??
      document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ??
      "";

    if (existingOrigin) {
      let origin = "";
      try {
        origin = new URL(existingOrigin).origin;
      } catch {
        origin = "";
      }
      if (origin) {
        const target = `${origin}${path === "/" ? "/" : path.replace(/\/+$/, "")}`;
        if (canonical) canonical.setAttribute("href", target);
        const ogUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", target);
      }
    }

    if (meta.indexable) {
      document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.remove();
    } else {
      setNamed("robots", "noindex, nofollow");
    }
  }, [path]);

  return null;
}