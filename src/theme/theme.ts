import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tokens: {
      ink: string;
      ink2: string;
      porcelain: string;
      sky: string;
      gum: string;
      line: string;
      aquaDeep: string;
    };
  }
  interface PaletteOptions {
    tokens?: Palette["tokens"];
  }
  interface Theme {
    radii: { lg: number; sm: number };
  }
  interface ThemeOptions {
    radii?: { lg: number; sm: number };
  }
}

const tokens = {
  ink: "#0F2733",
  ink2: "#3C5561",
  porcelain: "#F3F7F7",
  aqua: "#2FA7A0",
  aquaDeep: "#1C7C77",
  sky: "#D8EEEE",
  gum: "#E7838C",
  line: "#D3E2E2",
};

export const DISPLAY_FONT = '"Bricolage Grotesque", "Segoe UI", system-ui, sans-serif';
export const BODY_FONT = '"Figtree", "Segoe UI", system-ui, sans-serif';

export const theme = createTheme({
  radii: { lg: 28, sm: 12 },
  palette: {
    mode: "light",
    primary: { main: tokens.aqua, dark: tokens.aquaDeep, contrastText: "#FFFFFF" },
    secondary: { main: tokens.gum, contrastText: "#FFFFFF" },
    background: { default: tokens.porcelain, paper: "#FFFFFF" },
    text: { primary: tokens.ink, secondary: tokens.ink2 },
    divider: tokens.line,
    tokens: {
      ink: tokens.ink,
      ink2: tokens.ink2,
      porcelain: tokens.porcelain,
      sky: tokens.sky,
      gum: tokens.gum,
      line: tokens.line,
      aquaDeep: tokens.aquaDeep,
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: BODY_FONT,
    h1: { fontFamily: DISPLAY_FONT, fontWeight: 800, letterSpacing: "-.035em" },
    h2: { fontFamily: DISPLAY_FONT, fontWeight: 700, letterSpacing: "-.03em" },
    h3: { fontFamily: DISPLAY_FONT, fontWeight: 700, letterSpacing: "-.025em" },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "14px 26px",
          transition: "transform .3s cubic-bezier(.3,1.6,.5,1), background .3s",
          "&:hover": { transform: "translateY(-3px)" },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth", scrollPaddingTop: "84px" },
        "img": { maxWidth: "100%" },
        "a": { color: "inherit", textDecoration: "none" },
      },
    },
  },
});
