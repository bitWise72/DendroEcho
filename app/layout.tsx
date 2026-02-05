import "./globals.css";
import "@livekit/components-styles";
import type { Metadata } from "next";
import { TamboClientProvider } from "@/components/tambo/TamboClientProvider";

export const metadata: Metadata = {
  title: "Dendro-Meet",
  description: "Generative meeting interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-base text-zinc-100 antialiased">
        <TamboClientProvider>{children}</TamboClientProvider>
      </body>
    </html>
  );
}
