"use client";

import { useEffect, useRef, useState } from "react";
import type { VisionWorkerOutput } from "@/workers/vision.worker";

type VisionEvent = {
  type: "GESTURE";
  label: string;
  confidence: number;
};

type GenerativeCanvasProps = {
  className?: string;
  enabled?: boolean;
  modelUrl?: string;
  minConfidence?: number;
  onVisionEvent?: (event: VisionEvent) => void;
};

const defaultModelUrl =
  process.env.NEXT_PUBLIC_VISION_MODEL_URL ?? "/models/gesture_recognizer.task";

export function GenerativeCanvas({
  className,
  enabled = true,
  modelUrl = defaultModelUrl,
  minConfidence = 0.8,
  onVisionEvent,
}: GenerativeCanvasProps) {
  const workerRef = useRef<Worker | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const worker = new Worker(new URL("../../workers/vision.worker.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<VisionWorkerOutput>) => {
      if (event.data.type === "READY") {
        setReady(true);
      }
      if (event.data.type === "GESTURE" && event.data.confidence >= minConfidence) {
        onVisionEvent?.({
          type: "GESTURE",
          label: event.data.label,
          confidence: event.data.confidence,
        });
      }
    };

    worker.postMessage({ type: "INIT", modelUrl });

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, [enabled, minConfidence, modelUrl, onVisionEvent]);

  useEffect(() => {
    if (!ready || !enabled) {
      return;
    }

    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    videoRef.current = video;

    const startCapture = async () => {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = streamRef.current;

      intervalRef.current = window.setInterval(async () => {
        if (!workerRef.current || video.readyState < 2) {
          return;
        }
        const frame = await createImageBitmap(video);
        workerRef.current.postMessage(
          { type: "FRAME", frame, timestamp: performance.now() },
          [frame]
        );
      }, 1000);
    };

    startCapture();

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      videoRef.current = null;
    };
  }, [enabled, ready]);

  return <div className={className} data-role="generative-canvas" />;
}
