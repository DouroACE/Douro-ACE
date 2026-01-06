"use client";

import { useActionState } from "react";
import { submitStayRequest, type ActionResult, submitDirectOffer } from "@/app/actions";
import { Button } from "../ui/button";
import { FormMessage } from "./form-message";

type Props = {
  propertyName: string;
  showDirectOffer?: boolean;
};

const initialState: ActionResult = { success: false, message: "" };

export function StayRequestForm({ propertyName, showDirectOffer }: Props) {
  const [state, formAction] = useActionState(submitStayRequest, initialState);
  const [offerState, directOfferAction] = useActionState(submitDirectOffer, initialState);

  return (
    <div className="space-y-8">
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="property" value={propertyName} />
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
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-graphite">
            <span className="block text-charcoal">Dates</span>
            <input
              name="dates"
              required
              className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
              placeholder="e.g., 12-16 July"
            />
          </label>
          <label className="space-y-2 text-sm text-graphite">
            <span className="block text-charcoal">Guests</span>
            <input
              name="guests"
              required
              className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
              placeholder="Number of guests"
            />
          </label>
        </div>
        <label className="space-y-2 text-sm text-graphite">
          <span className="block text-charcoal">Notes</span>
          <textarea
            name="notes"
            rows={3}
            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
            placeholder="Preferences, arrival time, add-ons"
          />
        </label>
        <FormMessage message={state.message} success={state.success} />
        <Button type="submit" variant="primary" size="lg">
          Check availability
        </Button>
      </form>

      {showDirectOffer && (
        <form action={directOfferAction} className="space-y-4 rounded-2xl border border-white/60 bg-white/60 p-4">
          <input type="hidden" name="property" value={propertyName} />
          <input type="hidden" name="channel" value="direct" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-charcoal">Prefer a direct ACE offer?</p>
            <p className="text-xs text-graphite">We will share a tailored proposal and best rate.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-graphite">
              <span className="block text-charcoal">Name</span>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-graphite">
              <span className="block text-charcoal">Email</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
              />
            </label>
          </div>
          <FormMessage message={offerState.message} success={offerState.success} />
          <Button type="submit" variant="secondary" size="md">
            Request direct offer
          </Button>
        </form>
      )}
    </div>
  );
}
