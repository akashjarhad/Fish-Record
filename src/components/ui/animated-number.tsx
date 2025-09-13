import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
}

export function AnimatedNumber({ value, durationMs = 800, prefix = "", suffix = "", format }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    const change = value - from;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min(1, (ts - startRef.current) / durationMs);
      const current = from + change * easeOutCubic(progress);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(step);
      else {
        fromRef.current = value;
        startRef.current = null;
      }
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  const shown = format ? format(display) : Math.round(display).toLocaleString();
  return <span>{prefix}{shown}{suffix}</span>;
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
