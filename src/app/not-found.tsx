import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-wide space-y-4 text-center">
        <p className="pill mx-auto bg-white text-xs uppercase tracking-[0.08em]">Not found</p>
        <h1 className="text-3xl font-semibold text-charcoal">This page is not available.</h1>
        <p className="text-sm text-graphite">Return to the main experience.</p>
        <div className="flex justify-center">
          <Button href="/">Back home</Button>
        </div>
      </div>
    </section>
  );
}
