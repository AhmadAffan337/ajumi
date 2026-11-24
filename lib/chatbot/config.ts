/**
 * Every chatbot tuning knob lives here so behaviour can be changed in one place.
 * Server-only values (API keys, model names) are read lazily from process.env.
 */

export const SITE_NAME = "Ajumi AI";
export const CONTACT_PATH = "/contact";

/* ---------- Retrieval ---------- */

/**
 * Local embedding model (runs on the server via transformers.js, no API key, ~34 MB).
 * Chosen over all-MiniLM-L6-v2 after `npm run chat:eval`: it ranks short questions against
 * passages much better (e.g. "How much do your services cost?" -> pricing plans).
 * Changing it requires re-running `npm run chat:index` and re-tuning MIN_SCORE.
 */
export const EMBEDDING_MODEL = "Xenova/bge-small-en-v1.5";
export const EMBEDDING_POOLING: "cls" | "mean" = "cls";
/** bge models expect this instruction in front of search queries (not in front of passages). */
export const EMBEDDING_QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";
/** Chunks passed to the LLM per question. */
export const TOP_K = 5;
/**
 * Best chunk must score at least this (cosine similarity), or the bot says it doesn't know without
 * calling the LLM. bge scores are compressed: off-topic ~0.45-0.53, on-topic >= ~0.62.
 * Tune with `npm run chat:eval`.
 */
export const MIN_SCORE = 0.58;
/** Max source links shown under an answer. */
export const MAX_SOURCES = 3;

/* ---------- Chunking ---------- */

export const CHUNK_MAX_CHARS = 1200;
/** Sections shorter than this are merged into the previous chunk. */
export const CHUNK_MIN_CHARS = 200;
/** Chunks shorter than this are dropped as noise ("Learn more", etc). */
export const CHUNK_DROP_BELOW_CHARS = 40;

/* ---------- Request limits ---------- */

export const MAX_QUESTION_CHARS = 500;
export const MAX_ASSISTANT_MESSAGE_CHARS = 4000;
/** Previous messages (user + assistant) sent to the LLM for follow-up questions. */
export const MAX_HISTORY_MESSAGES = 6;
export const MAX_ANSWER_TOKENS = 700;
export const LLM_TIMEOUT_MS = 20_000;

export const RATE_LIMIT_MAX = 20;
export const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

/* ---------- LLM providers (free tiers) ---------- */

export function getLLMConfig() {
  return {
    groq: {
      apiKey: process.env.GROQ_API_KEY ?? "",
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
    },
    gemini: {
      apiKey: process.env.GEMINI_API_KEY ?? "",
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    },
  };
}
