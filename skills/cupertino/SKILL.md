---
name: cupertino
description: Use Cupertino CLI to search and read Apple platform documentation locally. Use when you need authoritative Apple API docs, Swift Evolution proposals, or HIG guidance.
---

# Cupertino (Apple Docs)

Cupertino is a local Apple documentation crawler and MCP server. In this project, use its **CLI** to search and read docs on demand.

## Setup (one-time)

```bash
cupertino setup
```

If the command isn’t found, verify the install path:

```bash
which cupertino
```

## Search

Use the CLI search to find relevant docs and get a URI you can open:

```bash
cupertino search "<query>"
```

## Read a document

Use the URI returned by search:

```bash
cupertino read "<uri>"
```

## Optional: run the MCP server

If you want a long-running server (outside this session):

```bash
cupertino serve
```

## When to Use

- Searching Apple API documentation quickly
- Reading Swift Evolution proposals
- Looking up Human Interface Guidelines (HIG)
- Any Apple platform docs lookup without web browsing

## Notes

- Prefer CLI search/read in this repo unless explicitly requested to run the MCP server.
- For Apple Silicon Homebrew installs, the binary is often at `/opt/homebrew/bin/cupertino`.
