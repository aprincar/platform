#!/usr/bin/env bash
# One-time project setup; requires authenticated gh with project scope.
set -euo pipefail
owner=aprincar
title='Aprincar — Retomada e Consolidação'
repo=https://github.com/aprincar/platform

command -v gh >/dev/null || { echo 'Install GitHub CLI (gh) first.' >&2; exit 1; }
gh auth status
number="$(gh project list --owner "$owner" --limit 100 --format json --jq '.projects[] | select(.title == "Aprincar — Retomada e Consolidação" and .closed == false) | .number')"
if [[ -z "$number" ]]; then
  number="$(gh project create --owner "$owner" --title "$title" --format json --jq .number)"
fi
[[ "$number" =~ ^[0-9]+$ ]] || { echo 'Ambiguous project selection; inspect existing Projects.' >&2; exit 1; }

existing="$(gh project item-list "$number" --owner "$owner" --limit 1000 --format json --jq '.items[].content.url // empty')"
for path in issues/{56..64} pull/65; do
  url="$repo/$path"
  if ! grep -Fxq "$url" <<< "$existing"; then
    gh project item-add "$number" --owner "$owner" --url "$url"
    status=Todo
    case "$path" in issues/56|issues/57|pull/65) status='In Progress';; esac
    gh project item-edit "$number" --owner "$owner" --url "$url" --field Status --value "$status"
  fi
done
gh project view "$number" --owner "$owner"
gh project item-list "$number" --owner "$owner" --limit 100
