// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    "https://www.dulcinachocolates.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/private/",
        "/*.json$",
        "/*?*utm_*",
        "/*?*fbclid*",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
