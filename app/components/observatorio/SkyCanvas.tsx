"use client";

import { useEffect, useRef } from "react";
import type { ObsTheme } from "./ObservatorioProviders";

export default function SkyCanvas({ theme }: { theme: ObsTheme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvasEl: HTMLCanvasElement = el;
    const ctxRaw = canvasEl.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    let W = 0;
    let H = 0;
    let DPR = 1;

    function resize() {
      const parent = canvasEl.parentElement;
      if (!parent) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvasEl.style.width = `${W}px`;
      canvasEl.style.height = `${H}px`;
      canvasEl.width = W * DPR;
      canvasEl.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    window.addEventListener("resize", resize);
    resize();

    const N = 420;
    const stars: { x: number; y: number; z: number; mag: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      stars.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        mag: Math.random(),
      });
    }

    const edges: [number, number][] = [];
    for (let i = 0; i < stars.length; i++) {
      const a = stars[i];
      let best: [number, number] = [Infinity, Infinity];
      let bi: [number, number] = [-1, -1];
      for (let j = 0; j < stars.length; j++) {
        if (i === j) continue;
        const b = stars[j];
        const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
        if (d < best[0]) {
          best[1] = best[0];
          bi[1] = bi[0];
          best[0] = d;
          bi[0] = j;
        } else if (d < best[1]) {
          best[1] = d;
          bi[1] = j;
        }
      }
      if (Math.random() < 0.16 && bi[0] >= 0) edges.push([i, bi[0]]);
      if (Math.random() < 0.07 && bi[1] >= 0) edges.push([i, bi[1]]);
    }

    let ry = 0;
    let rx = -0.15;
    let targetRy = 0;
    let targetRx = -0.15;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let dragging = false;
    let dragX = 0;
    let dragY = 0;
    let dragBaseRy = 0;
    let dragBaseRx = 0;
    let raf = 0;

    function onMove(e: PointerEvent) {
      const r = canvasEl.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top) / r.height;
      if (dragging) {
        targetRy = dragBaseRy + (e.clientX - dragX) * 0.008;
        targetRx = dragBaseRx + (e.clientY - dragY) * 0.008;
        targetRx = Math.max(-1.2, Math.min(1.2, targetRx));
      }
    }

    function onDown(e: PointerEvent) {
      dragging = true;
      dragX = e.clientX;
      dragY = e.clientY;
      dragBaseRy = targetRy;
      dragBaseRx = targetRx;
      canvasEl.setPointerCapture(e.pointerId);
    }

    function onUp() {
      dragging = false;
    }

    canvasEl.addEventListener("pointermove", onMove);
    canvasEl.addEventListener("pointerdown", onDown);
    canvasEl.addEventListener("pointerup", onUp);
    canvasEl.addEventListener("pointercancel", onUp);

    function project(
      p: (typeof stars)[0],
      cx: number,
      cy: number,
      scale: number,
    ) {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      const d = 2.5;
      const f = d / (d + z2);
      return { x: cx + x1 * scale * f, y: cy + y2 * scale * f, f, z: z2 };
    }

    function drawSky() {
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.66;
      const cy = H / 2;
      const scale = Math.min(W, H) * 0.42;
      const isLight = themeRef.current === "light";

      if (!dragging) {
        targetRy += 0.0006;
        const px = (mouseX - 0.5) * 0.35;
        const py = -(mouseY - 0.5) * 0.25;
        ry += (targetRy + px - ry) * 0.04;
        rx += (targetRx + py - rx) * 0.04;
      } else {
        ry += (targetRy - ry) * 0.15;
        rx += (targetRx - rx) * 0.15;
      }

      const pts = stars.map((s) => project(s, cx, cy, scale));

      for (const [i, j] of edges) {
        const a = pts[i];
        const b = pts[j];
        if (a.z > 0.8 || b.z > 0.8) continue;
        const alpha = Math.max(0, 1 - Math.max(a.z, b.z)) * 0.4;
        ctx.strokeStyle = `oklch(0.62 0.2 24 / ${alpha * 0.8})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const s = stars[i];
        const front = 1 - (p.z + 1) / 2;
        const size = (0.4 + s.mag * 1.6) * p.f;
        const alpha = 0.15 + front * 0.85 * (0.4 + s.mag * 0.6);
        ctx.fillStyle = isLight ? `rgba(28,28,32,${alpha})` : `rgba(236,236,236,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        if (s.mag > 0.94 && front > 0.4) {
          ctx.fillStyle = `oklch(0.62 0.2 24 / ${front * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(drawSky);
    }

    drawSky();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvasEl.removeEventListener("pointermove", onMove);
      canvasEl.removeEventListener("pointerdown", onDown);
      canvasEl.removeEventListener("pointerup", onUp);
      canvasEl.removeEventListener("pointercancel", onUp);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="sky-canvas" aria-hidden />;
}
