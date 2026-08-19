import type { Metadata } from "next";
import { Shield, Target, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
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
      <PageHeader
        eyebrow="About"
        title="We build the access layer modern teams need"
        description="PolyAccess was founded to solve a problem we faced ourselves: every product needs secure access, but stitching together identity, keys, challenges, and status pages slows teams down."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Our story
              </h2>
              <div className="mt-6 space-y-4 text-pretty text-muted-foreground">
                <p>
                  PolyAccess started when two infrastructure engineers kept
                  rebuilding the same access primitives for different products:
                  challenge-protected signups, scoped API keys, customer
                  dashboards, and public status pages.
                </p>
                <p>
                  We realized that every product team was solving the same
                  problems in slightly different ways, and that the seams
                  between those solutions were where security incidents happened.
                </p>
                <p>
                  So we built PolyAccess: a unified platform where identity,
                  access, and observability share a single control plane. Today,
                  teams of every size use PolyAccess to ship secure products
                  faster.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Mission & values
              </h2>
              <div className="mt-6 grid gap-4">
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
            </div>
          </div>
        </Container>
      </section>

      <TeamGrid
        title="Meet the team"
        description="A small team with deep experience in security, distributed systems, and developer tooling."
        members={team}
      />

      <CtaSection
        title="Join us"
        description="We are always looking for people who care about security, developer experience, and building things that last."
        primaryCta={{ label: "View open roles", href: "/contact" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
