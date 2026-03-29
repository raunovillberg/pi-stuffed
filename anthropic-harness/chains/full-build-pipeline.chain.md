---
name: full-build-pipeline
description: Full three-agent build harness — spec-expander creates an ambitious plan, sprint-contract-negotiator bridges spec to testable criteria, implementer builds, adversarial-qa tests. Loops on failures per sprint.
---

## spec-expander
output: plan.md

Expand this into a full product spec. Be ambitious. Write to {chain_dir}/plan.md.

{task}

## sprint-contract-negotiator
reads: plan.md
output: sprint-contract.md

Read {chain_dir}/plan.md. Create a sprint contract for the first feature from the plan. Every criterion must be independently testable — cover normal paths AND edge cases. Write to {chain_dir}/sprint-contract.md.

{previous}

## implementer
reads: plan.md, sprint-contract.md
output: build-report.md

Read {chain_dir}/sprint-contract.md and {chain_dir}/plan.md. Implement the sprint. Commit working code. Write a summary of what you built and which acceptance criteria you believe you met to {chain_dir}/build-report.md.

{previous}

## adversarial-qa
reads: sprint-contract.md, build-report.md
output: qa-report.md

Read {chain_dir}/sprint-contract.md for acceptance criteria. Read {chain_dir}/build-report.md for what was claimed. Run the app. Test EVERY criterion. Write results to {chain_dir}/qa-report.md.

{previous}
