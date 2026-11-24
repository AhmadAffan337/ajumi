import { describe, expect, it, vi } from "vitest";
import { CONTACT_SOURCE, planAnswer } from "../answer";
import type { ChatMessage } from "../protocol";
import { retrievalQuery } from "../prompt";
import type { Retriever } from "../retriever";
import type { RetrievedChunk } from "../types";

const chunk = (url: string, score: number, text = `About ${url}`): RetrievedChunk => ({
  id: url + score,
  url,
  title: `Title ${url}`,
  section: "Section",
  text,
  score,
});

const fakeRetriever = (results: RetrievedChunk[]): Retriever & { retrieve: ReturnType<typeof vi.fn> } => ({
  retrieve: vi.fn(async () => results),
});

const ask = (content: string): ChatMessage[] => [{ role: "user", content }];

describe("planAnswer", () => {
  it("returns a cached answer for a suggested opening question without retrieving", async () => {
    const retriever = fakeRetriever([]);
    const plan = await planAnswer(ask("what services do you offer"), {
      retriever,
      cache: [{ question: "What services do you offer?", answer: "SEO and ads.", sources: [] }],
    });
    expect(plan).toMatchObject({ kind: "cached", text: "SEO and ads." });
    expect(retriever.retrieve).not.toHaveBeenCalled();
  });

  it("does not use the cache for follow-up questions", async () => {
    const history: ChatMessage[] = [
      { role: "user", content: "Tell me about SEO" },
      { role: "assistant", content: "..." },
      { role: "user", content: "What services do you offer?" },
    ];
    const plan = await planAnswer(history, {
      retriever: fakeRetriever([chunk("/services", 0.8)]),
      cache: [{ question: "What services do you offer?", answer: "cached", sources: [] }],
      minScore: 0.35,
    });
    expect(plan.kind).toBe("llm");
  });

  it("refuses to guess when nothing is relevant", async () => {
    const plan = await planAnswer(ask("What's the weather?"), {
      retriever: fakeRetriever([chunk("/blog", 0.1)]),
      minScore: 0.35,
    });
    expect(plan).toMatchObject({ kind: "not_found", sources: [CONTACT_SOURCE] });
  });

  it("sends only relevant chunks to the LLM and dedupes sources", async () => {
    const plan = await planAnswer(ask("How much is SEO?"), {
      retriever: fakeRetriever([chunk("/pricing", 0.7, "SEO from $500"), chunk("/pricing", 0.6), chunk("/blog", 0.2)]),
      minScore: 0.35,
    });
    if (plan.kind !== "llm") throw new Error("expected llm plan");
    expect(plan.chunks).toHaveLength(2);
    expect(plan.sources).toEqual([{ url: "/pricing", title: "Title /pricing" }]);
    expect(plan.messages[0].role).toBe("system");
    expect(plan.messages[0].content).toContain("SEO from $500");
    expect(plan.messages[plan.messages.length - 1]).toEqual({ role: "user", content: "How much is SEO?" });
  });
});

describe("retrievalQuery", () => {
  it("adds the previous question to short follow-ups", () => {
    const history: ChatMessage[] = [
      { role: "user", content: "Do you offer local SEO for restaurants?" },
      { role: "assistant", content: "Yes." },
      { role: "user", content: "How much?" },
    ];
    expect(retrievalQuery(history)).toBe("Do you offer local SEO for restaurants?\nHow much?");
  });

  it("uses long questions as-is", () => {
    expect(retrievalQuery(ask("Which industries do you usually work with?"))).toBe(
      "Which industries do you usually work with?"
    );
  });
});
