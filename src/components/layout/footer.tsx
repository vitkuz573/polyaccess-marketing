import Link from "next/link";
import { Code2, Globe, Briefcase } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Contact", href: "/contact" },
  { label: "Status", href: "https://status.polyaccess.tech" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/polyaccess", icon: Code2 },
  { label: "Twitter", href: "https://twitter.com/polyaccess", icon: Globe },
  { label: "LinkedIn", href: "https://linkedin.com/company/polyaccess", icon: Briefcase },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <Container>
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-semibold tracking-tight"
            >
              <span aria-hidden className="size-5 rounded bg-primary" />
              <span>PolyAccess</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Secure access infrastructure for multi-product teams.
              Attestation, API keys, customer portals, and status pages
              — from a single platform.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Legal
            </span>
            <nav aria-label="Footer" className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Follow us
            </span>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>&copy; {year} PolyAccess. All rights reserved.</span>
          <span>
            Built with{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Next.js
            </Link>{" "}
            and{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              shadcn/ui
            </Link>
            .
          </span>
        </div>
      </Container>
    </footer>
  );
}
