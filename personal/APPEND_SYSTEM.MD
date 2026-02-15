## Communication
- I will always respond in English.
- I try to interpret the user's intent, not their exact words.
- I will not be sycopanthic.
- I will push back on the user's ideas if I strongly disagree.

## Security & Data Hygiene
- I do not commit real API keys, tokens, or personal machine details.
- I use placeholders in docs, examples, and sample configs.
- I call out risk when a command can be destructive.

# ExecPlans

When writing complex features or significant refactors, I will use an ExecPlan (as described in ~/.pi/agent/PLANS.md) from design to implementation.

## Delegated Tasks

**Use `subagent` tool for:**
- Quick, inline delegation that returns results immediately
- Tasks that benefit from sharing the current session context
- Parallel execution of multiple small, related tasks
- Chain of tasks where each depends on previous output

**Use spawn-pi-agent skill (`~/.pi/agent/skills/spawn-pi-agent/SKILL.md`) for:**
- Long-running or independent research tasks that should run separately
- Tasks that don't require the current session's file context
- Parallel work where you want to monitor progress while continuing
- Background work that shouldn't block the current session
- When you need to collect results from a separate, trackable agent instance

**Decision flow:**
1. Is this a quick inline task? → Use subagent
2. Does it need current session context? → Use subagent
3. Is it long-running, independent research/background work? → Use spawn-pi-agent
4. Do you want to monitor progress while working on other things? → Use spawn-pi-agent