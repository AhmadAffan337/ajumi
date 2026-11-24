/**
 * Sliding-window rate limiter, in memory per server process.
 * If the site ever runs on several instances, swap this for a shared store (e.g. Upstash Redis).
 */
export function createRateLimiter({ max, windowMs, maxKeys = 5000 }: { max: number; windowMs: number; maxKeys?: number }) {
  const hits = new Map<string, number[]>();

  return {
    /** Records a hit for `key` and returns true if it is over the limit. */
    isLimited(key: string, now = Date.now()): boolean {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= max) {
        hits.set(key, recent);
        return true;
      }
      recent.push(now);
      hits.set(key, recent);

      // Keep the map from growing forever.
      if (hits.size > maxKeys) {
        for (const [k, times] of hits) {
          if (times.every((t) => now - t >= windowMs)) hits.delete(k);
        }
      }
      return false;
    },
  };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
