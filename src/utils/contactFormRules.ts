import type { ContactFormField, ContactFormValues } from "@/types";

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  message: "",
};

export const CONTACT_FORM_RULES: Partial<Record<ContactFormField, (value: string) => string>> = {
  name: (v) => (v.trim().length < 2 ? "Enter your full name" : ""),
  phone: (v) => (!/^[+\d][\d\s-]{8,14}$/.test(v.trim()) ? "Enter a valid phone number" : ""),
  email: (v) => (v && !/^\S+@\S+\.\S+$/.test(v) ? "Enter a valid email, or leave it blank" : ""),
  service: (v) => (!v ? "Choose a treatment" : ""),
};
