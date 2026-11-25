# Aprincar Community Games

Community submission repository. A new game is submitted as `games/<publisher>/<slug>/manifest.json` + `game.html` through a pull request. Merge requires automated validation and human review. Community games never receive additional runtime privileges.

## Submission
1. Start from an official Aprincar game template.
2. Build/package to a single self-contained `game.html`.
3. Copy the package into `games/<publisher>/<slug>/`.
4. Run `npm run check`.
5. Open a PR and complete the security/pedagogy checklist.

A game that passes technical gates enters as **Community**. Maintainers may promote a well-reviewed game to **Curated** through registry metadata after pedagogical review.

Detailed artifact and publication rules are documented in `docs/README.md` and `docs/WORKFLOW.md`.


## Permissões sensíveis

`camera`, `microphone`, `network` e `geolocation` nunca podem aparecer em `permissions`. Elas só podem ser declaradas em `optionalPermissions`, e a declaração não concede acesso. O GameHost continua default-deny e decide grants explícitos. Não existe exceção de maintainer que contorne o Host.

Jogos que dependem de rede devem marcar `offline: false` e declarar `network` em `optionalPermissions`.
