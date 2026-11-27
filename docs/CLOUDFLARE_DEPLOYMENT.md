# Cloudflare Worker — Aprincar

Public URL: https://aprincar.kivervinicius.workers.dev/

The Worker `aprincar` currently proxies the published GitHub Pages build under `/platform/`, preserving paths and serving the App, Hub and game artifacts. The root redirects to that path. This is transitional hosting, not an independent static-assets deployment, and does not publish the unapproved V5 branch. Browser-local data remains scoped to each origin.

The source of the deployed handler is `deploy/cloudflare/worker.mjs`. The smoke workflow checks the public SHA, registry, App, Hub and request restrictions.

Native Workers Static Assets deployment is blocked because the GitHub organization repository `aprincar/platform` is not connected to the Cloudflare Git integration (API error 8000008). Authorize the repository in the Cloudflare dashboard before configuring an automated build/deploy. Do not embed API tokens in the repository. Keep development on `feat/production-v5-integration`; use a production build only after acceptance, preserving the existing Pages site until migration is verified.
