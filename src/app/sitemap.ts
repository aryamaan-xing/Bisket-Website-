import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bisketlabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/fabricators", "/technology", "/team", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
