import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "ricardo11t",
  description:
    "Portfólio de Ricardo Holanda — desenvolvedor fullstack em Fortaleza. TypeScript, Next.js, sistemas distribuídos.",
  keywords: [
    "Ricardo Holanda",
    "Desenvolvedor Fullstack",
    "React",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Ricardo Holanda" }],
  openGraph: {
    title: "Ricardo Holanda | Desenvolvedor Fullstack",
    description:
      "Portfólio de Ricardo Holanda — Desenvolvedor Fullstack especializado em React, Node.js e TypeScript.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
