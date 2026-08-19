import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
}

export function Section({
  children,
  className,
  id,
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("py-16 md:py-20", className)}
    >
      {children}
    </section>
  );
}
