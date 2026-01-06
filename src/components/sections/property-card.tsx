import type { Property } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { clsx } from "clsx";

type Props = {
  property: Property;
  variant?: "grid" | "featured";
};

export function PropertyCard({ property, variant = "grid" }: Props) {
  return (
    <div
      className={clsx(
        "group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-subtle",
        variant === "featured" ? "grid gap-6 md:grid-cols-2" : "flex flex-col"
      )}
    >
      <div className="relative h-64 w-full overflow-hidden md:h-full">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          priority={variant === "featured"}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-graphite">
          <span className="pill px-3 py-1 text-xs">{property.region}</span>
          <span>{property.type}</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-charcoal">{property.name}</h3>
          <p className="text-sm text-graphite">{property.descriptionShort}</p>
          <div className="flex flex-wrap gap-2">
            {property.highlights.slice(0, 4).map((item) => (
              <span key={item} className="pill bg-white">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-graphite">
            Sleeps {property.capacity} • {property.bedrooms} bed • {property.bathrooms} bath
          </div>
          <Button variant="secondary" size="sm" href={`/stays/${property.slug}`}>
            View details
          </Button>
        </div>
      </div>
    </div>
  );
}
