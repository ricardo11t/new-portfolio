"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AtlasTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    function onWheel(this: HTMLDivElement, e: WheelEvent) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
      }
    }

    const bound = onWheel.bind(track);
    track.addEventListener("wheel", bound, { passive: false });
    return () => track.removeEventListener("wheel", bound);
  }, []);

  return (
    <div className="atlas-track" id="atlasTrack" ref={ref}>
      {children}
    </div>
  );
}
