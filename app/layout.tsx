import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Ricardo Holanda | Desenvolvedor Fullstack",
  description:
    "Portfólio de Ricardo Holanda — Desenvolvedor Fullstack especializado em React, Node.js e TypeScript. Criando soluções web modernas, escaláveis e com experiência premium.",
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
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
