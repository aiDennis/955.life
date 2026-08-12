// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://955.life',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'zh-Hant', 'en', 'ja', 'ko', 'de', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: true,
      // 关闭内置根路径跳转（静态托管会生成 2s 中间页）；改由 src/pages/index.astro 即时跳转
      redirectToDefaultLocale: false,
      fallbackType: 'redirect',
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-CN',
        locales: {
          'zh-CN': 'zh-CN',
          'zh-Hant': 'zh-Hant',
          en: 'en',
          ja: 'ja',
          ko: 'ko',
          de: 'de',
          es: 'es',
          fr: 'fr',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
