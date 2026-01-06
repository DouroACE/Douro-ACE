import { ReactNode } from "react";
import { Button } from "../ui/button";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  aside?: ReactNode;
};

export function Hero({ eyebrow, title, subtitle, cta, secondaryCta, aside }: Props) {
  return (
    <section className="section">
      <div className="container-wide grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div className="space-y-6">
          {eyebrow && (
            <div className="pill bg-white text-xs uppercase tracking-[0.08em]">{eyebrow}</div>
          )}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {subtitle && <p className="text-lg text-graphite">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            {cta && (
              <Button variant="primary" size="lg" href={cta.href}>
                {cta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button variant="secondary" size="lg" href={secondaryCta.href}>
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
        {aside && (
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-subtle">
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
