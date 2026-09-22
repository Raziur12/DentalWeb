import { useEffect, useRef, useState } from "react";

/** Reveals an element with a fade/slide transition once it scrolls into view. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delayIndex = 0) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        io.unobserve(el);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return {
    ref,
    revealed,
    sx: {
      opacity: revealed ? 1 : 0,
      transform: revealed ? "none" : "translateY(50px) rotateX(12deg)",
      transformOrigin: "top",
      transition: `opacity 1s cubic-bezier(.2,.9,.2,1) ${delayIndex * 0.1}s, transform 1s cubic-bezier(.2,.9,.2,1) ${delayIndex * 0.1}s`,
      "@media (prefers-reduced-motion: reduce)": { opacity: 1, transform: "none" },
    },
  };
}
