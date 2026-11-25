# Consolidação do Aprincar

Epic #56; importação #57; integração #58. A base canônica continua `aprincar/platform`, sem renomear nem alterar Pages durante a migração. A organização `.github` permanece para perfil e governança.

## Executar a importação

Em um clone normal com acesso ao GitHub e git subtree disponível:

```sh
git clone https://github.com/aprincar/platform.git
cd platform
git switch chore/monorepo-consolidation
bash scripts/import-monorepo.sh --plan
bash scripts/import-monorepo.sh --apply
```

O script importa sete árvores com commits fixos, sem squash e sem push. Valida a ancestralidade Git e a equivalência exata da árvore em cada destino. Exige branch exclusiva e working tree limpa. Pode retomar uma importação parcial enquanto as árvores importadas permanecerem intactas. Não é um bootstrap cotidiano; após o merge, o clone único conterá todos os módulos.

## Integração subsequente

- Verificar alterações exclusivas do bundle pessoal e referências/tags/releases antes do arquivamento das origens.
- Revisar os package.json importados, nomes de workspaces e versões; consolidar lockfile somente após resolver conflitos.
- Manter manifests, SDK, IDs, licenças e contratos de artefato; atualizar geração e verificação de snapshot para fonte local.
- Consolidar workflows, testes e segurança sem perder gates; validar todas as famílias de jogos e templates.
- Reconciliar o PR #35 com a branch de migração; não fazer merge de redesign ou produção sem homologação.
- Preservar histórico de issues/PRs e documentação antiga; arquivar origens apenas depois de release e smoke aprovados.

## Critério de pronto

`npm ci`, dev, build, check, auditoria e E2E no clone único; paridade de 14 jogos; publicação e URLs estáveis. A importação inicial não satisfaz sozinha esses critérios.
