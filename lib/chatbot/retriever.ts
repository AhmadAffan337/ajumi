import { readFile } from "node:fs/promises";
import path from "node:path";
import { TOP_K } from "./config";
import type { Embedder } from "./embedder";
import { chatIndexSchema, type ChatIndex, type RetrievedChunk } from "./types";
import { topK } from "./vector";

export interface Retriever {
  retrieve(query: string, k?: number): Promise<RetrievedChunk[]>;
}

export function createRetriever(index: Pick<ChatIndex, "chunks" | "model">, embedder: Embedder): Retriever {
  if (index.chunks.length > 0 && index.model !== embedder.model) {
    throw new Error(
      `Chat index was built with "${index.model}" but the embedder is "${embedder.model}". Re-run npm run chat:index.`
    );
  }
  return {
    async retrieve(query, k = TOP_K) {
      if (index.chunks.length === 0) return [];
      const [vector] = await embedder.embed([query], "query");
      return topK(vector, index.chunks, k).map(({ item, score }) => ({
        id: item.id,
        url: item.url,
        title: item.title,
        section: item.section,
        text: item.text,
        score,
      }));
    },
  };
}

/* ---------- Loading data/chat-index.json (cached per server process) ---------- */

export const INDEX_PATH = path.join(process.cwd(), "data", "chat-index.json");

const EMPTY_INDEX: ChatIndex = { version: 1, model: "", builtAt: "", chunks: [], suggested: [] };

let indexPromise: Promise<ChatIndex> | null = null;

export function loadChatIndex(): Promise<ChatIndex> {
  if (!indexPromise) {
    indexPromise = readFile(INDEX_PATH, "utf8")
      .then((raw) => chatIndexSchema.parse(JSON.parse(raw)))
      .catch((err) => {
        console.error(`[chat] Could not load ${INDEX_PATH}. Run "npm run chat:index".`, err);
        indexPromise = null; // retry on the next request instead of caching the failure
        return EMPTY_INDEX;
      });
  }
  return indexPromise;
}
