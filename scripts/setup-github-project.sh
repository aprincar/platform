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
project_id="$(gh project view "$number" --owner "$owner" --format json --jq .id)"
fields="$(gh project field-list "$number" --owner "$owner" --format json)"
field_id="$(jq -er '.fields[] | select(.name=="Status") | .id' <<< "$fields")"
todo="$(jq -er '.fields[] | select(.name=="Status") | .options[] | select(.name=="Todo") | .id' <<< "$fields")"
progress="$(jq -er '.fields[] | select(.name=="Status") | .options[] | select(.name=="In Progress") | .id' <<< "$fields")"

existing="$(gh project item-list "$number" --owner "$owner" --limit 1000 --format json)"
for path in issues/{56..64} pull/65; do
  url="$repo/$path"
  item_id="$(jq -r --arg url "$url" '.items[] | select(.content.url == $url) | .id' <<< "$existing")"
  if [[ -z "$item_id" ]]; then
    item_id="$(gh project item-add "$number" --owner "$owner" --url "$url" --format json --jq .id)"
    option="$todo"
    case "$path" in issues/56|issues/57|issues/58|pull/65) option="$progress";; esac
    gh project item-edit --id "$item_id" --project-id "$project_id" --field-id "$field_id" --single-select-option-id "$option"
  fi
done
gh project view "$number" --owner "$owner"
gh project item-list "$number" --owner "$owner" --limit 100
