import type { Metadata } from "next";
import { getExperiences } from "@/lib/content";
import { ExperienceGrid } from "@/components/sections/experience-grid";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ACE Experiences — Curated moments by region",
  description:
    "Discover ACE-curated experiences across Algarve, Douro, Porto, and the North. Calm, premium, and tailored to your stay."
};

export default function ExperiencesPage() {
  const experiences = getExperiences();

  return (
    <>
      <section className="section">
        <div className="container-wide space-y-6">
          <div className="pill bg-white text-xs uppercase tracking-[0.08em]">Experiences</div>
          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">
                Curated experiences by region
              </h1>
              <p className="text-lg text-graphite">
                From Douro river cruises to Algarve sea caves and Porto tasting walks—each is vetted, calm, and
                aligned with ACE hospitality.
              </p>
              <Button size="lg" href="/contact">
                Request bookings
              </Button>
            </div>
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-charcoal">How it works</p>
              <ul className="space-y-2 text-sm text-graphite">
                <li>• Tell us your region, dates, and preferences.</li>
                <li>• We coordinate with vetted partners.</li>
                <li>• Payment handled offline; no noisy upsells.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60">
        <div className="container-wide space-y-8">
          <h2 className="text-2xl font-semibold text-charcoal">Catalogue</h2>
          <ExperienceGrid experiences={experiences} />
        </div>
      </section>
    </>
  );
}
