import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: PageHeaderProps) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "border-b border-border/40 bg-gradient-to-b from-background to-muted/30 py-16 md:py-24",
        className,
      )}
    >
      <Container>
        <div
          className={cn(
            "flex flex-col gap-3",
            isCenter ? "items-center text-center" : "items-start text-left",
          )}
        >
          {eyebrow ? (
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              {eyebrow}
            </span>
          ) : null}
          <h1
            className={cn(
              "text-balance text-4xl font-semibold tracking-tight md:text-5xl",
              isCenter ? "max-w-3xl" : "max-w-3xl",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "max-w-2xl text-pretty text-lg text-muted-foreground",
              )}
            >
              {description}
            </p>
          ) : null}
          {children ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
