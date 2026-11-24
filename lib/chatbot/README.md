# Website chatbot

Answers visitor questions using only this website's content (RAG). Everything runs on free tiers.

```
build time:  crawl site -> extract text -> chunk -> local embeddings -> data/chat-index.json
request:     question -> embed (local) -> top-5 chunks -> Groq (fallback: Gemini) -> streamed answer + source links
```

## Setup

1. Add at least one free key to `.env` (see `.env.example`): `GROQ_API_KEY` and/or `GEMINI_API_KEY`.
2. Build the index against a running copy of the site:
   ```bash
   npm run build && npm start        # terminal 1
   npm run chat:index                # terminal 2 (defaults to http://localhost:3000)
   ```
3. Restart the server so it loads the new `data/chat-index.json`.

The embedding model (~34 MB) downloads to `.cache/transformers/` on first use, so the server needs outbound internet once.

## When to re-run

| Change | Run |
|---|---|
| Site content changed | `npm run chat:index`, then restart |
| Suggested questions edited (`suggested-questions.ts`) | `npm run chat:index` (regenerates the cached answers) |
| Chunking, `MIN_SCORE`, `TOP_K` or embedding model changed | `npm run chat:index` then `npm run chat:eval` |
| Any code change | `npm test` |

`npm run chat:eval` checks that the questions in `evals/chat-questions.json` retrieve the right pages and that off-topic ones stay below `MIN_SCORE`. Add a case whenever the bot answers something badly.

## Files

| File | Role |
|---|---|
| `config.ts` | All tuning knobs and model names |
| `extract.ts`, `chunker.ts` | HTML -> sections -> chunks |
| `embedder.ts` | `Embedder` interface + local transformers.js implementation |
| `retriever.ts` | Loads the index, cosine top-k |
| `answer.ts` | Decides: cached answer / "not found" / ask LLM |
| `prompt.ts` | System rules and context formatting |
| `llm/` | `LLMProvider` interface, Groq, Gemini, fallback chain |
| `protocol.ts` | NDJSON events between `/api/chat` and the widget (client-safe) |
| `app/api/chat/route.ts` | Validation, rate limit, streaming |
| `components/chat/` | Widget (lazy-loaded on first open) |

## Logs

- `[chat] unanswered (top score …): <question>`: questions the site has no content for. Use these to decide what to write next.
- `[chat] groq failed, trying next provider`: free-tier limit hit or bad key.

## Scaling later

- More than ~10k chunks: move vectors to Supabase pgvector or Upstash Vector (implement `Retriever`).
- More than one server instance: replace the in-memory limiter in `lib/rate-limit.ts` with Upstash Redis.
- Need more quota or privacy: add a paid provider in `llm/` and put it first in `defaultLLMChain`.
