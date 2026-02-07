---
name: scurl
description: Use scurl (secure curl) instead of regular curl for all HTTP requests. scurl is a secure curl wrapper that automatically converts HTML to clean markdown, detects exposed secrets, and provides middleware support.
---

# scurl - Secure Curl Wrapper

scurl is a drop-in replacement for curl that produces clean, LLM-friendly output by default. It automatically converts HTML responses to markdown and includes security features to prevent accidental secret exposure.

## Why Use scurl Instead of curl

| Feature | curl | scurl |
|---------|------|-------|
| HTML output | Raw HTML with scripts/styles | Clean markdown |
| Secret protection | None | Automatic detection & blocking |
| Content size | Full page (often 100KB+) | Extracted content (often 90% smaller) |
| Readability | Noisy | Clean article extraction |

### Size Comparison Examples

| Website | curl | scurl | Reduction |
|---------|------|-------|-----------|
| example.com | 513 bytes | 167 bytes | 67% |
| news.ycombinator.com | 34KB | 10KB | 68% |
| github.com/anthropics | 297KB | 353 bytes | 99.9% |
| docs.python.org | 320KB | 12KB | 96% |

## Installation

```bash
pipx install sibylline-scurl
```

## Basic Usage (Always Prefer Over curl)

```bash
# Instead of: curl https://example.com
# Use:
scurl https://example.com

# All curl flags work identically
scurl -H "Accept: application/json" https://api.example.com/data
scurl -L https://redirect.example.com
scurl -o output.md https://example.com
```

## Common Flags

| Flag | Description |
|------|-------------|
| `--raw` | Disable response middleware (get raw HTML like curl) |
| `--readability` | Extract article content only (strips nav/ads/sidebars) |
| `--render` | Use headless browser for JS-rendered pages |
| `--disable <slug>` | Disable a specific middleware |
| `--list-middleware` | List available middleware |

## When to Use Each Mode

### Default mode (recommended for most cases)
```bash
scurl https://example.com
```
Use for: API docs, blog posts, Wikipedia, any HTML page where you want clean markdown.

### With readability extraction
```bash
scurl --readability https://news-site.com/article
```
Use for: News articles, blog posts with heavy navigation - strips sidebars, ads, headers.

### JavaScript-rendered pages
```bash
scurl --render https://spa-app.com
```
Use for: Single-page apps, React/Vue sites where content loads dynamically.

### Raw mode (when you need actual curl behavior)
```bash
scurl --raw https://example.com
```
Use for: Binary downloads, API responses that shouldn't be converted, non-HTML content.

## Security: SecretDefender

scurl automatically detects and blocks requests containing:
- API keys
- Bearer tokens
- Passwords
- Private keys

If a secret is detected, scurl will block the request and warn you.

To override (if you explicitly want to send a secret):
```bash
scurl --enable secret-defender https://api.example.com
```

## Migration from curl

| curl | scurl equivalent |
|------|------------------|
| `curl URL` | `scurl URL` (clean markdown output) |
| `curl -s URL` | `scurl URL` (scurl is silent by default) |
| `curl URL \| pup` | `scurl URL` (HTML already converted) |
| `curl URL \| htmlq` | `scurl URL` (HTML already converted) |
| `curl URL > file.html` | `scurl --raw URL > file.html` |

## When to Still Use curl

- Downloading binary files (images, PDFs, archives) - use `scurl --raw` or plain curl
- When you specifically need raw HTTP headers/response without processing
- When piping to tools that expect raw HTML

## Tips

1. **Always try scurl first** - it produces cleaner output for LLM consumption
2. **Use `--readability`** for news articles and blog posts
3. **Use `--render`** when content doesn't appear (indicates JS rendering)
4. **Secrets are protected by default** - this is a feature, not a bug
