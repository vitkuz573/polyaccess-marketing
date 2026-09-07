import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PricingTable } from "@/components/marketing/pricing-table";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getPricing } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for every stage of growth. Start with a 14-day free trial and scale as your access infrastructure needs grow.",
  path: "/pricing",
});

export default function PricingPage() {
  const { plans, comparison, faq } = getPricing();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Pricing
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Transparent pricing for every stage
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              Start small, scale confidently. Every plan includes a 14-day free trial with no credit card required.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing cards */}
      <section className="border-b border-border/40 bg-background py-16 md:py-24">
        <Container>
          <PricingTable plans={plans} comparison={comparison} />
        </Container>
      </section>

      {/* FAQ */}
      <FaqSection
        title="Pricing FAQ"
        description="Have questions about billing, trials, or enterprise terms? We have answers."
        items={faq}
      />

      {/* CTA */}
      <CtaSection
        title="Still deciding?"
        description="Talk to our sales team about a custom plan, SLA, or deployment option."
        primaryCta={{ label: "Contact sales", href: "/contact" }}
        secondaryCta={{ label: "Compare products", href: "/products" }}
      />
    </>
  );
}
