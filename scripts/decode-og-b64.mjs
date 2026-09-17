#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const sizes = {
  'public/og-icons/downloads.png': 1300,
  'public/og-icons/about.png': 2633,
  'public/og-icons/changelogs.png': 2827,
  'public/og-icons/remote.png': 1357,
  'public/og-mesh/cider.png': 75669,
};
const dir = 'scripts/og-b64';
const map = {
  'downloads.png.b64': 'public/og-icons/downloads.png',
  'about.png.b64': 'public/og-icons/about.png',
  'changelogs.png.b64': 'public/og-icons/changelogs.png',
  'remote.png.b64': 'public/og-icons/remote.png',
};

function readB64(name) {
  return readFileSync(join(dir, name), 'utf8').trim();
}

for (const [file, dest] of Object.entries(map)) {
  const buf = Buffer.from(readB64(file), 'base64');
  if (buf.length !== sizes[dest]) throw new Error(`${dest}: got ${buf.length}, want ${sizes[dest]}`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log('wrote', dest, buf.length);
}

let meshB64;
if (existsSync(join(dir, 'cider.png.b64'))) {
  meshB64 = readB64('cider.png.b64');
} else {
  meshB64 = readB64('cider.png.b64.part1') + readB64('cider.png.b64.part2');
}
const mesh = Buffer.from(meshB64, 'base64');
if (mesh.length !== sizes['public/og-mesh/cider.png']) throw new Error(`mesh: got ${mesh.length}`);
mkdirSync('public/og-mesh', { recursive: true });
writeFileSync('public/og-mesh/cider.png', mesh);
console.log('wrote public/og-mesh/cider.png', mesh.length);

for (const f of readdirSync(dir)) unlinkSync(join(dir, f));
try { unlinkSync('scripts/decode-og-b64.mjs'); } catch {}
try { unlinkSync('ASSETS-NEEDED.md'); } catch {}
console.log('cleaned helpers');
