/**
 * @astrojs/sitemap 默认总是产出 sitemap-index.xml → sitemap-0.xml。
 * 本站 URL 很少，构建后压成单个 sitemap.xml，并删掉多余文件。
 */
import { copyFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
const chunk = resolve(dist, 'sitemap-0.xml');
const index = resolve(dist, 'sitemap-index.xml');
const out = resolve(dist, 'sitemap.xml');

if (!existsSync(chunk)) {
  console.warn('[flatten-sitemap] dist/sitemap-0.xml not found, skip');
  process.exit(0);
}

copyFileSync(chunk, out);
unlinkSync(chunk);
if (existsSync(index)) unlinkSync(index);

console.log('[flatten-sitemap] wrote dist/sitemap.xml');
