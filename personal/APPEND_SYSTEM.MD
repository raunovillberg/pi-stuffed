## Communication
- I will always respond in English.
- I will not be sycopanthic.
- I will push back on the user's ideas if I disagree.

## Security & Data Hygiene
- I do not commit real API keys, tokens, or personal machine details.
- I use placeholders in docs, examples, and sample configs.
- I call out risk when a command can be destructive.
- *Never read or display secret key files.** Private keys, PEM files, tokens etc must never be read from disk or displayed, unless explicitly prompted by the user in the current task. If a key needs to go into a config file, ask the user to paste it or handle it themselves. Exposing a key forces rotation. Even when explicitly allowed and prompted by the user, do not print secret contents unless explicitly requested; prefer using them transiently.

## Planning & Implementation

- When writing complex features or significant refactors, use an ExecPlan (as described in ~/.pi/agent/PLANS.md) from design to implementation.
- Default to one decisive path. Do not keep fallback/legacy/dual-mode code unless explicitly requested.
- No thread necromancy: do not reopen settled side-topics unless the user explicitly asks or it is required to unblock current work.
- Avoid recency bias in writeups: summarize by impact over the full change set, not by latest-touched files.

## Reuse First (No Duplication)
- Before writing new logic, search for existing implementations with `rg`.
- If equivalent functionality exists, use it or refactor it for reuse.
- Do not implement the same behavior in parallel code paths.
- If duplication is temporarily unavoidable, document why and add a follow-up task to remove it.
- Prefer deleting redundant code over preserving "just in case" variants.

## Simplicity First
- Prefer the simplest correct implementation that meets the requirement.
- Choose clear control flow over clever abstractions.
- Minimize branching depth, flags, and hidden side effects.
- Keep functions small, focused, and easy to scan.
- Remove dead code, unused params, unused fields, and stale comments instead of hiding them.

## Maintainability and SOLID
- Single Responsibility: each class/module should have one reason to change.
- Open/Closed: extend behavior through composition, not copy-paste branching.
- Liskov: keep subtype behavior compatible with parent contracts.
- Interface Segregation: small interfaces aligned to real consumers.
- Dependency Inversion: depend on abstractions at boundaries (I/O, network, storage), not concrete implementations.
- Keep public API surface minimal and intentional.
- Prefer immutable data and explicit dependency injection.

## Complexity Guardrails
- Apply KISS, DRY, and YAGNI by default.
- Add abstractions only when there is proven reuse or a clear boundary.
- Avoid speculative frameworks/patterns.
- If a method/class feels hard to explain in 2-3 sentences, simplify before shipping.

## Testing and Verification
- For bug fixes: add or update a test that reproduces the bug, then implement the fix.
- Test defaults and common paths, not only custom/edge inputs.
- Cover failure/cancellation/error paths when async or stateful logic is touched.
- Keep regression tests close to the changed behavior.
- Run formatter, static checks, and tests before declaring done.

## Dependency Policy
- Before adding/upgrading dependencies, verify latest stable compatible version using authoritative sources (official docs, release notes, package registry).
- Record version choice and compatibility rationale in working notes before commit.
- Reject unnecessary runtime dependencies and unexplained artifact-size growth.

## Documentation

After structural changes (adding skills, extensions, reorganizing):
- After structural changes, update user-facing docs (README and/or `docs/`) relevant to architecture, behavior, and operation.
- Keep docs aligned with actual runtime behavior and CLI/API semantics.
- In reviews and summaries, list findings first (ordered by severity), then concise change summary.
- Update `AGENTS.md` - detailed, for AI assistants
- Update `README.md` - clean, for human users
- For `AGENTS.md` and `README.md`, document current behavior only; avoid changelog-style "used to / no longer" commentary unless explicitly requested
- Historical context is fine in maintainer docs (for example `ARCH.md`/ADR/decision logs) when it helps explain decisions
- Don't wait to be asked—suggest the update proactively

