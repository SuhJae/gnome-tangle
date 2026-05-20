#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
UUID="gnome-tangle@suhjae.dev"
DIST="${ROOT}/dist"

cd "${ROOT}"
mkdir -p "${DIST}"

gjs -m scripts/generate-schema.js > schemas/org.gnome.shell.extensions.gnome-tangle.gschema.xml
glib-compile-schemas --strict schemas
gjs -m scripts/check-geometry.js

gnome-extensions pack \
  --force \
  --extra-source=lib \
  --extra-source=assets \
  --schema=schemas/org.gnome.shell.extensions.gnome-tangle.gschema.xml \
  .

mv -f "${UUID}.shell-extension.zip" "${DIST}/${UUID}.shell-extension.zip"
echo "${DIST}/${UUID}.shell-extension.zip"

