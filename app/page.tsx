import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LobbyScene = dynamic(
  () => import("@/components/lobby/Scene").then((mod) => mod.LobbyScene),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <LobbyScene />
      </div>
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-10 backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              Dendro-Meet
            </p>
            <h1 className="text-4xl font-semibold text-zinc-50">
              Cyber-Physical meeting space
            </h1>
            <p className="text-sm text-zinc-400">
              Adaptive layouts surface the right tools at the right moment, without menus.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/room/demo"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-zinc-100 transition hover:border-zinc-500"
            >
              Enter demo room
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-zinc-500">Requires LiveKit keys</span>
          </div>
        </div>
      </div>
    </main>
  );
}
