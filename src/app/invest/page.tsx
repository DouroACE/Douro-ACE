import type { Metadata } from "next";
import { getInvestments } from "@/lib/content";
import { InvestCard } from "@/components/sections/invest-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ACE Invest — Curated, proven assets",
  description:
    "ACE Invest sources and operates curated properties with transparent performance, conservative projections, and managed-by-ACE options."
};

const offers = [
  {
    title: "Curated, proven assets",
    description: "Assets we operate or would own ourselves. Documentation, visuals, and diligence included."
  },
  {
    title: "Proof of quality",
    description: "Real photos, materials, and operational history where available. Transparent assumptions when not."
  },
  {
    title: "Operational overlays",
    description: "ACE setup, design, tech, and team to run the asset calmly—optional but recommended."
  },
  {
    title: "Aligned management",
    description: "Buy + Managed by ACE options with reporting, reviews, and continuous optimisation."
  }
];

const howItWorks = [
  "Define intent and thesis fit.",
  "Review dossier: visuals, documentation, metrics.",
  "ACE operations plan with capex and timeline.",
  "Acquire and activate with managed-by-ACE."
];

export default function InvestPage() {
  const opportunities = getInvestments();

  return (
    <>
      <section className="section">
        <div className="container-wide grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-4">
            <div className="pill bg-white text-xs uppercase tracking-[0.08em]">ACE Invest</div>
            <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">
              Serious assets, calm execution, transparent proof.
            </h1>
            <p className="text-lg text-graphite">
              Not a traditional agency. ACE curates assets with evidence, conservative scenarios, and an option to
              be operated by the same team behind our flagship stays.
            </p>
            <div className="flex gap-3">
              <Button size="lg" href="#opportunities">
                View opportunities
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                Request investment brief
              </Button>
            </div>
          </div>
          <div className="card space-y-3">
            <p className="text-sm font-semibold text-charcoal">What we offer</p>
            <ul className="space-y-2 text-sm text-graphite">
              {offers.map((offer) => (
                <li key={offer.title}>
                  <p className="font-semibold text-charcoal">{offer.title}</p>
                  <p className="text-graphite">{offer.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60" id="opportunities">
        <div className="container-wide space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Featured opportunities</p>
              <h2 className="text-2xl font-semibold text-charcoal">Curated assets with ACE overlays</h2>
            </div>
            <span className="text-sm text-graphite">{opportunities.length} dossiers</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {opportunities.map((opportunity) => (
              <InvestCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-3">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">How it works</p>
            <h3 className="text-2xl font-semibold text-charcoal">From thesis to operations</h3>
            <ul className="space-y-2 text-sm text-graphite">
              {howItWorks.map((item, idx) => (
                <li key={item}>
                  <span className="font-semibold text-charcoal">0{idx + 1}.</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card space-y-4">
            <h4 className="text-lg font-semibold text-charcoal">Request an ACE dossier</h4>
            <p className="text-sm text-graphite">
              Share your investment lens and we will send the right opportunities, metrics, and operational plan.
            </p>
            <Button size="md" href="/contact">
              Request dossier
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
