#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const map = {
  'downloads.png.b64': 'public/og-icons/downloads.png',
  'about.png.b64': 'public/og-icons/about.png',
  'changelogs.png.b64': 'public/og-icons/changelogs.png',
  'remote.png.b64': 'public/og-icons/remote.png',
  'cider.png.b64': 'public/og-mesh/cider.png',
};
const sizes = {
  'public/og-icons/downloads.png': 1300,
  'public/og-icons/about.png': 2633,
  'public/og-icons/changelogs.png': 2827,
  'public/og-icons/remote.png': 1357,
  'public/og-mesh/cider.png': 75669,
};
const dir = 'scripts/og-b64';
for (const [file, dest] of Object.entries(map)) {
  const b64 = readFileSync(join(dir, file), 'utf8').trim();
  const buf = Buffer.from(b64, 'base64');
  const expect = sizes[dest];
  if (buf.length !== expect) throw new Error(`${dest}: got ${buf.length}, want ${expect}`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log('wrote', dest, buf.length);
}
// cleanup helpers
for (const f of readdirSync(dir)) unlinkSync(join(dir, f));
try { unlinkSync('scripts/decode-og-b64.mjs'); } catch {}
try { unlinkSync('ASSETS-NEEDED.md'); } catch {}
console.log('cleaned helpers');
