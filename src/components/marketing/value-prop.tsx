"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export interface ValuePropItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ValuePropProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ValuePropItem[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function ValueProp({ eyebrow, title, description, items }: ValuePropProps) {
  return (
    <section
      aria-labelledby={title.toLowerCase().replace(/\s+/g, "-")}
      className="border-b border-border/40 bg-background py-20 md:py-24"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-12 max-w-2xl"
        >
          {eyebrow ? (
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {eyebrow}
            </span>
          ) : null}
          <h2
            id={title.toLowerCase().replace(/\s+/g, "-")}
            className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
