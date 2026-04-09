"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// react-icon-cloud needs to be dynamically imported with SSR disabled
// because it relies on window/document for canvas rendering
const Cloud = dynamic(() => import("react-icon-cloud").then(m => m.Cloud), { ssr: false });

interface SkillGlobeProps {
  skills: { id: number; name: string; iconUrl: string }[];
}

export default function SkillGlobe({ skills }: SkillGlobeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: 400 }} />; // placeholder

  // Render HTML image tags for each skill
  const icons = skills.map((s) => (
    <a key={s.id} href="#" onClick={(e) => e.preventDefault()} title={s.name}>
      <img
        src={s.iconUrl}
        alt={s.name}
        style={{ width: 48, height: 48, objectFit: "contain", filter: "drop-shadow(0 0 5px rgba(255,255,255,0.2))" }}
      />
    </a>
  ));

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 0" }} className="cursor-grab">
      <Cloud
        options={{
          reverse: true,
          depth: 1,
          wheelZoom: false,
          imageScale: 1.5,
          activeCursor: "default",
          tooltip: "native",
          initial: [0.1, -0.1],
          clickToFront: 500,
          tooltipDelay: 0,
          outlineColour: "#0000",
          maxSpeed: 0.04,
          minSpeed: 0.02,
          radius: 200,
          dragControl: true,
        }}

      >
        {icons}
      </Cloud>
    </div>
  );
}
