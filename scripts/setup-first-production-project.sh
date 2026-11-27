#!/usr/bin/env bash
# One-time, idempotent GitHub Projects v2 provisioning. Requires gh + jq and project scope.
set -euo pipefail
owner=aprincar
repo=aprincar/platform
title='Aprincar — Primeira Produção'
command -v gh >/dev/null
command -v jq >/dev/null
gh auth status
projects="$(gh project list --owner "$owner" --limit 100 --format json)"
number="$(jq -r --arg title "$title" '.projects[] | select(.title==$title and .closed==false) | .number' <<< "$projects")"
if [[ -z "$number" ]]; then
  number="$(jq -r '.projects[] | select(.title=="Aprincar — Retomada e Consolidação" and .closed==false) | .number' <<< "$projects")"
  if [[ -n "$number" ]]; then
    [[ "$number" =~ ^[0-9]+$ ]]
    gh project edit "$number" --owner "$owner" --title "$title"
  else
    number="$(gh project create --owner "$owner" --title "$title" --format json --jq .number)"
  fi
fi
[[ "$number" =~ ^[0-9]+$ ]] || { echo 'Ambiguous project selection.' >&2; exit 1; }
project="$(gh project view "$number" --owner "$owner" --format json --jq .id)"
fields="$(gh project field-list "$number" --owner "$owner" --format json)"
field="$(jq -er '.fields[] | select(.name=="Status") | .id' <<< "$fields")"
existing="$(gh project item-list "$number" --owner "$owner" --limit 1000 --format json)"
for n in {56..64} {70..85}; do
  url="https://github.com/$repo/issues/$n"
  item="$(jq -r --arg url "$url" '.items[] | select(.content.url==$url) | .id' <<< "$existing")"
  if [[ -z "$item" ]]; then
    item="$(gh project item-add "$number" --owner "$owner" --url "$url" --format json --jq .id)"
    status=Todo
    case "$n" in 56|58|59|60|70|71) status='In Progress';; esac
    if [[ "$(gh api "repos/$repo/issues/$n" --jq .state)" == closed ]]; then status=Done; fi
    option="$(jq -er --arg status "$status" '.fields[] | select(.name=="Status") | .options[] | select(.name==$status) | .id' <<< "$fields")"
    gh project item-edit --id "$item" --project-id "$project" --field-id "$field" --single-select-option-id "$option"
  fi
done
gh project link "$number" --owner "$owner" --repo "$repo"
gh project view "$number" --owner "$owner" --format json --jq '{title,url,number}'
