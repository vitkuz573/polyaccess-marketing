"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  title: string;
  description?: string;
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
  children?: ReactNode;
  variant?: "default" | "muted";
}

export function CtaSection({
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
  variant = "default",
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-24",
        variant === "muted" ? "bg-muted/20" : "bg-background",
      )}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              {description}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
