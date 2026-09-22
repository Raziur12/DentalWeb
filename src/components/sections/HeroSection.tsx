import { Box, Button, Container, Typography, keyframes } from "@mui/material";
import { useToothScene } from "@/hooks/useToothScene";
import { DISPLAY_FONT } from "@/theme/theme";

const breathe = keyframes`50% { transform: scale(1.08); }`;
const float = keyframes`50% { transform: translateY(-14px); }`;

const HEADLINE_LINES = ["Calm, careful", "dentistry for", "the whole family."];

interface HeroSectionProps {
  ready: boolean;
}

export default function HeroSection({ ready }: HeroSectionProps) {
  const stageRef = useToothScene();

  return (
    <Box component="section" id="home" sx={{ minHeight: "100vh", display: "grid", alignItems: "center", position: "relative", pt: "76px", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" }, alignItems: "center", gap: "20px" }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: "clamp(2.6rem,6vw,5.2rem)", lineHeight: 0.98 }}>
            {HEADLINE_LINES.map((line, i) => (
              <Box key={line} sx={{ overflow: "hidden" }}>
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    transform: ready ? "none" : "translateY(110%)",
                    transition: `transform 1.1s cubic-bezier(.2,.9,.2,1) ${i * 0.12}s`,
                  }}
                >
                  {line}
                </Box>
              </Box>
            ))}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.15rem",
              color: "tokens.ink2",
              maxWidth: "46ch",
              my: "26px 0 34px",
              mt: 3,
              mb: 4,
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(20px)",
              transition: "opacity 1s cubic-bezier(.2,.9,.2,1) .5s, transform 1s cubic-bezier(.2,.9,.2,1) .5s",
            }}
          >
            Checkups, braces, implants and whitening under one roof, with digital scans instead of messy moulds and numbing that actually works.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(20px)",
              transition: "opacity 1s cubic-bezier(.2,.9,.2,1) .5s, transform 1s cubic-bezier(.2,.9,.2,1) .5s",
            }}
          >
            <Button href="#contact" variant="contained" sx={{ bgcolor: "tokens.ink", "&:hover": { bgcolor: "tokens.aquaDeep" } }}>
              Book a visit
            </Button>
            <Button href="#services" variant="outlined" sx={{ color: "tokens.ink", boxShadow: "inset 0 0 0 1.5px currentColor" }}>
              See treatments
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "34px",
              mt: "46px",
              color: "tokens.ink2",
              fontSize: ".95rem",
              flexWrap: "wrap",
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(20px)",
              transition: "opacity 1s cubic-bezier(.2,.9,.2,1) .5s, transform 1s cubic-bezier(.2,.9,.2,1) .5s",
            }}
          >
            <Box>
              <Typography component="strong" sx={{ display: "block", fontFamily: DISPLAY_FONT, fontSize: "1.05rem", color: "tokens.ink" }}>
                Mon – Sat
              </Typography>
              9:00 am to 8:00 pm
            </Box>
            <Box>
              <Typography component="strong" sx={{ display: "block", fontFamily: DISPLAY_FONT, fontSize: "1.05rem", color: "tokens.ink" }}>
                Emergency line
              </Typography>
              +91 98100 00000
            </Box>
          </Box>
        </Box>

        <Box sx={{ position: "relative", height: { xs: 380, md: "min(640px,70vh)" }, order: { xs: -1, md: 0 } }}>
          <Box
            sx={{
              position: "absolute",
              inset: "10% 6%",
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #D8EEEE, transparent 65%)",
              filter: "blur(10px)",
              zIndex: -1,
              animation: `${breathe} 7s ease-in-out infinite`,
            }}
          />
          <Box ref={stageRef} sx={{ width: "100%", height: "100%", "& canvas": { width: "100% !important", height: "100% !important", display: "block" } }} />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              position: "absolute",
              top: "14%",
              left: 0,
              bgcolor: "#fff",
              borderRadius: "18px",
              p: "12px 16px",
              boxShadow: "0 18px 40px -18px rgba(15,39,51,.35)",
              fontSize: ".9rem",
              gap: "10px",
              alignItems: "center",
              animation: `${float} 6s ease-in-out infinite`,
            }}
          >
            <Box component="i" sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 0 5px rgba(47,167,160,.2)" }} />
            <Box>
              <Typography component="b" sx={{ fontFamily: DISPLAY_FONT, fontSize: "1.2rem", display: "block" }}>4.9</Typography>
              rating from 1,200+ patients
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              position: "absolute",
              bottom: "14%",
              right: "2%",
              bgcolor: "#fff",
              borderRadius: "18px",
              p: "12px 16px",
              boxShadow: "0 18px 40px -18px rgba(15,39,51,.35)",
              fontSize: ".9rem",
              gap: "10px",
              alignItems: "center",
              animation: `${float} 6s ease-in-out infinite -3s`,
            }}
          >
            <Typography component="b" sx={{ fontFamily: DISPLAY_FONT, fontSize: "1.2rem" }}>
              Same-day
              <br />
              appointments open
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
