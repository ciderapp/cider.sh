#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-scripts/og-b64}"
MESH_OUT="${2:-}"
# join split cider mesh if present
if [[ -f "$ROOT/cider.png.b64.part1" ]]; then
  cat "$ROOT"/cider.png.b64.part{1..5} > "$ROOT/cider.png.b64"
  rm -f "$ROOT"/cider.png.b64.part{1..5}
fi
mkdir -p public/og-icons public/og-mesh
for name in downloads about changelogs remote; do
  src="$ROOT/${name}.png.b64"
  dest="public/og-icons/${name}.png"
  if [[ -f "$src" ]]; then
    base64 -d "$src" > "$dest"
    echo "$dest $(wc -c < "$dest") bytes"
    head -c 8 "$dest" | od -An -tx1 | grep -q "89 50 4e 47" || { echo "BAD PNG $dest"; exit 1; }
  fi
done
mesh_src=""
if [[ -f "$ROOT/mesh.png.b64" ]]; then mesh_src="$ROOT/mesh.png.b64"; fi
if [[ -f "$ROOT/taproom.png.b64" ]]; then mesh_src="$ROOT/taproom.png.b64"; MESH_OUT="${MESH_OUT:-taproom.png}"; fi
if [[ -f "$ROOT/cider.png.b64" ]]; then mesh_src="$ROOT/cider.png.b64"; MESH_OUT="${MESH_OUT:-cider.png}"; fi
if [[ -n "$mesh_src" ]]; then
  dest="public/og-mesh/${MESH_OUT}"
  base64 -d "$mesh_src" > "$dest"
  echo "$dest $(wc -c < "$dest") bytes"
  head -c 8 "$dest" | od -An -tx1 | grep -q "89 50 4e 47" || { echo "BAD PNG $dest"; exit 1; }
fi
rm -f scripts/og-b64/*.b64 scripts/og-b64/*.part* scripts/og-b64/decode-og-assets.sh ASSETS-NEEDED.md public/og-icons/README.md public/og-mesh/README.md 2>/dev/null || true
rmdir scripts/og-b64 2>/dev/null || true
rmdir scripts 2>/dev/null || true
