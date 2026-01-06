import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Cookies",
  description: "ACE privacy and cookies placeholder. Update with your legal text."
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container-wide space-y-4">
        <div className="pill bg-white text-xs uppercase tracking-[0.08em]">Legal</div>
        <h1 className="text-3xl font-semibold text-charcoal sm:text-4xl">Privacy & Cookies</h1>
        <div className="space-y-3 text-sm text-graphite">
          <p>
            This is a placeholder for ACE&apos;s privacy and cookie policy. Update with your legal counsel&apos;s
            language covering data collection, processing, and retention.
          </p>
          <p>
            Forms on this site currently log submissions to the server console for demonstration. Replace with your
            preferred email or CRM integration (Resend, SendGrid, HubSpot, etc.).
          </p>
          <p>
            Analytics: Google Analytics 4 is implemented via gtag. Update the measurement ID and ensure cookie
            consent aligns with your jurisdiction.
          </p>
        </div>
      </div>
    </section>
  );
}
