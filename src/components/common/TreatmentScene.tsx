import { useCallback, useEffect, useState } from "react";
import { Box, Chip, Typography, keyframes } from "@mui/material";
import { useTreatmentScene } from "@/hooks/useTreatmentScene";
import { useReveal } from "@/hooks/useReveal";
import type { TreatmentVariant } from "@/types";

const blink = keyframes`50% { opacity: .25; }`;
const swap = keyframes`from { opacity: 0; transform: translateY(8px); }`;

interface TreatmentSceneProps {
  variant: TreatmentVariant;
  steps: string[];
}

export default function TreatmentScene({ variant, steps }: TreatmentSceneProps) {
  const sceneRef = useTreatmentScene(variant);
  const { ref: revealRef, revealed, sx: revealSx } = useReveal();
  const [i, setI] = useState(0);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      sceneRef.current = node;
      revealRef.current = node;
    },
    [sceneRef, revealRef]
  );

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % steps.length), 2600);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <Box
      ref={setRefs}
      sx={{
        ...revealSx,
        transform: revealed ? "none" : "translateY(60px) scale(.94)",
        position: "relative",
        height: 500,
        borderRadius: "40px",
        background: "radial-gradient(120% 90% at 50% 0%, #FFFFFF, #D8EEEE)",
        overflow: "hidden",
        cursor: "grab",
        "& canvas": { display: "block", width: "100% !important", height: "100% !important" },
      }}
    >
      <Typography sx={{ position: "absolute", right: 20, top: 18, fontSize: ".82rem", color: "tokens.ink2" }}>
        Move to rotate
      </Typography>
      <Chip
        icon={
          <Box
            component="i"
            sx={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              bgcolor: "tokens.gum",
              display: "inline-block",
              ml: "12px !important",
              animation: `${blink} 1.4s infinite`,
            }}
          />
        }
        label={
          <Box key={i} component="span" sx={{ animation: i ? `${swap} .5s cubic-bezier(.2,.9,.2,1)` : "none" }}>
            {steps[i]}
          </Box>
        }
        sx={{
          position: "absolute",
          left: 20,
          bottom: 20,
          bgcolor: "#fff",
          borderRadius: 999,
          py: "9px",
          height: "auto",
          fontWeight: 500,
          boxShadow: "0 14px 30px -16px rgba(15,39,51,.35)",
          "& .MuiChip-label": { fontSize: ".9rem" },
        }}
      />
    </Box>
  );
}
