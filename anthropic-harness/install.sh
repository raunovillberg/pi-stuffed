#!/usr/bin/env bash
# Symlinks anthropic-harness agents and chains into ~/.pi/agent/agents/
# so they are discovered by the pi-subagents extension.
#
# Usage: ./anthropic-harness/install.sh
# To undo: ./anthropic-harness/install.sh --remove

set -euo pipefail

TARGET_DIR="$HOME/.pi/agent/agents"
SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -d "$TARGET_DIR" ]; then
  mkdir -p "$TARGET_DIR"
fi

REMOVE=false
if [ "${1:-}" = "--remove" ]; then
  REMOVE=true
fi

for file in "$SOURCE_DIR/agents/"*.md; do
  name=$(basename "$file")
  link="$TARGET_DIR/$name"
  if $REMOVE; then
    if [ -L "$link" ]; then
      rm "$link"
      echo "removed $name"
    fi
  else
    ln -sfn "$file" "$link"
    echo "linked $name"
  fi
done

for file in "$SOURCE_DIR/chains/"*.chain.md; do
  name=$(basename "$file")
  link="$TARGET_DIR/$name"
  if $REMOVE; then
    if [ -L "$link" ]; then
      rm "$link"
      echo "removed $name"
    fi
  else
    ln -sfn "$file" "$link"
    echo "linked $name"
  fi
done

if $REMOVE; then
  echo "Done. All anthropic-harness links removed from $TARGET_DIR"
else
  echo "Done. Symlinks created in $TARGET_DIR"
  echo "Restart pi (or open a new session) for changes to take effect."
fi
