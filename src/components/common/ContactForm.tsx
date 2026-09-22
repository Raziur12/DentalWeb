import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  keyframes,
} from "@mui/material";
import { useReveal } from "@/hooks/useReveal";
import { SERVICES } from "@/data/services";
import { CONTACT_FORM_RULES, EMPTY_CONTACT_FORM } from "@/utils/contactFormRules";
import type { ContactFormErrors, ContactFormField, ContactFormValues } from "@/types";

const shake = keyframes`25% { transform: translateX(-6px); } 75% { transform: translateX(6px); }`;

export default function ContactForm() {
  const { ref, sx: revealSx } = useReveal();
  const [form, setForm] = useState<ContactFormValues>(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const setField = (key: ContactFormField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const blurField = (key: ContactFormField) => () => {
    const rule = CONTACT_FORM_RULES[key];
    if (rule) setErrors((prev) => ({ ...prev, [key]: rule(form[key]) }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: ContactFormErrors = {};
    (Object.keys(CONTACT_FORM_RULES) as ContactFormField[]).forEach((key) => {
      const rule = CONTACT_FORM_RULES[key];
      if (rule) nextErrors[key] = rule(form[key]);
    });
    setErrors(nextErrors);
    setShakeKey((n) => n + 1);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSending(true);
    // TODO: wire up a real API / EmailJS / Formspree endpoint here.
    console.log("Contact form submitted:", form);
    setTimeout(() => {
      setSending(false);
      setDone(true);
      setForm(EMPTY_CONTACT_FORM);
    }, 1200);
  };

  const fieldSx = (key: ContactFormField) => ({
    animation: errors[key] ? `${shake} .4s` : "none",
  });

  return (
    <Box
      component="form"
      ref={ref}
      noValidate
      onSubmit={submit}
      sx={{
        ...revealSx,
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "tokens.line",
        borderRadius: "28px",
        p: { xs: 3, sm: 4.5 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: "18px",
      }}
    >
      <TextField
        key={`name${shakeKey}`}
        label="Full name"
        id="name"
        autoComplete="name"
        value={form.name}
        onChange={setField("name")}
        onBlur={blurField("name")}
        error={Boolean(errors.name)}
        helperText={errors.name}
        sx={fieldSx("name")}
      />
      <TextField
        key={`phone${shakeKey}`}
        label="Phone"
        id="phone"
        type="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={setField("phone")}
        onBlur={blurField("phone")}
        error={Boolean(errors.phone)}
        helperText={errors.phone}
        sx={fieldSx("phone")}
      />
      <TextField
        key={`email${shakeKey}`}
        label="Email"
        id="email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={setField("email")}
        onBlur={blurField("email")}
        error={Boolean(errors.email)}
        helperText={errors.email}
        sx={fieldSx("email")}
      />
      <TextField
        key={`service${shakeKey}`}
        select
        label="Treatment"
        id="service"
        value={form.service}
        onChange={setField("service")}
        onBlur={blurField("service")}
        error={Boolean(errors.service)}
        helperText={errors.service}
        sx={fieldSx("service")}
      >
        <MenuItem value="">Choose one</MenuItem>
        {SERVICES.map((s) => (
          <MenuItem key={s.title} value={s.title}>
            {s.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Preferred date"
        id="date"
        type="date"
        value={form.date}
        onChange={setField("date")}
        InputLabelProps={{ shrink: true }}
        sx={{ gridColumn: "1 / -1" }}
      />
      <TextField
        label="Anything we should know?"
        id="message"
        placeholder="Pain, sensitivity, past treatment…"
        value={form.message}
        onChange={setField("message")}
        multiline
        minRows={4}
        sx={{ gridColumn: "1 / -1" }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={sending}
        sx={{ gridColumn: "1 / -1", py: 2, bgcolor: "tokens.ink", "&:hover": { bgcolor: "tokens.aquaDeep" } }}
      >
        {sending ? (
          <>
            <CircularProgress size={18} sx={{ color: "#fff", mr: 1.5 }} />
            Sending
          </>
        ) : (
          "Request appointment"
        )}
      </Button>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "background.paper",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          p: "30px",
          clipPath: done ? "circle(150% at 50% 100%)" : "circle(0% at 50% 100%)",
          transition: "clip-path .9s cubic-bezier(.7,0,.2,1)",
        }}
      >
        <Box>
          <Box component="svg" viewBox="0 0 84 84" fill="none" sx={{ width: 84, mx: "auto", mb: 2 }}>
            <circle cx="42" cy="42" r="40" fill="#D8EEEE" />
            <path
              d="M26 43l11 11 21-23"
              stroke="#1C7C77"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 60,
                strokeDashoffset: done ? 0 : 60,
                transition: "stroke-dashoffset .8s .6s",
              }}
            />
          </Box>
          <Typography variant="h3" sx={{ fontSize: "1.8rem" }}>
            Request received
          </Typography>
          <Typography sx={{ color: "tokens.ink2", my: "8px 0 20px", mt: 1, mb: 2.5 }}>
            We'll call you shortly to confirm your appointment.
          </Typography>
          <Button variant="outlined" onClick={() => setDone(false)} sx={{ color: "tokens.ink", boxShadow: "inset 0 0 0 1.5px currentColor" }}>
            Send another request
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
