import { CONTACT_PATH, MAX_SOURCES, MIN_SCORE } from "./config";
import type { LLMMessage } from "./llm/provider";
import { buildMessages, retrievalQuery } from "./prompt";
import type { ChatMessage, Source } from "./protocol";
import type { Retriever } from "./retriever";
import { normalizeQuestion } from "./suggested-questions";
import type { RetrievedChunk, SuggestedAnswer } from "./types";

export const CONTACT_SOURCE: Source = { url: CONTACT_PATH, title: "Contact us" };

export const NOT_FOUND_ANSWER =
  "I couldn't find that on our website, so I don't want to guess. Our team can answer it directly. Reach out through the contact page and we'll get back to you.";

export const UNAVAILABLE_ANSWER =
  "Sorry, I can't answer right now. Please try again in a minute, or reach out through our contact page and our team will help.";

export type AnswerPlan =
  /** Pre-generated answer for a suggested question (no LLM call). */
  | { kind: "cached"; text: string; sources: Source[] }
  /** Nothing relevant on the site: don't call the LLM, point to contact instead. */
  | { kind: "not_found"; text: string; sources: Source[]; topScore: number }
  /** Ask the LLM with retrieved context. */
  | { kind: "llm"; messages: LLMMessage[]; sources: Source[]; chunks: RetrievedChunk[] };

export function toSources(chunks: RetrievedChunk[]): Source[] {
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const chunk of chunks) {
    if (seen.has(chunk.url)) continue;
    seen.add(chunk.url);
    sources.push({ url: chunk.url, title: chunk.title });
    if (sources.length >= MAX_SOURCES) break;
  }
  return sources;
}

export function findCachedAnswer(question: string, cache: SuggestedAnswer[]): SuggestedAnswer | undefined {
  const key = normalizeQuestion(question);
  return cache.find((s) => normalizeQuestion(s.question) === key);
}

/** Decides how to answer, without calling the LLM. Pure apart from retrieval, so it is easy to test. */
export async function planAnswer(
  history: ChatMessage[],
  deps: { retriever: Retriever; cache?: SuggestedAnswer[]; minScore?: number }
): Promise<AnswerPlan> {
  const minScore = deps.minScore ?? MIN_SCORE;
  const last = history[history.length - 1];

  // Cached answers only make sense as the opening question; later on, context matters.
  const isFirstQuestion = history.filter((m) => m.role === "user").length === 1;
  if (isFirstQuestion && deps.cache) {
    const cached = findCachedAnswer(last.content, deps.cache);
    if (cached) return { kind: "cached", text: cached.answer, sources: cached.sources };
  }

  const retrieved = await deps.retriever.retrieve(retrievalQuery(history));
  const relevant = retrieved.filter((c) => c.score >= minScore);
  const topScore = retrieved[0]?.score ?? 0;

  if (relevant.length === 0) {
    return { kind: "not_found", text: NOT_FOUND_ANSWER, sources: [CONTACT_SOURCE], topScore };
  }

  return {
    kind: "llm",
    messages: buildMessages(history, relevant),
    sources: toSources(relevant),
    chunks: relevant,
  };
}
