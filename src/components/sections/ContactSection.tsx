import { Box, Container, Typography } from "@mui/material";
import RevealBox from "@/components/common/RevealBox";
import ContactForm from "@/components/common/ContactForm";

const INFO = [
  { label: "Clinic", value: "22, Green Park Main, New Delhi 110016" },
  { label: "Phone", value: "+91 98100 00000" },
  { label: "Email", value: "hello@tental.in" },
  { label: "Hours", value: "Mon – Sat, 9:00 am to 8:00 pm" },
];

export default function ContactSection() {
  return (
    <Box component="section" id="contact" sx={{ py: { xs: "84px", md: "120px" } }}>
      <Container maxWidth="lg" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: ".9fr 1.1fr" }, gap: { xs: "32px", md: "48px" } }}>
        <RevealBox sx={{ display: "grid", gap: "22px", alignContent: "start" }}>
          <Box sx={{ mb: "10px" }}>
            <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,3.3rem)", lineHeight: 1.05 }}>
              Book a visit
            </Typography>
            <Typography sx={{ color: "tokens.ink2", mt: "14px", fontSize: "1.08rem" }}>
              Send the form and we'll call within 2 working hours to confirm your time.
            </Typography>
          </Box>
          {INFO.map((item) => (
            <Box key={item.label} sx={{ pb: "18px", borderBottom: "1px solid", borderColor: "tokens.line" }}>
              <Typography component="strong" sx={{ display: "block", fontSize: "1.1rem" }}>
                {item.label}
              </Typography>
              <Typography component="span" sx={{ color: "tokens.ink2" }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </RevealBox>
        <ContactForm />
      </Container>
    </Box>
  );
}
