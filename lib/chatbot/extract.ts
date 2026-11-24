import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";

/** A heading and the text under it, in page order. */
export type PageSection = { heading: string; text: string };

export type ExtractedPage = {
  title: string;
  sections: PageSection[];
  /** Same-site paths linked from this page (for crawling). */
  links: string[];
};

/** Removed before extracting text: chrome, scripts and interactive widgets. */
const REMOVE_SELECTOR = [
  "script",
  "style",
  "noscript",
  "template",
  "svg",
  "canvas",
  "iframe",
  "nav",
  "header",
  "footer",
  "form",
  "button",
  "[aria-hidden='true']",
  "[hidden]",
].join(",");

const BLOCK_TAGS = new Set([
  "p", "div", "section", "article", "aside", "main", "li", "ul", "ol", "dl", "dt", "dd",
  "blockquote", "figure", "figcaption", "table", "tr", "td", "th", "br", "summary", "details",
]);

const HEADING = /^h[1-4]$/;

const EXCLUDED_PATH_PREFIXES = ["/api", "/seo-manager", "/_next"];

export function isCrawlablePath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//")) return false;
  if (EXCLUDED_PATH_PREFIXES.some((p) => path === p || path.startsWith(p + "/"))) return false;
  // Skip files (images, pdfs, etc).
  return !/\.[a-z0-9]{2,5}$/i.test(path);
}

/** Normalize an href to a crawlable same-site pathname, or null. */
export function toSitePath(href: string, origin: string): string | null {
  try {
    const url = new URL(href, origin);
    if (url.origin !== new URL(origin).origin) return null;
    const path = url.pathname.replace(/\/+$/, "") || "/";
    return isCrawlablePath(path) ? path : null;
  } catch {
    return null;
  }
}

function cleanLine(line: string): string {
  return line
    .replace(/\s+/g, " ")
    .replace(/ ([.,!?;:])(?=\s|$)/g, "$1")
    .trim();
}

/** Text of an element with its text pieces space-separated (headings often use <br> or spans between words). */
function spacedText(node: AnyNode): string {
  if (node.type === "text") return node.data;
  if (node.type !== "tag") return "";
  return node.children.map(spacedText).join(" ");
}

export function extractPage(html: string, origin: string): ExtractedPage {
  const $ = cheerio.load(html);

  const links = new Set<string>();
  $("a[href]").each((_, el) => {
    const path = toSitePath($(el).attr("href") ?? "", origin);
    if (path) links.add(path);
  });

  const h1 = $("h1").get(0);
  const title =
    (h1 ? cleanLine(spacedText(h1)) : "") ||
    cleanLine($("title").first().text().split(/[—|]/)[0] ?? "") ||
    "Untitled";

  $(REMOVE_SELECTOR).remove();
  const root = $("main").length ? $("main").first() : $("body");

  const sections: PageSection[] = [];
  let heading = title;
  let buffer = "";
  // Marquees and carousels repeat the same lines; keep only the first occurrence per page.
  const seenLines = new Set<string>();

  const flush = () => {
    const lines = buffer
      .split("\n")
      .map(cleanLine)
      .filter((line) => {
        if (!line || seenLines.has(line)) return false;
        seenLines.add(line);
        return true;
      });
    if (lines.length) sections.push({ heading, text: lines.join("\n") });
    buffer = "";
  };

  const walk = (node: AnyNode) => {
    if (node.type === "text") {
      buffer += node.data;
      return;
    }
    if (node.type !== "tag") return;
    if (HEADING.test(node.name)) {
      flush();
      heading = cleanLine(spacedText(node)) || heading;
      return;
    }
    // Blocks become separate lines; links get spaces so adjacent links don't run together.
    const separator = BLOCK_TAGS.has(node.name) ? "\n" : node.name === "a" ? " " : "";
    buffer += separator;
    for (const child of node.children) walk(child);
    buffer += separator;
  };

  root.each((_, el) => walk(el));
  flush();

  return { title, sections, links: [...links] };
}
