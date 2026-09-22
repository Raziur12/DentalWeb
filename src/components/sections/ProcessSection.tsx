import { Box, Container, Typography } from "@mui/material";
import RevealBox from "@/components/common/RevealBox";
import { useStepsProgress } from "@/hooks/useStepsProgress";
import { STEPS } from "@/data/steps";
import { DISPLAY_FONT } from "@/theme/theme";

export default function ProcessSection() {
  const { ref: stepsRef, progress } = useStepsProgress();

  return (
    <Box component="section" id="process" sx={{ py: { xs: "84px", md: "120px" } }}>
      <Box
        sx={{
          bgcolor: "tokens.ink",
          color: "tokens.porcelain",
          borderRadius: { xs: "28px", md: "48px" },
          mx: "2vw",
          py: { xs: "84px", md: "120px" },
        }}
      >
        <Container maxWidth="lg">
          <RevealBox sx={{ maxWidth: 640, mb: 7 }}>
            <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,3.3rem)", lineHeight: 1.05, color: "inherit" }}>
              What happens on your first visit
            </Typography>
            <Typography sx={{ color: "#A9C2C6", mt: "14px", fontSize: "1.08rem" }}>About 45 minutes, start to finish.</Typography>
          </RevealBox>

          <Box
            ref={stepsRef}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" },
              gap: "28px",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 27,
                left: 0,
                height: "2px",
                width: progress,
                bgcolor: "primary.main",
                transition: "width 1.8s cubic-bezier(.2,.9,.2,1)",
                display: { xs: "none", md: "block" },
              },
            }}
          >
            {STEPS.map((step, i) => (
              <RevealBox key={step.title} index={i}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "tokens.ink",
                    border: "2px solid",
                    borderColor: "primary.main",
                    fontFamily: DISPLAY_FONT,
                    fontWeight: 700,
                    mb: "22px",
                  }}
                >
                  {i + 1}
                </Box>
                <Typography variant="h3" sx={{ fontSize: "1.25rem", mb: "6px", color: "inherit" }}>
                  {step.title}
                </Typography>
                <Typography sx={{ color: "#A9C2C6", fontSize: ".98rem" }}>{step.description}</Typography>
              </RevealBox>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
