# Auditoria de dependências — primeira produção

Issue #59. Baseline consolidada: `2f92a53efafadabdd08b8cb02f7133df51ed4941`.

## Evidência reproduzível

[Workflow 46035880712](https://github.com/aprincar/platform/actions/runs/46035880712) executou npm ci, auditoria JSON antes/depois, npm audit fix sem force, reinstalação, auditoria high, check da plataforma e paridade dos snapshots. O lockfile não mudou.

| Severidade | Antes | Depois |
| ---------- | ----: | -----: |
| Crítica    |     0 |      0 |
| Alta       |     0 |      0 |
| Moderada   |     4 |      4 |
| Baixa      |     0 |      0 |

Os quatro findings decorrem da cadeia de build: vite-plugin-pwa → workbox-build → glob → minimatch. Os advisories reportados incluem GHSA-3g3m-2fjr-6pw4 e GHSA-g3hv-75wg-m249. Não há correção compatível demonstrada por npm audit fix. Não usar --force nem substituir transitivos por majors incompatíveis sem prova.

O runtime é uma PWA estática; a cadeia acima é utilizada no build. Isso reduz a superfície exposta ao usuário final, mas não elimina o risco de processamento de entradas maliciosas no build. Manter CI isolado, não processar entradas arbitrárias de terceiros com credenciais de publicação e rever as dependências antes da RC. Aceitação do risco residual requer revisão explícita, não é automática.

## Dependabot

PRs #53 (Vite 7.3.7), #48 (source-map-js 1.2.2) e #46 (brace-expansion 1.1.21) foram substituídos por resoluções posteriores na main: 7.3.8, 1.2.4 e 1.1.22 respectivamente. As demais atualizações de grupo/major devem ser revisadas separadamente, sem inclusão indiscriminada na primeira produção.

## Gate

Reexecutar auditoria completa, CodeQL e CI no SHA candidato à produção. Não considerar #59 encerrada até registrar os riscos restantes e revisar os PRs pendentes.
