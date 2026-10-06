import { findRoute } from "@shared/seo";
import { useEffect } from "react";

/**
 * Keeps the document head consistent with the server-rendered metadata when the
 * visitor navigates client-side. The initial HTML already carries the correct
 * title, description, canonical and social tags.
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

    if (meta.indexable) {
      const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
      if (robots) robots.remove();
    } else {
      setNamed("robots", "noindex, nofollow");
    }
  }, [path]);

  return null;
}