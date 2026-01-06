import Link from "next/link";
import type { Metadata } from "next";
import { filterPropertiesByRegion, getProperties } from "@/lib/content";
import { PropertyCard } from "@/components/sections/property-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ACE Stays — Curated properties across Portugal",
  description:
    "Discover ACE Stays: curated villas, residences, and micro-lofts in Douro, Porto, Algarve, and the North with intelligent concierge."
};

const regions = ["All", "Porto", "Douro", "Algarve", "Norte"] as const;

type PageProps = {
  searchParams?: { region?: string };
};

export default function StaysPage({ searchParams }: PageProps) {
  const selectedRegion = searchParams?.region;
  const filtered = filterPropertiesByRegion(selectedRegion && selectedRegion !== "All" ? selectedRegion : undefined);

  return (
    <>
      <section className="section">
        <div className="container-wide space-y-6">
          <div className="pill bg-white text-xs uppercase tracking-[0.08em]">ACE Stays</div>
          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">Stays with proof of hospitality</h1>
              <p className="text-lg text-graphite">
                Owned and operated by ACE. Minimalist design, elevated service, and data-backed operations for
                families, founders, and small groups.
              </p>
              <div className="flex flex-wrap gap-3">
                {regions.map((region) => (
                  <Link
                    key={region}
                    href={region === "All" ? "/stays" : `/stays?region=${region}`}
                    className={`pill ${selectedRegion === region || (!selectedRegion && region === "All") ? "bg-charcoal text-white" : "bg-white"}`}
                  >
                    {region}
                  </Link>
                ))}
              </div>
            </div>
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-charcoal">Reservation options</p>
              <p className="text-sm text-graphite">
                Book direct with ACE for best alignment, or use Airbnb / Booking / VRBO. Concierge and add-ons are
                always available for direct guests.
              </p>
              <Button variant="secondary" size="md" className="w-full" href="/contact">
                Ask us anything
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60">
        <div className="container-wide space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-charcoal">Properties</h2>
            <span className="text-sm text-graphite">{filtered.length} curated stays</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">How we reserve</p>
            <h3 className="text-2xl font-semibold text-charcoal">Simple, direct, and transparent</h3>
            <ul className="space-y-2 text-sm text-graphite">
              <li>• Share your dates, group size, and preferences.</li>
              <li>• We confirm availability, add-ons, and rate options.</li>
              <li>• Choose direct booking or platform links; concierge included for direct.</li>
            </ul>
          </div>
          <div className="card space-y-4">
            <h4 className="text-lg font-semibold text-charcoal">Need a tailored stay?</h4>
            <p className="text-sm text-graphite">
              We connect stays with ACE AI concierge and partners: late checkouts, chef dinners, drivers, and
              curated itineraries.
            </p>
            <Button size="md" href="/contact">
              Request availability
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
