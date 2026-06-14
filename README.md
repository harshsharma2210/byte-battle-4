# Byte Battle 4

Mobile-first sales lead CRM prototype built with Next.js, React, and TypeScript.

## Requirements

- Node.js 20.9 or newer
- pnpm 10.15.0

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
pnpm verify
```

The verification command runs linting, TypeScript checks, and a production Next.js build.

## GitHub Pages

```bash
pnpm build:pages
```

The Pages workflow exports the app as static files with the `/byte-battle-4` base path and deploys the `out` directory.

## Vercel

Vercel should auto-detect Next.js. Use:

- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: `.next`
