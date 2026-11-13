import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "seo.json");

export type PageSEOData = {
  id: string;
  path: string;
  label: string;
  category: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  ogSiteName: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  schemaType: string;
  schemaJson: string;
  robots: string;
  sitemapPriority: string;
  sitemapFreq: string;
};

export function getAllSeoData(): PageSEOData[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as PageSEOData[];
  } catch {
    return [];
  }
}

export function getSeoById(id: string): PageSEOData | undefined {
  return getAllSeoData().find((p) => p.id === id);
}

export function getSeoByPath(pagePath: string): PageSEOData | undefined {
  return getAllSeoData().find((p) => p.path === pagePath);
}

export function updateSeoEntry(updated: PageSEOData): void {
  const all = getAllSeoData();
  const idx = all.findIndex((p) => p.id === updated.id);
  if (idx >= 0) {
    all[idx] = updated;
  } else {
    all.push(updated);
  }
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(all, null, 2), "utf-8");
}

/** Build a Next.js Metadata object from a PageSEOData entry */
export function buildMetadata(seo: PageSEOData) {
  const rawType = (seo.ogType || "website").toLowerCase();
  const validOgType = (rawType === "article" ? "article" : "website") as "website" | "article";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ajumi.ai"),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical,
      siteName: seo.ogSiteName || "Ajumi AI",
      type: validOgType,
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: (seo.twitterCard || "summary_large_image") as "summary" | "summary_large_image" | "app" | "player",
      title: seo.twitterTitle || seo.title,
      description: seo.twitterDescription || seo.description,
      images: seo.twitterImage ? [seo.twitterImage] : [],
      site: seo.twitterSite || "@ajumiai",
    },
  };
}

/** Get validated JSON-LD Schema object for rendering in page script tag */
export function getJsonLdSchema(seo: PageSEOData): object | null {
  if (!seo.schemaJson) return null;
  try {
    return JSON.parse(seo.schemaJson);
  } catch {
    return null;
  }
}
