"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function FloatingBigClock() {
  const [t, setT] = useState("00:00");

  useEffect(() => {
    function tick() {
      const d = new Date();
      setT(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="big" id="big-clock">
      {t}
    </div>
  );
}
