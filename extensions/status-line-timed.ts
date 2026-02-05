/**
 * Status Line Timed Extension
 *
 * A tiny extension of the original status-line from:
 * https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/examples/extensions/status-line.ts
 *
 * Adds timestamps to status messages. Timestamps are captured when status is set
 * and don't auto-refresh. Format: "09:35:31 Ready" (24-hour time, no date)
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function formatTime(date: Date = new Date()): string {
	return date.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});
}

export default function (pi: ExtensionAPI) {
	let turnCount = 0;

	pi.on("session_start", async (_event, ctx) => {
		const theme = ctx.ui.theme;
		const timestamp = theme.fg("dim", `${formatTime()} `);
		ctx.ui.setStatus("status-timed", timestamp + theme.fg("dim", "Ready"));
	});

	pi.on("turn_start", async (_event, ctx) => {
		turnCount++;
		const theme = ctx.ui.theme;
		const timestamp = theme.fg("dim", `${formatTime()} `);
		const spinner = theme.fg("accent", "●");
		const text = theme.fg("dim", `Turn ${turnCount}...`);
		ctx.ui.setStatus("status-timed", timestamp + spinner + text);
	});

	pi.on("turn_end", async (_event, ctx) => {
		const theme = ctx.ui.theme;
		const timestamp = theme.fg("dim", `${formatTime()} `);
		const check = theme.fg("success", "✓");
		const text = theme.fg("dim", `Turn ${turnCount} complete`);
		ctx.ui.setStatus("status-timed", timestamp + check + text);
	});

	pi.on("session_switch", async (event, ctx) => {
		if (event.reason === "new") {
			turnCount = 0;
			const theme = ctx.ui.theme;
			const timestamp = theme.fg("dim", `${formatTime()} `);
			ctx.ui.setStatus("status-timed", timestamp + theme.fg("dim", "Ready"));
		}
	});
}
