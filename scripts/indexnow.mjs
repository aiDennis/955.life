/**
 * 部署完成后把 sitemap 中的 URL 提交给 IndexNow（Bing 等搜索引擎即时收录）。
 * 必须在密钥文件已可公网访问后再跑，否则会收到 202/403。
 */
const KEY = '40cdf1718a784b6ca02e012a88cd0a21';
const HOST = '955.life';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://www.bing.com/indexnow';
const KEY_URL = `${SITE}/${KEY}.txt`;
const SITEMAP_URL = `${SITE}/sitemap.xml`;

/**
 * 带超时的 GET，失败则按间隔重试，直到站点部署传播完成。
 * @param {string} url
 * @param {{ attempts?: number, delayMs?: number }} [opts]
 * @returns {Promise<string>}
 */
async function fetchText(url, { attempts = 8, delayMs = 5000 } = {}) {
  let lastError = /** @type {Error | null} */ (null);
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15_000) });
      if (res.ok) return await res.text();
      lastError = new Error(`${url} → HTTP ${res.status}`);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
    if (i < attempts) {
      console.log(`[indexnow] retry ${i}/${attempts - 1} after ${delayMs}ms: ${lastError.message}`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastError ?? new Error(`failed to fetch ${url}`);
}

/**
 * 从 sitemap.xml 抽出全部 <loc> URL。
 * @param {string} xml
 * @returns {string[]}
 */
function parseSitemapLocs(xml) {
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
  return [...new Set(locs)].filter((u) => u.startsWith(`${SITE}/`) || u === SITE);
}

/**
 * 向 Bing IndexNow 批量提交 URL。
 * @param {string[]} urlList
 * @returns {Promise<void>}
 */
async function submit(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_URL,
    urlList,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (res.status === 200 || res.status === 202) {
    console.log(`[indexnow] ${res.status} submitted ${urlList.length} URLs`);
    return;
  }
  throw new Error(`IndexNow ${res.status}: ${text.slice(0, 300)}`);
}

const keyBody = (await fetchText(KEY_URL)).trim();
if (keyBody !== KEY) {
  throw new Error(`key file mismatch at ${KEY_URL}`);
}

const xml = await fetchText(SITEMAP_URL);
const urls = parseSitemapLocs(xml);
if (urls.length === 0) {
  throw new Error('no URLs found in sitemap.xml');
}

await submit(urls);
