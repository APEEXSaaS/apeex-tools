#!/bin/bash
# Builds the Chrome Web Store upload: dist/apeex-tools-<version>.zip
# Only runtime files are included (no tools, docs or source assets).
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION=$(python3 -c "import json;print(json.load(open('manifest.json'))['version'])")
OUT="dist/apeex-tools-$VERSION.zip"
mkdir -p dist
rm -f "$OUT"
zip -qr -X "$OUT" \
  manifest.json index.html styles.css theme-boot.js brand-icons.js script.js features.js presets.js \
  _locales \
  icons/icon16.png icons/icon32.png icons/icon48.png icons/icon128.png icons/brands icons/engines \
  -x "*.DS_Store"
echo "$OUT ($(du -h "$OUT" | cut -f1))"
