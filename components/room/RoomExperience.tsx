"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LiveKitRoom, GridLayout, ParticipantTile } from "@livekit/components-react";
import { motion } from "framer-motion";
import { GenerativeCanvas } from "@/components/tambo/GenerativeCanvas";
import { useTamboThread } from "@tambo-ai/react";

const liveKitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL ?? "";

type RoomExperienceProps = {
  roomId: string;
};

export function RoomExperience({ roomId }: RoomExperienceProps) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [lastGesture, setLastGesture] = useState<string | null>(null);
  const { thread, sendThreadMessage } = useTamboThread();

  const shouldConnect = useMemo(() => liveKitUrl.length > 0 && token.length > 0, [token]);

  const reportVisionEvent = async (label: string, confidence: number) => {
    await fetch("/api/tambo/vision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, label, confidence }),
    });
    await sendThreadMessage(`Vision event: ${label}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-base">
      <div className="absolute inset-0">
        {shouldConnect ? (
          <LiveKitRoom
            token={token}
            serverUrl={liveKitUrl}
            data-lk-theme="default"
            className="h-full"
          >
            <GridLayout className="h-full gap-4 p-6">
              <ParticipantTile />
            </GridLayout>
          </LiveKitRoom>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8 text-sm text-zinc-300">
              LiveKit URL or token missing. Add NEXT_PUBLIC_LIVEKIT_URL and a token query parameter.
            </div>
          </div>
        )}
      </div>
      <motion.div
        className="relative z-10 flex items-start justify-between px-8 py-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Room</p>
          <h2 className="text-lg font-semibold text-zinc-100">{roomId}</h2>
        </div>
        <div className="text-xs text-zinc-400">
          {lastGesture ? `Gesture: ${lastGesture}` : "Waiting for vision"}
        </div>
      </motion.div>
      <div className="absolute bottom-6 right-6 z-10 w-80 space-y-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Thread</p>
          <div className="mt-3 max-h-48 space-y-2 overflow-auto text-xs text-zinc-300">
            {(thread?.messages ?? []).slice(-6).map((message, index) => (
              <p key={`${message.role}-${index}`}>{message.content}</p>
            ))}
          </div>
        </div>
      </div>
      <GenerativeCanvas
        className="absolute inset-0"
        onVisionEvent={(event) => {
          setLastGesture(event.label);
          reportVisionEvent(event.label, event.confidence);
        }}
      />
    </main>
  );
}
