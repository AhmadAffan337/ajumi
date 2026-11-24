import { z } from "zod";

/** Options shown on the contact form. The server only accepts these values. */
export const CONTACT_SERVICES = [
  "SEO",
  "Paid Advertising",
  "Social Media",
  "Content Marketing",
  "Email & CRM",
  "Brand & Creative",
  "Not sure yet",
] as const;

export const CONTACT_BUDGETS = [
  "< $5k / month",
  "$5k – $15k / month",
  "$15k – $30k / month",
  "$30k+ / month",
] as const;

/** Submissions faster than this (ms after the form loaded) are treated as bots. */
export const MIN_FILL_TIME_MS = 3000;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().max(200, "Email is too long").email("Please enter a valid email"),
  company: z.string().trim().max(150, "Company name is too long").optional().default(""),
  services: z.array(z.enum(CONTACT_SERVICES)).max(CONTACT_SERVICES.length).optional().default([]),
  budget: z.enum(CONTACT_BUDGETS).optional(),
  message: z.string().trim().max(5000, "Message is too long (max 5,000 characters)").optional().default(""),
  /** Honeypot: hidden from humans, so it must stay empty. */
  website: z.string().max(0).optional().default(""),
  /** Timestamp (ms) of when the form was rendered. */
  startedAt: z.number().int().positive(),
  /** Page the form was submitted from. */
  page: z.string().max(300).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
