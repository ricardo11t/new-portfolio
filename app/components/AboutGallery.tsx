"use client";

import { useRef, useState } from "react";
import { AboutImage } from "@prisma/client";

export default function AboutGallery({ images }: { images: AboutImage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    const index = Math.round(scrollRef.current.scrollLeft / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.scrollBehavior = 'auto';
  };

  const handlePointerLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        const width = scrollRef.current.offsetWidth;
        const index = Math.round(scrollRef.current.scrollLeft / width);
        scrollRef.current.style.scrollBehavior = 'smooth';
        scrollRef.current.scrollTo({ left: index * width, behavior: 'smooth' });
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div style={{ marginTop: 24, width: "100%", maxWidth: "600px", margin: "0 auto 32px auto" }}>
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onScroll={handleScroll}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 0,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "pan-x",
          scrollbarWidth: "none",
          scrollSnapType: isDragging ? "none" : "x mandatory",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
        }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.alt || "Sobre Mim"}
            style={{
              width: "100%",
              flexShrink: 0,
              height: "auto",
              maxHeight: "450px",
              objectFit: "cover",
              pointerEvents: "none",
              scrollSnapAlign: "center"
            }}
            draggable="false"
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              scrollRef.current?.scrollTo({ left: idx * (scrollRef.current?.offsetWidth || 0), behavior: 'smooth' });
            }}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: idx === currentIndex ? "var(--accent-primary)" : "var(--border-color)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            aria-label={`Ir para imagem ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
