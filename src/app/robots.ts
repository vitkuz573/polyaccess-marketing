import type { MetadataRoute } from "next";
import { appUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = appUrl();
  const isProduction = process.env.NODE_ENV === "production";

  return {
    rules: [
      {
        userAgent: "*",
        allow: isProduction ? "/" : undefined,
        disallow: isProduction ? undefined : "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
