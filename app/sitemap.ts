import { MetadataRoute } from "next";
import { getAllSeoData } from "@/lib/seoStore";

export default function sitemap(): MetadataRoute.Sitemap {
  const allSeo = getAllSeoData();
  const baseUrl = "https://ajumiai.com";

  if (!allSeo || allSeo.length === 0) {
    return [
      { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    ];
  }

  return allSeo.map((page) => ({
    url: page.canonical || `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: (page.sitemapFreq || "weekly") as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: parseFloat(page.sitemapPriority || "0.8"),
  }));
}
