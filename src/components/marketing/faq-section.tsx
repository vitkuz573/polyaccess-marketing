"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  description?: string;
  items: FaqItem[];
}

export function FaqSection({
  title = "Frequently asked questions",
  description,
  items,
}: FaqSectionProps) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-border/40 bg-background py-20 md:py-24"
    >
      <Container>
        <div className="mb-10 text-center">
          <h2
            id="faq-heading"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-pretty text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <Accordion>
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
