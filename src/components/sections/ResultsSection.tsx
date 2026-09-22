import { Box, Container, Typography } from "@mui/material";
import RevealBox from "@/components/common/RevealBox";
import Counter from "@/components/common/Counter";
import BeforeAfterSlider from "@/components/common/BeforeAfterSlider";
import { STATS } from "@/data/stats";

export default function ResultsSection() {
  return (
    <Box component="section" id="results" sx={{ py: { xs: "84px", md: "120px" } }}>
      <Container
        maxWidth="lg"
        sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" }, gap: { xs: "40px", md: "60px" }, alignItems: "center" }}
      >
        <RevealBox>
          <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,3.3rem)", lineHeight: 1.05 }}>
            Whitening you can see in one sitting
          </Typography>
          <Typography sx={{ color: "tokens.ink2", mt: "14px", fontSize: "1.08rem" }}>
            Drag the slider to compare a typical before and after shade.
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", mt: "36px" }}>
            {STATS.map((stat) => (
              <Box key={stat.label}>
                <Counter end={stat.value} />
                <Typography component="span" sx={{ color: "tokens.ink2" }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </RevealBox>
        <BeforeAfterSlider />
      </Container>
    </Box>
  );
}
