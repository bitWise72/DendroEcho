"use client";

import { useState } from "react";

type PollDeckProps = {
  title: string;
  options: string[];
};

export function PollDeck({ title, options }: PollDeckProps) {
  const [selection, setSelection] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      <p className="mb-3 text-sm text-zinc-200">{title}</p>
      <div className="grid gap-2">
        {options.map((option) => {
          const active = selection === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelection(option)}
              className={`rounded-xl border px-4 py-3 text-sm transition ${
                active
                  ? "border-zinc-400 bg-zinc-800 text-zinc-100"
                  : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
