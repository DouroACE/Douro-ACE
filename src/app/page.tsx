import Link from "next/link";
import { getFeaturedProperties } from "@/lib/content";
import { PropertyCard } from "@/components/sections/property-card";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    title: "ACE Stays",
    description: "Our own portfolio of refined properties with data-backed operations and discreet service.",
    href: "/stays"
  },
  {
    title: "ACE Invest",
    description: "Curated, proven assets with transparent performance, operational overlays, and aligned management.",
    href: "/invest"
  },
  {
    title: "ACE AI",
    description: "Concierge and personalisation that blends human curation with calm, context-aware technology.",
    href: "/ai"
  }
];

const reasons = [
  "Curated inventory we stand behind",
  "Evidence over promises: transparent performance",
  "End-to-end execution and management",
  "Quiet luxury design with intelligent service"
];

const process = [
  { title: "Listen & design", description: "Understand intent: stay, invest, or both. Define the right fit." },
  { title: "Curate & prove", description: "Share data, visuals, and diligence. Clarity before commitment." },
  { title: "Execute & host", description: "ACE teams run the stay, the asset, and the experience calmly." },
  { title: "Refine & report", description: "Measured feedback, transparent reporting, and iterative upgrades." }
];

export default function HomePage() {
  const featured = getFeaturedProperties();

  return (
    <>
      <section className="section">
        <div className="container-wide grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div className="space-y-6">
            <div className="pill bg-white text-xs uppercase tracking-[0.08em]">ACE Portugal</div>
            <h1 className="text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
              Curated stays. Smart investments. Personalised experiences.
            </h1>
            <p className="text-lg text-graphite">
              Quiet luxury engineered with precision. ACE designs, operates, and owns properties across
              Portugal with intelligent concierge layered in.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" href="/stays">
                Explore stays
              </Button>
              <Button variant="secondary" size="lg" href="/invest">
                Discover ACE Invest
              </Button>
            </div>
          </div>
          <div className="card space-y-4">
            <p className="text-sm font-semibold text-charcoal">ACE at a glance</p>
            <div className="grid gap-3 text-sm text-graphite">
              <div className="flex items-center justify-between">
                <span>Locations</span>
                <span className="font-semibold text-charcoal">Douro · Porto · Algarve · Norte</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Portfolio</span>
                <span className="font-semibold text-charcoal">Flagship villa + residences</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Concierge</span>
                <span className="font-semibold text-charcoal">ACE AI with human curation</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Booking</span>
                <span className="font-semibold text-charcoal">Direct or via leading platforms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60">
        <div className="container-wide grid gap-6 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              href={pillar.href}
              key={pillar.title}
              className="card group flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.08em] text-graphite/80">Pillar</p>
                <h3 className="text-xl font-semibold text-charcoal">{pillar.title}</h3>
                <p className="text-sm text-graphite">{pillar.description}</p>
              </div>
              <span className="text-sm font-medium text-charcoal group-hover:underline">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Why ACE</p>
            <h2 className="text-2xl font-semibold text-charcoal">Luxury that feels effortless</h2>
            <p className="text-md text-graphite">
              We focus on curated assets, operational excellence, and intelligent, quiet service. Every
              detail is designed to feel intentional and calm.
            </p>
          </div>
          <div className="grid gap-3">
            {reasons.map((reason) => (
              <div key={reason} className="card flex items-center justify-between">
                <p className="text-sm text-charcoal">{reason}</p>
                <span className="text-lg text-graphite">—</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60">
        <div className="container-wide space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Featured stays</p>
              <h2 className="text-2xl font-semibold text-charcoal">Homes with proof of hospitality</h2>
            </div>
            <Link href="/stays" className="text-sm font-medium text-charcoal hover:underline">
              View all stays
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide space-y-8">
          <div className="space-y-2">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Trusted process</p>
            <h2 className="text-2xl font-semibold text-charcoal">
              One team for stays, investments, and experiences
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {process.map((step, idx) => (
              <div key={step.title} className="card space-y-3">
                <p className="text-xs uppercase tracking-[0.08em] text-graphite/80">Step {idx + 1}</p>
                <p className="text-lg font-semibold text-charcoal">{step.title}</p>
                <p className="text-sm text-graphite">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/70 bg-gradient-to-br from-white to-linen">
        <div className="container-wide grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-4">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Start a conversation</p>
            <h2 className="text-2xl font-semibold text-charcoal">
              Ready for a stay, an asset, or a concierge experience?
            </h2>
            <p className="text-md text-graphite">
              Tell us what you are looking for. We respond within 24–48 hours with a clear path forward.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" href="/contact">
                Contact ACE
              </Button>
              <Button variant="secondary" size="lg" href="/invest">
                Request investment brief
              </Button>
            </div>
          </div>
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold text-charcoal">ACE network</h3>
            <ul className="space-y-2 text-sm text-graphite">
              <li>• Owners and founders booking directly with ACE</li>
              <li>• Investors receiving transparent dossiers</li>
              <li>• Guests guided by ACE AI + human concierge</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
