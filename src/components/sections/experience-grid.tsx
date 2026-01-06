import type { Experience } from "@/types";

type Props = {
  experiences: Experience[];
};

const regionOrder = ["Douro", "Porto", "Algarve", "Norte"] as const;

export function ExperienceGrid({ experiences }: Props) {
  return (
    <div className="grid gap-8">
      {regionOrder.map((region) => {
        const regionExperiences = experiences.filter((exp) => exp.region === region);
        if (!regionExperiences.length) return null;
        return (
          <div key={region} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-charcoal">{region}</h3>
              <span className="pill">{regionExperiences.length} curated</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {regionExperiences.map((exp) => (
                <div key={exp.id} className="card space-y-2">
                  <p className="text-sm font-semibold text-charcoal">{exp.title}</p>
                  <p className="text-sm text-graphite">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-graphite">
                    {exp.idealFor && <span className="pill">{exp.idealFor}</span>}
                    {exp.duration && <span className="pill">{exp.duration}</span>}
                    {exp.priceRange && <span className="pill">{exp.priceRange}</span>}
                  </div>
                  <p className="text-xs text-graphite/80">
                    {exp.partnerName ?? "ACE selected partners"}
                  </p>
                  <p className="text-sm font-medium text-charcoal">{exp.bookingCTA}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
