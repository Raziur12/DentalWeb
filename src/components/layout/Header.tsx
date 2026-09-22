import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import ToothIcon from "@/components/icons/ToothIcon";
import { MENU } from "@/data/menu";
import { DISPLAY_FONT } from "@/theme/theme";

interface HeaderProps {
  scrolled: boolean;
  active: string;
}

export default function Header({ scrolled, active }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (onClick?: () => void) =>
    MENU.map(({ id, label }) => (
      <Box
        key={id}
        component="a"
        href={`#${id}`}
        onClick={onClick}
        sx={{
          position: "relative",
          padding: isMobile ? "12px 14px" : "8px 14px",
          borderRadius: 999,
          fontWeight: 500,
          fontSize: isMobile ? "1.2rem" : "inherit",
          display: isMobile ? "block" : "inline-block",
          color: active === id ? "tokens.ink" : "tokens.ink2",
          bgcolor: active === id ? "tokens.sky" : "transparent",
          transition: "color .3s, background-color .3s",
          "&:hover": { color: "tokens.ink", bgcolor: "tokens.sky" },
        }}
      >
        {label}
      </Box>
    ));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? "rgba(243,247,247,.86)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--mui-palette-divider, #D3E2E2)" : "none",
        transition: "background-color .4s, box-shadow .4s",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 76, justifyContent: "space-between" }}>
          <Box
            component="a"
            href="#home"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: DISPLAY_FONT,
              fontWeight: 800,
              fontSize: "1.35rem",
              color: "tokens.ink",
            }}
          >
            <ToothIcon fill="#2FA7A0" />
            Tental
          </Box>

          {!isMobile && (
            <Box component="nav" sx={{ display: "flex", gap: "6px" }}>
              {navLinks()}
            </Box>
          )}

          {!isMobile && (
            <Button href="#contact" variant="contained" color="primary" sx={{ bgcolor: "tokens.ink", "&:hover": { bgcolor: "tokens.aquaDeep" } }}>
              Book a visit
            </Button>
          )}

          {isMobile && (
            <IconButton aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <MenuIcon sx={{ color: "tokens.ink" }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="top" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pb: 3, px: 2 }}>
          {MENU.map(({ id, label }) => (
            <ListItemButton
              key={id}
              component="a"
              href={`#${id}`}
              selected={active === id}
              onClick={() => setMenuOpen(false)}
              sx={{ borderRadius: 999, mb: 0.5 }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: "1.2rem", fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
          <ListItemButton
            component="a"
            href="#contact"
            onClick={() => setMenuOpen(false)}
            sx={{ mt: 1, borderRadius: 999, bgcolor: "tokens.ink", color: "#fff", "&:hover": { bgcolor: "tokens.aquaDeep" } }}
          >
            <ListItemText primary="Book a visit" primaryTypographyProps={{ fontWeight: 600, textAlign: "center" }} />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}
