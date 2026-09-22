import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";
import "@fontsource/bricolage-grotesque/500.css";
import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";

export default function AppGlobalStyles() {
  const theme = useTheme();
  return (
    <GlobalStyles
      styles={{
        "*": { boxSizing: "border-box" },
        body: {
          overflowX: "hidden",
          lineHeight: 1.6,
          background: theme.palette.background.default,
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
        },
      }}
    />
  );
}
