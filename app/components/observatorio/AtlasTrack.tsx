"use client";

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

export default function AtlasTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const drag = useRef(false);
  const dragDidMove = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const capId = useRef<number | null>(null);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = e.currentTarget;
    if ((e.target as HTMLElement).closest("a, button")) return;
    drag.current = true;
    dragDidMove.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    capId.current = e.pointerId;
    el.setPointerCapture(e.pointerId);
    el.classList.add("atlas-track--dragging");
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || !ref.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) dragDidMove.current = true;
    ref.current.scrollLeft = startScroll.current - dx;
  }, []);

  const endDrag = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!drag.current) return;
    if (capId.current != null) {
      try {
        el.releasePointerCapture(capId.current);
      } catch {
        /* ignore */
      }
    }
    drag.current = false;
    el.classList.remove("atlas-track--dragging");
    if (dragDidMove.current) {
      const blockClick = (ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        el.removeEventListener("click", blockClick, true);
      };
      el.addEventListener("click", blockClick, true);
    }
    capId.current = null;
  }, []);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    const onEnter = () => {
      hovered.current = true;
    };
    const onLeave = () => {
      hovered.current = false;
    };

    function onKeyDown(e: KeyboardEvent) {
      if (!hovered.current) return;
      const el = ref.current;
      if (!el) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const step = Math.min(480, el.clientWidth * 0.85);
        el.scrollBy({ left: -step, behavior: "smooth" });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const step = Math.min(480, el.clientWidth * 0.85);
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      className="atlas-track"
      id="atlasTrack"
      ref={ref}
      tabIndex={-1}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {children}
    </div>
  );
}
