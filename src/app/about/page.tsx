import type { Metadata } from "next";
import { Shield, Target, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { TeamGrid } from "@/components/marketing/team-grid";
import { CtaSection } from "@/components/marketing/cta-section";
import { getTeam } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Learn about PolyAccess: our mission to simplify secure access infrastructure for multi-product teams, and the people building it.",
  path: "/about",
});

const VALUES = [
  {
    icon: <Shield className="size-5" aria-hidden />,
    title: "Security by design",
    description:
      "We treat every access decision as a security event. Least privilege, strong cryptography, and auditability are non-negotiable.",
  },
  {
    icon: <Target className="size-5" aria-hidden />,
    title: "Developer-first",
    description:
      "Great security is invisible to developers. We ship SDKs, clear APIs, and documentation that lets teams move fast without breaking things.",
  },
  {
    icon: <Users className="size-5" aria-hidden />,
    title: "Customer obsessed",
    description:
      "We build with our customers, not for them. Their uptime, their users, and their trust are the measures that matter.",
  },
];

export default function AboutPage() {
  const team = getTeam();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              About
            </span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              We build the access layer modern teams need
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground">
              PolyAccess is a personal project that grew into a coherent access platform — built out of curiosity, maintained because it works.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="border-b border-border/40 bg-background py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Our story
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                From repeated pain to a unified platform
              </h2>
            </div>
            <div className="space-y-4 text-pretty text-muted-foreground">
              <p>
                PolyAccess started as a personal project — a way to explore
                how access primitives like attestation, API keys, and status
                pages could work together under one roof.
              </p>
              <p>
                What began as an experiment grew into a coherent platform:
                shared authentication, per-customer billing, and a unified
                audit trail across every component.
              </p>
              <p>
                Today PolyAccess is a hosted platform with per-customer billing,
                usage-based pricing, and a unified audit trail across every
                component. Teams connect via API and get production-grade access
                infrastructure without managing any of it themselves.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-b border-border/40 bg-muted/20 py-16 md:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Mission & values
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              What guides us
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <TeamGrid
        title="Meet the team"
        description="A small team with deep experience in security, distributed systems, and developer tooling."
        members={team}
      />

      {/* CTA */}
      <CtaSection
        title="Join us"
        description="We are always looking for people who care about security, developer experience, and building things that last."
        primaryCta={{ label: "View open roles", href: "/contact" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
