import { Box, Button, Container, Typography } from "@mui/material";
import RevealBox from "@/components/common/RevealBox";
import TreatmentScene from "@/components/common/TreatmentScene";
import { CARE } from "@/data/care";
import { DISPLAY_FONT } from "@/theme/theme";

export default function CareSection() {
  return (
    <Box component="section" id="care" sx={{ py: { xs: "84px", md: "120px" } }}>
      <Container maxWidth="lg">
        <RevealBox sx={{ maxWidth: 640, mb: 7 }}>
          <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,3.3rem)", lineHeight: 1.05 }}>
            What your treatment actually looks like
          </Typography>
          <Typography sx={{ color: "tokens.ink2", mt: "14px", fontSize: "1.08rem" }}>
            Drag or move over each scene to look around the chair.
          </Typography>
        </RevealBox>

        <Box sx={{ display: "grid", gap: { xs: "80px", md: "110px" } }}>
          {CARE.map((item, idx) => {
            const flip = idx % 2 === 1;
            return (
              <Box
                key={item.variant}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: flip ? "1.1fr 1fr" : "1fr 1.1fr" },
                  gap: { xs: "28px", md: "64px" },
                  alignItems: "center",
                }}
              >
                <RevealBox sx={{ order: { xs: 0, md: flip ? 2 : 0 } }}>
                  <Typography variant="h3" sx={{ fontSize: "clamp(1.7rem,3vw,2.5rem)", lineHeight: 1.08 }}>
                    {item.heading}
                  </Typography>
                  <Typography sx={{ color: "tokens.ink2", my: "16px 0 22px", mt: 2, mb: 2.75, fontSize: "1.06rem", maxWidth: "48ch" }}>
                    {item.description}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: "none", display: "grid", gap: "12px", mb: 3.5, p: 0 }}>
                    {item.bullets.map((bullet) => (
                      <Box
                        component="li"
                        key={bullet}
                        sx={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
                      >
                        <Box
                          sx={{
                            flex: "none",
                            width: 22,
                            height: 22,
                            mt: "2px",
                            borderRadius: "50%",
                            bgcolor: "tokens.sky",
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231C7C77' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 12.5l4 4 8-9'/%3E%3C/svg%3E\")",
                            backgroundPosition: "center",
                            backgroundSize: "14px",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                        {bullet}
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", gap: "28px", mb: 3.25, color: "tokens.ink2", fontSize: ".95rem" }}>
                    {item.meta.map((m) => (
                      <Box key={m.label}>
                        <Typography component="strong" sx={{ display: "block", fontFamily: DISPLAY_FONT, fontSize: "1.25rem", color: "tokens.ink" }}>
                          {m.value}
                        </Typography>
                        {m.label}
                      </Box>
                    ))}
                  </Box>
                  <Button href="#contact" variant="contained" sx={{ bgcolor: "tokens.ink", "&:hover": { bgcolor: "tokens.aquaDeep" } }}>
                    {item.cta}
                  </Button>
                </RevealBox>

                <Box sx={{ order: { xs: 0, md: flip ? 1 : 1 } }}>
                  <TreatmentScene variant={item.variant} steps={item.steps} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
