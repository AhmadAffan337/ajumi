import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ParticleField } from "@/components/ParticleField";
import { ClientOnly } from "@/components/ClientOnly";
import { Problems } from "@/components/Problems";
import { Industries } from "@/components/Industries";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Works } from "@/components/Works";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Methodology } from "@/components/Methodology";
import { CTABanner } from "@/components/CTABanner";
import { Pricing } from "@/components/Pricing";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getSeoById, buildMetadata, getJsonLdSchema } from "@/lib/seoStore";

export async function generateMetadata(): Promise<Metadata> {
  const seo = getSeoById("home");
  if (!seo) return { title: "Ajumi AI — Digital Marketing Agency" };
  return buildMetadata(seo) as Metadata;
}

export default function Home() {
  const seo = getSeoById("home");
  const jsonLd = seo ? getJsonLdSchema(seo) : null;

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-clip">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ClientOnly>
        <ParticleField density={90} />
      </ClientOnly>
      <Navbar />
      
      {/* Hero Section - Full impact opening */}
      <Hero />
      
      {/* Main Content Sections with Smooth Scroll Reveal Animations */}
      <div className="space-y-0">
        {/* Problems - lead with the customer's pain */}
        <Problems />

        {/* About - Company introduction */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ember/[0.02] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]" />
          <About />
        </div>
        
        {/* Services - What we offer */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]" />
          <Services />
        </div>
        
        {/* Industries - who we help */}
        <Industries />

        {/* Works - Portfolio showcase */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]" />
          <Works />
        </div>
        
        {/* Process - How we work */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]" />
          <ProcessTimeline />
        </div>
        
        {/* Methodology - Our approach */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_0.8s_forwards]" />
          <Methodology />
        </div>
        
        {/* CTA Banner - Strategic conversion point */}
        <div className="py-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ember/[0.03] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]" />
          <CTABanner />
        </div>
        
        {/* Pricing - Investment options */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_1.6s_forwards]" />
          <Pricing />
        </div>
        
        {/* Blog - Thought leadership */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/[0.02] to-transparent opacity-0 animate-[fadeIn_0.8s_ease-out_1.8s_forwards]" />
          <Blog />
        </div>
      </div>
      
      {/* Footer Section - Contact and closing */}
      <div className="mt-0">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
