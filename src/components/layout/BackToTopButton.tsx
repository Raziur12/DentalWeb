import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface BackToTopButtonProps {
  visible: boolean;
}

export default function BackToTopButton({ visible }: BackToTopButtonProps) {
  return (
    <Fab
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      sx={{
        position: "fixed",
        right: 22,
        bottom: 22,
        zIndex: 40,
        bgcolor: "primary.main",
        color: "#fff",
        transform: visible ? "scale(1)" : "scale(0)",
        transition: "transform .4s cubic-bezier(.3,1.6,.5,1)",
        "&:hover": { bgcolor: "tokens.aquaDeep" },
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
}
