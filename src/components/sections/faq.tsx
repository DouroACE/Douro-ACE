\"use client\";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
};

export function FAQ({ items }: Props) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <AccordionItem key={item.question} item={item} />
      ))}
    </div>
  );
}

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm font-medium text-charcoal">{item.question}</span>
        <span className="text-xl text-graphite">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-sm text-graphite">{item.answer}</p>}
    </div>
  );
}
