import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { CTABanner } from "@/components/CTABanner";
import { getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoById("pricing");
  if (!seo) return { title: "Pricing — Ajumi AI" };
  return buildMetadata(seo) as Metadata;
}

export default function PricingPage() {
  const seo = getSeoById("pricing");
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  return (
    <PageShell
      eyebrow="Pricing"
      title={<>Simple, <span className="text-ember italic">flexible</span> plans.</>}
      intro="Clear monthly plans built for return on investment. Every plan includes dedicated specialists, accurate ad tracking and plain-English revenue reporting."
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Pricing />
      <Contact />
      <CTABanner />
    </PageShell>
  );
}
