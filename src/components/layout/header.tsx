import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span aria-hidden className="size-6 rounded-md bg-primary" />
          <span>PolyAccess</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "hidden md:inline-flex",
            })}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className={buttonVariants({
              size: "sm",
              className: "hidden md:inline-flex",
            })}
          >
            Get started
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
