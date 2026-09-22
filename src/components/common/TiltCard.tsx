import { useRef, type PointerEvent } from "react";
import { Box, Card, Typography } from "@mui/material";
import { useReveal } from "@/hooks/useReveal";
import { DISPLAY_FONT } from "@/theme/theme";
import type { Service } from "@/types";

interface TiltCardProps {
  service: Service;
  index: number;
}

export default function TiltCard({ service, index }: TiltCardProps) {
  const { ref: revealRef, sx: revealSx } = useReveal(index);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg) translateZ(10px)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const handlePointerLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <Box
      ref={revealRef}
      sx={{ ...revealSx, perspective: "1200px" }}
    >
      <Card
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          p: 4,
          borderRadius: "28px",
          border: "1px solid",
          borderColor: "tokens.line",
          transformStyle: "preserve-3d",
          transition: "transform .2s ease-out, box-shadow .4s",
          "&:hover": { boxShadow: "0 30px 60px -30px rgba(15,39,51,.4)" },
          "&:hover .shine": { opacity: 1 },
        }}
      >
        <Box
          className="shine"
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(47,167,160,.14), transparent 45%)",
            opacity: 0,
            transition: "opacity .3s",
          }}
        />
        <Box
          sx={{
            width: 58,
            height: 58,
            borderRadius: "18px",
            bgcolor: "tokens.sky",
            display: "grid",
            placeItems: "center",
            mb: "22px",
            transform: "translateZ(40px)",
          }}
        >
          <Box component="svg" viewBox="0 0 24 24" fill="none" stroke="#1C7C77" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" sx={{ width: 28 }}>
            {service.icon}
          </Box>
        </Box>
        <Typography variant="h3" sx={{ fontFamily: DISPLAY_FONT, fontSize: "1.4rem", transform: "translateZ(30px)" }}>
          {service.title}
        </Typography>
        <Typography sx={{ color: "tokens.ink2", my: "8px 0 18px", mt: 1, mb: "18px", transform: "translateZ(20px)" }}>
          {service.description}
        </Typography>
        <Typography component="span" sx={{ fontWeight: 600, color: "tokens.aquaDeep", transform: "translateZ(25px)", display: "inline-block" }}>
          {service.price}
        </Typography>
      </Card>
    </Box>
  );
}
