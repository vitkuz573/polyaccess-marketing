"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProductCardData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: ReactNode;
  href: string;
  external?: boolean;
  status?: string;
}

interface ProductCardProps {
  product: ProductCardData;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex h-full flex-col">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {product.icon}
        </div>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/30">
        <Link
          href={product.href}
          target={product.external ? "_blank" : undefined}
          rel={product.external ? "noopener noreferrer" : undefined}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "group/link px-0",
          )}
        >
          Learn more
          <ArrowRight className="ml-1 size-4 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
        {product.status ? (
          <span className="text-xs text-muted-foreground">{product.status}</span>
        ) : null}
      </CardFooter>
    </Card>
  );
}

interface ProductGridProps {
  title: string;
  description?: string;
  products: ProductCardData[];
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function ProductGrid({ title, description, products }: ProductGridProps) {
  return (
    <section aria-labelledby="products-heading" className="py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-12 max-w-2xl"
        >
          <h2
            id="products-heading"
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
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {products.map((product) => (
            <motion.div key={product.slug} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
