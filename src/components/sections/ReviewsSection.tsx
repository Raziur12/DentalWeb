import { Box, Container, Typography, keyframes } from "@mui/material";
import RevealBox from "@/components/common/RevealBox";
import { REVIEWS } from "@/data/reviews";

const marquee = keyframes`to { transform: translateX(-50%); }`;

export default function ReviewsSection() {
  const track = [...REVIEWS, ...REVIEWS];

  return (
    <Box component="section" id="reviews" sx={{ py: { xs: "84px", md: "120px" }, overflow: "hidden" }}>
      <Container maxWidth="lg">
        <RevealBox sx={{ maxWidth: 640, mb: 7 }}>
          <Typography variant="h2" sx={{ fontSize: "clamp(2rem,4vw,3.3rem)", lineHeight: 1.05 }}>
            What patients say
          </Typography>
        </RevealBox>
      </Container>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
          width: "max-content",
          animation: `${marquee} 40s linear infinite`,
          "&:hover": { animationPlayState: "paused" },
        }}
      >
        {track.map((review, i) => (
          <Box
            key={i}
            sx={{
              width: { xs: 290, sm: 360 },
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "tokens.line",
              borderRadius: "28px",
              p: 3.5,
            }}
          >
            <Box sx={{ color: "#E5A93B", letterSpacing: "2px" }}>★★★★★</Box>
            <Typography sx={{ my: "12px 0 18px", mt: 1.5, mb: 2.25, fontSize: "1.02rem" }}>“{review.quote}”</Typography>
            <Typography component="strong" sx={{ display: "block" }}>
              {review.name}
            </Typography>
            <Typography component="small" sx={{ color: "tokens.ink2" }}>
              {review.service}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
