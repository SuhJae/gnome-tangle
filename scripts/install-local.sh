#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
UUID="gnome-tangle@suhjae.dev"
DEST="${HOME}/.local/share/gnome-shell/extensions/${UUID}"

mkdir -p "${DEST}"
rsync -a --delete \
  --exclude='.git' \
  --exclude='scripts' \
  "${ROOT}/" "${DEST}/"

glib-compile-schemas "${DEST}/schemas"

if command -v gnome-extensions >/dev/null 2>&1; then
  gnome-extensions disable "${UUID}" >/dev/null 2>&1 || true
  gnome-extensions enable "${UUID}" >/dev/null 2>&1 || true
fi

echo "Installed ${UUID} to ${DEST}"
echo "If GNOME reports the extension is missing, log out once and log back in, then run:"
echo "  gnome-extensions enable ${UUID}"
