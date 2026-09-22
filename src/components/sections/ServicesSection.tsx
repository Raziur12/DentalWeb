import { Box, Container, Typography } from "@mui/material";
import RevealBox from "@/components/common/RevealBox";
import TiltCard from "@/components/common/TiltCard";
import { SERVICES } from "@/data/services";

export default function ServicesSection() {
  return (
    <Box component="section" id="services" sx={{ py: { xs: "84px", md: "120px" } }}>
      <Container maxWidth="lg">
        <RevealBox sx={{ maxWidth: 640, mb: 7 }}>
          <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,3.3rem)", lineHeight: 1.05 }}>
            Treatments we offer
          </Typography>
          <Typography sx={{ color: "tokens.ink2", mt: "14px", fontSize: "1.08rem" }}>
            Clear prices up front. Your dentist explains every option before anything starts.
          </Typography>
        </RevealBox>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3,1fr)" }, gap: "20px" }}>
          {SERVICES.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
