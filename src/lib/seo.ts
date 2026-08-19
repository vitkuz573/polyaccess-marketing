import { appUrl, siteName } from "@/lib/env";
import type { Metadata } from "next";

interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
}

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = path ? `${appUrl()}${path}` : appUrl();
  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteName(),
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}
