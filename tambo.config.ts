import { z } from "zod";
import { defineTool } from "@tambo-ai/react";
import { DynamicMap } from "@/components/tambo/DynamicMap";
import { MermaidFlow } from "@/components/tambo/MermaidFlow";
import { DocScanner } from "@/components/tambo/DocScanner";
import { PollDeck } from "@/components/tambo/PollDeck";

const dynamicMapSchema = z.object({
  title: z.string().optional(),
  points: z
    .array(
      z.object({
        label: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
    )
    .default([]),
});

const mermaidFlowSchema = z.object({
  title: z.string().optional(),
  source: z.string(),
});

const docScannerSchema = z.object({
  title: z.string().optional(),
  imageDataUrl: z.string(),
});

const pollDeckSchema = z.object({
  title: z.string(),
  options: z.array(z.string()),
});

export const tamboComponents = [
  {
    name: "DynamicMap",
    description: "Render a location map with focus points",
    schema: dynamicMapSchema,
    component: DynamicMap,
  },
  {
    name: "MermaidFlow",
    description: "Render a mermaid diagram",
    schema: mermaidFlowSchema,
    component: MermaidFlow,
  },
  {
    name: "DocScanner",
    description: "Scan a captured frame into text",
    schema: docScannerSchema,
    component: DocScanner,
  },
  {
    name: "PollDeck",
    description: "Present voting options",
    schema: pollDeckSchema,
    component: PollDeck,
  },
];

export const tamboTools = [
  defineTool({
    name: "generate_meeting_summary",
    description: "Summarize the meeting using stored context",
    inputSchema: z.object({ roomId: z.string() }),
    outputSchema: z.object({ summary: z.string() }),
    execute: async ({ roomId }) => ({
      summary: `Summary pending for ${roomId}`,
    }),
  }),
  defineTool({
    name: "scan_physical_document",
    description: "Extract text from a captured frame",
    inputSchema: z.object({ imageDataUrl: z.string() }),
    outputSchema: z.object({ text: z.string() }),
    execute: async () => ({
      text: "Scan queued",
    }),
  }),
];

export type TamboConfig = {
  components: typeof tamboComponents;
  tools: typeof tamboTools;
};
