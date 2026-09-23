# Aprincar Platform

**Aprender acontece brincando.**

This repository contains the Aprincar application, standalone Hub, local-first core, extension runtime/SDK, Skill Graph and pedagogical engines. Games are web extensions and are **not imported by the React application**.

## Requirements

- Node 22+
- npm 10+

## Local development

```bash
npm install
npm run dev       # App
npm run dev:hub   # Hub
npm run test      # dependency-independent core tests
npm run check     # full gate after dependencies are installed
```

## Runtime model

`Registry -> ExtensionManager -> local cache/remote -> sandboxed GameHost -> MessageChannel SDK -> Evidence/Storage/Rewards`.

The V1 extension artifact is a self-contained `game.html` plus `manifest.json`. A game may be authored with Vite, React, Phaser, Three.js or any browser technology that produces the same artifact.

See `docs/ARCHITECTURE.md`, `docs/EXTENSIONS.md` and `docs/GITHUB_ORGANIZATION.md`.

Documentation index: `docs/README.md`, `docs/DEVELOPMENT.md` and `docs/OPERATIONS.md`.


## Version contract

Aprincar V1 intentionally uses independent version domains:

- **Platform/package SemVer:** `1.0.0`
- **Extension Manifest Schema:** `manifestVersion: 1`
- **SDK wire protocol:** `PROTOCOL_VERSION = 1`

Package SemVer does not automatically bump the manifest schema or SDK wire protocol. Those protocol numbers change only when their respective contracts change. The release gate verifies a single Platform version across every npm workspace and the lockfile with:

```bash
npm run verify:release-version
```

The production release workflow additionally runs the repository checks, formatting, high-severity dependency audit, canonical official snapshot verification, and Playwright E2E before creating an idempotent GitHub release.
