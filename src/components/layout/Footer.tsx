import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 5, borderTop: "1px solid", borderColor: "tokens.line", color: "tokens.ink2", fontSize: ".95rem" }}>
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <Typography variant="body2" color="inherit">© 2026 Tental Dental Studio, New Delhi</Typography>
        <Typography variant="body2" color="inherit">Made with care for healthy smiles</Typography>
      </Container>
    </Box>
  );
}
