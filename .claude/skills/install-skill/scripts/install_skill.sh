#!/usr/bin/env bash
# Puxa uma skill do GitHub e instala-a no Claude Code.
# Uso:
#   install_skill.sh <url> [--dry-run] [--scope user|project] [--dir PATH]
#                          [--pick NOME] [--name NOME] [--force] [--all]
set -uo pipefail

URL=""; DRY=0; SCOPE="user"; DEST=""; PICK=""; RENAME=""; FORCE=0; ALL=0
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY=1 ;;
    --scope)   SCOPE="${2:-user}"; shift ;;
    --dir)     DEST="${2:-}"; shift ;;
    --pick)    PICK="${2:-}"; shift ;;
    --name)    RENAME="${2:-}"; shift ;;
    --force)   FORCE=1 ;;
    --all)     ALL=1 ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    -*) echo "erro: opção desconhecida $1" >&2; exit 2 ;;
    *)  URL="$1" ;;
  esac
  shift
done
[ -n "$URL" ] || { echo "erro: falta o URL do repositório" >&2; exit 2; }

# ---------- destino ----------
if [ -z "$DEST" ]; then
  case "$SCOPE" in
    user)    DEST="$HOME/.claude/skills" ;;
    project) DEST="$(git rev-parse --show-toplevel 2>/dev/null || pwd)/.claude/skills" ;;
    *) echo "erro: --scope tem de ser user ou project" >&2; exit 2 ;;
  esac
fi

# ---------- parsing do URL ----------
CLEAN="${URL%/}"; CLEAN="${CLEAN%.git}"
CLEAN="${CLEAN#https://}"; CLEAN="${CLEAN#http://}"; CLEAN="${CLEAN#github.com/}"
CLEAN="${CLEAN#www.github.com/}"
OWNER="${CLEAN%%/*}"; REST="${CLEAN#*/}"
REPO="${REST%%/*}";  REST="${REST#"$REPO"}"; REST="${REST#/}"
[ -n "$OWNER" ] && [ -n "$REPO" ] && [ "$OWNER" != "$REPO" ] || {
  echo "erro: não consegui interpretar '$URL' (esperado github.com/owner/repo[/tree/ref/caminho])" >&2; exit 2; }

REF=""; SUBPATH=""
case "$REST" in
  tree/*|blob/*) R="${REST#*/}"; REF="${R%%/*}"; SUBPATH="${R#"$REF"}"; SUBPATH="${SUBPATH#/}" ;;
  "") : ;;
  *) SUBPATH="$REST" ;;
esac
SUBPATH="${SUBPATH%/SKILL.md}"

# ---------- download ----------
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
SRC="$TMP/src"
GOT=""

# Via 1: git clone raso (funciona atrás de proxies que bloqueiam tarballs)
clone() {
  local r="$1" args=(--depth 1 --filter=blob:none --sparse)
  [ -n "$r" ] && args+=(--branch "$r")
  rm -rf "$SRC"
  git clone "${args[@]}" "https://github.com/$OWNER/$REPO.git" "$SRC" >/dev/null 2>&1 || return 1
  if [ -n "$SUBPATH" ]; then
    git -C "$SRC" sparse-checkout set "$SUBPATH" >/dev/null 2>&1 || git -C "$SRC" sparse-checkout disable >/dev/null 2>&1
  else
    git -C "$SRC" sparse-checkout disable >/dev/null 2>&1
  fi
  return 0
}
if clone "$REF"; then
  GOT="${REF:-$(git -C "$SRC" rev-parse --abbrev-ref HEAD 2>/dev/null || echo HEAD)}"
fi

# Via 2: tarball (mais rápido quando disponível)
if [ -z "$GOT" ]; then
  mkdir -p "$SRC"
  CANDS=(); [ -n "$REF" ] && CANDS+=("$REF"); CANDS+=("HEAD" "main" "master")
  for r in "${CANDS[@]}"; do
    for u in "https://codeload.github.com/$OWNER/$REPO/tar.gz/$r" \
             "https://codeload.github.com/$OWNER/$REPO/tar.gz/refs/heads/$r" \
             "https://codeload.github.com/$OWNER/$REPO/tar.gz/refs/tags/$r"; do
      if curl -fsSL --retry 3 --retry-delay 2 --max-time 180 "$u" -o "$TMP/a.tgz" 2>/dev/null \
         && tar -xzf "$TMP/a.tgz" -C "$SRC" --strip-components=1 2>/dev/null; then
        GOT="$r"; break 2
      fi
    done
  done
fi

[ -n "$GOT" ] || { echo "erro: nao consegui obter $OWNER/$REPO." >&2
  echo "Causas provaveis: repo privado (o script nao usa credenciais), ref '$REF' inexistente, ou rede/proxy." >&2
  echo "Se for privado, clona a mao com git autenticado e aponta --dir para a pasta." >&2
  exit 1; }

ROOT="$SRC"
if [ -n "$SUBPATH" ]; then
  [ -d "$SRC/$SUBPATH" ] || { echo "erro: o caminho '$SUBPATH' não existe em $OWNER/$REPO@$GOT" >&2; exit 1; }
  ROOT="$SRC/$SUBPATH"
fi

echo "== ORIGEM =="
echo "repo:  $OWNER/$REPO   ref: $GOT   caminho: ${SUBPATH:-/}"
echo "destino: $DEST"
echo

# ---------- marketplace de plugins ----------
if [ -f "$SRC/.claude-plugin/marketplace.json" ]; then
  echo "NOTA: este repo é um marketplace de plugins do Claude Code."
  echo "      Alternativa recomendada (versionada e atualizável):"
  echo "        /plugin marketplace add $OWNER/$REPO"
  echo "        /plugin install <nome-do-plugin>@$OWNER-$REPO"
  echo
fi

# ---------- localizar skills ----------
mapfile -t FOUND < <(find "$ROOT" -maxdepth 5 -name SKILL.md -not -path '*/.git/*' | sort)
if [ "${#FOUND[@]}" -eq 0 ]; then
  echo "erro: nenhum SKILL.md encontrado em ${SUBPATH:-a raiz do repo}." >&2
  echo "Pastas de topo disponíveis:" >&2
  find "$ROOT" -maxdepth 2 -type d -not -path '*/.git*' -printf '  %P\n' 2>/dev/null | grep -v '^  $' | head -40 >&2
  exit 1
fi

fm() { # fm <ficheiro> <campo> -- suporta valores inline e blocos > / |
  awk -v k="$2" '
    NR==1 && $0 ~ /^---[[:space:]]*$/ {inb=1; next}
    inb && $0 ~ /^---[[:space:]]*$/ {exit}
    !inb {next}
    blk {
      if ($0 ~ /^[[:space:]]+[^[:space:]]/) { line=$0; sub(/^[[:space:]]+/,"",line); out=out (out?" ":"") line; next }
      else { exit }
    }
    $0 ~ "^"k":" {
      v=$0; sub("^"k":[[:space:]]*","",v)
      if (v == ">" || v == "|" || v == ">-" || v == "|-" || v == ">+" || v == "|+") { blk=1; next }
      gsub(/^["\x27]|["\x27][[:space:]]*$/, "", v); out=v; exit
    }
    END { print out }' "$1"
}

SEL=(); for f in "${FOUND[@]}"; do
  d="$(dirname "$f")"; n="$(fm "$f" name)"; [ -n "$n" ] || n="$(basename "$d")"
  if [ -n "$PICK" ] && [ "$n" != "$PICK" ] && [ "$(basename "$d")" != "$PICK" ]; then continue; fi
  SEL+=("$d")
done
if [ -n "$PICK" ] && [ "${#SEL[@]}" -eq 0 ]; then
  echo "erro: nenhuma skill chamada '$PICK' neste repo." >&2; exit 1
fi

echo "== SKILLS ENCONTRADAS (${#SEL[@]}) =="
for d in "${SEL[@]}"; do
  f="$d/SKILL.md"; n="$(fm "$f" name)"; desc="$(fm "$f" description)"
  echo "- pasta: ${d#$SRC/}"
  echo "  name:  ${n:-(EM FALTA — a skill não vai carregar)}"
  if [ "${#desc}" -gt 220 ]; then echo "  desc:  ${desc:0:220}…"; else echo "  desc:  ${desc:-(EM FALTA)}"; fi
  [ -z "$(fm "$f" description)" ] && echo "  AVISO: falta 'description:' no frontmatter — a skill não dispara."
  echo "  ficheiros: $(find "$d" -type f -not -path '*/.git/*' | wc -l) | tamanho: $(du -sh --exclude=.git "$d" | cut -f1)"
done
echo

echo "== REVISÃO DE SEGURANÇA =="
for d in "${SEL[@]}"; do
  ex="$(find "$d" -type f -not -path '*/.git/*' \( -name '*.sh' -o -name '*.py' -o -name '*.js' -o -name '*.ts' -o -name '*.rb' -o -perm -u+x \) -not -name '*.md' | sed "s|$SRC/||")"
  if [ -n "$ex" ]; then echo "scripts em ${d#$SRC/}:"; echo "$ex" | sed 's/^/  /'; fi
done
PAT='curl[^|]*\|[[:space:]]*(ba)?sh|wget[^|]*\|[[:space:]]*(ba)?sh|rm[[:space:]]+-rf[[:space:]]+/|base64[[:space:]]+-d|eval[[:space:]]*\(|\.ssh/|\.aws/credentials|ANTHROPIC_API_KEY|OPENAI_API_KEY|/etc/passwd|nc[[:space:]]+-e|chmod[[:space:]]+777'
HITS=""
for d in "${SEL[@]}"; do
  h="$(grep -rEnI --exclude-dir=.git "$PAT" "$d" 2>/dev/null | sed "s|$SRC/||" | head -20)"
  [ -n "$h" ] && HITS="$HITS$h"$'\n'
done
if [ -n "$HITS" ]; then
  echo "PADRÕES A REVER MANUALMENTE:"; echo "$HITS" | sed 's/^/  /'
else
  echo "sem padrões de risco óbvios (não substitui ler o SKILL.md)."
fi
echo

# ---------- instalar ----------
if [ "$DRY" -eq 1 ]; then
  echo "== DRY-RUN: nada foi instalado. =="
  echo "Para instalar, repete o comando sem --dry-run."
  exit 0
fi

if [ "${#SEL[@]}" -gt 1 ] && [ "$ALL" -eq 0 ]; then
  echo "erro: ${#SEL[@]} skills encontradas. Usa --pick <nome> para escolher uma, ou --all para instalar todas." >&2
  exit 3
fi

mkdir -p "$DEST"
for d in "${SEL[@]}"; do
  n="$(fm "$d/SKILL.md" name)"; [ -n "$n" ] || n="$(basename "$d")"
  [ -n "$RENAME" ] && [ "${#SEL[@]}" -eq 1 ] && n="$RENAME"
  n="$(echo "$n" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9._-')"
  [ -n "$n" ] || { echo "erro: nome de skill inválido" >&2; exit 1; }
  T="$DEST/$n"
  if [ -e "$T" ] && [ "$FORCE" -eq 0 ]; then
    echo "erro: '$T' já existe. Usa --force para substituir." >&2; exit 4
  fi
  rm -rf "$T"; mkdir -p "$T"
  (cd "$d" && tar --exclude=.git --exclude=.github -cf - .) | (cd "$T" && tar -xf -)
  rm -rf "$T/.git"
  find "$T" -type f -name '*.sh' -exec chmod +x {} \; 2>/dev/null
  REL="${d#$SRC}"; REL="${REL#/}"
  printf '%s\n' "source: https://github.com/$OWNER/$REPO/tree/$GOT${REL:+/$REL}" \
                "ref: $GOT" "installed: $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$T/.source"
  echo "INSTALADA: $T"
done
echo
echo "Reinicia a sessão do Claude Code (ou /exit e reabre) e confirma com /skills."
