"use client";

import { useActionState } from "react";
import { submitInvestRequest, type ActionResult } from "@/app/actions";
import { Button } from "../ui/button";
import { FormMessage } from "./form-message";

type Props = {
  opportunityName: string;
};

const initialState: ActionResult = { success: false, message: "" };

export function InvestRequestForm({ opportunityName }: Props) {
  const [state, formAction] = useActionState(submitInvestRequest, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="opportunity" value={opportunityName} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-graphite">
          <span className="block text-charcoal">Name</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
            placeholder="Investor name"
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
          <span className="block text-charcoal">Intent</span>
          <input
            name="intent"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
            placeholder="e.g., buy + managed by ACE"
          />
        </label>
        <label className="space-y-2 text-sm text-graphite">
          <span className="block text-charcoal">Timeline</span>
          <input
            name="timeline"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 focus:border-charcoal/40 focus:outline-none"
            placeholder="e.g., Q2 decision"
          />
        </label>
      </div>
      <FormMessage message={state.message} success={state.success} />
      <Button type="submit" variant="primary" size="lg">
        Request dossier
      </Button>
    </form>
  );
}
