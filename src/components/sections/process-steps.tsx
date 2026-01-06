type Step = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  steps: Step[];
};

export function ProcessSteps({ title, steps }: Props) {
  return (
    <section className="section">
      <div className="container-wide space-y-8">
        <div className="space-y-2">
          <p className="pill bg-white text-xs uppercase tracking-[0.08em]">Process</p>
          <h2 className="text-2xl font-semibold text-charcoal">{title}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="card space-y-2">
              <p className="text-xs uppercase tracking-[0.08em] text-graphite/80">
                Step {index + 1}
              </p>
              <p className="text-lg font-semibold text-charcoal">{step.title}</p>
              <p className="text-sm text-graphite">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
