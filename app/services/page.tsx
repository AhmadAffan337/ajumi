import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { CTABanner } from "@/components/CTABanner";
import { ServicesGrid } from "./ServicesGrid";
import { getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoById("services");
  if (!seo) return { title: "Services — Ajumi AI" };
  return buildMetadata(seo) as Metadata;
}

export default function ServicesPage() {
  const seo = getSeoById("services");
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  return (
    <PageShell
      eyebrow="Our Services"
      title={<>Technical SEO, paid media, <span className="text-ember italic">& creative</span>.</>}
      intro="We operate as your embedded senior growth team — handling SEO, paid ads, AI search visibility and customer follow-up so more of your leads become customers."
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ServicesGrid />
      <CTABanner />
    </PageShell>
  );
}
