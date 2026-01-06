import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getInvestmentBySlug, getInvestments } from "@/lib/content";
import { InvestRequestForm } from "@/components/forms/invest-request-form";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getInvestments().map((opportunity) => ({ slug: opportunity.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const opportunity = getInvestmentBySlug(params.slug);
  if (!opportunity) return {};
  return {
    title: `${opportunity.name} — ACE Invest`,
    description: opportunity.investmentThesis,
    openGraph: {
      title: `${opportunity.name} — ACE Invest`,
      description: opportunity.investmentThesis,
      images: opportunity.images?.map((url) => ({ url }))
    }
  };
}

export default function InvestmentPage({ params }: PageProps) {
  const opportunity = getInvestmentBySlug(params.slug);
  if (!opportunity) return notFound();

  return (
    <>
      <section className="section">
        <div className="container-wide space-y-8">
          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.08em] text-graphite">
                <span className="pill bg-white px-3 py-1 text-xs">{opportunity.assetType}</span>
                <span>{opportunity.location}</span>
                <span className="pill bg-white px-3 py-1 text-xs">
                  {opportunity.status === "available" ? "Available" : "Coming soon"}
                </span>
              </div>
              <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">{opportunity.name}</h1>
              <p className="text-lg text-graphite">{opportunity.investmentThesis}</p>
            </div>
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-charcoal">Operational option</p>
              <p className="text-sm text-graphite">
                {opportunity.managedByAceAvailable
                  ? "Managed by ACE available with reporting, pricing intelligence, and on-the-ground teams."
                  : "Self-managed or third-party management preferred."}
              </p>
              <div className="flex gap-3">
                <Button size="md" href="#dossier">
                  Request dossier
                </Button>
                <Button variant="secondary" size="md" href="/contact">
                  Talk to ACE
                </Button>
              </div>
            </div>
          </div>
          <div className="relative aspect-[5/2] overflow-hidden rounded-3xl">
            <Image
              src={opportunity.images[0]}
              alt={opportunity.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60">
        <div className="container-wide grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal">Investment thesis</p>
            <p className="text-sm text-graphite">{opportunity.investmentThesis}</p>
            <div className="space-y-2 text-sm text-graphite">
              <p className="font-semibold text-charcoal">Use cases</p>
              {opportunity.useCases.map((item) => (
                <div key={item} className="pill bg-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal">Metrics</p>
            <div className="space-y-2 text-sm text-graphite">
              <Metric label="Revenue history" value={opportunity.metrics?.revenueHistory} />
              <Metric label="Conservative projection" value={opportunity.metrics?.conservativeProjection} />
              <Metric label="Cost range" value={opportunity.metrics?.costRange} />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal">ACE overlay</p>
            <ul className="space-y-2 text-sm text-graphite">
              <li>• Design and FF&E curation where needed</li>
              <li>• Pricing intelligence with real-time adjustments</li>
              <li>• On-the-ground hospitality and maintenance</li>
              <li>• Investor-grade reporting and transparency</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="dossier">
        <div className="container-wide grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div className="space-y-4">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Request dossier</p>
            <h2 className="text-2xl font-semibold text-charcoal">Secure the full brief</h2>
            <p className="text-sm text-graphite">
              Share your intent and we will send the dossier with visuals, diligence, and operational plans.
            </p>
            <InvestRequestForm opportunityName={opportunity.name} />
          </div>
          <div className="space-y-4">
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-charcoal">Operational note</p>
              <p className="text-sm text-graphite">
                ACE can onboard, design, and operate the asset. We prioritise longevity of materials, low-friction
                tech, and calm guest experiences.
              </p>
            </div>
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-charcoal">Documentation</p>
              <p className="text-sm text-graphite">
                Visuals, floorplans, and commercial history available under NDA where relevant. We avoid aggressive
                forecasts—expect conservative scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.08em] text-graphite/80">{label}</p>
      <p className="text-sm font-semibold text-charcoal">
        {value ?? "Available on request"}
      </p>
    </div>
  );
}
