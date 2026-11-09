// Límite de envíos por IP en memoria. Suficiente para un servidor único;
// en hosting serverless con varias instancias conviene usar Redis/Upstash.

const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryInMin: Math.ceil((windowMs - (now - recent[0])) / 60000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return { ok: true, retryInMin: 0 };
}
