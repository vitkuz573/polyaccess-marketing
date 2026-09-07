"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
        <div
          className={cn(
            "flex flex-col",
            isCenter ? "items-center text-center" : "items-start text-left",
          )}
        >
          {badge ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mb-6 inline-flex items-center"
            >
              {badge}
            </motion.div>
          ) : null}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
            className={cn(
              "text-balance text-4xl font-semibold tracking-tight md:text-6xl",
              isCenter ? "max-w-4xl" : "max-w-3xl",
            )}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
            className={cn(
              "mt-6 text-pretty text-lg text-muted-foreground md:text-xl",
              isCenter ? "max-w-2xl" : "max-w-2xl",
            )}
          >
            {description}
          </motion.p>
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="mt-10 flex flex-wrap items-center gap-3"
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
        </div>
      </div>
    </section>
  );
}
