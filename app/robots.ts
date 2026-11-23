import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/seo-manager/", "/api/"],
    },
    sitemap: "https://ajumiai.com/sitemap.xml",
  };
}
