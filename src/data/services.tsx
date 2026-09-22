import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    title: "Checkup & cleaning",
    description: "Exam, scaling and polishing, with a written report of your teeth.",
    price: "From ₹999",
    icon: <path d="M4 12h16M12 4v16" />,
  },
  {
    title: "Braces & aligners",
    description: "Metal, ceramic or clear aligners planned with a 3D preview.",
    price: "From ₹35,000",
    icon: <path d="M3 12c3-4 15-4 18 0M3 12c3 4 15 4 18 0M8 10v4M12 9.5v5M16 10v4" />,
  },
  {
    title: "Root canal",
    description: "Single-sitting rotary root canal with proper numbing.",
    price: "From ₹4,500",
    icon: <path d="M12 3v18M8 7l4 4 4-4M8 15l4 4 4-4" />,
  },
  {
    title: "Dental implants",
    description: "Titanium implants and crowns that look and bite like real teeth.",
    price: "From ₹28,000",
    icon: <path d="M8 4h8l-1 6H9zM10 10h4M10 13h4M10.5 16h3M11 19h2" />,
  },
  {
    title: "Teeth whitening",
    description: "In-clinic whitening, several shades lighter in about an hour.",
    price: "From ₹6,000",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M5 19l2-2" />
      </>
    ),
  },
  {
    title: "Kids dentistry",
    description: "Gentle first visits, sealants and fluoride for little teeth.",
    price: "From ₹799",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 14c2 2 5 2 7 0M9 9.5h.01M15 9.5h.01" />
      </>
    ),
  },
];
