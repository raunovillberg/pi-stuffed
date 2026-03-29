---
name: build-with-qa-loop
description: Build a feature with autonomous QA — spec-expander creates an ambitious plan, implementer builds it, adversarial-qa tests the running result against every acceptance criterion.
---

## spec-expander
output: plan.md

Expand this request into a full implementation plan with testable acceptance criteria for each task. Be ambitious about scope. Stay at product level — define WHAT users can do, not HOW to code it. Write to {chain_dir}/plan.md.

Request: {task}

## implementer
reads: plan.md
output: build-report.md

Read {chain_dir}/plan.md. Implement all tasks from the plan. Commit working code. Write a summary of what you built and which acceptance criteria you believe you met to {chain_dir}/build-report.md.

{previous}

## adversarial-qa
reads: plan.md, build-report.md
output: qa-report.md

Read {chain_dir}/plan.md for acceptance criteria. Read {chain_dir}/build-report.md for what the implementer claims they built.

Run the application. Test EVERY acceptance criterion by exercising it like a hostile user — probe edge cases, empty inputs, error states, boundary values. For each criterion: state PASS or FAIL with specific evidence (what you did, what you expected, what actually happened, exact file/line if broken).

A feature that appears present but has no real logic behind it (stub button, display-only data) is a FAIL.

Any single FAIL = the build does not pass. Do not average away failures. Do not talk yourself into accepting mediocre work.

Write results to {chain_dir}/qa-report.md.

{previous}
