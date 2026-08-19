import { Star } from "lucide-react";
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
        <div className="mb-12 max-w-2xl">
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
        </div>

        {logos && logos.length > 0 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-12 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-muted-foreground"
              >
                {logo.initials}
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
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
          “{testimonial.quote}”
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


