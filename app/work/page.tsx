import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Works } from "@/components/Works";
import { CTABanner } from "@/components/CTABanner";
import { getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoById("work");
  if (!seo) return { title: "Work — Ajumi AI" };
  return buildMetadata(seo) as Metadata;
}

export default function WorkPage() {
  const seo = getSeoById("work");
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  return (
    <PageShell
      eyebrow="Selected Work"
      title={<>Revenue results, <span className="text-ember italic">verified</span>.</>}
      intro="Case studies spanning DTC e-commerce, B2B SaaS, and mobile apps — every campaign built around measurable results: more revenue per ad dollar, more website traffic, and more customers."
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Works />
      <CTABanner />
    </PageShell>
  );
}
