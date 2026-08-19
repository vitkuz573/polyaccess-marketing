import type { MetadataRoute } from "next";
import { appUrl } from "@/lib/env";
import { getAllProducts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = appUrl();
  const lastModified = new Date();

  const staticRoutes: Array<{
    path: string;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/blog", changeFrequency: "daily", priority: 0.8 },
    { path: "/docs", changeFrequency: "weekly", priority: 0.8 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes = getAllProducts().map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...productRoutes,
  ];
}
