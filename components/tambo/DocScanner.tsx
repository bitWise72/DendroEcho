"use client";

import { useState } from "react";

type DocScannerProps = {
  title?: string;
  imageDataUrl: string;
};

export function DocScanner({ title, imageDataUrl }: DocScannerProps) {
  const [status, setStatus] = useState("Ready to scan");

  const handleScan = () => {
    setStatus("Scan queued");
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      {title ? <p className="mb-2 text-sm text-zinc-200">{title}</p> : null}
      <div className="space-y-3">
        <img
          src={imageDataUrl}
          alt="Captured document"
          className="h-48 w-full rounded-xl object-cover"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-400">{status}</p>
          <button
            type="button"
            onClick={handleScan}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs text-zinc-100 transition hover:border-zinc-500"
          >
            Extract text
          </button>
        </div>
      </div>
    </div>
  );
}
