/** Vectors are L2-normalized at embedding time, so the dot product is the cosine similarity. */
export function dot(a: readonly number[], b: readonly number[]): number {
  let sum = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) sum += a[i] * b[i];
  return sum;
}

/** Brute-force top-k. Fine up to ~10k chunks; beyond that move to a vector DB. */
export function topK<T extends { vector: readonly number[] }>(
  query: readonly number[],
  items: readonly T[],
  k: number
): { item: T; score: number }[] {
  return items
    .map((item) => ({ item, score: dot(query, item.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
