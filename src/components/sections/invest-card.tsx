import type { InvestOpportunity } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";

type Props = {
  opportunity: InvestOpportunity;
};

export function InvestCard({ opportunity }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-subtle">
      <div className="relative h-56 w-full">
        <Image
          src={opportunity.images[0]}
          alt={opportunity.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-graphite">
          <span className="pill px-3 py-1 text-xs">{opportunity.assetType}</span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-graphite/70">
            {opportunity.status === "available" ? "Available" : "Coming soon"}
          </span>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-charcoal">{opportunity.name}</h3>
          <p className="text-sm text-graphite">{opportunity.location}</p>
        </div>
        <p className="text-sm text-graphite">
          {opportunity.investmentThesis.slice(0, 160)}...
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="text-xs text-graphite/80">
            {opportunity.managedByAceAvailable ? "Managed by ACE option" : "Self-managed"}
          </div>
          <Button variant="secondary" size="sm" href={`/invest/${opportunity.slug}`}>
            View thesis
          </Button>
        </div>
      </div>
    </div>
  );
}
