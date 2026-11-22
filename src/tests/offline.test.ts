import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const origin = "https://brucke.test";
const worker = readFileSync(new URL("../../public/sw.js", import.meta.url), "utf8");
type CacheKey = string | { url: string };
const keyOf = (key: CacheKey) => typeof key === "string" ? new URL(key, origin).href : key.url;

class MemoryCache {
  entries = new Map<string, Response>();
  async put(key: CacheKey, response: Response) { this.entries.set(keyOf(key), response.clone()); }
  async match(key: CacheKey) { return this.entries.get(keyOf(key))?.clone(); }
  async keys() { return [...this.entries.keys()].map((url) => new Request(url)); }
  async delete(key: CacheKey) { return this.entries.delete(keyOf(key)); }
  async addAll(urls: string[]) { for (const url of urls) await this.put(url, new Response("offline fallback")); }
}

function workerBrowser(version: string, openClients = 0) {
  const handlers = new Map<string, (event: Record<string, unknown>) => void>();
  const caches = new Map<string, MemoryCache>();
  const open = async (name: string) => {
    if (!caches.has(name)) caches.set(name, new MemoryCache());
    return caches.get(name)!;
  };
  let network: (url: string) => Promise<Response> = async () => { throw new Error("offline"); };
  vm.runInNewContext(worker, {
    URL, Request, Response, Set,
    caches: { open, keys: async () => [...caches.keys()], delete: async (name: string) => caches.delete(name) },
    self: {
      location: { href: `${origin}/sw.js?v=${version}`, origin },
      addEventListener: (name: string, handler: (event: Record<string, unknown>) => void) => handlers.set(name, handler),
      clients: { matchAll: async () => Array.from({ length: openClients }, () => ({})), claim: async () => {} },
    },
    fetch: (request: { url: string }) => network(request.url),
  });
  const lifecycle = async (name: string) => {
    const work: Promise<unknown>[] = [];
    handlers.get(name)!({ waitUntil: (promise: Promise<unknown>) => work.push(promise) });
    await Promise.all(work);
  };
  const request = async (path: string, mode = "navigate") => {
    let response: Promise<Response> | undefined;
    const work: Promise<unknown>[] = [];
    handlers.get("fetch")!({
      request: { url: new URL(path, origin).href, method: "GET", mode, headers: new Headers() },
      waitUntil: (promise: Promise<unknown>) => work.push(promise),
      respondWith: (promise: Promise<Response>) => { response = promise; },
    });
    if (!response) throw new Error(`Worker did not intercept ${path}`);
    const result = await response;
    await Promise.all(work);
    return result;
  };
  return { caches, open, lifecycle, request, setNetwork: (next: typeof network) => { network = next; } };
}

describe("Offline worker update and outage recovery", () => {
  it("keeps a usable previous page and its exact chunks after a new worker activates offline", async () => {
    const browser = workerBrowser("B");
    const old = await browser.open("brucke-offline-A");
    await old.put("/", new Response("working build A"));
    await old.put("/_next/static/build-A.js", new Response("build A chunk"));
    await browser.lifecycle("install");
    await browser.lifecycle("activate");
    expect(await (await browser.request("/")).text()).toBe("working build A");
    expect(await (await browser.request("/_next/static/build-A.js", "cors")).text()).toBe("build A chunk");
  });

  it("uses a cached page for server outages but does not mask a real 404", async () => {
    const browser = workerBrowser("B");
    await (await browser.open("brucke-offline-B")).put("/settings", new Response("cached settings"));
    browser.setNetwork(async () => new Response("outage", { status: 503 }));
    expect(await (await browser.request("/settings")).text()).toBe("cached settings");
    browser.setNetwork(async () => new Response("not found", { status: 404 }));
    expect((await browser.request("/settings")).status).toBe(404);
  });

  it("retains older resources while an open tab could still require them", async () => {
    const browser = workerBrowser("C", 1);
    await browser.open("brucke-offline-A");
    await browser.open("brucke-offline-B");
    await browser.lifecycle("install");
    await browser.lifecycle("activate");
    expect([...browser.caches.keys()]).toEqual(["brucke-offline-A", "brucke-offline-B", "brucke-offline-C"]);
  });

  it("prunes superseded builds once tabs are closed, retaining the last offline build", async () => {
    const browser = workerBrowser("C");
    await browser.open("brucke-offline-A");
    await (await browser.open("brucke-offline-B")).put("/", new Response("working build B"));
    await browser.lifecycle("install");
    await browser.lifecycle("activate");
    expect([...browser.caches.keys()]).toEqual(["brucke-offline-B", "brucke-offline-C"]);
  });

  it("does not mistake a newer fallback-only installation for a usable offline build", async () => {
    const browser = workerBrowser("C");
    await (await browser.open("brucke-offline-A")).put("/", new Response("working build A"));
    await (await browser.open("brucke-offline-B")).put("/offline.html", new Response("fallback only"));
    await browser.lifecycle("install");
    await browser.lifecycle("activate");
    expect(await (await browser.request("/")).text()).toBe("working build A");
    expect([...browser.caches.keys()]).toEqual(["brucke-offline-A", "brucke-offline-C"]);
  });

  it("isolates media/lesson writes so fonts and sounds never evict app shell chunks", async () => {
    const browser = workerBrowser("V1");
    browser.setNetwork(async (req) => new Response(`body:${req}`));
    await browser.lifecycle("install");
    await browser.request("/");
    await browser.request("/_next/static/chunks/app.js", "cors");

    // Flood media cache past its 200-entry limit with sound/font previews
    for (let i = 0; i < 220; i++) {
      await browser.request(`/sounds/click${i}.wav`, "cors");
    }

    const shellCache = await browser.open("brucke-offline-V1");
    expect(await shellCache.match("https://brucke.test/")).toBeDefined();
    expect(await shellCache.match("https://brucke.test/_next/static/chunks/app.js")).toBeDefined();

    const mediaCache = await browser.open("brucke-media-V1");
    expect((await mediaCache.keys()).length).toBeLessThanOrEqual(200);
  });

  it("retains paired shell and media caches for the last usable build on activate", async () => {
    const browser = workerBrowser("C");
    await (await browser.open("brucke-offline-A")).put("/", new Response("old A"));
    await (await browser.open("brucke-media-A")).put("/sounds/a.wav", new Response("a"));
    await (await browser.open("brucke-offline-B")).put("/", new Response("usable B"));
    await (await browser.open("brucke-media-B")).put("/data/de/lessons/1.json", new Response("{}"));

    await browser.lifecycle("install");
    await browser.lifecycle("activate");

    expect([...browser.caches.keys()].sort()).toEqual([
      "brucke-media-B",
      "brucke-offline-B",
      "brucke-offline-C",
    ]);
  });
});
