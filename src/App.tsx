import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Loader from "@/components/layout/Loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/layout/BackToTopButton";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CareSection from "@/components/sections/CareSection";
import ProcessSection from "@/components/sections/ProcessSection";
import DoctorsSection from "@/components/sections/DoctorsSection";
import ResultsSection from "@/components/sections/ResultsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactSection from "@/components/sections/ContactSection";
import { useScrollY } from "@/hooks/useScrollY";
import { useActiveSection } from "@/hooks/useActiveSection";
import { MENU } from "@/data/menu";

const SECTION_IDS = MENU.map((item) => item.id);

export default function App() {
  const [ready, setReady] = useState(false);
  const scrollY = useScrollY();
  const active = useActiveSection(SECTION_IDS, "home");

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <Box>
      <Loader done={ready} />
      <Header scrolled={scrollY > 20} active={active} />

      <Box component="main">
        <HeroSection ready={ready} />
        <ServicesSection />
        <CareSection />
        <ProcessSection />
        <DoctorsSection />
        <ResultsSection />
        <ReviewsSection />
        <ContactSection />
      </Box>

      <Footer />
      <BackToTopButton visible={scrollY > 600} />
    </Box>
  );
}
