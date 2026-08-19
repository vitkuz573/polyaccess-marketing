import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface HeroProps {
  badge?: ReactNode;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  align?: "center" | "left";
  className?: string;
}

export function Hero({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  align = "center",
  className,
}: HeroProps) {
  const isCenter = align === "center";
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background to-muted/40 py-24 md:py-32",
        className,
      )}
    >
      <div
        className={cn(
          "container mx-auto flex max-w-6xl flex-col px-4",
          isCenter ? "items-center text-center" : "items-start text-left",
        )}
      >
        {badge ? (
          <div className="mb-6 inline-flex items-center">{badge}</div>
        ) : null}
        <h1
          className={cn(
            "text-balance text-4xl font-semibold tracking-tight md:text-6xl",
            isCenter ? "max-w-4xl" : "max-w-3xl",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-6 text-pretty text-lg text-muted-foreground md:text-xl",
            isCenter ? "max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                target={primaryCta.external ? "_blank" : undefined}
                rel={primaryCta.external ? "noopener noreferrer" : undefined}
                className={buttonVariants({ size: "lg" })}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                target={secondaryCta.external ? "_blank" : undefined}
                rel={secondaryCta.external ? "noopener noreferrer" : undefined}
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
