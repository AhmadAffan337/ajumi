export type LLMMessage = { role: "system" | "user" | "assistant"; content: string };

export type StreamOptions = { maxTokens: number; signal?: AbortSignal };

/**
 * One LLM vendor. `stream()` resolves once the HTTP request succeeded and rejects
 * otherwise (bad key, 429, timeout), so a caller can fall back to the next provider
 * before any text was sent to the user.
 */
export interface LLMProvider {
  readonly name: string;
  isConfigured(): boolean;
  stream(messages: LLMMessage[], options: StreamOptions): Promise<AsyncIterable<string>>;
}

export class LLMError extends Error {
  constructor(
    readonly provider: string,
    readonly status: number | null,
    message: string
  ) {
    super(`[${provider}] ${message}`);
    this.name = "LLMError";
  }
}

/** Throws LLMError with the response body (trimmed) for non-2xx responses. */
export async function assertOk(provider: string, res: Response): Promise<void> {
  if (res.ok && res.body) return;
  const body = await res.text().catch(() => "");
  throw new LLMError(provider, res.status, `HTTP ${res.status}: ${body.slice(0, 300)}`);
}
