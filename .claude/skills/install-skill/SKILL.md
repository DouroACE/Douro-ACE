---
name: install-skill
description: Instalar uma skill do Claude Code a partir de um URL do GitHub. Usar SEMPRE que o utilizador enviar um link do GitHub (repo, pasta /tree/, ou owner/repo) e pedir para instalar, adicionar, puxar, importar ou "meter no Claude" uma skill, plugin ou agente — mesmo que não diga a palavra "skill". Também usar para listar que skills existem dentro de um repo, atualizar uma skill já instalada para a versão mais recente do repo, remover uma skill instalada, ou diagnosticar por que razão uma skill instalada não aparece em /skills. Trata de repos que são uma skill única, monorepos com dezenas de skills numa subpasta, e marketplaces de plugins.
---

# Instalar skills do GitHub

Recebe um URL do GitHub, puxa a pasta certa, valida-a, mostra ao utilizador o que
lá está, e só depois instala.

## Regra de ouro

**Nunca instalar sem mostrar primeiro o relatório do `--dry-run` e obter confirmação
explícita do utilizador.** Uma skill é código e instruções que o Claude vai executar —
o utilizador tem de ver o que está a aceitar. A única exceção é se o utilizador já
disse claramente "instala sem perguntar" nesta conversa.

## Fluxo

### 1. Reconhecer o input
Aceita qualquer uma destas formas:

| Input | Significado |
|---|---|
| `https://github.com/owner/repo` | repo inteiro — procura SKILL.md em qualquer lado |
| `https://github.com/owner/repo/tree/main/skills/x` | só aquela pasta |
| `owner/repo` | atalho |
| `owner/repo/caminho/para/skill` | atalho com subpasta |

Se o utilizador só colar um link sem dizer nada, assume que quer instalar.

### 2. Correr o dry-run
```bash
bash .claude/skills/install-skill/scripts/install_skill.sh "<URL>" --dry-run
```
(Se a skill estiver instalada em `~/.claude/skills/`, usa esse caminho.)

O script imprime: origem e ref resolvida, skills encontradas com `name` e
`description`, avisos de frontmatter em falta, lista de scripts executáveis, e
padrões de risco (pipes para shell, `rm -rf /`, leitura de `~/.ssh`, chaves de API).

### 3. Apresentar ao utilizador
Resume em português, curto:
- o que a skill faz (a partir da `description`)
- quantos ficheiros/scripts traz
- **qualquer aviso de segurança que o script tenha levantado** — se houver, lê tu
  próprio o ficheiro suspeito com `sed -n` antes de recomendar, e diz se é benigno
  ou não. Não minimizes.
- pergunta: instalar para **user** (`~/.claude/skills`, todos os projetos) ou
  **project** (`.claude/skills` deste repo, vai para o git e é partilhado com a equipa)?

Se o repo tiver várias skills, lista-as numeradas e pergunta quais.

### 4. Instalar
```bash
# uma skill, âmbito pessoal (default)
bash .../install_skill.sh "<URL>"

# escolher uma de várias
bash .../install_skill.sh "<URL>" --pick nome-da-skill

# todas as do repo
bash .../install_skill.sh "<URL>" --all

# no projeto atual, em vez de global
bash .../install_skill.sh "<URL>" --scope project

# substituir uma já instalada (atualizar)
bash .../install_skill.sh "<URL>" --force

# instalar com outro nome de pasta
bash .../install_skill.sh "<URL>" --name meu-nome
```

### 5. Fechar
Confirma o que ficou instalado e onde, e diz ao utilizador para **reiniciar a sessão
do Claude Code** (`/exit` e reabrir) — as skills só são carregadas no arranque.
Se instalaste em `--scope project`, lembra que convém fazer commit da pasta.

## Casos especiais

**Repo é um marketplace de plugins** (tem `.claude-plugin/marketplace.json`): o script
avisa. Recomenda a via nativa, que é atualizável e melhor:
```
/plugin marketplace add owner/repo
/plugin install nome@owner-repo
```
Instalar a pasta à mão é o plano B, se o utilizador insistir.

**Nenhum SKILL.md encontrado**: o script lista as pastas de topo. Mostra-as e pergunta
qual é a certa, ou procura no README do repo onde é que as skills vivem.

**Repo privado / 404**: o script não usa credenciais. Sugere clone manual com git
autenticado, ou pede o link correto.

**Atualizar uma skill já instalada**: lê `~/.claude/skills/<nome>/.source` (o script
grava lá o URL e a ref de origem) e volta a correr com `--force`.

**Remover**: `rm -rf ~/.claude/skills/<nome>` — confirma com o utilizador antes.

**A skill não aparece em /skills**: por ordem de probabilidade —
1. falta `name:` ou `description:` no frontmatter YAML do `SKILL.md`;
2. há um nível de pasta a mais (`skills/x/x/SKILL.md`);
3. a sessão não foi reiniciada.
Verifica com `head -5 ~/.claude/skills/<nome>/SKILL.md` e `ls ~/.claude/skills/*/SKILL.md`.

## Onde vivem as skills

| Caminho | Âmbito |
|---|---|
| `~/.claude/skills/<nome>/SKILL.md` | pessoal, todos os projetos |
| `<projeto>/.claude/skills/<nome>/SKILL.md` | só este projeto, versionado no git |
