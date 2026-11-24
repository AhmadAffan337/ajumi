import { describe, expect, it } from "vitest";
import { chunkPage } from "../chunker";
import { extractPage, toSitePath } from "../extract";

const ORIGIN = "http://localhost:3000";

const HTML = `<!doctype html><html><head><title>SEO Services — Ajumi AI</title><script>var x = 1</script></head>
<body>
  <nav><a href="/about">About</a> Navigation text</nav>
  <main>
    <h1>SEO Services</h1>
    <p>We help local businesses rank on Google.</p>
    <div class="marquee"><span>Trusted by 50 brands</span></div>
    <div class="marquee"><span>Trusted by 50 brands</span></div>
    <h2>Pricing</h2>
    <p>Plans start at $500 per month.</p>
    <a href="/pricing?x=1#top">See pricing</a>
    <a href="https://other.com/page">External</a>
    <a href="/api/secret">API</a>
    <a href="/brochure.pdf">PDF</a>
    <button>Book a call</button>
  </main>
  <footer>Footer text</footer>
</body></html>`;

describe("extractPage", () => {
  const page = extractPage(HTML, ORIGIN);

  it("uses the h1 as title", () => {
    expect(page.title).toBe("SEO Services");
  });

  it("keeps words apart when a heading uses <br> or spans", () => {
    const p = extractPage("<main><h1>Missing calls?<br/><span>Get more</span> customers.</h1><p>Body text here.</p></main>", ORIGIN);
    expect(p.title).toBe("Missing calls? Get more customers.");
  });

  it("splits sections on headings and drops nav, footer, scripts and buttons", () => {
    expect(page.sections.map((s) => s.heading)).toEqual(["SEO Services", "Pricing"]);
    const all = page.sections.map((s) => s.text).join("\n");
    expect(all).toContain("We help local businesses rank on Google.");
    expect(all).toContain("Plans start at $500 per month.");
    expect(all).not.toMatch(/Navigation text|Footer text|var x|Book a call/);
  });

  it("dedupes repeated lines (marquees)", () => {
    const all = page.sections.map((s) => s.text).join("\n");
    expect(all.match(/Trusted by 50 brands/g)).toHaveLength(1);
  });

  it("collects only crawlable same-site links", () => {
    expect(page.links.sort()).toEqual(["/about", "/pricing"]);
  });
});

describe("toSitePath", () => {
  it("normalizes trailing slashes and rejects other origins", () => {
    expect(toSitePath("/blog/", ORIGIN)).toBe("/blog");
    expect(toSitePath("http://localhost:3000/", ORIGIN)).toBe("/");
    expect(toSitePath("https://evil.com/blog", ORIGIN)).toBeNull();
    expect(toSitePath("/seo-manager/login", ORIGIN)).toBeNull();
  });
});

describe("chunkPage", () => {
  const opts = { maxChars: 100, minChars: 30, dropBelowChars: 10 };

  it("merges short sections into the previous chunk", () => {
    const chunks = chunkPage(
      {
        url: "/x",
        title: "X",
        sections: [
          { heading: "X", text: "An intro paragraph that is long enough." },
          { heading: "Why", text: "Short." },
        ],
      },
      opts
    );
    expect(chunks).toHaveLength(1);
    expect(chunks[0].text).toBe("An intro paragraph that is long enough.\nWhy\nShort.");
  });

  it("splits long sections on line boundaries without exceeding maxChars", () => {
    const line = "word ".repeat(15).trim(); // 74 chars
    const chunks = chunkPage({ url: "/x", title: "X", sections: [{ heading: "X", text: `${line}\n${line}\n${line}` }] }, opts);
    expect(chunks).toHaveLength(3);
    for (const c of chunks) expect(c.text.length).toBeLessThanOrEqual(100);
  });

  it("hard-splits a single over-long line", () => {
    const chunks = chunkPage({ url: "/x", title: "X", sections: [{ heading: "X", text: "word ".repeat(60).trim() }] }, opts);
    expect(chunks.length).toBeGreaterThan(1);
    for (const c of chunks) expect(c.text.length).toBeLessThanOrEqual(100);
  });

  it("drops noise chunks", () => {
    expect(chunkPage({ url: "/x", title: "X", sections: [{ heading: "X", text: "Hi" }] }, opts)).toEqual([]);
  });
});
