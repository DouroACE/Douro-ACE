import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ACE — Quiet luxury, intelligent operations",
  description:
    "ACE is a premium hospitality brand in Portugal. We own, curate, and operate stays with intelligent concierge and aligned investment overlays."
};

const pillars = [
  {
    title: "Curated ownership",
    description: "We acquire, design, and operate assets we believe in—never a generic catalogue."
  },
  {
    title: "Operational intelligence",
    description: "Calm, data-informed hospitality with transparent reporting and continuous refinement."
  },
  {
    title: "Quiet luxury",
    description: "Minimalist design, considered materials, and service that anticipates rather than shouts."
  }
];

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container-wide space-y-10">
        <div className="space-y-4">
          <div className="pill bg-white text-xs uppercase tracking-[0.08em]">About ACE</div>
          <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">
            Luxury stays, proven assets, intelligent concierge.
          </h1>
          <p className="text-lg text-graphite">
            ACE started by designing and running our own properties—learning what truly matters to guests and
            investors. Today we operate across Douro, Porto, Algarve, and the North with a standard of quiet luxury
            and technology that stays in the background.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="card space-y-2">
              <p className="text-sm font-semibold text-charcoal">{pillar.title}</p>
              <p className="text-sm text-graphite">{pillar.description}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card space-y-3">
            <p className="text-sm font-semibold text-charcoal">Philosophy</p>
            <p className="text-sm text-graphite">
              Curate few, operate deeply. We prioritise materials that age well, lighting that feels natural, and
              technology that is invisible. Every stay should feel calm, considered, and precise.
            </p>
          </div>
          <div className="card space-y-3">
            <p className="text-sm font-semibold text-charcoal">Focus</p>
            <p className="text-sm text-graphite">
              Our portfolio spans flagship villas, family residences, and high-performing micro-lofts. All can be
              paired with ACE AI concierge and vetted partners for experiences that belong to the region.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
