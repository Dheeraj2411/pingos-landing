import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pingos.me";
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    host: normalizedBaseUrl,
    sitemap: `${normalizedBaseUrl}/sitemap.xml`,
  };
}
