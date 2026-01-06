import Link from "next/link";

const footerLinks = [
  { href: "/stays", label: "Stays" },
  { href: "/invest", label: "Invest" },
  { href: "/ai", label: "ACE AI" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

const locations = ["Douro", "Porto", "Algarve", "Norte"];

export function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/70">
      <div className="container-wide grid gap-12 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-charcoal">ACE</p>
          <p className="text-sm text-graphite">
            Curated stays, intelligent hospitality, and investment-grade assets across Portugal.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-charcoal">Navigate</p>
          <ul className="mt-3 space-y-2 text-sm text-graphite">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-charcoal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-charcoal">Locations</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {locations.map((loc) => (
              <span key={loc} className="pill">
                {loc}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm text-graphite">
          <p className="text-sm font-semibold text-charcoal">Get in touch</p>
          <Link href="mailto:hello@ace.pt" className="block hover:text-charcoal">
            hello@ace.pt
          </Link>
          <Link href="/contact" className="block hover:text-charcoal">
            Concierge & contact
          </Link>
        </div>
      </div>
      <div className="border-t border-white/60 py-4">
        <div className="container-wide flex flex-wrap items-center justify-between gap-2 text-xs text-graphite">
          <span>© {new Date().getFullYear()} ACE. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-charcoal">
              Privacy & Cookies
            </Link>
            <Link href="https://www.instagram.com" className="hover:text-charcoal">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
