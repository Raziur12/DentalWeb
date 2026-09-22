import { Box, Container, Typography } from "@mui/material";
import RevealBox from "@/components/common/RevealBox";
import { DOCTORS } from "@/data/doctors";
import { DISPLAY_FONT } from "@/theme/theme";

export default function DoctorsSection() {
  return (
    <Box component="section" id="doctors" sx={{ py: { xs: "84px", md: "120px" } }}>
      <Container maxWidth="lg">
        <RevealBox sx={{ maxWidth: 640, mb: 7 }}>
          <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,3.3rem)", lineHeight: 1.05 }}>
            Meet your dentists
          </Typography>
          <Typography sx={{ color: "tokens.ink2", mt: "14px", fontSize: "1.08rem" }}>
            Specialists who have been practising together for over a decade.
          </Typography>
        </RevealBox>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3,1fr)" }, gap: "24px" }}>
          {DOCTORS.map((doctor, i) => (
            <RevealBox key={doctor.name} index={i} sx={{ textAlign: "left" }}>
              <Box
                sx={{
                  aspectRatio: "4/5",
                  borderRadius: "28px",
                  background: "linear-gradient(160deg, #D8EEEE, #B6DCDA)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: DISPLAY_FONT,
                  fontSize: "4rem",
                  fontWeight: 800,
                  color: "tokens.aquaDeep",
                  overflow: "hidden",
                  position: "relative",
                  mb: "18px",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    bgcolor: "tokens.ink",
                    transform: "translateY(101%)",
                    transition: "transform .6s cubic-bezier(.7,0,.2,1)",
                  },
                  "&:hover::after": { transform: "none" },
                  "& span": { position: "relative", zIndex: 1, transition: "color .6s, transform .6s" },
                  "&:hover span": { color: "tokens.sky", transform: "scale(1.15) rotate(-4deg)" },
                }}
              >
                <span>{doctor.initials}</span>
              </Box>
              <Typography variant="h3" sx={{ fontSize: "1.3rem" }}>
                {doctor.name}
              </Typography>
              <Typography sx={{ color: "tokens.ink2" }}>{doctor.role}</Typography>
            </RevealBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
