import { z } from "zod";
import { MAX_ASSISTANT_MESSAGE_CHARS, MAX_HISTORY_MESSAGES, MAX_QUESTION_CHARS } from "./config";

/* ---------- Index (data/chat-index.json) ---------- */

export const chunkSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  section: z.string(),
  text: z.string(),
  vector: z.array(z.number()),
});
export type Chunk = z.infer<typeof chunkSchema>;

export const sourceSchema = z.object({ url: z.string(), title: z.string() });

export const suggestedAnswerSchema = z.object({
  question: z.string(),
  answer: z.string(),
  sources: z.array(sourceSchema),
});
export type SuggestedAnswer = z.infer<typeof suggestedAnswerSchema>;

export const chatIndexSchema = z.object({
  version: z.literal(1),
  model: z.string(),
  builtAt: z.string(),
  chunks: z.array(chunkSchema),
  suggested: z.array(suggestedAnswerSchema),
});
export type ChatIndex = z.infer<typeof chatIndexSchema>;

export type RetrievedChunk = Omit<Chunk, "vector"> & { score: number };

/* ---------- /api/chat request ---------- */

const userMessageSchema = z.object({
  role: z.literal("user"),
  content: z.string().trim().min(1).max(MAX_QUESTION_CHARS),
});
const assistantMessageSchema = z.object({
  role: z.literal("assistant"),
  content: z.string().max(MAX_ASSISTANT_MESSAGE_CHARS),
});

export const chatRequestSchema = z.object({
  messages: z
    .array(z.discriminatedUnion("role", [userMessageSchema, assistantMessageSchema]))
    .min(1)
    // Clients send a bounded window; reject anything far larger.
    .max(MAX_HISTORY_MESSAGES * 2)
    // zod runs refinements even when .min(1) failed, so guard against an empty array.
    .refine((m) => m.at(-1)?.role === "user", "Last message must be from the user."),
});
export type ChatRequest = z.infer<typeof chatRequestSchema>;
