import { getLLMConfig } from "../config";
import { assertOk, type LLMProvider } from "./provider";
import { readSSE } from "./sse";

type GeminiChunk = { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] };

/**
 * Google Gemini free tier. https://aistudio.google.com
 * Note: Google may use free-tier prompts to improve its products.
 */
export const geminiProvider: LLMProvider = {
  name: "gemini",
  isConfigured: () => Boolean(getLLMConfig().gemini.apiKey),
  async stream(messages, { maxTokens, signal }) {
    const { apiKey, model } = getLLMConfig().gemini;
    const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n\n");
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`;
    const res = await fetch(url, {
      method: "POST",
      signal,
      headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
        contents,
        generationConfig: { temperature: 0.2, maxOutputTokens: maxTokens },
      }),
    });
    await assertOk("gemini", res);

    return (async function* () {
      for await (const data of readSSE(res.body!)) {
        try {
          const parts = (JSON.parse(data) as GeminiChunk).candidates?.[0]?.content?.parts ?? [];
          for (const part of parts) if (part.text && !part.thought) yield part.text;
        } catch {
          // ignore malformed lines
        }
      }
    })();
  },
};
