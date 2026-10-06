# Runbook: how tasks are executed

The owner reviews between tasks. The agent works autonomously inside one task, then stops.

## Start of every session
1. Read tasks/PROGRESS.md (State block first), this file, docs/PRODUCT_BRIEF.md, and the table in tasks/README.md.
2. Pick the work:
   - If State.CURRENT names a task, RESUME it: inspect its branch, git status, and the log checkpoints, then finish what is left. Do not restart it or recreate its branch.
   - Otherwise take the first task in the run order whose dependencies are all Done. Run order: T06 (if not Done), T11, T12, T13, T15, T07, T14, T08, T10.
   - If none remain, set State.NEXT to "ALL TASKS DONE", and stop.
3. Merge the previous task. The owner's "continue" message is the approval. If State.LAST_DONE has Status Done and its branch is not merged into BASE_BRANCH: checkout BASE_BRANCH, git merge --no-ff <branch>, run npm run build, and log the merge. If the merge conflicts or the build fails, run git merge --abort, log a blocker, and stop without starting a new task.
   If the owner's message starts with "Fix:", do that fix on the same task branch instead, update the log entry, and stop.
4. Create the task branch from BASE_BRANCH, named tNN-<short-slug>. git status must be clean first.
5. Set State.CURRENT and write a STARTED entry with a timestamp (Get-Date -Format "yyyy-MM-dd HH:mm").

## While working
- Never ask the owner questions. Decide, and record the decision under Assumptions.
- Stay inside the task's scope. Out-of-scope findings go in the log, not into the code.
- No new dependencies unless the task cannot be done without one; justify it in the log.
- Add a one-line checkpoint to the log after implementation is complete and again after verification, so a crashed session can be resumed.
- Blockers: never abandon the whole task over a partial blocker. Implement everything that is not blocked, mark the blocked parts, and record under Blockers what the owner must provide. Stop early only if the task cannot be done at all.
- PowerShell: use curl.exe, Select-String, Get-ChildItem. Never use grep or setx. Environment variables only for the current session, cleared afterwards. Stop every server you start.
- Never run git reset --hard, git clean, git checkout -- <path>, force pushes, or history rewrites, and never delete tracked files.

## Evidence rules
- Verify against the production build (npm run build, then npm run start on a free port). Check every acceptance criterion and log one short line of REAL output for each.
- If something was not run, write NOT RUN. Never claim a visual check you could not perform; write "no browser tooling" instead.
- Never invent hashes, slugs, routes, or product names. Use git rev-parse --short HEAD and the real data in lib/.
- Never print whole files, long logs, or full HTML; filter the output. Keep each log entry under 60 lines.
- Lint must have 0 errors; report the warning count and any new warnings.
- A task is Done only if every criterion is PASS (NOT RUN is allowed only for items that need the owner's real assets, listed under Owner actions). Otherwise its status is Partial, with the failing items listed.

## Finishing a task
1. Update the task's Status in tasks/README.md.
2. Commit the code and that change as "TNN: <title>". The commit holds only this task's changes.
3. Complete the task's entry in tasks/PROGRESS.md and update the State block. Commit that separately as "docs: log TNN" (so the entry can contain the real hash of the task commit).
4. Stop. Do NOT merge, do NOT start the next task, and do NOT print the report. The only message to the owner is one line:
   "TNN done|partial. Logged in tasks/PROGRESS.md. Blockers: none|yes (N)."
5. If the owner asks to see a report, print that task's log entry only.
