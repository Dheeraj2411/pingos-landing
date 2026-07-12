import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pingos.me";
  const baseUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
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
