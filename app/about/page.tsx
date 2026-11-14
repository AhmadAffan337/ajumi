import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { About } from "@/components/About";
import { CTABanner } from "@/components/CTABanner";
import { getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoById("about");
  if (!seo) return { title: "About — Ajumi AI" };
  return buildMetadata(seo) as Metadata;
}

export default function AboutPage() {
  const seo = getSeoById("about");
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  return (
    <PageShell
      eyebrow="About Us"
      title={<>The studio behind <span className="text-ember italic">the growth</span>.</>}
      intro="We are a senior team of technical SEO architects, performance media buyers, content strategists, and analytics engineers — helping ambitious brands scale compounding online revenue."
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <About />
      <CTABanner />
    </PageShell>
  );
}
