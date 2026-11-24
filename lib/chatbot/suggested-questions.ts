/**
 * Starter questions shown as chips in the chat widget. Client-safe.
 *
 * Their answers are generated from site content by `npm run chat:index`
 * and cached in data/chat-index.json, so clicking a chip uses no LLM quota.
 * After editing this list, re-run `npm run chat:index`.
 */
export const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How much do your services cost?",
  "Which industries do you work with?",
  "Do you build AI chatbots or AI calling agents?",
  "How does your process work?",
  "How do I get started?",
] as const;

/** Used to match a typed or clicked question against the cached answers. */
export function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
