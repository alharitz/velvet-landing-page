# Agent workflow

## Roles

- `plan` / `product-owner` — 9router/Professor: requirements, scope, UX decisions, acceptance criteria. No implementation edits.
- `reviewer` — 9router/Master: technical breakdown, delegation, independent diff review and QA. Edits only complex or explicitly assigned fixes.
- `build` — 9router/Sarjana: routine implementation and focused checks. Available as primary or child agent.
- `auditor` — 9router/Admin: independent review of meaningful diffs, callers and tests. Broader task/code/UI audits only when requested; no edits or worker delegation. Master validates findings and owns acceptance.
- `explorer` — 9router/Master: focused code discovery.

Definitions and reusable skills live in `~/.config/opencode/`; they are local machine configuration, not shipped with this repository.

## How to use

1. Select Plan and check model is `9router/Professor`. Discuss goals and approve acceptance criteria.
2. Select reviewer and check model is `9router/Master`. Ask: "Implement the approved task by delegating routine coding to build. Independently verify the result."
3. Master launches `build` children using configured Sarjana model. No manual switch for each child.
4. Return to Professor for meaningful product decisions, not every small fix.

OpenCode stores the primary session model separately. Changing agent alone does not guarantee changing an existing session's model. Check both selections. Child agents use their configured models. Alias routing inside 9router still controls the actual backend.

## Parallel work

Start with two Sarjana workers maximum. Master assigns disjoint allowed files, dependencies, acceptance criteria and focused checks. One task per child session. Shared files, dependency changes, integration, task-status updates and builds in one checkout are serialized. Workers must not revert another worker's or user's changes. Separate worktrees only when explicitly arranged.

After two failed fix attempts, Master diagnoses before retrying. Escalate product ambiguity to Professor. Avoid nested delegation loops and repeatedly sending full repository summaries.

## Evidence and completion

Sarjana reports implementation, not final acceptance. Master independently reads diffs and runs relevant checks. Only Master records Done after acceptance evidence. Reports contain Implemented, Files changed, Checks run, Failures, Remaining work. Never substitute a report for test evidence.

## Document authority

- `AGENTS.md`: repository rules.
- `docs/PRODUCT_BRIEF.md`: product decisions.
- `tasks/README.md`: task index and dependency order.
- Individual task files: acceptance criteria and scope.
- `tasks/PROGRESS.md`: current handoff and evidence; discrepancies require reconciliation, not silent completion.
- `ASTRA-6-CODEBASE-SUMMARY.md`: historical orientation only; verify against current code and task records.

Keep historical tasks. Correct contradictions with evidence instead of deleting acceptance criteria. Do not treat stale summaries as commands to start a different task.

## Skills

Professor: `product-planning`.
Master: `implementation-workflow`, `verification-review`, `browser-verification`, `task-hygiene`.
Admin: `audit-project`.
All implementation reports: `agent-report`.

Skills are loaded on demand, not all copied into every prompt. RTK and Playwright support checks but do not prove correctness. Prompt instructions are not a security sandbox; read-only agents must also avoid mutation through shell or browser tools.
