import type { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

/**
 * Marketing route group layout.
 *
 * Renders the public site chrome (header, footer) for everything nested under
 * `(marketing)`. The root layout in `src/app/layout.tsx` provides global
 * providers, fonts, and metadata; this layer is responsible for page structure.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span aria-hidden className="size-6 rounded-md bg-primary" />
          <span>PolyAccess</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/products" className="text-muted-foreground transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-5 rounded bg-primary" />
          <span className="font-medium text-foreground">PolyAccess</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/cookie-policy" className="hover:text-foreground">
            Cookie Policy
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
