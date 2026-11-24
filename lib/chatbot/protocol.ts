/**
 * Wire format between /api/chat and the chat widget.
 * Client-safe: no server imports here.
 *
 * The response body is NDJSON: one ChatEvent per line.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessage = { role: ChatRole; content: string };

export type Source = { url: string; title: string };

export type ChatEvent =
  | { type: "sources"; sources: Source[] }
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };

export function encodeEvent(event: ChatEvent): string {
  return JSON.stringify(event) + "\n";
}

export function parseEvent(line: string): ChatEvent | null {
  try {
    const v = JSON.parse(line) as Record<string, unknown> | null;
    if (!v || typeof v !== "object") return null;
    switch (v.type) {
      case "sources":
        return Array.isArray(v.sources) ? { type: "sources", sources: v.sources as Source[] } : null;
      case "delta":
        return typeof v.text === "string" ? { type: "delta", text: v.text } : null;
      case "error":
        return typeof v.message === "string" ? { type: "error", message: v.message } : null;
      case "done":
        return { type: "done" };
      default:
        return null;
    }
  } catch {
    return null;
  }
}
