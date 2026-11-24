import { LLM_TIMEOUT_MS } from "../config";
import { geminiProvider } from "./gemini";
import { groqProvider } from "./groq";
import { LLMError, type LLMMessage, type LLMProvider, type StreamOptions } from "./provider";

export type { LLMMessage, LLMProvider } from "./provider";

export type LLMChain = {
  hasProvider(): boolean;
  /** Tries each configured provider in order until one starts streaming. */
  stream(messages: LLMMessage[], options: StreamOptions): Promise<{ provider: string; text: AsyncIterable<string> }>;
};

export function createLLMChain(providers: LLMProvider[], timeoutMs = LLM_TIMEOUT_MS): LLMChain {
  return {
    hasProvider: () => providers.some((p) => p.isConfigured()),
    async stream(messages, options) {
      const errors: string[] = [];
      for (const provider of providers) {
        if (!provider.isConfigured()) continue;
        const timeout = AbortSignal.timeout(timeoutMs);
        const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
        try {
          const text = await provider.stream(messages, { ...options, signal });
          return { provider: provider.name, text };
        } catch (err) {
          if (options.signal?.aborted) throw err;
          errors.push(err instanceof Error ? err.message : String(err));
          console.warn(`[chat] ${provider.name} failed, trying next provider:`, errors[errors.length - 1]);
        }
      }
      throw new LLMError("chain", null, errors.length ? errors.join(" | ") : "No LLM provider is configured.");
    },
  };
}

/** Groq first (fast, free), Gemini as fallback. */
export const defaultLLMChain = createLLMChain([groqProvider, geminiProvider]);
