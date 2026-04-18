export function ChartViz({ variant }: { variant: number }) {
  const v = variant % 4;
  const stroke = "var(--fg-3)";
  const fill = "var(--fg)";
  if (v === 0) {
    return (
      <svg viewBox="0 0 400 250" preserveAspectRatio="none">
        <g stroke={stroke} strokeWidth="0.5" fill="none" opacity="0.6">
          <line x1="60" y1="80" x2="180" y2="130" />
          <line x1="180" y1="130" x2="280" y2="90" />
          <line x1="180" y1="130" x2="260" y2="180" />
          <line x1="280" y1="90" x2="340" y2="140" />
        </g>
        <g fill={fill}>
          <circle cx="60" cy="80" r="1.8" />
          <circle cx="260" cy="180" r="2" />
          <circle cx="340" cy="140" r="1.6" />
        </g>
        <g fill="oklch(0.62 0.2 24)" className="pulse">
          <circle cx="180" cy="130" r="4" />
          <circle cx="280" cy="90" r="3" />
        </g>
      </svg>
    );
  }
  if (v === 1) {
    return (
      <svg viewBox="0 0 400 250" preserveAspectRatio="none">
        <g stroke={stroke} strokeWidth="0.5" fill="none" opacity="0.6">
          <circle cx="200" cy="125" r="60" />
          <circle cx="200" cy="125" r="90" />
          <line x1="200" y1="65" x2="200" y2="185" />
          <line x1="140" y1="125" x2="260" y2="125" />
        </g>
        <g fill={fill}>
          <circle cx="200" cy="65" r="1.8" />
          <circle cx="260" cy="125" r="1.8" />
          <circle cx="200" cy="185" r="1.8" />
          <circle cx="140" cy="125" r="1.8" />
        </g>
        <circle cx="200" cy="125" r="5" fill="oklch(0.62 0.2 24)" className="pulse" />
      </svg>
    );
  }
  if (v === 2) {
    return (
      <svg viewBox="0 0 400 250" preserveAspectRatio="none">
        <path
          d="M 20 180 Q 100 80, 200 140 T 380 80"
          stroke="oklch(0.62 0.2 24)"
          strokeWidth="1"
          fill="none"
          className="pulse"
        />
        <g fill={fill}>
          <circle cx="20" cy="180" r="1.6" />
          <circle cx="100" cy="95" r="1.6" />
          <circle cx="200" cy="140" r="1.6" />
          <circle cx="300" cy="105" r="1.6" />
          <circle cx="380" cy="80" r="1.6" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="none">
      <g stroke={stroke} strokeWidth="0.5" fill="none" opacity="0.6">
        <rect x="100" y="70" width="200" height="110" />
        <line x1="100" y1="70" x2="300" y2="180" />
        <line x1="300" y1="70" x2="100" y2="180" />
      </g>
      <circle cx="200" cy="125" r="4" fill="oklch(0.62 0.2 24)" className="pulse" />
    </svg>
  );
}
