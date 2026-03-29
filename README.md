# Pi-Stuffed

Stuff for the [pi Coding Agent](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent).

## Extensions

| Extension | Description |
|-----------|-------------|
| [`status-line-timed.ts`](extensions/status-line-timed.ts) | A tiny extension of the original [status-line](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/examples/extensions/status-line.ts) that adds timestamps to the status bar. Shows when each turn completed (e.g., "09:36:42 ✓ Turn 23 complete") so you know exactly when you left off. Timestamps are static and don't auto-refresh. |
| [`reddit.ts`](extensions/reddit.ts) | Fetch Reddit posts: /reddit subreddit [hot, new, top, rising] limit. Note: likely blocked with a lot of LLM-s. ![video of the extension in action](https://github.com/user-attachments/assets/32f66d88-da88-4c41-836d-407f48300255) |

## Skills

| Skill | Description |
|-------|-------------|
| [`cupertino`](skills/cupertino/SKILL.md) | Use [Cupertino](https://github.com/mihaelamj/cupertino) via CLI for Apple documentation. |

## Anthropic Harness

Multi-agent harness primitives based on [Anthropic's harness design research](https://www.anthropic.com/engineering/harness-design-long-running-apps) for long-running LLM agents. Implements a GAN-inspired generator-evaluator architecture with planner, generator, and evaluator personas.

Requires [pi-subagents](https://github.com/nicobailon/pi-subagents).

### Installation

```bash
./anthropic-harness/install.sh
```

This symlinks agents and chains into `~/.pi/agent/agents/` where pi-subagents discovers them. Restart pi after installing.

To remove:

```bash
./anthropic-harness/install.sh --remove
```

### Agents

| Agent | Description |
|-------|-------------|
| [`spec-expander`](anthropic-harness/agents/spec-expander.md) | Expands a brief prompt (1-4 sentences) into a full product spec. Stays at product level — defines WHAT, not HOW. |
| [`sprint-contract-negotiator`](anthropic-harness/agents/sprint-contract-negotiator.md) | Converts a high-level feature into a concrete sprint contract of testable acceptance criteria. |
| [`adversarial-qa`](anthropic-harness/agents/adversarial-qa.md) | Hostile QA agent. Tests running apps against acceptance criteria, finds real bugs by probing edge cases. Does not rubber-stamp. |
| [`design-generator`](anthropic-harness/agents/design-generator.md) | Generates/refines UI artifacts. Responds to evaluator feedback. Avoids generic AI patterns. |
| [`design-evaluator`](anthropic-harness/agents/design-evaluator.md) | Skeptical design reviewer. Grades against weighted criteria (design quality, originality, craft, functionality). Independent from generator. |
| [`context-reset-handoff`](anthropic-harness/agents/context-reset-handoff.md) | Produces a structured handoff artifact for context resets in long-running sessions. Fresh agent picks up with zero prior context. |

### Chains

| Chain | Steps | When to Use |
|-------|-------|-------------|
| [`build-with-qa-loop`](anthropic-harness/chains/build-with-qa-loop.chain.md) | spec-expander → implementer → adversarial-qa | "Build X and make sure it works end-to-end." Quick build + verification. |
| [`design-iteration-loop`](anthropic-harness/chains/design-iteration-loop.chain.md) | design-generator → design-evaluator (loop N times) | "Design a landing page," "iterate on this UI." GAN-inspired quality loop. |
| [`full-build-pipeline`](anthropic-harness/chains/full-build-pipeline.chain.md) | spec-expander → sprint-contract-negotiator → implementer → adversarial-qa | "Build me X from scratch." Full harness for greenfield multi-sprint builds. |

### Usage

After running `install.sh`, the agents and chains appear in pi-subagents. Trigger them via slash commands or the subagent tool:

```
/run spec-expander "Build a 2D retro game maker with a level editor and sprite editor"
/chain build-with-qa-loop "Build a DAW in the browser using the Web Audio API"
/chain design-iteration-loop "Design a landing page for a Dutch art museum"
```

Or from the Agents Manager overlay (`Ctrl+Shift+A`).

### Architecture

Based on two key findings from Anthropic's research:

1. **Self-evaluation fails.** Models reliably praise their own mediocre work. Separating the generator from the evaluator is essential. Tuning a standalone evaluator to be skeptical is tractable; making a generator self-critical is not.

2. **Subjective quality can be graded.** Aesthetic judgments ("is this design good?") become concrete when decomposed into weighted criteria with explicit PASS/FAIL thresholds and few-shot calibration.

The three-agent pattern (planner → generator → evaluator) maps to the software development lifecycle: spec → build → QA. Sprint contracts bridge the gap between high-level specs and testable implementation before any code is written.
