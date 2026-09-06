import type { Metadata } from "next";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/components/marketing/hero";
import { ValueProp } from "@/components/marketing/value-prop";
import { ProductGrid } from "@/components/marketing/product-grid";
import { SocialProof } from "@/components/marketing/social-proof";
import { CtaSection } from "@/components/marketing/cta-section";
import {
  getAllProducts,
  getTestimonials,
  type Product,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { getProductIcon } from "@/lib/icons";

export const metadata: Metadata = pageMetadata({
  title: "Secure access infrastructure for multi-product teams",
  description:
    "PolyAccess provides bot protection via cryptographic challenges and Google BotGuard attestation tokens — built for production from day one.",
  path: "/",
});

export default function HomePage() {
  const products = getAllProducts();
  const { testimonials, logos } = getTestimonials();

  const productCards = products.map((product: Product) => ({
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    icon: getProductIcon(product.icon, "size-5"),
    href: product.href,
    status: product.status,
  }));

  return (
    <>
      <Hero
        badge={
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="size-3" aria-hidden />
            Secure access infrastructure for multi-product teams
          </Badge>
        }
        title="PolyAccess — one identity, every product"
        description="Protect endpoints with cryptographic challenges and generate Google BotGuard attestation tokens — all from a single, hardened platform."
        primaryCta={{ label: "Get Started", href: "/login" }}
        secondaryCta={{ label: "View Products", href: "/products" }}
      />

      <ValueProp
        eyebrow="Why PolyAccess"
        title="Built for production from day one"
        description="Three pillars guide every component we ship."
        items={[
          {
            icon: <ShieldCheck className="size-5" aria-hidden />,
            title: "Security",
            description:
              "Cryptographic challenges, scoped keys, and audit-ready event logs across every product surface.",
          },
          {
            icon: <Zap className="size-5" aria-hidden />,
            title: "Scale",
            description:
              "Stateless services and edge-friendly primitives that absorb traffic spikes without ceremony.",
          },
          {
            icon: <Sparkles className="size-5" aria-hidden />,
            title: "Simplicity",
            description:
              "Drop-in SDKs, predictable APIs, and a portal your customers will actually enjoy using.",
          },
        ]}
      />

      <ProductGrid
        title="A platform, not a patchwork"
        description="PolyAccess is a family of products that share an identity model, a control plane, and an audit trail."
        products={productCards}
      />

      <SocialProof
        title="Trusted by teams shipping at scale"
        description="Engineering leaders use PolyAccess to protect the APIs their businesses depend on."
        testimonials={testimonials}
        logos={logos}
      />

      <CtaSection
        title="Ready to ship secure access infrastructure?"
        description="Start with a free trial, or talk to our team about a custom deployment for your organization."
        primaryCta={{ label: "Start free trial", href: "/signup" }}
        secondaryCta={{ label: "Contact sales", href: "/contact" }}
      />
    </>
  );
}
