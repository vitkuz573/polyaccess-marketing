import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:py-32">
          <Badge variant="secondary" className="mb-6 gap-1.5">
            <Sparkles className="size-3" aria-hidden />
            Secure access infrastructure for multi-product teams
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            PolyAccess — one identity, every product
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Ship challenge-protected endpoints, sign and verify API keys, manage
            customer access, and broadcast status from a single, hardened
            platform.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className={buttonVariants({ size: "lg" })}
            >
              Get Started
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/docs"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="value-props"
        className="container mx-auto max-w-6xl px-4 py-20"
      >
        <div className="mb-12 max-w-2xl">
          <h2
            id="value-props"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Built for production from day one
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three pillars guide every component we ship.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <ValueCard
            icon={<ShieldCheck className="size-5" aria-hidden />}
            title="Security"
            description="Cryptographic challenges, scoped keys, and audit-ready event logs across every product surface."
          />
          <ValueCard
            icon={<Zap className="size-5" aria-hidden />}
            title="Scale"
            description="Stateless services and edge-friendly primitives that absorb traffic spikes without ceremony."
          />
          <ValueCard
            icon={<Sparkles className="size-5" aria-hidden />}
            title="Simplicity"
            description="Drop-in SDKs, predictable APIs, and a portal your customers will actually enjoy using."
          />
        </div>
      </section>
    </>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
