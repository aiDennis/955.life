# 955.life

**理想工作制度内容站** —— 倡导 8 小时工作制、正常休假、福利进步与工作强度下降。现代版 996.ICU，内容更新到 2026，8 语言，SEO 优先。

> Work 955, live first. 工作 955，生活为先。

## 技术栈

- **Astro 5**（SSG 静态生成，SEO 天花板，hover 预取）
- **Tailwind CSS v4**（"Golden Hour" 设计系统：暖纸/夜梅双主题，Fraunces 衬线展示字体自托管）
- 8 语言 i18n：zh-CN / zh-Hant / en / ja / ko / de / es / fr
- 内容：Content Collections（Markdown，56 篇文章 = 7 板块 × 8 语言）
- 数据：955 公司白名单（JSON，86 家公司，来自 955.WLB）+ 全球劳动数据 + 新闻动态

## 目录结构

```
src/
  i18n/ui.ts          # 8 语言 UI 字典
  layouts/Base.astro  # 全局布局（SEO meta / JSON-LD / 主题初始化）
  components/         # Header / Footer / ChartCompare / CompanyFilter / NewsList / ThemeToggle / LangSwitch
  pages/
    index.astro               # / → /zh-cn/ 重定向
    [lang]/index.astro        # 首页（Hero + 数据带 + 图表 + 新闻 + CTA）
    [lang]/companies.astro    # 955 公司白名单（搜索/城市/行业筛选）
    [lang]/news.astro         # 新闻动态
    [lang]/[slug].astro       # 内容文章动态路由
  content/docs/{lang}/*.md    # 7 板块 × 8 语言文章
  data/                       # companies.json / labor-stats.ts / news.ts
scripts/generate-docs*.mjs    # 内容生成脚本（改内容后重跑）
```

## 本地开发

```bash
npm install          # 依赖（国内可用 npmmirror 镜像）
npm run dev          # 开发服务器
npm run build        # 构建 → dist/
npm run preview      # 预览构建产物
```

## 内容维护

新增/修改文章：编辑 `src/content/docs/{lang}/{slug}.md`（frontmatter 含 title/description/date/tags）。
新增板块文章：添加 md 后会自动生成 `/zh-cn/{slug}/` 等 8 语言路由。

公司名单：编辑 `src/data/companies.json`。
新闻：编辑 `src/data/news.ts`。

## 部署（GitHub Pages）

通过 GitHub Actions 自动构建并发布到 GitHub Pages，自定义域名 `955.life`（见 `public/CNAME`）。

1. **开启 Pages**：仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。
2. **DNS**：将 `955.life` 指向 GitHub Pages（根域名用 A/AAAA，`www` 可用 CNAME 到 `aiDennis.github.io`），并在 Pages 设置中确认 Custom domain、勾选 Enforce HTTPS。
3. **自动部署**：推送 `main`（或手动跑 `Deploy to GitHub Pages` workflow）后，Actions 会 `npm ci` → `npm run build` → 发布 `dist/`。
4. **验证**：Actions 跑绿后访问 `https://955.life/`；提交 sitemap（`https://955.life/sitemap.xml`）到 Search Console。

产物是纯静态 `dist/`，也可拷到其它 CDN/主机。

## SEO 要点（已内置）

- SSG 纯静态、语义化 HTML、单页一个 H1
- 每页独立 title/description/canonical/OG/Twitter Card
- JSON-LD 结构化数据：WebSite / Article / CollectionPage
- sitemap.xml + robots.txt（自动生成）
- 关键词矩阵：955工作制 / 8小时工作制 / 双休 / 带薪年假 / 四天工作制 / 工作生活平衡 等

## 开源

GitHub: `github.com/aiDennis/955.life`
相关项目：[996.ICU](https://github.com/996icu/996.ICU) · [955.WLB](https://github.com/formulahendry/955.WLB) · [944.Life](https://github.com/formulahendry/944.Life)
