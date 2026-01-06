import Link from "next/link";
import { Button } from "../ui/button";

const navItems = [
  { href: "/stays", label: "Stays" },
  { href: "/invest", label: "Invest" },
  { href: "/ai", label: "Experience" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-linen/80 backdrop-blur">
      <div className="container-wide flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-charcoal">
          ACE
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-graphite md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-charcoal">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden text-sm text-graphite hover:text-charcoal sm:inline">
            Contact
          </Link>
          <Button variant="primary" size="sm" href="/stays">
            Book a stay
          </Button>
        </div>
      </div>
    </header>
  );
}
