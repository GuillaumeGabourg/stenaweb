import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/offer";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projets/${p.slug}`, priority: 0.8 })),
  ];
}
