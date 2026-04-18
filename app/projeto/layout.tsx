"use client";

import { ObservatorioProviders } from "@/app/components/observatorio/ObservatorioProviders";
import ObservatorioInteractions from "@/app/components/observatorio/ObservatorioInteractions";
import "@/app/components/observatorio/observatorio.css";

export default function ProjetoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ObservatorioProviders>
      <ObservatorioInteractions />
      {children}
    </ObservatorioProviders>
  );
}
