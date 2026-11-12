import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const args = process.argv.slice(2);
if (args.some((arg) => arg !== "--json")) throw new Error("Usage: bun run audit:assets [--json]");
if (!fs.existsSync(path.join(publicDir, "data", "de", "compendium.json"))) {
  throw new Error("Generated public/data is missing. Run bun run export-data before auditing.");
}

interface Asset { path: string; bytes: number }
interface Totals { files: number; bytes: number }

function collect(directory: string): Asset[] {
  return fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return collect(absolute);
    if (!entry.isFile()) throw new Error(`Unsupported public asset: ${absolute}`);
    return [{ path: path.relative(publicDir, absolute).split(path.sep).join("/"), bytes: fs.statSync(absolute).size }];
  });
}

function totals(assets: Asset[]): Totals {
  return { files: assets.length, bytes: assets.reduce((sum, asset) => sum + asset.bytes, 0) };
}

const assets = collect(publicDir);
const categories = Object.fromEntries(["data", "sounds", "webfonts", "other"].map((category) => [
  category,
  totals(assets.filter((asset) => category === "other"
    ? !/^(data|sounds|webfonts)\//.test(asset.path)
    : asset.path.startsWith(`${category}/`))),
]));
const languages = Object.fromEntries(["de", "fr", "es", "nl"].map((language) => [
  language,
  totals(assets.filter((asset) => asset.path.startsWith(`data/${language}/`))),
]));
const report = {
  total: totals(assets),
  categories,
  languages,
  largest: [...assets].sort((a, b) => b.bytes - a.bytes || a.path.localeCompare(b.path)).slice(0, 10),
  assets,
};

if (args.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("Public asset inventory (raw file bytes, not compressed transfer sizes or eager requests)");
  for (const [name, value] of [["total", report.total], ...Object.entries(categories), ...Object.entries(languages)] as [string, Totals][]) {
    console.log(`${name.padEnd(9)} ${String(value.files).padStart(4)} files  ${String(value.bytes).padStart(10)} bytes  ${(value.bytes / 1024 / 1024).toFixed(2)} MiB`);
  }
  console.log("\nLargest assets:");
  for (const asset of report.largest) console.log(`${String(asset.bytes).padStart(10)}  ${asset.path}`);
  console.log("\nUse --json for the complete per-file inventory. Request behavior is documented in scripts/README.md.");
}
