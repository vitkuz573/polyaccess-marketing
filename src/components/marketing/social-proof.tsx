"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}

export interface Logo {
  name: string;
  initials: string;
}

interface SocialProofProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
  logos?: Logo[];
}

export function SocialProof({
  title,
  description,
  testimonials,
  logos,
}: SocialProofProps) {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="border-y border-border/40 bg-muted/20 py-20 md:py-24"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-12 max-w-2xl"
        >
          <h2
            id="social-proof-heading"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </motion.div>

        {logos && logos.length > 0 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                className="flex h-12 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-muted-foreground"
              >
                {logo.initials}
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => {
            const directions = [
              { opacity: 0, x: -30, y: 20 },
              { opacity: 0, y: 40 },
              { opacity: 0, x: 30, y: 20 },
            ];
            return (
              <motion.div
                key={testimonial.author}
                initial={directions[i % 3]}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardHeader>
        {testimonial.rating && testimonial.rating > 0 && (
          <div className="mb-2 flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4",
                  i < testimonial.rating! ? "fill-current" : "text-muted-foreground",
                )}
                aria-hidden
              />
            ))}
          </div>
        )}
        <CardDescription className="text-base text-foreground">
          &ldquo;{testimonial.quote}&rdquo;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">{testimonial.author}</div>
        <div className="text-sm text-muted-foreground">
          {testimonial.role}, {testimonial.company}
        </div>
      </CardContent>
    </Card>
  );
}
