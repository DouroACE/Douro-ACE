import type { Metadata } from "next";
import { ConciergeForm } from "@/components/forms/concierge-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ACE AI — Intelligent concierge and personalisation",
  description:
    "ACE AI blends human curation with context-aware technology: itineraries, add-ons, local intelligence, and timely touchpoints for your stay."
};

const features = [
  "Personalised itineraries crafted with local curators",
  "Add-ons: chef, chauffeur, late checkout, wellness",
  "Local intelligence: restaurants, beaches, wine, art",
  "Smart timing: messages before, during, after the stay"
];

export default function AiPage() {
  return (
    <>
      <section className="section">
        <div className="container-wide grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-4">
            <div className="pill bg-white text-xs uppercase tracking-[0.08em]">ACE AI</div>
            <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">
              Concierge intelligence without the noise.
            </h1>
            <p className="text-lg text-graphite">
              ACE AI pairs human curators with quiet technology. Timely recommendations, add-ons, and itineraries
              delivered calmly before and during your stay.
            </p>
            <div className="flex gap-3">
              <Button size="lg" href="#concierge">
                Request concierge
              </Button>
              <Button variant="secondary" size="lg" href="/stays">
                Available for selected stays
              </Button>
            </div>
          </div>
          <div className="card space-y-3">
            <p className="text-sm font-semibold text-charcoal">How it enhances your stay</p>
            <ul className="space-y-2 text-sm text-graphite">
              {features.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60">
        <div className="container-wide grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Add-ons</p>
            <h2 className="text-2xl font-semibold text-charcoal">Curated, not crowded</h2>
            <p className="text-sm text-graphite">
              We only recommend what fits your stay: chef dinners, wine programs, river cruises, mobility, wellness,
              and calm city guides. No noisy upsells.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm text-graphite">
              {["Chef at home", "Sommelier tastings", "River or ocean boats", "Chauffeur and transfers", "Wellness sessions", "Late checkout"].map((item) => (
                <div key={item} className="rounded-xl bg-white/80 px-3 py-2">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card space-y-4" id="concierge">
            <h3 className="text-lg font-semibold text-charcoal">Request ACE concierge</h3>
            <p className="text-sm text-graphite">
              Available for selected ACE Stays. Tell us about your trip and we will curate a calm itinerary.
            </p>
            <ConciergeForm />
          </div>
        </div>
      </section>
    </>
  );
}
