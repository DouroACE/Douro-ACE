import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact ACE",
  description: "Contact ACE for stays, investments, or concierge. We respond within 24–48 hours."
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container-wide grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div className="space-y-4">
          <div className="pill bg-white text-xs uppercase tracking-[0.08em]">Contact</div>
          <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">Tell us what you need</h1>
          <p className="text-lg text-graphite">
            Whether you are booking a stay, exploring ACE Invest, or requesting concierge, share a few details.
            We respond within 24–48 hours.
          </p>
          <div className="space-y-2 text-sm text-graphite">
            <p>Email: <Link href="mailto:hello@ace.pt" className="font-semibold text-charcoal">hello@ace.pt</Link></p>
            <p>WhatsApp (optional): <Link href="https://wa.me/351000000000" className="text-charcoal">+351 000 000 000</Link></p>
          </div>
        </div>
        <div className="card space-y-4">
          <h3 className="text-lg font-semibold text-charcoal">Send a message</h3>
          <ContactForm />
          <Button variant="secondary" size="sm" href="/legal/privacy">
            Privacy notice
          </Button>
        </div>
      </div>
    </section>
  );
}
