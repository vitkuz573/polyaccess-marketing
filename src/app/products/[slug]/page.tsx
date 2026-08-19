import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
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
      <PageHeader
        eyebrow={product.status}
        title={product.name}
        description={product.description}
        align="left"
      >
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

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            Start free trial
            <ArrowRight className="ml-1 size-4" aria-hidden />
          </Link>
          <Link
            href={product.externalHref ?? "/docs"}
            target={product.externalHref ? "_blank" : undefined}
            rel={product.externalHref ? "noopener noreferrer" : undefined}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {product.externalHref ? "View live demo" : "Read documentation"}
          </Link>
        </div>
      </PageHeader>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Key capabilities
              </h2>
              <ul className="mt-6 space-y-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Benefits
              </h2>
              <ul className="mt-6 space-y-4">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border/40 bg-muted/20 py-16 md:py-24">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
            Common use cases
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {product.useCases.map((useCase) => (
              <Card key={useCase} className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">{useCase}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
              Related products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related: Product) => (
                <Card key={related.slug} className="group h-full">
                  <CardHeader>
                    <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      {getProductIcon(related.icon, "size-4")}
                    </div>
                    <CardTitle>{related.name}</CardTitle>
                    <CardDescription>{related.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={related.href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "group/link px-0",
                      )}
                    >
                      Learn more
                      <ChevronRight className="ml-1 size-4 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </CardContent>
                </Card>
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
