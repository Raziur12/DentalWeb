import { Box, Typography, keyframes } from "@mui/material";
import ToothIcon from "@/components/icons/ToothIcon";
import { DISPLAY_FONT } from "@/theme/theme";

const pulse = keyframes`50% { transform: scale(.86) rotate(-6deg); opacity: .6; }`;

interface LoaderProps {
  done: boolean;
}

export default function Loader({ done }: LoaderProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "tokens.ink",
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        transition: "clip-path 1s cubic-bezier(.77,0,.18,1)",
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      }}
    >
      <Box textAlign="center">
        <Box sx={{ animation: `${pulse} 1.1s ease-in-out infinite`, display: "inline-block" }}>
          <ToothIcon fill="#F3F7F7" size={64} />
        </Box>
        <Typography
          sx={{
            color: "tokens.sky",
            fontFamily: DISPLAY_FONT,
            mt: "14px",
            letterSpacing: ".02em",
          }}
        >
          Tental
        </Typography>
      </Box>
    </Box>
  );
}
