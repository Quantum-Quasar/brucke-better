export type TrailKey = string | number;

export interface TrailStop<T extends TrailKey> {
  key: TrailKey;
  value: T | null;
  level: number;
  lane: number;
}

export interface BranchingGraph<T extends TrailKey> {
  stops: readonly TrailStop<T>[];
  links: readonly (readonly [TrailKey, TrailKey])[];
  entry: TrailKey;
  incoming: ReadonlyMap<TrailKey, readonly TrailKey[]>;
  outgoing: ReadonlyMap<TrailKey, readonly TrailKey[]>;
  byKey: ReadonlyMap<TrailKey, TrailStop<T>>;
  height: number;
}

export const TRAIL_ENTRY = "@start";

export function trailGraph<T extends TrailKey>(
  stops: readonly TrailStop<T>[],
  links: BranchingGraph<T>["links"],
): BranchingGraph<T> {
  const ordered = [...stops].sort((a, b) => a.level - b.level);
  const incoming = new Map<TrailKey, TrailKey[]>();
  const outgoing = new Map<TrailKey, TrailKey[]>();
  const byKey = new Map(ordered.map((stop) => [stop.key, stop]));
  for (const [from, to] of links) {
    const parent = byKey.get(from);
    const child = byKey.get(to);
    if (!parent || !child || parent.level >= child.level) throw new Error(`Invalid trail link: ${from} → ${to}`);
    const parents = incoming.get(to);
    if (parents) parents.push(from);
    else incoming.set(to, [from]);
    const children = outgoing.get(from);
    if (children) children.push(to);
    else outgoing.set(from, [to]);
  }
  return { stops: ordered, links, entry: TRAIL_ENTRY, incoming, outgoing, byKey, height: ordered.at(-1)?.level ?? 0 };
}

/** Each leg has parallel lanes. Any lane end activates the shared junction into the next leg. */
export function trailLegs<T extends TrailKey>(legs: readonly (readonly (readonly T[])[])[]): BranchingGraph<T> {
  const stops: TrailStop<T>[] = [{ key: TRAIL_ENTRY, value: null, level: 0, lane: 0 }];
  const links: [TrailKey, TrailKey][] = [];
  let entry: TrailKey = TRAIL_ENTRY;
  let level = 0;
  legs.forEach((lanes, index) => {
    const span = Math.max(...lanes.map((lane) => lane.length));
    const hasNext = index + 1 < legs.length;
    const junction = `@junction-${index + 1}`;
    lanes.forEach((lane, column) => {
      const x = (column - (lanes.length - 1) / 2) * (lanes.length === 2 ? 1.5 : 1);
      let previous = entry;
      lane.forEach((value, step) => {
        stops.push({ key: value, value, lane: x, level: level + step + 1 });
        links.push([previous, value]);
        previous = value;
      });
      if (hasNext) links.push([previous, junction]);
    });
    level += span + 1;
    if (hasNext) stops.push({ key: junction, value: null, level, lane: 0 });
    entry = junction;
  });
  return trailGraph(stops, links);
}

export function followTrail<T extends TrailKey>(
  graph: BranchingGraph<T>,
  enabled: boolean,
  canLeave: (value: T, reached: boolean) => boolean,
) {
  const reached = new Set<TrailKey>();
  const traversed = new Set<TrailKey>();
  if (enabled) {
    for (const { key, value } of graph.stops) {
      const open = key === graph.entry || Boolean(graph.incoming.get(key)?.some((id) => traversed.has(id)));
      if (open) reached.add(key);
      if (value === null ? open : canLeave(value, open)) traversed.add(key);
    }
  }
  return { reached, traversed };
}

/** The next (or previous) real stops, crossing only free junctions. */
export function connectedStops<T extends TrailKey>(
  graph: BranchingGraph<T>, key: TrailKey, direction: "incoming" | "outgoing",
): T[] {
  const values = new Set<T>();
  const visited = new Set<TrailKey>();
  function visit(id: TrailKey) {
    if (visited.has(id)) return;
    visited.add(id);
    for (const next of graph[direction].get(id) ?? []) {
      const stop = graph.byKey.get(next)!;
      if (stop.value === null) visit(next);
      else values.add(stop.value);
    }
  }
  visit(key);
  return [...values];
}
