"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Globe, Save, Check, ExternalLink, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle2, X, RefreshCw, AtSign, Share2, Code2,
  Settings2, Tag, Image, FileText, BarChart3, LogOut,
} from "lucide-react";

type RobotsDirective = "index, follow" | "noindex, follow" | "index, nofollow" | "noindex, nofollow";
type OGType = "website" | "article" | "product" | "profile";
type TwitterCard = "summary" | "summary_large_image" | "app" | "player";
type SchemaType = "Organization" | "WebPage" | "Article" | "Service" | "LocalBusiness" | "FAQPage" | "BreadcrumbList";
type SitemapPriority = "1.0" | "0.9" | "0.8" | "0.7" | "0.5" | "0.3" | "0.1";
type SitemapFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type PageSEO = {
  id: string;
  path: string;
  label: string;
  category: string;
  // Basic
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: OGType;
  ogSiteName: string;
  // Twitter
  twitterCard: TwitterCard;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  // Schema
  schemaType: SchemaType;
  schemaJson: string;
  // Technical
  robots: RobotsDirective;
  sitemapPriority: SitemapPriority;
  sitemapFreq: SitemapFreq;
};

const BASE_URL = "https://ajumi.ai";

function makeDefaultSchema(type: SchemaType, label: string, path: string, desc: string): string {
  if (type === "Organization") {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Ajumi AI",
      "url": BASE_URL,
      "logo": `${BASE_URL}/images/logo.png`,
      "description": desc,
      "sameAs": ["https://twitter.com/ajumiai", "https://linkedin.com/company/ajumiai"],
    }, null, 2);
  }
  if (type === "Article") {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": label,
      "description": desc,
      "url": `${BASE_URL}${path}`,
      "publisher": { "@type": "Organization", "name": "Ajumi AI", "url": BASE_URL },
      "datePublished": "2026-01-01",
      "dateModified": "2026-07-20",
    }, null, 2);
  }
  if (type === "Service") {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": label,
      "description": desc,
      "provider": { "@type": "Organization", "name": "Ajumi AI", "url": BASE_URL },
      "url": `${BASE_URL}${path}`,
    }, null, 2);
  }
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    "name": label,
    "description": desc,
    "url": `${BASE_URL}${path}`,
  }, null, 2);
}

function buildDefaultPage(id: string, path: string, label: string, category: string, title: string, description: string, schemaType: SchemaType = "WebPage"): PageSEO {
  return {
    id, path, label, category,
    title, description,
    keywords: `digital marketing, ${label.toLowerCase()}, SEO, paid media, Ajumi AI`,
    canonical: `${BASE_URL}${path}`,
    ogTitle: title,
    ogDescription: description,
    ogImage: `${BASE_URL}/images/og-default.png`,
    ogType: category === "Blog Posts" ? "article" : "website",
    ogSiteName: "Ajumi AI",
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${BASE_URL}/images/og-default.png`,
    twitterSite: "@ajumiai",
    schemaType,
    schemaJson: makeDefaultSchema(schemaType, label, path, description),
    robots: "index, follow",
    sitemapPriority: path === "/" ? "1.0" : category === "Core" ? "0.8" : category === "Service Pages" ? "0.7" : "0.5",
    sitemapFreq: category === "Blog Posts" ? "monthly" : "weekly",
  };
}

const defaultPages: PageSEO[] = [
  buildDefaultPage("home", "/", "Home", "Core", "Ajumi AI — Digital Marketing Agency", "Ajumi AI is a full-service digital marketing studio blending SEO, paid media, social and content — engineered for measurable growth, sculpted for taste.", "Organization"),
  buildDefaultPage("about", "/about", "About", "Core", "About — Ajumi AI Digital Marketing Agency", "Ajumi AI is a full-service digital marketing agency blending strategy, creative and performance media for ambitious brands."),
  buildDefaultPage("services", "/services", "Services", "Core", "Services — Ajumi AI Digital Marketing", "SEO, paid media, social, content marketing, email and brand — a full-service marketing stack for ambitious brands."),
  buildDefaultPage("work", "/work", "Work", "Core", "Work — Ajumi AI Digital Marketing Agency", "Case studies of measurable growth: paid media, SEO, brand and creative campaigns for ambitious brands."),
  buildDefaultPage("pricing", "/pricing", "Pricing", "Core", "Pricing — Ajumi AI Digital Marketing", "Flexible monthly retainers and project pricing for ambitious brands."),
  buildDefaultPage("blog", "/blog", "Blog", "Core", "Blog — Ajumi AI Digital Marketing", "Essays and playbooks on SEO, paid media, brand strategy and digital growth."),
  buildDefaultPage("contact", "/contact", "Contact", "Core", "Contact — Ajumi AI Digital Marketing", "Get in touch with Ajumi AI. Book a strategy call or start a project."),
  buildDefaultPage("svc-seo", "/services/seo", "SEO & Organic Growth", "Service Pages", "SEO & Organic Growth — Ajumi AI", "Technical audits, topical authority frameworks and content programs that compound. We turn organic search into a defensible growth channel.", "Service"),
  buildDefaultPage("svc-social", "/services/social-media", "Social Media", "Service Pages", "Social Media Marketing — Ajumi AI", "Culture-first content and community management across Instagram, TikTok and LinkedIn.", "Service"),
  buildDefaultPage("svc-paid", "/services/paid-ads", "Paid Advertising", "Service Pages", "Paid Advertising — Ajumi AI", "Performance media on Google, Meta, TikTok and programmatic — engineered around ROAS, LTV and full-funnel measurement.", "Service"),
  buildDefaultPage("svc-content", "/services/content-marketing", "Content Marketing", "Service Pages", "Content Marketing — Ajumi AI", "Editorial content, video and thought leadership that turns attention into pipeline.", "Service"),
  buildDefaultPage("svc-email", "/services/email-crm", "Email & CRM", "Service Pages", "Email & CRM — Ajumi AI", "Lifecycle flows, segmentation and retention programs — the compounding revenue channel most brands underinvest in.", "Service"),
  buildDefaultPage("svc-brand", "/services/branding", "Brand & Creative", "Service Pages", "Brand & Creative — Ajumi AI", "Editorial identity systems, motion and design for modern digital brands — built to scale across every marketing surface.", "Service"),
  buildDefaultPage("svc-influencer", "/services/influencer-marketing", "Influencer Marketing", "Service Pages", "Influencer Marketing — Ajumi AI", "Creator collaborations and influencer marketing campaign scaling.", "Service"),
  buildDefaultPage("svc-cro", "/services/cro", "Conversion Rate Optimization", "Service Pages", "CRO — Ajumi AI", "A/B testing, user journey mapping, and landing page engineering. We optimize your digital storefront to convert high-intent traffic.", "Service"),
  buildDefaultPage("svc-affiliate", "/services/affiliate-marketing", "Affiliate Marketing", "Service Pages", "Affiliate & Partner Marketing — Ajumi AI", "Program setup, publisher outreach, and automated partner commission structures.", "Service"),
  buildDefaultPage("svc-analytics", "/services/analytics-strategy", "Data Analytics & Strategy", "Service Pages", "Data Analytics & Strategy — Ajumi AI", "Custom tracking architecture, dashboard engineering, and strategic marketing attribution.", "Service"),
  buildDefaultPage("blog-seo", "/blog/seo-2026-topical-authority", "SEO in 2026 Article", "Blog Posts", "SEO in 2026: Why Topical Authority Beats Keywords — Ajumi AI Blog", "How AI overviews and generative search are reshaping organic strategy.", "Article"),
  buildDefaultPage("blog-brand", "/blog/brand-identity-foundation", "Brand Identity Article", "Blog Posts", "Why a Strong Brand Identity Is the Foundation of Growth — Ajumi AI Blog", "How coherent brand systems unlock trust, retention and premium pricing.", "Article"),
  buildDefaultPage("blog-paid", "/blog/creative-testing-paid-ads", "Paid Ads Article", "Blog Posts", "The Creative Testing System We Use for Every Paid Account — Ajumi AI Blog", "Our repeatable framework for finding scalable creative on Meta and TikTok.", "Article"),
  buildDefaultPage("blog-email", "/blog/email-retention-channel", "Email Article", "Blog Posts", "Email Isn't Dead — It's Just Being Underinvested In — Ajumi AI Blog", "The compounding revenue channel most brands still leave on the table.", "Article"),
  buildDefaultPage("blog-analytics", "/blog/full-funnel-reporting-stack", "Analytics Article", "Blog Posts", "The Full-Funnel Reporting Stack We Build for Clients — Ajumi AI Blog", "From ad platforms to pipeline attribution — what actually informs decisions.", "Article"),
  buildDefaultPage("blog-content", "/blog/content-ops-systems", "Content Ops Article", "Blog Posts", "How We Approach Content Ops for a 12-Person Team — Ajumi AI Blog", "Repeatable systems for editorial cadence, quality control and repurposing.", "Article"),
];

const TITLE_MAX = 60;
const DESC_MAX = 160;
const KW_MAX = 255;

function ScoreBar({ value, max, min = 0 }: { value: number; max: number; min?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const isOver = value > max;
  const isShort = min > 0 && value < min;
  const color = isOver ? "bg-red-500" : isShort ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <span className={`text-[10px] tabular-nums ${isOver ? "text-red-400" : isShort ? "text-amber-400" : "text-emerald-400"}`}>
        {value}/{max}
      </span>
    </div>
  );
}

type Tab = "basic" | "og" | "twitter" | "schema" | "technical";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "basic", label: "Basic SEO", icon: <Tag className="w-3.5 h-3.5" /> },
  { id: "og", label: "Open Graph", icon: <Share2 className="w-3.5 h-3.5" /> },
  { id: "twitter", label: "Twitter Card", icon: <AtSign className="w-3.5 h-3.5" /> },
  { id: "schema", label: "Schema / JSON-LD", icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: "technical", label: "Technical", icon: <Settings2 className="w-3.5 h-3.5" /> },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] uppercase tracking-widest text-white/50">{label}</label>
        {hint && <span className="text-[10px] text-white/25">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, maxLength }: { value: string; onChange: (v: string) => void; placeholder?: string; maxLength?: number }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength ? maxLength + 50 : undefined}
      className="w-full bg-white/[0.04] border border-white/10 focus:border-ember rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 2 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/[0.04] border border-white/10 focus:border-ember rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 resize-none font-mono text-xs"
    />
  );
}

function Select<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: T[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full bg-[#121212] border border-white/10 focus:border-ember rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors cursor-pointer"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#1a1a1a] text-white py-1">
          {o}
        </option>
      ))}
    </select>
  );
}

function PageRow({ page, onSave }: { page: PageSEO; onSave: (updated: PageSEO) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const [draft, setDraft] = useState<PageSEO>(page);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(page);
  }, [page]);

  const update = (field: Partial<PageSEO>) => setDraft((d) => ({ ...d, ...field }));
  const isDirty = JSON.stringify(draft) !== JSON.stringify(page);
  const titleOk = draft.title.length >= 10 && draft.title.length <= TITLE_MAX;
  const descOk = draft.description.length >= 50 && draft.description.length <= DESC_MAX;
  const allGood = titleOk && descOk;

  let schemaValid = true;
  try { JSON.parse(draft.schemaJson); } catch { schemaValid = false; }

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${expanded ? "border-ember/30 bg-white/[0.015]" : "border-white/[0.08] hover:border-white/15"}`}>
      {/* Row Header */}
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`flex-shrink-0 w-2 h-2 rounded-full ${allGood ? "bg-emerald-500" : "bg-amber-500"}`} />
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="font-medium text-sm text-white">{page.label}</span>
              <span className="text-[10px] font-mono text-white/30 hidden sm:inline">{page.path}</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-white/30 hidden md:inline">{page.schemaType}</span>
            </div>
            <p className="text-xs text-white/35 truncate mt-0.5 max-w-[400px]">{draft.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {allGood
            ? <span className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-400"><CheckCircle2 className="w-3 h-3" /> Optimized</span>
            : <span className="hidden sm:flex items-center gap-1 text-[10px] text-amber-400"><AlertCircle className="w-3 h-3" /> Needs Work</span>}
          <Link href={page.path} target="_blank" onClick={(e) => e.stopPropagation()} className="text-white/25 hover:text-ember transition-colors">
            <ExternalLink className="w-4 h-4" />
          </Link>
          {expanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="border-t border-white/[0.06]">
              {/* Tab Bar */}
              <div className="flex gap-1 px-5 pt-4 overflow-x-auto">
                {TABS.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all duration-200 ${activeTab === tab.id ? "bg-ember text-white" : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"}`}>
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5 space-y-4">
                {/* ── BASIC TAB ── */}
                {activeTab === "basic" && (
                  <>
                    {/* Google Preview (Dark Mode Friendly) */}
                    <div className="p-4.5 rounded-xl bg-[#171717] border border-white/10 shadow-lg">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3 font-semibold">Google Search Preview (Dark Mode)</p>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-ember/20 border border-ember/30 flex items-center justify-center text-[10px] font-bold text-ember">
                          A
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-[#e8eaed] font-medium">Ajumi AI</span>
                          <span className="text-white/30">›</span>
                          <span className="text-[#81c995] font-mono text-[11px] truncate">ajumi.ai{page.path}</span>
                        </div>
                      </div>
                      <p className="text-[#8ab4f8] text-base font-medium leading-snug hover:underline cursor-pointer line-clamp-1 mb-1">
                        {draft.title || "Page Title"}
                      </p>
                      <p className="text-[#bdc1c6] text-xs leading-relaxed line-clamp-2">
                        {draft.description || "Meta description..."}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <Field label="Meta Title" hint={`${draft.title.length}/${TITLE_MAX} chars`}>
                        <ScoreBar value={draft.title.length} max={TITLE_MAX} min={10} />
                        <div className="mt-1.5">
                          <Input value={draft.title} onChange={(v) => update({ title: v, ogTitle: v, twitterTitle: v })} placeholder="Enter page title (10–60 chars)" />
                        </div>
                      </Field>
                      <Field label="Meta Description" hint={`${draft.description.length}/${DESC_MAX} chars`}>
                        <ScoreBar value={draft.description.length} max={DESC_MAX} min={50} />
                        <div className="mt-1.5">
                          <Textarea value={draft.description} onChange={(v) => update({ description: v, ogDescription: v, twitterDescription: v })} placeholder="Enter meta description (50–160 chars)" />
                        </div>
                      </Field>
                      <Field label="Meta Keywords" hint="comma-separated">
                        <Input value={draft.keywords} onChange={(v) => update({ keywords: v })} placeholder="seo, digital marketing, paid ads..." />
                      </Field>
                      <Field label="Canonical URL">
                        <Input value={draft.canonical} onChange={(v) => update({ canonical: v })} placeholder={`${BASE_URL}${page.path}`} />
                      </Field>
                    </div>
                  </>
                )}

                {/* ── OPEN GRAPH TAB ── */}
                {activeTab === "og" && (
                  <>
                    {/* OG Preview */}
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1c1e21]">
                      <div className="aspect-[1200/630] relative bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        {draft.ogImage ? (
                          <img src={draft.ogImage} alt="OG preview" className="w-full h-full object-cover opacity-40" onError={() => {}} />
                        ) : (
                          <Image className="w-10 h-10 text-white/10" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                      </div>
                      <div className="px-4 py-3 bg-[#1c1e21] border-t border-white/5">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">ajumi.ai</p>
                        <p className="text-sm font-semibold text-white mt-0.5 line-clamp-1">{draft.ogTitle || "OG Title"}</p>
                        <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{draft.ogDescription || "OG Description..."}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="OG Title">
                        <Input value={draft.ogTitle} onChange={(v) => update({ ogTitle: v })} />
                      </Field>
                      <Field label="OG Type">
                        <Select value={draft.ogType} onChange={(v) => update({ ogType: v })} options={["website", "article"]} />
                      </Field>
                      <Field label="OG Image URL" hint="1200×630px recommended">
                        <Input value={draft.ogImage} onChange={(v) => update({ ogImage: v })} placeholder={`${BASE_URL}/images/og-default.png`} />
                      </Field>
                      <Field label="OG Site Name">
                        <Input value={draft.ogSiteName} onChange={(v) => update({ ogSiteName: v })} />
                      </Field>
                      <Field label="OG Description" hint="~100 chars">
                        <Textarea value={draft.ogDescription} onChange={(v) => update({ ogDescription: v })} />
                      </Field>
                    </div>
                  </>
                )}

                {/* ── TWITTER CARD TAB ── */}
                {activeTab === "twitter" && (
                  <>
                    {/* Twitter Preview */}
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-black p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember to-orange-700 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="text-sm font-bold text-white">Ajumi AI</span>
                            <span className="text-xs text-white/40">{draft.twitterSite}</span>
                          </div>
                          {draft.twitterCard === "summary_large_image" ? (
                            <div className="rounded-xl overflow-hidden border border-white/10">
                              <div className="aspect-[1200/628] bg-zinc-800 flex items-center justify-center">
                                {draft.twitterImage ? <img src={draft.twitterImage} className="w-full h-full object-cover opacity-50" alt="" onError={() => {}} /> : <Image className="w-8 h-8 text-white/10" />}
                              </div>
                              <div className="px-3 py-2 bg-zinc-900 border-t border-white/5">
                                <p className="text-xs font-semibold text-white line-clamp-1">{draft.twitterTitle || "Twitter Title"}</p>
                                <p className="text-[11px] text-white/40 line-clamp-1">{draft.twitterDescription || "Twitter Description"}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-xl border border-white/10 p-3 flex gap-3 bg-zinc-900">
                              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex-shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-white">{draft.twitterTitle || "Twitter Title"}</p>
                                <p className="text-[10px] text-white/40">{draft.twitterDescription || "Description"}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Card Type">
                        <Select value={draft.twitterCard} onChange={(v) => update({ twitterCard: v })} options={["summary", "summary_large_image", "app", "player"]} />
                      </Field>
                      <Field label="Twitter Site Handle">
                        <Input value={draft.twitterSite} onChange={(v) => update({ twitterSite: v })} placeholder="@ajumiai" />
                      </Field>
                      <Field label="Twitter Title">
                        <Input value={draft.twitterTitle} onChange={(v) => update({ twitterTitle: v })} />
                      </Field>
                      <Field label="Twitter Image URL">
                        <Input value={draft.twitterImage} onChange={(v) => update({ twitterImage: v })} placeholder={`${BASE_URL}/images/og-default.png`} />
                      </Field>
                      <Field label="Twitter Description">
                        <Textarea value={draft.twitterDescription} onChange={(v) => update({ twitterDescription: v })} />
                      </Field>
                    </div>
                  </>
                )}

                {/* ── SCHEMA TAB ── */}
                {activeTab === "schema" && (
                  <>
                    <div className="flex items-center justify-between">
                      <Field label="Schema Type">
                        <div className="mt-1">
                          <Select
                            value={draft.schemaType}
                            onChange={(v) => update({ schemaType: v, schemaJson: makeDefaultSchema(v, page.label, page.path, draft.description) })}
                            options={["Organization", "WebPage", "Article", "Service", "LocalBusiness", "FAQPage", "BreadcrumbList"]}
                          />
                        </div>
                      </Field>
                    </div>
                    <Field label="JSON-LD Schema">
                      <div className={`mt-1 rounded-lg border overflow-hidden ${schemaValid ? "border-white/10" : "border-red-500/50"}`}>
                        <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                          <span className="text-[10px] font-mono text-white/30">application/ld+json</span>
                          {schemaValid
                            ? <span className="flex items-center gap-1 text-[10px] text-emerald-400"><CheckCircle2 className="w-3 h-3" /> Valid JSON</span>
                            : <span className="flex items-center gap-1 text-[10px] text-red-400"><AlertCircle className="w-3 h-3" /> Invalid JSON</span>}
                        </div>
                        <textarea
                          value={draft.schemaJson}
                          onChange={(e) => update({ schemaJson: e.target.value })}
                          rows={14}
                          className="w-full bg-[#0a0a0a] px-4 py-3 text-xs text-emerald-300 font-mono outline-none resize-none"
                          spellCheck={false}
                        />
                      </div>
                    </Field>
                    <button
                      onClick={() => update({ schemaJson: makeDefaultSchema(draft.schemaType, page.label, page.path, draft.description) })}
                      className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Regenerate from defaults
                    </button>
                  </>
                )}

                {/* ── TECHNICAL TAB ── */}
                {activeTab === "technical" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Robots Directive">
                      <Select value={draft.robots} onChange={(v) => update({ robots: v })} options={["index, follow", "noindex, follow", "index, nofollow", "noindex, nofollow"]} />
                    </Field>
                    <Field label="Sitemap Priority" hint="1.0 = highest">
                      <Select value={draft.sitemapPriority} onChange={(v) => update({ sitemapPriority: v })} options={["1.0", "0.9", "0.8", "0.7", "0.5", "0.3", "0.1"]} />
                    </Field>
                    <Field label="Change Frequency">
                      <Select value={draft.sitemapFreq} onChange={(v) => update({ sitemapFreq: v })} options={["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]} />
                    </Field>
                    <Field label="Canonical URL">
                      <Input value={draft.canonical} onChange={(v) => update({ canonical: v })} />
                    </Field>
                    {/* Robots Tag Preview */}
                    <div className="sm:col-span-2">
                      <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Generated Meta Tags Preview</p>
                      <div className="bg-[#0a0a0a] rounded-lg p-4 font-mono text-[11px] text-emerald-300 space-y-1 border border-white/[0.06]">
                        <p><span className="text-white/30">{"<"}meta</span> name=<span className="text-amber-300">"robots"</span> content=<span className="text-amber-300">"{draft.robots}"</span> <span className="text-white/30">{"/>"}</span></p>
                        <p><span className="text-white/30">{"<"}link</span> rel=<span className="text-amber-300">"canonical"</span> href=<span className="text-amber-300">"{draft.canonical}"</span> <span className="text-white/30">{"/>"}</span></p>
                        <p><span className="text-white/30">{"<"}meta</span> property=<span className="text-amber-300">"og:type"</span> content=<span className="text-amber-300">"{draft.ogType}"</span> <span className="text-white/30">{"/>"}</span></p>
                        <p><span className="text-white/30">{"<"}meta</span> name=<span className="text-amber-300">"twitter:card"</span> content=<span className="text-amber-300">"{draft.twitterCard}"</span> <span className="text-white/30">{"/>"}</span></p>
                        <p className="text-white/20">{`<!-- sitemap: priority=${draft.sitemapPriority} changefreq=${draft.sitemapFreq} -->`}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save / Reset */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <button onClick={() => setDraft(page)} className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" /> Reset All
                  </button>
                  <button onClick={handleSave} disabled={!isDirty}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${saved ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400" : isDirty ? "bg-ember hover:bg-orange-500 text-white shadow-lg shadow-ember/20" : "bg-white/5 border border-white/10 text-white/25 cursor-not-allowed"}`}>
                    {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SEOManagerPage() {
  const [pages, setPages] = useState<PageSEO[]>(defaultPages);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/seo-manager/login");
      router.refresh();
    } catch {}
  };

  useEffect(() => {
    async function loadSeo() {
      try {
        const res = await fetch("/api/seo");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPages(data);
          }
        }
      } catch {}
    }
    loadSeo();
  }, []);

  const handleSave = async (updated: PageSEO) => {
    const next = pages.map((p) => (p.id === updated.id ? updated : p));
    setPages(next);

    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setToast(`Saved to server: "${updated.label}"`);
        router.refresh();
      } else {
        setToast(`Saved locally (Error writing to server)`);
      }
    } catch {
      setToast(`Saved: "${updated.label}"`);
    }

    setTimeout(() => setToast(null), 3000);
  };

  const categories = ["All", ...Array.from(new Set(defaultPages.map((p) => p.category)))];
  const filtered = pages.filter((p) => {
    const q = search.toLowerCase();
    return (
      (search === "" || p.label.toLowerCase().includes(q) || p.path.includes(q) || p.title.toLowerCase().includes(q)) &&
      (activeCategory === "All" || p.category === activeCategory)
    );
  });

  const optimized = pages.filter(p => p.title.length >= 10 && p.title.length <= TITLE_MAX && p.description.length >= 50 && p.description.length <= DESC_MAX).length;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-ember/20 border border-ember/30 flex items-center justify-center">
            <Globe className="w-4 h-4 text-ember" />
          </div>
          <div>
            <h1 className="font-display text-base font-bold tracking-tight">SEO Manager</h1>
            <p className="text-[10px] text-white/30">Ajumi AI · {pages.length} pages</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors"
            title="Log out session cookie"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <Link href="/" className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
            <X className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Pages", value: pages.length, icon: <FileText className="w-4 h-4" />, color: "text-white" },
            { label: "Optimized", value: optimized, icon: <CheckCircle2 className="w-4 h-4" />, color: "text-emerald-400" },
            { label: "Needs Work", value: pages.length - optimized, icon: <AlertCircle className="w-4 h-4" />, color: "text-amber-400" },
            { label: "Score", value: `${Math.round((optimized / pages.length) * 100)}%`, icon: <BarChart3 className="w-4 h-4" />, color: "text-ember" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.01] flex items-center gap-3">
              <div className={`${s.color} opacity-60`}>{s.icon}</div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30">{s.label}</p>
                <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages, titles, paths..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 focus:border-ember rounded-lg text-sm text-white outline-none transition-colors placeholder:text-white/20" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-[11px] uppercase tracking-wider font-medium transition-all duration-200 ${activeCategory === cat ? "bg-ember text-white" : "bg-white/[0.04] border border-white/10 text-white/40 hover:text-white hover:border-white/20"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pages List */}
        <div className="space-y-2.5">
          {filtered.length === 0
            ? <div className="text-center py-16 text-white/20 text-sm">No pages match your search</div>
            : filtered.map((page) => (
              <motion.div key={page.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <PageRow page={page} onSave={handleSave} />
              </motion.div>
            ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-xl text-sm text-emerald-300 shadow-2xl z-50 whitespace-nowrap">
            <Check className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
