/**
 * Retrieval quality check. For each question in evals/chat-questions.json:
 *  - `expect: ["/path", ...]`  -> one of the top-k chunks must come from one of these pages
 *  - `expect: []`              -> off-topic: the best score must stay below MIN_SCORE
 *
 *   npm run chat:eval
 *
 * Run it after changing chunking, MIN_SCORE, the embedding model, or site content.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { MIN_SCORE, TOP_K } from "@/lib/chatbot/config";
import { localEmbedder } from "@/lib/chatbot/embedder";
import { createRetriever, INDEX_PATH } from "@/lib/chatbot/retriever";
import { chatIndexSchema } from "@/lib/chatbot/types";

type EvalCase = { question: string; expect: string[] };

const PASS_RATE = 0.8;

async function main() {
  const index = chatIndexSchema.parse(JSON.parse(await readFile(INDEX_PATH, "utf8")));
  const cases = JSON.parse(
    await readFile(path.join(process.cwd(), "evals", "chat-questions.json"), "utf8")
  ) as EvalCase[];
  const retriever = createRetriever(index, localEmbedder);

  let passed = 0;
  for (const c of cases) {
    const results = await retriever.retrieve(c.question, TOP_K);
    const top = results[0]?.score ?? 0;
    const relevant = results.filter((r) => r.score >= MIN_SCORE);

    const ok =
      c.expect.length === 0
        ? relevant.length === 0
        : relevant.some((r) => c.expect.some((e) => r.url === e || r.url.startsWith(e + "/")));

    if (ok) passed++;
    const got = [...new Set(results.map((r) => `${r.url} ${r.score.toFixed(2)}`))].slice(0, 3).join(", ");
    console.log(`${ok ? "PASS" : "FAIL"}  top=${top.toFixed(2)}  ${c.question}`);
    if (!ok) console.log(`      expected ${c.expect.length ? c.expect.join(" | ") : "no match"}; got ${got}`);
  }

  const rate = passed / cases.length;
  console.log(`\n${passed}/${cases.length} passed (${(rate * 100).toFixed(0)}%), MIN_SCORE=${MIN_SCORE}, TOP_K=${TOP_K}`);
  if (rate < PASS_RATE) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
