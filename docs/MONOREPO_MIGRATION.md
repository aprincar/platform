# Consolidação do Aprincar

Epic #56; importação #57; integração #58. A base canônica continua `aprincar/platform`, sem renomear nem alterar Pages durante a migração. A organização `.github` permanece para perfil e governança.

## Importação histórica (já executada)

A importação de sete árvores foi comprovada no [workflow de importação](https://github.com/aprincar/platform/actions/runs/45603143979), commit `4576cececcf6000c854264a389524de39a552410`. O comando abaixo é apenas referência histórica para uma base anterior à importação. Não executar novamente sobre a árvore integrada, pois os lockfiles e a configuração dos workspaces já mudaram.

```sh
git clone https://github.com/aprincar/platform.git
cd platform
git switch chore/monorepo-consolidation
bash scripts/import-monorepo.sh --plan
bash scripts/import-monorepo.sh --apply
```

O script importa sete árvores com commits fixos, sem squash e sem push. Valida a ancestralidade Git e a equivalência exata da árvore em cada destino. Exige branch exclusiva e working tree limpa. Pode retomar uma importação parcial enquanto as árvores importadas permanecerem intactas. Não é um bootstrap cotidiano; após o merge, o clone único conterá todos os módulos.

## Integração e corte

- Verificar alterações exclusivas do bundle pessoal e referências/tags/releases antes do arquivamento das origens.
- Integração inicial dos workspaces e lockfile único publicada em `5b854b5f5b7d37f9f6f4a4c3b413b2fa4a1c6dd2`.
- Manter manifests, SDK, IDs, licenças e contratos de artefato; atualizar geração e verificação de snapshot para fonte local.
- Consolidar workflows, testes e segurança sem perder gates; validar todas as famílias de jogos e templates.
- Reconciliar o PR #35 com a branch de migração; não fazer merge de redesign ou produção sem homologação.
- Preservar histórico de issues/PRs e documentação antiga; arquivar origens apenas depois de release e smoke aprovados.
- Integrar o PR #65 exclusivamente com merge commit: squash/rebase eliminariam a ancestralidade Git importada.

## Critério de pronto

`npm ci`, dev, build, check, auditoria e E2E no clone único; paridade de 14 jogos; publicação e URLs estáveis. A importação inicial não satisfaz sozinha esses critérios.
