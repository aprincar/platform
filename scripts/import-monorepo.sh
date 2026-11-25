#!/usr/bin/env bash
# One-time import of canonical Aprincar repositories. Run with bash.
set -euo pipefail

root="$(git rev-parse --show-toplevel)"
cd "$root"
branch="$(git symbolic-ref --quiet --short HEAD)" || { echo "Detached HEAD; use the migration branch." >&2; exit 1; }
[[ "$branch" == chore/monorepo-consolidation ]] || { echo "Use chore/monorepo-consolidation, not $branch." >&2; exit 1; }
[[ -z "$(git status --porcelain)" ]] || { echo "Commit or stash local changes first." >&2; exit 1; }

# Pins verified on 2026-11-25. Do not silently move them.
sources=(
  'games-official|games/official|e46e7650f0dd16df143c5a30fbc27356ff4fe736'
  'community-games|games/community|02c94c27a3ac1a06749f42443b80565b0cf8856a'
  'curriculum-bncc|content/curriculum-bncc|f2e6ebbb735e0d51961e160ade0e9241efcb9641'
  'game-template-vite|templates/vite|5448145322f4caf2f34c3dbe2abca01d893d32b4'
  'game-template-react|templates/react|2d75b4d3b19823c65fa244b308e7953c67b41ba9'
  'game-template-phaser|templates/phaser|f8267796d31527ed1f8bf8f0991812a2b0c0709c'
  'game-template-threejs|templates/threejs|036ca5568e9e49776a0bd12f95f9c643c1208fd2'
)

case "${1:---plan}" in
  --plan) printf '%s\n' "${sources[@]}"; exit 0 ;;
  --apply) ;;
  *) echo "Usage: bash scripts/import-monorepo.sh [--plan|--apply]" >&2; exit 2 ;;
esac

# Preflight all source commits and destination trees before modifying the branch.
for entry in "${sources[@]}"; do
  IFS='|' read -r repo prefix sha <<< "$entry"
  git fetch --no-tags "https://github.com/aprincar/$repo.git" "$sha"
  git cat-file -e "$sha^{commit}"
  if [[ -e "$prefix" || -L "$prefix" ]]; then
    git merge-base --is-ancestor "$sha" HEAD || { echo "Conflicting existing path: $prefix" >&2; exit 1; }
    [[ "$(git rev-parse "HEAD:$prefix")" == "$(git rev-parse "$sha^{tree}")" ]] || { echo "Tree mismatch: $prefix" >&2; exit 1; }
  fi
done

for entry in "${sources[@]}"; do
  IFS='|' read -r repo prefix sha <<< "$entry"
  if [[ ! -e "$prefix" ]]; then
    git subtree add --prefix="$prefix" "$sha" -m "chore(monorepo): import aprincar/$repo at $sha"
  fi
  git merge-base --is-ancestor "$sha" HEAD
  [[ "$(git rev-parse "HEAD:$prefix")" == "$(git rev-parse "$sha^{tree}")" ]] || { echo "Tree mismatch: $prefix" >&2; exit 1; }
  printf 'Verified %s -> %s (%s)\n' "$repo" "$prefix" "$sha"
done

echo "Import verified. Do not merge until workspace, CI, snapshot parity and redesign reconciliation are complete."
