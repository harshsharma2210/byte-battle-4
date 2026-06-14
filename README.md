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

## Vercel

Vercel should auto-detect Next.js. Use:

- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: `.next`
