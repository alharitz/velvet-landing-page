<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project docs and workflow

For UI work, use the frontend-design / UI-UX skill if one is available; otherwise follow the Design guidance in the task file. Stay within existing design tokens and check a 390px mobile viewport and a short laptop viewport (1366x768) before reporting. If you have no browser tooling, say so explicitly in the report instead of claiming visual verification.


Product context lives in `docs/PRODUCT_BRIEF.md`, work items live in `tasks/` (see `tasks/README.md`). Agents must work on one task per session and follow the report format in `tasks/README.md`.

Role ownership, delegation, parallel file ownership, document authority and model selection are defined in `docs/AGENT_WORKFLOW.md`. Professor plans; Master coordinates and verifies; Sarjana writes routine code; Admin audits. One task per worker session, at most two independent coding workers initially. Master alone reconciles shared task status after verification. Historical summaries are orientation, not authoritative status.