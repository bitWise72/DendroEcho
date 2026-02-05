"use client";

type MermaidFlowProps = {
  title?: string;
  source: string;
};

export function MermaidFlow({ title, source }: MermaidFlowProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      {title ? <p className="mb-2 text-sm text-zinc-200">{title}</p> : null}
      <pre className="overflow-auto rounded-xl bg-zinc-900/80 p-4 text-xs text-zinc-200">
        {source}
      </pre>
    </div>
  );
}
