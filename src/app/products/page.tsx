import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ProductCard } from "@/components/marketing/product-grid";
import { CtaSection } from "@/components/marketing/cta-section";
import { getAllProducts, type Product } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { getProductIcon } from "@/lib/icons";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Explore PolyAccess: unified attestation challenge aggregation and BotGuard token generation.",
  path: "/products",
});

export default function ProductsPage() {
  const products = getAllProducts();
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
      <PageHeader
        eyebrow="Products"
        title="One platform for every access primitive"
        description="PolyAccess is a tightly integrated family of products that share an identity model, a control plane, and a unified audit trail."
        align="left"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageHeader>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {productCards.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/40 bg-muted/20 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              How products work together
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Challenge Proxy fetches attestation challenges from multiple
              upstream providers through a unified API with automatic failover.
              Attest API takes those challenges, executes the BotGuard VM,
              and returns verified attestation tokens. Both share the same
              authentication, rate limiting, and audit trail.
            </p>
          </div>
        </Container>
      </section>

      <CtaSection
        title="See it in your stack"
        description="Get a guided walkthrough of how PolyAccess fits into your architecture."
        primaryCta={{ label: "Request a demo", href: "/contact" }}
        secondaryCta={{ label: "Read the docs", href: "/docs" }}
      />
    </>
  );
}
