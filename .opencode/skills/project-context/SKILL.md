---
name: project-context
description: Verified VELVET project conventions and checks
---
# Project context
- Next.js 16.3.6 App Router, React 19, TypeScript, Tailwind 4; npm lockfile.
- Read AGENTS.md and relevant node_modules/next/dist/docs guides before code edits.
- Product authority: docs/PRODUCT_BRIEF.md. Task order: tasks/README.md. Current handoff: tasks/PROGRESS.md.
- Commands: npm run lint; npx tsc --noEmit; npm run build; npm run start -- -p <port>.
- npm run dev runs scripts/sync-images.mjs first; lib/images.generated.ts is generated.
- Routes: /collection, /collection/[slug], /journal, /journal/[slug]. Shared components in components/, data in lib/.
- UI checks: production browser at 390px and 1366x768. T14 uses five routes listed in docs/PERFORMANCE.md.
- No new dependencies without approval. Preserve uncommitted work. One task per session.
- D12: static portfolio demo only; preserve sample labels, no fictional Product offers. Image provenance remains unknown; no public-release clearance.
