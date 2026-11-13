import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { BlogGrid } from "./BlogGrid";
import { getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoById("blog");
  if (!seo) return { title: "Blog — Ajumi AI" };
  return buildMetadata(seo) as Metadata;
}

export default function BlogPage() {
  const seo = getSeoById("blog");
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  return (
    <PageShell
      eyebrow="Blog"
      title={<>SEO & growth <span className="text-ember italic">intelligence</span>.</>}
      intro="Actionable playbooks on technical SEO, paid media scaling, creator content strategy, and clear revenue reporting — written by our senior growth team."
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogGrid />
    </PageShell>
  );
}
