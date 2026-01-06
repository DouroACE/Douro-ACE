"use client";

import { useActionState } from "react";
import { submitConcierge, type ActionResult } from "@/app/actions";
import { Button } from "../ui/button";
import { FormMessage } from "./form-message";

const initialState: ActionResult = { success: false, message: "" };

export function ConciergeForm() {
  const [state, formAction] = useActionState(submitConcierge, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-graphite">
          <span className="block text-charcoal">Name</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
            placeholder="Guest name"
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
        <span className="block text-charcoal">Which stay?</span>
        <input
          name="stay"
          className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
          placeholder="If you have a confirmed or planned stay"
        />
      </label>
      <label className="space-y-2 text-sm text-graphite">
        <span className="block text-charcoal">Interests</span>
        <textarea
          name="interest"
          rows={3}
          className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
          placeholder="E.g., Douro itinerary, chef dinner, wellness, mobility"
        />
      </label>
      <FormMessage message={state.message} success={state.success} />
      <Button type="submit" variant="primary" size="lg">
        Request concierge
      </Button>
    </form>
  );
}
