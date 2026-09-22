import type { ReactNode } from "react";

export interface Service {
  title: string;
  description: string;
  price: string;
  icon: ReactNode;
}

export interface Review {
  quote: string;
  name: string;
  service: string;
}

export interface MenuItem {
  id: string;
  label: string;
}

export interface Doctor {
  initials: string;
  name: string;
  role: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  label: string;
}

export interface CareMeta {
  value: string;
  label: string;
}

export type TreatmentVariant = "checkup" | "scan" | "whitening";

export interface CareItem {
  variant: TreatmentVariant;
  heading: string;
  description: string;
  bullets: string[];
  meta: CareMeta[];
  cta: string;
  steps: string[];
}

export interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  message: string;
}

export type ContactFormField = keyof ContactFormValues;
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export interface SceneDisposer {
  (): void;
}
