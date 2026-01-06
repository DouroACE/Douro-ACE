"use client";

import { useActionState } from "react";
import { submitContact, type ActionResult } from "@/app/actions";
import { Button } from "../ui/button";
import { FormMessage } from "./form-message";

const initialState: ActionResult = { success: false, message: "" };

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-graphite">
          <span className="block text-charcoal">Name</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-2 text-sm text-graphite">
          <span className="block text-charcoal">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
            placeholder="you@email.com"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm text-graphite">
        <span className="block text-charcoal">How can we help?</span>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
          placeholder="Tell us about your stay, investment interests, or concierge needs."
        />
      </label>
      <FormMessage message={state.message} success={state.success} />
      <Button type="submit" variant="primary" size="lg">
        Send message
      </Button>
    </form>
  );
}
