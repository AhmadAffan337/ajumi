import { CHUNK_DROP_BELOW_CHARS, CHUNK_MAX_CHARS, CHUNK_MIN_CHARS } from "./config";
import type { PageSection } from "./extract";

export type TextChunk = { url: string; title: string; section: string; text: string };

export type ChunkOptions = { maxChars?: number; minChars?: number; dropBelowChars?: number };

/** Split text on line boundaries into pieces of at most maxChars (a single over-long line is hard-split). */
function splitByLines(text: string, maxChars: number): string[] {
  const pieces: string[] = [];
  let current = "";
  for (const rawLine of text.split("\n")) {
    let line = rawLine;
    while (line.length > maxChars) {
      if (current) {
        pieces.push(current);
        current = "";
      }
      const cut = line.lastIndexOf(" ", maxChars);
      const at = cut > maxChars / 2 ? cut : maxChars;
      pieces.push(line.slice(0, at).trim());
      line = line.slice(at).trim();
    }
    if (!line) continue;
    if (current && current.length + 1 + line.length > maxChars) {
      pieces.push(current);
      current = line;
    } else {
      current = current ? `${current}\n${line}` : line;
    }
  }
  if (current) pieces.push(current);
  return pieces;
}

/**
 * Turn a page's sections into retrieval chunks.
 * - Long sections are split on line boundaries.
 * - Short sections are merged into the previous chunk so headings like "Why us" keep their text.
 * - Tiny leftovers are dropped as noise.
 */
export function chunkPage(
  page: { url: string; title: string; sections: PageSection[] },
  options: ChunkOptions = {}
): TextChunk[] {
  const maxChars = options.maxChars ?? CHUNK_MAX_CHARS;
  const minChars = options.minChars ?? CHUNK_MIN_CHARS;
  const dropBelow = options.dropBelowChars ?? CHUNK_DROP_BELOW_CHARS;

  const chunks: TextChunk[] = [];
  for (const section of page.sections) {
    const block = section.heading === page.title ? section.text : `${section.heading}\n${section.text}`;
    const prev = chunks[chunks.length - 1];
    if (block.length < minChars && prev && prev.text.length + 1 + block.length <= maxChars) {
      prev.text += `\n${block}`;
      continue;
    }
    for (const text of splitByLines(block, maxChars)) {
      chunks.push({ url: page.url, title: page.title, section: section.heading, text });
    }
  }
  return chunks.filter((c) => c.text.length >= dropBelow);
}

/** Text that gets embedded: page title gives the chunk context it may not state itself. */
export function embeddingInput(chunk: Pick<TextChunk, "title" | "text">): string {
  return `${chunk.title}\n${chunk.text}`;
}
