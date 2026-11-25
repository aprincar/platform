# Community games documentation

Community games are submitted as immutable, self-contained artifacts under `games/<publisher>/<slug>/`. They are reviewed through pull requests and never receive privileges beyond the GameManifest contract.

## Required artifact

Each submission contains:

- `manifest.json`
- `game.html`
- a short `README.md`
- declared skills and permissions
- no remote runtime dependency

Run `npm run check` before opening a pull request. Maintainers review technical validity, security, accessibility and pedagogy before promotion to Curated.

## Fluxo de publicação

1. crie o jogo a partir de um template oficial;
2. execute os gates locais do template;
3. gere o artifact `single-html`;
4. copie o pacote para `games/<publisher>/<slug>/`;
5. execute `npm run check`;
6. abra um pull request;
7. aguarde validação técnica, segurança, acessibilidade e revisão pedagógica;
8. após merge, o jogo entra como **Community**; promoção para **Curated** é uma revisão separada.

Permissões sensíveis permanecem opcionais e mediadas pelo Host em todas as etapas.
