import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { CTABanner } from "@/components/CTABanner";
import { industries, getIndustry } from "@/lib/industries";
import { getSeoById, buildMetadata } from "@/lib/seoStore";
import { ArrowRight, Check } from "lucide-react";

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = getSeoById(`industry-${slug}`);
  if (seo) return buildMetadata(seo) as Metadata;
  const ind = getIndustry(slug);
  return { title: ind ? `${ind.name} Marketing Across the US — Ajumi AI` : "Industries — Ajumi AI" };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();

  return (
    <PageShell eyebrow={ind.name} title={ind.headline} intro={ind.problem}>
      <div className="px-8 md:px-14 max-w-[1500px] mx-auto pb-24 space-y-16">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">Sound familiar?</h2>
          <ul className="grid md:grid-cols-3 gap-4">
            {ind.painPoints.map((p) => (
              <li key={p} className="flex items-start gap-3 p-6 rounded-xl border border-white/10 bg-white/[0.02] text-white/75">
                <Check className="w-4 h-4 text-ember mt-1 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">How we help</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ind.solutions.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:border-ember/50 transition-colors"
              >
                <h3 className="font-display text-2xl text-white group-hover:text-ember transition-colors">{s.title}</h3>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ember">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <CTABanner />
    </PageShell>
  );
}
