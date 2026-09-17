#!/usr/bin/env bash
set -euo pipefail
ROOT=scripts/og-b64
mkdir -p public/og-icons public/og-mesh
for name in downloads about changelogs remote; do
  base64 -d "$ROOT/${name}.png.b64" > "public/og-icons/${name}.png"
  echo "$name $(wc -c < public/og-icons/${name}.png)"
done
# mesh from parts or single file
if [[ -f "$ROOT/cider.png.b64" ]]; then
  base64 -d "$ROOT/cider.png.b64" > public/og-mesh/cider.png
elif [[ -f "$ROOT/mesh.part1" ]]; then
  cat "$ROOT"/mesh.part{1..5} | base64 -d > public/og-mesh/cider.png
fi
if [[ -f "$ROOT/taproom.png.b64" ]]; then
  base64 -d "$ROOT/taproom.png.b64" > public/og-mesh/taproom.png
elif [[ -f "$ROOT/mesh.part1" ]] && [[ ! -f public/og-mesh/cider.png || $(wc -c < public/og-mesh/cider.png) -lt 1000 ]]; then
  cat "$ROOT"/mesh.part{1..5} | base64 -d > public/og-mesh/taproom.png
fi
# if both meshes needed, parts are repo-specific so only one mesh.part set per repo
ls -la public/og-icons public/og-mesh
# verify PNG magic
for f in public/og-icons/*.png public/og-mesh/*.png; do
  [[ -f "$f" ]] || continue
  head -c 8 "$f" | od -An -tx1 | grep -q "89 50 4e 47" || { echo "BAD $f"; exit 1; }
done
rm -rf scripts/og-b64 ASSETS-NEEDED.md public/og-icons/README.md public/og-mesh/README.md scripts/decode-og-b64.mjs 2>/dev/null || true
