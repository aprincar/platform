# Aprincar development

## Requirements

Node 22 and npm 10. Clone `aprincar/platform` and run `npm ci` at the repository root. No secondary clone or lockfile is needed.

## Commands

```bash
npm run dev
npm run dev:hub
npm run build:games
npm run build
npm run test
npm run typecheck
npm run lint
npm run format:check
npm run check
npm run check:content
npm run check:snapshot
npm run test:e2e
npm run check:production
```

After changing an official game, run `npm run build:games` before testing the App or Hub; commit the regenerated artifacts together with their source. `check:snapshot` is a clean-checkout CI parity gate, not a formatter. The official browser suite requires system Chrome/Chromium (or `CHROME_BIN`); the Platform suite uses Playwright (`npx playwright install chromium`, or `PLAYWRIGHT_EXECUTABLE_PATH`).

## Local hooks

Only the root Husky configuration is installed. The commit hook checks staged files for common secrets and formats staged Platform source; the push hook runs the platform unit tests. Imported modules retain native checks.

## Adding an extension

Official source lives in `games/official/src`. Community submissions live in `games/community`; starter templates are in `templates/`. Validate each manifest and generated registry before publication. Games run as immutable sandboxed extension artifacts; the App never imports their implementation.
