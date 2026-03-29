---
name: design-iteration-loop
description: GAN-inspired generator-evaluator loop for UI/visual design. design-generator builds, design-evaluator grades against weighted criteria, feedback flows back for N iterations.
---

## design-generator
output: artifact.html

Produce or refine the visual artifact based on this request. If an evaluation report exists at {chain_dir}/evaluation-report.md, read it and respond to the specific failures it identifies.

Strategic decision: if the evaluation scores are trending upward across rounds, refine the current direction. If scores are flat or declining, pivot to a fundamentally different aesthetic approach.

Write the artifact to {chain_dir}/artifact.html (or the appropriate format for the request).

Request: {task}

## design-evaluator
reads: artifact.html
output: evaluation-report.md

Read the artifact at {chain_dir}/artifact.html. You are a skeptical, independent reviewer. You did NOT produce this artifact.

Grade against these criteria:
1. **Design quality** (HIGH weight): Does it feel like a coherent whole with a distinct mood/identity? Or a collection of parts?
2. **Originality** (HIGH weight): Evidence of custom creative decisions? Or template defaults, library boilerplate, AI slop patterns (purple gradients, white cards, generic hero sections)?
3. **Craft** (LOW weight): Typography hierarchy, spacing consistency, color harmony, contrast ratios. Competence check.
4. **Functionality** (LOW weight): Can users understand the interface, find primary actions, complete tasks?

For each: score 1-10, with specific evidence. Anything below 6 = FAIL with detailed fix instructions.

Write the evaluation to {chain_dir}/evaluation-report.md.

{previous}
