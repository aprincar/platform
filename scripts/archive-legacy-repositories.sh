#!/usr/bin/env bash
# Archive legacy code repositories only after a verified production cutover.
set -euo pipefail
canonical=aprincar/platform
mode="${1:---plan}"
[[ "$mode" == --plan || "$mode" == --apply ]] || { echo "Usage: bash scripts/archive-legacy-repositories.sh [--plan|--apply]" >&2; exit 2; }
command -v gh >/dev/null && command -v jq >/dev/null && command -v curl >/dev/null || { echo "Requires gh, jq and curl." >&2; exit 1; }
gh auth status
sources=(
  'games-official|e46e7650f0dd16df143c5a30fbc27356ff4fe736'
  'community-games|02c94c27a3ac1a06749f42443b80565b0cf8856a'
  'curriculum-bncc|f2e6ebbb735e0d51961e160ade0e9241efcb9641'
  'game-template-vite|5448145322f4caf2f34c3dbe2abca01d893d32b4'
  'game-template-react|2d75b4d3b19823c65fa244b308e7953c67b41ba9'
  'game-template-phaser|f8267796d31527ed1f8bf8f0991812a2b0c0709c'
  'game-template-threejs|036ca5568e9e49776a0bd12f95f9c643c1208fd2'
)
main="$(gh api "repos/$canonical/branches/main" --jq .commit.sha)"
echo "Canonical main: $main"
check_ancestor() {
  local ancestor="$1" target="$2"
  [[ "$(gh api "repos/$canonical/compare/$ancestor...$target" --jq .merge_base_commit.sha)" == "$ancestor" ]]
}
# The combined release must contain both the migrated redesign and all recorded legacy tips.
while IFS=$'\t' read -r repo ref object commit; do
  [[ "$repo" == repository ]] && continue
  check_ancestor "$commit" "$main"
done < docs/legacy-git-refs/refs.tsv

# Validate all legacy tips and unresolved work before making any administrative changes.
for entry in "${sources[@]}"; do
  IFS='|' read -r name pin <<< "$entry"
  repo="aprincar/$name"
  meta="$(gh api "repos/$repo")"
  if [[ "$(jq -r .archived <<< "$meta")" == true ]]; then continue; fi
  tip="$(gh api "repos/$repo/branches/$(jq -r .default_branch <<< "$meta")" --jq .commit.sha)"
  [[ "$tip" == "$pin" ]] || { echo "$repo changed since the import; review new commits before archival." >&2; exit 1; }
  check_ancestor "$tip" "$main"
  [[ "$(gh api "repos/$repo/pulls?state=open&per_page=1" --jq length)" == 0 ]]
  [[ "$(gh api "repos/$repo/issues?state=open&per_page=100" --jq '[.[] | select(has("pull_request") | not)] | length')" == 0 ]]
  [[ "$(jq -r .permissions.admin <<< "$meta")" == true ]] || { echo "Missing admin permission: $repo" >&2; exit 1; }
  echo "Verified $repo at $tip; eligible after production checks."
done

# Validate the latest production gates on the exact current SHA.
runs="$(gh api "repos/$canonical/actions/runs?head_sha=$main&event=push&per_page=100")"
for name in "CI" "Security checks" "CodeQL" "Publish App and Hub to GitHub Pages"; do
  status="$(jq -r --arg name "$name" '[.workflow_runs[] | select(.name == $name)] | sort_by(.run_number) | last | .conclusion // "pending"' <<< "$runs")"
  [[ "$status" == success ]] || { echo "Gate $name is $status; archival blocked." >&2; exit 1; }
done
site=https://aprincar.github.io/platform
[[ "$(curl -fsSL --retry 2 "$site/production-sha.txt?sha=$main" | tr -d '\r\n')" == "$main" ]]
curl -fsSL --retry 2 "$site/app/" >/dev/null
curl -fsSL --retry 2 "$site/hub/" >/dev/null
curl -fsSL --retry 2 "$site/registry.json?sha=$main" | jq -e 'type == "array" and length >= 14' >/dev/null

if [[ "$mode" == --plan ]]; then
  echo "All gates passed. No repository was modified. Use --apply to archive the seven legacy repositories."
  exit 0
fi
# Refuse a moving production target and keep .github / personal bundle untouched.
[[ "$(gh api "repos/$canonical/branches/main" --jq .commit.sha)" == "$main" ]]
for entry in "${sources[@]}"; do
  IFS='|' read -r name pin <<< "$entry"
  repo="aprincar/$name"
  if [[ "$(gh api "repos/$repo" --jq .archived)" == true ]]; then continue; fi
  [[ "$(gh api "repos/$repo/branches/main" --jq .commit.sha)" == "$pin" ]]
  [[ "$(gh pr list -R "$repo" --state open --limit 1 --json number --jq length)" == 0 ]]
  [[ "$(gh issue list -R "$repo" --state open --limit 1 --json number --jq length)" == 0 ]]
  gh api --method PATCH "repos/$repo" -f description='Histórico arquivado. Desenvolvimento: https://github.com/aprincar/platform' -F archived=true --jq '{name: .full_name, archived}'
  [[ "$(gh api "repos/$repo" --jq .archived)" == true ]]
done
echo "Seven legacy repositories archived. No repository was deleted."
