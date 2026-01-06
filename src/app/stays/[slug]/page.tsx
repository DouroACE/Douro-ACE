import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProperties, getPropertyBySlug } from "@/lib/content";
import { StayRequestForm } from "@/components/forms/stay-request-form";
import { FAQ } from "@/components/sections/faq";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getProperties().map((property) => ({ slug: property.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const property = getPropertyBySlug(params.slug);
  if (!property) return {};
  return {
    title: `${property.name} — ACE Stays`,
    description: property.descriptionShort,
    openGraph: {
      title: `${property.name} — ACE Stays`,
      description: property.descriptionShort,
      images: property.images?.map((url) => ({ url }))
    }
  };
}

export default function PropertyPage({ params }: PageProps) {
  const property = getPropertyBySlug(params.slug);
  if (!property) return notFound();

  const faqItems = [
    {
      question: "Is concierge available?",
      answer: "Yes. ACE concierge and ACE AI are available for direct bookings with curated add-ons."
    },
    {
      question: "Do you allow events?",
      answer:
        "Small gatherings are possible on request. Share your use case and we will confirm suitability."
    },
    {
      question: "How do we book?",
      answer:
        "Use the availability form for direct bookings or request platform links. We respond within 24–48h."
    }
  ];

  return (
    <>
      <section className="section">
        <div className="container-wide space-y-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.08em] text-graphite">
                <span className="pill bg-white px-3 py-1 text-xs">{property.region}</span>
                <span>{property.city}, {property.country}</span>
              </div>
              <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">{property.name}</h1>
              <p className="text-lg text-graphite">{property.descriptionShort}</p>
              <div className="flex flex-wrap gap-2">
                {property.highlights.map((item) => (
                  <span key={item} className="pill bg-white">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 text-sm text-graphite">
                <span>Sleeps {property.capacity}</span>
                <span>{property.bedrooms} bedrooms</span>
                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>
            <div className="card space-y-4">
              <h3 className="text-lg font-semibold text-charcoal">Signature highlights</h3>
              <ul className="space-y-2 text-sm text-graphite">
                {property.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Button size="md" href="#availability">
                  Check availability
                </Button>
                {property.bookingLinks?.airbnb && (
                  <Button variant="secondary" size="md" href={property.bookingLinks.airbnb}>
                    Airbnb
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-2">
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="grid gap-4">
              {property.images.slice(1, 3).map((img) => (
                <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image src={img} alt={property.name} fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/60 bg-white/60">
        <div className="container-wide grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal">The Space</p>
            <p className="text-sm text-graphite">{property.descriptionLong}</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal">Experience</p>
            <p className="text-sm text-graphite">
              Layered lighting, tactile materials, and calm technology. ACE concierge and ACE AI support pre-arrival,
              during stay, and departure with timely touchpoints.
            </p>
            <div className="flex flex-wrap gap-2">
              {(property.addOnsAvailable ?? []).map((addon) => (
                <span key={addon} className="pill bg-white">
                  {addon}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-charcoal">Amenities</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-graphite">
              {property.amenities.map((item) => (
                <span key={item} className="rounded-lg bg-white/80 px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="availability">
        <div className="container-wide grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div className="space-y-4">
            <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Availability</p>
            <h2 className="text-2xl font-semibold text-charcoal">Plan your stay</h2>
            <p className="text-sm text-graphite">
              Share your dates, group, and any requests. We confirm availability, add-ons, and a direct ACE proposal.
            </p>
            <StayRequestForm propertyName={property.name} showDirectOffer />
          </div>
          <div className="space-y-6">
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-charcoal">Perfect for</p>
              <p className="text-sm text-graphite">
                Families, founders, creative retreats, and small groups seeking privacy with structured service.
              </p>
            </div>
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-charcoal">Add-ons available</p>
              <ul className="space-y-2 text-sm text-graphite">
                <li>• Late checkout (subject to calendar)</li>
                <li>• Private chef and provisioning</li>
                <li>• Driver / airport transfers</li>
                <li>• ACE-curated experiences</li>
              </ul>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
