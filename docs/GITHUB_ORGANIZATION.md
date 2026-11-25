# GitHub organization and canonical repository

- `aprincar/platform`: monorepo containing App, Hub, shared platform packages, official games, community submissions, curriculum, and templates.
- `aprincar/.github`: organization profile and community defaults.

The former seven code repositories retain their historical commits, issues, releases and links during migration. Do not accept duplicate development after the cutover; redirect contributors to the monorepo. Archive old repositories only after release, parity verification and explicit cutover review (issue #64). The personal bundle remains a historical reference.

Community publication is PR-driven: automated validation → security/technical review → pedagogical review when the game emits assessable evidence → merge → immutable release/registry publication.

Work on short-lived branches; keep `main` protected. Merge the consolidation PR using a **merge commit**, never squash or rebase, so imported histories remain ancestors of `main`. The existing redesign PR #35 remains separately homologated; preserve its preview until issue #60 is complete.

Track implementation in the central backlog (issue #56) and the GitHub Project once configured.
