import { NextResponse } from "next/server";
import { planAnswer, UNAVAILABLE_ANSWER, CONTACT_SOURCE } from "@/lib/chatbot/answer";
import { MAX_ANSWER_TOKENS, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "@/lib/chatbot/config";
import { localEmbedder } from "@/lib/chatbot/embedder";
import { defaultLLMChain } from "@/lib/chatbot/llm";
import { encodeEvent, type ChatEvent } from "@/lib/chatbot/protocol";
import { createRetriever, loadChatIndex } from "@/lib/chatbot/retriever";
import { chatRequestSchema } from "@/lib/chatbot/types";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimiter = createRateLimiter({ max: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS });

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  if (rateLimiter.isLimited(getClientIp(req))) {
    return jsonError("You're sending messages too quickly. Please wait a few minutes.", 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError("Please send a question between 1 and 500 characters.", 400);
  }
  const history = parsed.data.messages;

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ChatEvent) => controller.enqueue(encoder.encode(encodeEvent(event)));
      const sendText = (text: string) => {
        send({ type: "delta", text });
        send({ type: "done" });
      };

      try {
        const index = await loadChatIndex();
        const plan = await planAnswer(history, {
          retriever: createRetriever(index, localEmbedder),
          cache: index.suggested,
        });

        send({ type: "sources", sources: plan.sources });

        if (plan.kind === "cached") return sendText(plan.text);

        if (plan.kind === "not_found") {
          // Unanswered questions show what content the site is missing. No IP or other identifiers logged.
          console.info(
            `[chat] unanswered (top score ${plan.topScore.toFixed(2)}):`,
            history[history.length - 1].content.slice(0, 200)
          );
          return sendText(plan.text);
        }

        let answer;
        try {
          answer = await defaultLLMChain.stream(plan.messages, { maxTokens: MAX_ANSWER_TOKENS, signal: req.signal });
        } catch (err) {
          if (req.signal.aborted) return;
          console.error("[chat] all LLM providers failed:", err instanceof Error ? err.message : err);
          send({ type: "sources", sources: [CONTACT_SOURCE] });
          return sendText(UNAVAILABLE_ANSWER);
        }

        for await (const text of answer.text) send({ type: "delta", text });
        send({ type: "done" });
      } catch (err) {
        if (req.signal.aborted) return;
        console.error("[chat] request failed:", err);
        send({ type: "error", message: UNAVAILABLE_ANSWER });
      } finally {
        try {
          controller.close();
        } catch {
          // already closed (client disconnected)
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
