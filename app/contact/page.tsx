import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Contact } from "@/components/Contact";
import { CTABanner } from "@/components/CTABanner";
import { ContactForm } from "./ContactForm";
import { getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoById("contact");
  if (!seo) return { title: "Contact — Ajumi AI" };
  return buildMetadata(seo) as Metadata;
}

export default function ContactPage() {
  const seo = getSeoById("contact");
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  return (
    <PageShell
      eyebrow="Contact"
      title={<>Let&apos;s <span className="text-ember italic">talk</span>.</>}
      intro="Schedule a growth consultation with our technical SEO architects and performance media buyers. We will audit your current marketing stack and deliver an actionable revenue scaling roadmap within 24 hours."
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ContactForm />
      <Contact />
    </PageShell>
  );
}
