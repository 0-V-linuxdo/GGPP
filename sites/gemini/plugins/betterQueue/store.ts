/** Queued messages per conversation ("new" for a chat that has no id yet). */

export interface Item {
  id: string;
  text: string;
  /** Model name selected when it was queued; empty when unknown. */
  model: string;
  at: number;
}

export type Queues = Record<string, Item[]>;

export const MAX_ITEMS = 30;
export const MAX_AGE = 24 * 60 * 60_000;
export const MAX_TEXT = 100_000;

/** Drop stale items, cap each queue, and drop empty queues and the unsaved "new" chat. */
export function prune(q: Queues, now: number): Queues {
  const out: Queues = {};
  for (const [key, items] of Object.entries(q)) {
    if (key === "new" || !Array.isArray(items)) continue;
    const fresh = items.filter((i) => i && typeof i.text === "string" && now - i.at < MAX_AGE).slice(0, MAX_ITEMS);
    if (fresh.length) out[key] = fresh;
  }
  return out;
}

/** Move the item with this id to a new index within its queue. */
export function move(items: Item[], id: string, to: number): Item[] {
  const from = items.findIndex((i) => i.id === id);
  if (from < 0) return items;
  const next = [...items];
  const [it] = next.splice(from, 1);
  next.splice(Math.max(0, Math.min(to, next.length)), 0, it);
  return next;
}

/** The first reply in a new chat gives it an id: its queue follows. */
export function adopt(q: Queues, id: string): Queues {
  if (!q.new?.length) return q;
  const { new: fresh, ...rest } = q;
  return { ...rest, [id]: [...(rest[id] ?? []), ...fresh] };
}
