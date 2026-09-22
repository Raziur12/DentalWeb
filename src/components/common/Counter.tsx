import { Typography } from "@mui/material";
import { useCountUp } from "@/hooks/useCountUp";
import { DISPLAY_FONT } from "@/theme/theme";

interface CounterProps {
  end: number;
}

export default function Counter({ end }: CounterProps) {
  const { ref, value } = useCountUp(end);
  return (
    <Typography
      ref={ref}
      component="b"
      sx={{
        fontFamily: DISPLAY_FONT,
        fontSize: "2.8rem",
        lineHeight: 1,
        display: "block",
        letterSpacing: "-.03em",
      }}
    >
      {value.toLocaleString("en-IN")}
      {value === end && end > 100 ? "+" : ""}
    </Typography>
  );
}
