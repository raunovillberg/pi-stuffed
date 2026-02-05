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
