import type { CareItem } from "@/types";

export const CARE: CareItem[] = [
  {
    variant: "checkup",
    heading: "A checkup that doesn't feel rushed",
    description:
      "Your dentist checks every tooth under a bright, shadow-free light, then cleans and polishes. You get a simple report of what's healthy and what needs watching.",
    bullets: ["Full exam of teeth, gums and bite", "Scaling and polishing to remove tartar", "Written report you can keep"],
    meta: [
      { value: "30 min", label: "In the chair" },
      { value: "₹999", label: "Checkup & cleaning" },
    ],
    cta: "Book a checkup",
    steps: ["Examining each tooth", "Checking gum health", "Polishing and cleaning"],
  },
  {
    variant: "scan",
    heading: "See your teeth in 3D before anything starts",
    description:
      "A small wand scans your mouth in about two minutes. The 3D model appears on screen right away, so you see exactly what we see, with no messy moulds.",
    bullets: ["No gag-inducing impression trays", "Plan braces, aligners and crowns on the model", "Compare scans over time"],
    meta: [
      { value: "2 min", label: "Full-mouth scan" },
      { value: "Free", label: "With any treatment plan" },
    ],
    cta: "Book a 3D scan",
    steps: ["Scanning upper teeth", "Building 3D model", "Model ready to review"],
  },
  {
    variant: "whitening",
    heading: "Whitening under a gentle blue light",
    description:
      "After protecting your gums, we apply the whitening gel and activate it with a cool LED light. Most patients go several shades lighter in a single visit.",
    bullets: ["Gums shielded before the gel goes on", "Low-heat LED, no burning sensation", "Shade checked before and after"],
    meta: [
      { value: "60 min", label: "Single sitting" },
      { value: "₹6,000", label: "In-clinic whitening" },
    ],
    cta: "Book whitening",
    steps: ["Protecting the gums", "Activating with LED light", "Checking the new shade"],
  },
];
