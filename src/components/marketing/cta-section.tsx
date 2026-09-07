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
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {title}
          </motion.h2>
          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground"
            >
              {description}
            </motion.p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
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
            </motion.div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
