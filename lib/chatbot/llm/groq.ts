import { getLLMConfig } from "../config";
import { assertOk, type LLMProvider } from "./provider";
import { readSSE } from "./sse";

const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

type GroqChunk = { choices?: { delta?: { content?: string | null } }[] };

/** Groq free tier (OpenAI-compatible API). https://console.groq.com */
export const groqProvider: LLMProvider = {
  name: "groq",
  isConfigured: () => Boolean(getLLMConfig().groq.apiKey),
  async stream(messages, { maxTokens, signal }) {
    const { apiKey, model } = getLLMConfig().groq;
    const res = await fetch(ENDPOINT, {
      method: "POST",
      signal,
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.2,
        max_completion_tokens: maxTokens,
        // gpt-oss models think before answering; keep that short for a FAQ bot.
        ...(model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" } : {}),
      }),
    });
    await assertOk("groq", res);

    return (async function* () {
      for await (const data of readSSE(res.body!)) {
        if (data === "[DONE]") return;
        try {
          const text = (JSON.parse(data) as GroqChunk).choices?.[0]?.delta?.content;
          if (text) yield text;
        } catch {
          // ignore keep-alive / malformed lines
        }
      }
    })();
  },
};
