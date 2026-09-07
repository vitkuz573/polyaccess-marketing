import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/marketing/cta-section";
import { getAllProducts, getProductBySlug, type Product } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { getProductIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product: Product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.tagline,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getAllProducts().filter(
    (p: Product) => product.related.includes(p.slug),
  );

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b border-border/40 bg-background py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {getProductIcon(product.icon, "size-5")}
                </div>
                <Badge variant="secondary">{product.status}</Badge>
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                {product.tagline}
              </p>
              <p className="mt-3 text-pretty text-muted-foreground">
                {product.description}
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col gap-3 md:mt-12">
              <Link
                href="/signup"
                className={buttonVariants({ size: "lg" })}
              >
                Start free trial
                <ArrowRight className="ml-1.5 size-4" aria-hidden />
              </Link>
              <Link
                href={product.externalHref ?? "/docs"}
                target={product.externalHref ? "_blank" : undefined}
                rel={product.externalHref ? "noopener noreferrer" : undefined}
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                {product.externalHref ? "View live demo" : "Read documentation"}
                {product.externalHref && <ArrowUpRight className="ml-1.5 size-4" aria-hidden />}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Key benefit highlight */}
      <section className="border-b border-border/40 bg-muted/20 py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Key benefit
            </span>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {product.keyBenefit}
            </p>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="border-b border-border/40 bg-background py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              What {product.name} provides
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, i) => (
              <div
                key={feature}
                className="group rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="mb-3 flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <span className="text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-b border-border/40 bg-muted/20 py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Why choose {product.name}
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Benefits
              </h2>
            </div>
            <div className="space-y-4">
              {product.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded-lg border border-border/40 bg-background p-4"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Use cases */}
      <section className="border-b border-border/40 bg-background py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Use cases
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Built for real workflows
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Common scenarios where {product.name} adds immediate value.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {product.useCases.map((useCase, i) => (
              <div
                key={useCase}
                className="flex items-start gap-4 rounded-xl border border-border/60 bg-card p-6"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-b border-border/40 bg-muted/20 py-16 md:py-24">
          <Container>
            <div className="mb-10 max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Related
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Works well with
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related: Product) => (
                <Link
                  key={related.slug}
                  href={related.href}
                  className="group rounded-xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {getProductIcon(related.icon, "size-4")}
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {related.name}
                  </h3>
                  <p className="mt-1 text-pretty text-sm text-muted-foreground">
                    {related.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaSection
        title={`Ready to use ${product.name}?`}
        description="Start a free trial or request a guided walkthrough with our team."
        primaryCta={{ label: "Start free trial", href: "/signup" }}
        secondaryCta={{ label: "Contact sales", href: "/contact" }}
      />
    </>
  );
}
