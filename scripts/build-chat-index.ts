/**
 * Builds data/chat-index.json: crawls the running site, chunks every page,
 * embeds the chunks locally, and pre-generates answers for the suggested questions.
 *
 *   npm run build && npm start          # in one terminal (or npm run dev)
 *   npm run chat:index                  # in another; defaults to http://localhost:3000
 *   npm run chat:index -- https://staging.example.com
 *
 * Answers for suggested questions are generated only if GROQ_API_KEY or GEMINI_API_KEY is set.
 */
import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { planAnswer } from "@/lib/chatbot/answer";
import { chunkPage, embeddingInput, type TextChunk } from "@/lib/chatbot/chunker";
import { EMBEDDING_MODEL, MAX_ANSWER_TOKENS } from "@/lib/chatbot/config";
import { localEmbedder } from "@/lib/chatbot/embedder";
import { extractPage, toSitePath } from "@/lib/chatbot/extract";
import { defaultLLMChain } from "@/lib/chatbot/llm";
import { createRetriever, INDEX_PATH } from "@/lib/chatbot/retriever";
import { SUGGESTED_QUESTIONS } from "@/lib/chatbot/suggested-questions";
import type { Chunk, ChatIndex, SuggestedAnswer } from "@/lib/chatbot/types";

const MAX_PAGES = 200;
const EMBED_BATCH = 32;

try {
  process.loadEnvFile(".env");
} catch {
  // no .env file: fine, keys may come from the environment
}

async function sitemapPaths(origin: string): Promise<string[]> {
  try {
    const res = await fetch(`${origin}/sitemap.xml`);
    if (!res.ok) return [];
    const xml = await res.text();
    // Sitemap URLs use the production domain; keep only the path and crawl it on `origin`.
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => {
        try {
          return toSitePath(new URL(m[1].trim()).pathname, origin);
        } catch {
          return null;
        }
      })
      .filter((p): p is string => p !== null);
  } catch {
    return [];
  }
}

async function crawl(origin: string) {
  const seen = new Set<string>(["/", ...(await sitemapPaths(origin))]);
  const queue = [...seen];
  const pages: { url: string; title: string; sections: ReturnType<typeof extractPage>["sections"] }[] = [];

  while (queue.length && pages.length < MAX_PAGES) {
    const path = queue.shift()!;
    const res = await fetch(origin + path, { redirect: "follow" }).catch(() => null);
    if (!res?.ok || !res.headers.get("content-type")?.includes("text/html")) {
      console.warn(`  skip ${path} (${res?.status ?? "network error"})`);
      continue;
    }
    // Pages that redirect elsewhere (e.g. login) are skipped.
    const finalPath = toSitePath(res.url, origin);
    if (finalPath !== path) {
      console.warn(`  skip ${path} (redirected to ${finalPath ?? res.url})`);
      continue;
    }

    const page = extractPage(await res.text(), origin);
    // The homepage h1 is a slogan; "Home" reads better as a source link.
    pages.push({ url: path, title: path === "/" ? "Home" : page.title, sections: page.sections });
    console.log(`  ✓ ${path}  (${page.sections.length} sections)`);

    for (const link of page.links) {
      if (!seen.has(link)) {
        seen.add(link);
        queue.push(link);
      }
    }
  }
  return pages;
}

function dedupe(chunks: TextChunk[]): TextChunk[] {
  const seen = new Set<string>();
  return chunks.filter((c) => {
    const key = c.text.toLowerCase().replace(/\s+/g, " ");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function embedAll(chunks: TextChunk[]): Promise<Chunk[]> {
  const out: Chunk[] = [];
  for (let i = 0; i < chunks.length; i += EMBED_BATCH) {
    const batch = chunks.slice(i, i + EMBED_BATCH);
    const vectors = await localEmbedder.embed(batch.map(embeddingInput), "passage");
    batch.forEach((chunk, j) => {
      const id = createHash("sha1").update(`${chunk.url}\n${chunk.text}`).digest("hex").slice(0, 12);
      // 5 decimals keeps the file small with no measurable effect on ranking.
      out.push({ id, ...chunk, vector: vectors[j].map((x) => Math.round(x * 1e5) / 1e5) });
    });
    process.stdout.write(`\r  embedded ${Math.min(i + EMBED_BATCH, chunks.length)}/${chunks.length}`);
  }
  process.stdout.write("\n");
  return out;
}

async function precomputeSuggested(chunks: Chunk[]): Promise<SuggestedAnswer[]> {
  if (!defaultLLMChain.hasProvider()) {
    console.warn("  No GROQ_API_KEY / GEMINI_API_KEY set: suggested questions will be answered live instead.");
    return [];
  }
  const retriever = createRetriever({ model: EMBEDDING_MODEL, chunks }, localEmbedder);
  const results: SuggestedAnswer[] = [];
  for (const question of SUGGESTED_QUESTIONS) {
    const plan = await planAnswer([{ role: "user", content: question }], { retriever });
    if (plan.kind !== "llm") {
      console.warn(`  ✗ "${question}": no relevant content found; it will be answered live.`);
      continue;
    }
    try {
      const { provider, text } = await defaultLLMChain.stream(plan.messages, { maxTokens: MAX_ANSWER_TOKENS });
      let answer = "";
      for await (const part of text) answer += part;
      answer = answer.trim();
      if (!answer) throw new Error("empty answer");
      results.push({ question, answer, sources: plan.sources });
      console.log(`  ✓ "${question}" (${provider})`);
    } catch (err) {
      console.warn(`  ✗ "${question}": ${err instanceof Error ? err.message : err}`);
    }
  }
  return results;
}

async function main() {
  const origin = new URL(process.argv[2] || process.env.CHAT_INDEX_BASE_URL || "http://localhost:3000").origin;

  console.log(`Crawling ${origin} ...`);
  const pages = await crawl(origin);
  if (pages.length === 0) throw new Error(`No pages crawled. Is the site running at ${origin}?`);

  // Shared sections (CTA banners, pricing blocks) appear on many pages; specific pages win over the homepage.
  pages.sort((a, b) => (a.url === "/" ? 1 : 0) - (b.url === "/" ? 1 : 0));
  const textChunks = dedupe(pages.flatMap((p) => chunkPage(p)));
  console.log(`Chunked ${pages.length} pages into ${textChunks.length} chunks. Embedding ...`);
  const chunks = await embedAll(textChunks);

  console.log("Generating answers for suggested questions ...");
  const suggested = await precomputeSuggested(chunks);

  const index: ChatIndex = {
    version: 1,
    model: EMBEDDING_MODEL,
    builtAt: new Date().toISOString(),
    chunks,
    suggested,
  };
  await writeFile(INDEX_PATH, JSON.stringify(index));
  console.log(`Wrote ${INDEX_PATH}: ${chunks.length} chunks, ${suggested.length} cached answers.`);
  console.log("Restart the server to load the new index.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
