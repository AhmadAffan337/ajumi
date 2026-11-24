import path from "node:path";
import { EMBEDDING_MODEL, EMBEDDING_POOLING, EMBEDDING_QUERY_PREFIX } from "./config";

/** "query" = a visitor's question, "passage" = site content being indexed. Some models embed them differently. */
export type EmbedKind = "query" | "passage";

/** Swap this implementation (e.g. for a hosted embeddings API) without touching callers. */
export interface Embedder {
  readonly model: string;
  embed(texts: string[], kind: EmbedKind): Promise<number[][]>;
}

type FeatureExtractor = (
  texts: string[],
  options: { pooling: "mean" | "cls"; normalize: boolean }
) => Promise<{ tolist(): number[][] }>;

let extractorPromise: Promise<FeatureExtractor> | null = null;

async function getExtractor(): Promise<FeatureExtractor> {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      const { pipeline, env } = await import("@huggingface/transformers");
      // Downloaded once on first use, then served from disk.
      env.cacheDir = path.join(process.cwd(), ".cache", "transformers");
      const extractor = await pipeline("feature-extraction", EMBEDDING_MODEL, { dtype: "q8" });
      return extractor as unknown as FeatureExtractor;
    })().catch((err) => {
      extractorPromise = null; // allow a retry on the next request
      throw err;
    });
  }
  return extractorPromise;
}

/** Free, local embeddings via transformers.js. Vectors are L2-normalized. */
export const localEmbedder: Embedder = {
  model: EMBEDDING_MODEL,
  async embed(texts, kind) {
    if (texts.length === 0) return [];
    const extractor = await getExtractor();
    const inputs = kind === "query" ? texts.map((t) => EMBEDDING_QUERY_PREFIX + t) : texts;
    const output = await extractor(inputs, { pooling: EMBEDDING_POOLING, normalize: true });
    return output.tolist();
  },
};
