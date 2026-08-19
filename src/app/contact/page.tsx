import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/marketing/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to the PolyAccess team about sales, partnerships, or technical support. We respond within one business day.",
  path: "/contact",
});

const CONTACT_INFO = [
  {
    icon: <Mail className="size-4" aria-hidden />,
    title: "Sales",
    description: "Talk to our sales team about plans, pricing, and trials.",
    value: "sales@polyaccess.tech",
    href: "mailto:sales@polyaccess.tech",
  },
  {
    icon: <MessageCircle className="size-4" aria-hidden />,
    title: "Support",
    description: "Get help from our engineering team.",
    value: "support@polyaccess.tech",
    href: "mailto:support@polyaccess.tech",
  },
  {
    icon: <Phone className="size-4" aria-hidden />,
    title: "Partnerships",
    description: "Explore integrations and co-marketing opportunities.",
    value: "partners@polyaccess.tech",
    href: "mailto:partners@polyaccess.tech",
  },
  {
    icon: <MapPin className="size-4" aria-hidden />,
    title: "Office",
    description: "PolyAccess Inc., 100 Market Street, San Francisco, CA",
    value: null,
    href: null,
  },
];

async function submitContact(values: {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}): Promise<void> {
  "use server";
  // In production this would forward to CONTACT_FORM_ENDPOINT.
  // For now we treat the submission as accepted and return.
  if (process.env.CONTACT_FORM_ENDPOINT) {
    // No real network call here in the marketing site;
    // a real implementation would forward and re-throw on error.
    return;
  }
  void values;
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Sales, support, partnerships, or general questions — we respond within one business day."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Send us a message
              </h2>
              <p className="mt-2 text-pretty text-muted-foreground">
                Fill out the form below and we will be in touch shortly.
              </p>
              <div className="mt-8">
                <ContactForm onSubmit={submitContact} />
              </div>
            </div>

            <aside className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight">
                Contact information
              </h2>
              {CONTACT_INFO.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  {item.value && (
                    <CardContent>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium underline underline-offset-4"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium">{item.value}</span>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
