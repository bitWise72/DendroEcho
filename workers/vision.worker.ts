import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";

export type VisionWorkerInput =
  | { type: "INIT"; modelUrl: string; wasmBaseUrl?: string }
  | { type: "FRAME"; frame: ImageBitmap; timestamp: number };

export type VisionWorkerOutput =
  | { type: "READY" }
  | { type: "GESTURE"; label: string; confidence: number }
  | { type: "ERROR"; message: string };

const ctx: DedicatedWorkerGlobalScope = self as DedicatedWorkerGlobalScope;

let recognizer: GestureRecognizer | null = null;

async function initRecognizer(modelUrl: string, wasmBaseUrl?: string) {
  const resolver = await FilesetResolver.forVisionTasks(
    wasmBaseUrl ?? "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.20/wasm"
  );
  recognizer = await GestureRecognizer.createFromOptions(resolver, {
    baseOptions: { modelAssetPath: modelUrl },
    runningMode: "VIDEO",
    numHands: 1,
  });
}

ctx.onmessage = async (event: MessageEvent<VisionWorkerInput>) => {
  if (event.data.type === "INIT") {
    try {
      await initRecognizer(event.data.modelUrl, event.data.wasmBaseUrl);
      ctx.postMessage({ type: "READY" } satisfies VisionWorkerOutput);
    } catch (error) {
      ctx.postMessage({
        type: "ERROR",
        message: error instanceof Error ? error.message : "Failed to init recognizer",
      } satisfies VisionWorkerOutput);
    }
    return;
  }

  if (!recognizer) {
    ctx.postMessage({
      type: "ERROR",
      message: "Vision worker is not initialized",
    } satisfies VisionWorkerOutput);
    return;
  }

  if (event.data.type === "FRAME") {
    try {
      const result = recognizer.recognizeForVideo(
        event.data.frame,
        event.data.timestamp
      );
      const [gesture] = result.gestures[0] ?? [];
      if (!gesture) {
        return;
      }
      ctx.postMessage({
        type: "GESTURE",
        label: gesture.categoryName,
        confidence: gesture.score,
      } satisfies VisionWorkerOutput);
    } catch (error) {
      ctx.postMessage({
        type: "ERROR",
        message: error instanceof Error ? error.message : "Failed to process frame",
      } satisfies VisionWorkerOutput);
    }
  }
};
