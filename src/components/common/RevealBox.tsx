import { Box, type BoxProps } from "@mui/material";
import { useReveal } from "@/hooks/useReveal";

interface RevealBoxProps extends BoxProps {
  index?: number;
}

export default function RevealBox({ index = 0, sx, children, ...rest }: RevealBoxProps) {
  const { ref, sx: revealSx } = useReveal(index);
  return (
    <Box ref={ref} sx={{ ...revealSx, ...sx }} {...rest}>
      {children}
    </Box>
  );
}
