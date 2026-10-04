#!/usr/bin/env node
// sync-images.mjs – generate lib/images.generated.ts
import { createHash } from 'crypto';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = join(process.cwd(), 'public', 'images');
const outFile = join(process.cwd(), 'lib', 'images.generated.ts');

function sha256(filePath) {
  const data = readFileSync(filePath);
  return createHash('sha256').update(data).digest('hex');
}

// Lookbook
const lookFiles = readdirSync(publicDir)
  .filter(f => /^lookbook-\d+\./i.test(f))
  .sort((a, b) => {
    const na = parseInt(a.match(/lookbook-(\d+)/i)[1], 10);
    const nb = parseInt(b.match(/lookbook-(\d+)/i)[1], 10);
    return na - nb;
  });

const lookbookImages = [];
const seen = new Map();
for (const file of lookFiles) {
  const full = join(publicDir, file);
  const hash = sha256(full);
  if (seen.has(hash)) {
    console.log(`[sync-images] skipped duplicate: ${file} (same as ${seen.get(hash)})`);
    continue;
  }
  seen.set(hash, file);
  const key = file.replace(/\.[^.]+$/, '');
  lookbookImages.push({ key, src: `/images/${file}` });
}

// Fabrics
const fabricBases = [
  'fabric-merino-wool',
  'fabric-selvedge-denim',
  'fabric-organic-cotton',
  'fabric-cashmere-blend',
];
const fabricImages = {};
for (const base of fabricBases) {
  const candidates = readdirSync(publicDir).filter(f => new RegExp(`^${base}\\.[^.]+$`, 'i').test(f));
  if (candidates.length === 0) {
    fabricImages[base] = null;
    continue;
  }
  const file = candidates[0];
  const full = join(publicDir, file);
  const hash = sha256(full);
  for (const other of candidates.slice(1)) {
    const h = sha256(join(publicDir, other));
    if (h === hash) console.warn(`[sync-images] warning: duplicate hash for ${base}: ${file} and ${other}`);
  }
  fabricImages[base] = `/images/${file}`;
}

let out = `// AUTO-GENERATED – DO NOT EDIT\n`;
out += `export const lookbookImages = ${JSON.stringify(lookbookImages, null, 2)} as const;\n`;
out += `export const fabricImages: Record<string, string | null> = ${JSON.stringify(fabricImages, null, 2)};\n`;
writeFileSync(outFile, out);
console.log(`[sync-images] generated ${outFile}`);
