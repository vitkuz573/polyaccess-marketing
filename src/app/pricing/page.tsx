import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
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
      <PageHeader
        eyebrow="Pricing"
        title="Transparent pricing for every stage"
        description="Start small, scale confidently. Every plan includes a 14-day free trial with no credit card required."
      />

      <section className="py-16 md:py-24">
        <Container>
          <PricingTable plans={plans} comparison={comparison} />
        </Container>
      </section>

      <FaqSection
        title="Pricing FAQ"
        description="Have questions about billing, trials, or enterprise terms? We have answers."
        items={faq}
      />

      <CtaSection
        title="Still deciding?"
        description="Talk to our sales team about a custom plan, SLA, or deployment option."
        primaryCta={{ label: "Contact sales", href: "/contact" }}
        secondaryCta={{ label: "Compare products", href: "/products" }}
      />
    </>
  );
}
