import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "../lib/site-url";
import { resolveDeploymentUrl } from "../../scripts/resolve-deployment-url";

const production = (siteUrl?: string, allowLocalSiteUrl?: string) =>
  resolveSiteUrl({ siteUrl, nodeEnv: "production", allowLocalSiteUrl });

describe("site metadata origin", () => {
  it("permits development localhost without production configuration", () => {
    expect(resolveSiteUrl({ nodeEnv: "development" }).origin).toBe("http://localhost:3000");
    expect(resolveSiteUrl({ siteUrl: "http://localhost:3111" }).origin).toBe("http://localhost:3111");
  });

  it("requires explicit production configuration", () => {
    expect(() => production()).toThrow("required for production");
    expect(() => production("", "1")).toThrow("required for production");
    expect(production("https://brucke.example.com/").origin).toBe("https://brucke.example.com");
  });

  it.each([
    "not-a-url", "//brucke.example.com", "ftp://brucke.example.com", "http://brucke.example.com",
    "https://user:secret@brucke.example.com", "https://brucke.example.com/path",
    "https://brucke.example.com?key=value", "https://brucke.example.com#fragment",
    "http://localhost:3000", "https://localhost", "https://localhost.", "https://app.localhost",
    "https://127.0.0.1", "https://127.1", "https://[::1]", "https://0.0.0.0", "https://app.local",
  ])("rejects invalid or local production origins: %s", (siteUrl) => {
    expect(() => production(siteUrl)).toThrow("NEXT_PUBLIC_SITE_URL");
  });

  it("allows only explicit loopback verification, not a blanket production bypass", () => {
    expect(production("http://localhost:3111", "1").origin).toBe("http://localhost:3111");
    expect(production("http://127.0.0.1:3111", "1").origin).toBe("http://127.0.0.1:3111");
    expect(production("http://[::1]:3111", "1").origin).toBe("http://[::1]:3111");
    expect(() => production("http://localhost:3111", "true")).toThrow();
    expect(() => production("http://brucke.example.com", "1")).toThrow();
    expect(() => production("http://0.0.0.0:3111", "1")).toThrow();
  });
});

describe("deployment smoke origin trust", () => {
  const allowed = "https://preview.example.com,\nhttps://staging.example.com";

  it("accepts only exact configured HTTPS origins", () => {
    expect(resolveDeploymentUrl("https://staging.example.com/", allowed)).toBe("https://staging.example.com");
  });

  it.each([
    undefined, "", "http://staging.example.com", "https://staging.example.com.evil.example",
    "https://evil.example@staging.example.com", "https://staging.example.com:8443",
    "https://staging.example.com/path", "https://localhost", "https://evil.example",
  ])("rejects untrusted deployment URLs: %s", (url) => {
    expect(() => resolveDeploymentUrl(url, allowed)).toThrow();
  });

  it("fails closed when no trusted origins have been configured", () => {
    expect(() => resolveDeploymentUrl("https://staging.example.com", "")).toThrow("DEPLOYMENT_SMOKE_ORIGINS");
    expect(() => resolveDeploymentUrl("https://staging.example.com", "*.example.com")).toThrow();
  });
});
