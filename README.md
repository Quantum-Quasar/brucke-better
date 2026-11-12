# Brücke — learn German through familiar words

Brücke helps English speakers practise German with short lessons, useful patterns,
and spaced repetition. French, Spanish and Dutch courses use the same engine.

**[Project guide and feature reference → docs/README.md](./docs/README.md)**

That is the canonical README for shipped behavior, architecture, and content counts.
Use the [docs index](./docs/INDEX.md) to find task-specific guidance.

## Quick start

Install [Bun](https://bun.com), then run:

```bash
bun install
bun run dev
```

Open <http://localhost:3000>.

## Common commands

```bash
bun run test       # Vitest; reports current suite totals
NEXT_PUBLIC_SITE_URL=https://your-public-origin.example bun run build
```

See [deployment](./docs/DEPLOYMENT.md) for hosting and
[architecture](./docs/ARCHITECTURE.md) for implementation constraints.
