import { useCallback, useRef, useState, type PointerEvent } from "react";
import { Box } from "@mui/material";
import { useReveal } from "@/hooks/useReveal";

function TeethRects({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <rect x="30" y="70" width="52" height="110" rx="22" />
      <rect x="88" y="62" width="62" height="124" rx="24" />
      <rect x="156" y="56" width="42" height="134" rx="18" />
      <rect x="204" y="56" width="42" height="134" rx="18" />
      <rect x="252" y="62" width="62" height="124" rx="24" />
      <rect x="320" y="70" width="52" height="110" rx="22" />
    </g>
  );
}

export default function BeforeAfterSlider() {
  const { ref: revealRef, sx: revealSx } = useReveal();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const update = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      revealRef.current = node;
    },
    [revealRef]
  );

  return (
    <Box
      ref={setRefs}
      sx={{
        ...revealSx,
        position: "relative",
        borderRadius: "28px",
        overflow: "hidden",
        bgcolor: "tokens.gum",
        aspectRatio: "16/10",
        userSelect: "none",
        touchAction: "none",
        cursor: "ew-resize",
      }}
      onPointerDown={(e: PointerEvent<HTMLDivElement>) => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e: PointerEvent<HTMLDivElement>) => dragging && update(e.clientX)}
      onPointerUp={() => setDragging(false)}
    >
      <Box component="svg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect width="400" height="250" fill="#E7838C" />
        <TeethRects fill="#DCC48C" />
      </Box>
      <Box
        component="svg"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <rect width="400" height="250" fill="#E7838C" />
        <TeethRects fill="#FBFDFD" />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: "3px",
          bgcolor: "#fff",
          transform: "translateX(-50%)",
          "&::after": {
            content: '"⇆"',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 46,
            height: 46,
            borderRadius: "50%",
            bgcolor: "#fff",
            display: "grid",
            placeItems: "center",
            color: "tokens.ink",
            fontSize: "1.2rem",
            boxShadow: "0 8px 20px rgba(0,0,0,.2)",
          },
        }}
      />
      <Box sx={{ position: "absolute", bottom: 14, left: 14, bgcolor: "rgba(15,39,51,.75)", color: "#fff", px: "12px", py: "4px", borderRadius: 999, fontSize: ".85rem" }}>
        Before
      </Box>
      <Box sx={{ position: "absolute", bottom: 14, right: 14, bgcolor: "rgba(15,39,51,.75)", color: "#fff", px: "12px", py: "4px", borderRadius: 999, fontSize: ".85rem" }}>
        After
      </Box>
    </Box>
  );
}
