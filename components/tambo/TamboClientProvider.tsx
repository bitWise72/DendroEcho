"use client";

import { TamboProvider } from "@tambo-ai/react";
import { tamboComponents, tamboTools } from "@/tambo.config";

type TamboClientProviderProps = {
  children: React.ReactNode;
};

export function TamboClientProvider({ children }: TamboClientProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY ?? "";

  return (
    <TamboProvider apiKey={apiKey} components={tamboComponents} tools={tamboTools}>
      {children}
    </TamboProvider>
  );
}
