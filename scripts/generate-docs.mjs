// Generate 955.life content collections: 7 slugs x 8 locales
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = new URL('../src/content/docs/', import.meta.url).pathname;
const DATE = '2026-08-06';

const L = {
  'zh-CN': 'zh-CN', 'zh-Hant': 'zh-Hant', en: 'en', ja: 'ja', ko: 'ko', de: 'de', es: 'es', fr: 'fr',
};

const C = {
  'what-is-955': {
    tags: ['955', '概念'],
    meta: {
      'zh-CN': ['什么是 955 工作制', '955 工作制 = 早 9 点到岗、下午 5 点下班、每周工作 5 天。与 996 相对，代表工作与生活的平衡。'],
      'zh-Hant': ['什麼是 955 工作制', '955 工作制 = 早 9 點到崗、下午 5 點下班、每週工作 5 天。與 996 相對，代表工作與生活的平衡。'],
      en: ['What is the 955 Work Schedule?', 'The 955 schedule means 9 AM to 5 PM, 5 days a week — the opposite of 996, representing work-life balance.'],
      ja: ['955勤務とは？', '955勤務＝朝9時出勤、午後5時退社、週5日勤務。996とは対極の、ワークライフバランスを表す働き方です。'],
      ko: ['955 근무제란?', '955 근무제 = 오전 9시 출근, 오후 5시 퇴근, 주 5일 근무. 996과 반대되는 워크라이프 밸런스의 근무 방식입니다.'],
      de: ['Was ist die 955-Arbeitsweise?', '955 = 9 bis 17 Uhr, 5 Tage pro Woche — das Gegenteil von 996, steht für Work-Life-Balance.'],
      es: ['¿Qué es la jornada 955?', '955 = de 9 a 17 h, 5 días a la semana — lo opuesto a 996, representa el equilibrio vida-trabajo.'],
      fr: ['Qu\'est-ce que le rythme de travail 955 ?', '955 = de 9 h à 17 h, 5 jours par semaine — l\'opposé de 996, symbole de l\'équilibre vie-travail.'],
    },
    body: {
      'zh-CN': `**955 工作制**：每天早 9 点到岗，下午 5 点下班，每周工作 5 天。周工作时间约 40 小时，正好落在多数国家法定标准工时之内。

相关概念：

- **965**：早 9 点 / 晚 6 点 / 每周 5 天，比 955 略长
- **944**：早 9 点 / 下午 4 点 / 每周 4 天（四天工作制，最早由 944.Life 项目推广）
- **996**：早 9 点 / 晚 9 点 / 每周 6 天，周工时最低 72 小时 —— 远超法定上限

## 为什么 955 值得追求

1. **合法**：中国《劳动法》规定每日工作不超过 8 小时、每周平均不超过 44 小时；《国务院关于职工工作时间的规定》进一步明确每周 40 小时。
2. **健康**：世界卫生组织与国际劳工组织的研究显示，每周工作超过 55 小时会显著增加中风与心脏病风险。
3. **高效**：从福特 8 小时制到冰岛、英国的四天工作制试点，缩短工时并未带来产出下降，反而常伴随效率提升。

## 常见问题

**问：955 和"朝九晚五"是一回事吗？**
是的，955 就是中文语境下对朝九晚五（9-to-5）的数字化表达。

**问：中国法定年假有多少天？**
按工龄 1-10/10-20/20 年以上，分别为 5/10/15 天（《职工带薪年休假条例》），需与双休、法定节假日叠加使用。

**问：哪里可以看到 955 公司名单？**
本站"955 公司"栏目收录了社区维护的不加班公司白名单，可按城市与行业筛选。`,
      'zh-Hant': `**955 工作制**：每天早 9 點到崗，下午 5 點下班，每週工作 5 天。週工作時間約 40 小時，落在多數國家法定標準工時之內。

相關概念：

- **965**：早 9 點 / 晚 6 點 / 每週 5 天
- **944**：早 9 點 / 下午 4 點 / 每週 4 天（四天工作制）
- **996**：早 9 點 / 晚 9 點 / 每週 6 天，週工時最低 72 小時

## 為什麼 955 值得追求

1. **合法**：《勞動法》規定每日工作不超過 8 小時、每週平均不超過 44 小時；《國務院關於職工工作時間的規定》明確每週 40 小時。
2. **健康**：WHO 與 ILO 研究顯示，每週工作超過 55 小時會顯著增加中風與心臟病風險。
3. **高效**：從福特 8 小時制到冰島、英國的四天工作制試點，縮短工時並未帶來產出下降。

## 常見問題

**問：955 和「朝九晚五」是一回事嗎？**
是的，955 就是對朝九晚五（9-to-5）的數字化表達。

**問：中國法定年假有多少天？**
按工齡分為 5/10/15 天（《職工帶薪年休假條例》）。

**問：哪裡可以看到 955 公司名單？**
本站「955 公司」欄目收錄了社群維護的不加班公司白名單。`,
      en: `**The 955 schedule**: clock in at 9 AM, clock out at 5 PM, five days a week — roughly 40 hours, right within most countries' statutory working-time limits.

Related terms:

- **965**: 9 AM / 6 PM / 5 days — slightly longer
- **944**: 9 AM / 4 PM / 4 days — the four-day workweek
- **996**: 9 AM / 9 PM / 6 days — minimum 72 hours a week, far beyond legal limits

## Why 955 is worth pursuing

1. **Legal**: China's Labor Law caps daily work at 8 hours and weekly average at 44; State Council regulations set 40 hours.
2. **Healthy**: WHO/ILO research links working 55+ hours a week to significantly higher stroke and heart-disease risk.
3. **Productive**: From Ford's 8-hour day to four-day pilots in Iceland and the UK, shorter hours rarely reduce output — often the opposite.

## FAQ

**Q: Is 955 the same as 9-to-5?**
Yes — 955 is simply how "9-to-5" is expressed in Chinese context.

**Q: How much statutory annual leave in China?**
5/10/15 days depending on tenure (Regulations on Paid Annual Leave).

**Q: Where can I find the 955 company list?**
See the "955 Companies" section — a community-maintained whitelist filterable by city and industry.`,
      ja: `**955勤務**：朝9時出勤・午後5時退社・週5日勤務。週約40時間で、多くの国の法定労働時間の範囲内です。

関連用語：

- **965**：朝9時/夕6時/週5日
- **944**：朝9時/午後4時/週4日（週休3日制）
- **996**：朝9時/夜9時/週6日、最低72時間 — 法定上限を大きく超過

## 955を目指す理由

1. **合法**：中国労働法は1日8時間・週平均44時間を上限とし、国務院規定は週40時間と定める。
2. **健康**：WHO/ILO研究では週55時間超の労働は脳卒中・心疾患リスクを顕著に高める。
3. **生産性**：フォードの8時間労働制からアイスランド・英国の週休3日試行まで、短時間化は生産性を下げない。

## FAQ

**Q: 955と9-to-5は同じ？**
はい、955は「朝9時-夕5時」を数字で表したものです。

**Q: 中国の法定有給休暇は？**
勤続年数に応じて5/10/15日。

**Q: 955企業リストはどこ？**
「955企業」ページで、都市・業界で絞り込めるコミュニティ運営リストを公開中。`,
      ko: `**955 근무제**: 오전 9시 출근, 오후 5시 퇴근, 주 5일 근무. 주 약 40시간으로 대부분 국가의 법정 근로시간 범위 안입니다.

관련 용어:

- **965**: 오전 9시/오후 6시/주 5일
- **944**: 오전 9시/오후 4시/주 4일 (주 4일 근무제)
- **996**: 오전 9시/오후 9시/주 6일, 주 최소 72시간 — 법정 상한을 크게 초과

## 955를 추구해야 하는 이유

1. **합법**: 중국 노동법은 일 8시간·주 평균 44시간을 상한으로, 국무원 규정은 주 40시간을 명시.
2. **건강**: WHO/ILO 연구는 주 55시간 이상 노동이 뇌졸중·심장병 위험을 크게 높인다고 경고.
3. **생산성**: 포드의 8시간제부터 아이슬란드·영국의 주 4일 실험까지, 근로시간 단축은 생산성 저하를 가져오지 않았습니다.

## FAQ

**Q: 955와 9-to-5는 같은가요?**
네, 955는 '오전9-오후5'의 숫자 표현입니다.

**Q: 중국 법정 연차휴가는?**
근속연수에 따라 5/10/15일.

**Q: 955 기업 목록은 어디에?**
'955 기업' 페이지에서 도시·업종별로 필터링 가능한 커뮤니티 운영 목록을 제공합니다.`,
      de: `**Die 955-Arbeitsweise**: 9 Uhr kommen, 17 Uhr gehen, 5 Tage die Woche — rund 40 Stunden, innerhalb der gesetzlichen Grenzen der meisten Länder.

Verwandte Begriffe:

- **965**: 9 / 18 / 5 Tage — etwas länger
- **944**: 9 / 16 / 4 Tage — die 4-Tage-Woche
- **996**: 9 / 21 / 6 Tage — mind. 72 Stunden, weit über dem Limit

## Warum 955 erstrebenswert ist

1. **Legal**: Chinas Arbeitsgesetz begrenzt den Tag auf 8 Stunden, die Woche auf 44; die Staatsratsverordnung auf 40.
2. **Gesund**: WHO/ILO-Studien zeigen: 55+ Stunden pro Woche erhöhen Schlaganfall- und Herzrisiko deutlich.
3. **Produktiv**: Von Fords 8-Stunden-Tag bis zu den 4-Tage-Piloten in Island und Großbritannien: kürzere Arbeit senkt selten die Produktivität.

## FAQ

**F: Ist 955 dasselbe wie 9-to-5?**
Ja — 955 ist einfach die chinesische Ausdrucksform von 9-to-5.

**F: Wie viel gesetzlicher Urlaub in China?**
5/10/15 Tage je nach Betriebszugehörigkeit.

**F: Wo finde ich die 955-Unternehmensliste?**
Im Bereich „955-Unternehmen" — eine Community-Whitelist, filterbar nach Stadt und Branche.`,
      es: `**La jornada 955**: entrar a las 9, salir a las 17, cinco días por semana — unas 40 horas, dentro de los límites legales de la mayoría de países.

Términos relacionados:

- **965**: 9 / 18 / 5 días — algo más larga
- **944**: 9 / 16 / 4 días — la semana de 4 días
- **996**: 9 / 21 / 6 días — mínimo 72 horas, muy por encima del límite

## Por qué vale la pena el 955

1. **Legal**: La ley laboral china limita la jornada a 8 h diarias y 44 semanales; el Consejo de Estado fija 40.
2. **Salud**: Estudios de OMS/OIT vinculan 55+ horas semanales con mayor riesgo de ictus y cardiopatía.
3. **Productivo**: De la jornada de 8 h de Ford a los pilotos de 4 días en Islandia y Reino Unido, menos horas rara vez reduce la producción.

## FAQ

**P: ¿955 es lo mismo que 9 a 5?**
Sí — 955 es simplemente la forma china de decir 9-to-5.

**P: ¿Cuántas vacaciones pagadas en China?**
5/10/15 días según la antigüedad.

**P: ¿Dónde está la lista de empresas 955?**
En la sección «Empresas 955» — una lista blanca comunitaria filtrable por ciudad e industria.`,
      fr: `**Le rythme 955** : arrivée à 9 h, départ à 17 h, cinq jours par semaine — environ 40 heures, dans les limites légales de la plupart des pays.

Termes liés :

- **965** : 9 / 18 / 5 jours — un peu plus long
- **944** : 9 / 16 / 4 jours — la semaine de 4 jours
- **996** : 9 / 21 / 6 jours — 72 h minimum, bien au-delà de la limite

## Pourquoi viser le 955

1. **Légal** : le droit du travail chinois limite la journée à 8 h et la semaine à 44 h ; le Conseil d'État fixe 40 h.
2. **Santé** : les études OMS/OIT relient 55 h+ hebdomadaires à un risque accru d'AVC et de maladies cardiaques.
3. **Productif** : de la journée de 8 h de Ford aux pilotes de 4 jours en Islande et au Royaume-Uni, moins d'heures réduit rarement la production.

## FAQ

**Q : 955 est-il identique au 9-to-5 ?**
Oui — 955 est simplement l'expression chinoise du 9-to-5.

**Q : Combien de congés payés en Chine ?**
5/10/15 jours selon l'ancienneté.

**Q : Où trouver la liste des entreprises 955 ?**
Dans la section « Entreprises 955 » — une liste blanche communautaire filtrable par ville et secteur.`,
    },
  },
};

function fm(meta, tags, date, updated) {
  return `---
title: "${meta[0].replace(/"/g, '\\"')}"
description: "${meta[1].replace(/"/g, '\\"')}"
date: "${date}"
updated: "${updated}"
tags: [${tags.map((x) => `"${x}"`).join(', ')}]
order: 1
---
`;
}

// Short placeholder content for remaining slugs (v1 MVP, expand in M2+)
const EXTRA = [
  ['8-hour-workday', '8小时工作制', '8-Hour Workday'],
  ['vacation-system', '休假制度', 'Holiday System'],
  ['welfare-comparison', '福利对比', 'Welfare Comparison'],
  ['work-intensity', '工作强度', 'Work Intensity'],
  ['laws', '法律法规库', 'Laws & Regulations'],
  ['resources', '资源库', 'Resources'],
];

for (const slug of Object.keys(C)) {
  const doc = C[slug];
  for (const lang of Object.values(L)) {
    const dir = join(ROOT, lang);
    mkdirSync(dir, { recursive: true });
    const meta = doc.meta[lang];
    if (!meta) continue;
    const body = doc.body[lang] ?? `(TODO)`;
    const file = `${body}\n`;
    writeFileSync(join(dir, `${slug}.md`), fm(meta, doc.tags, DATE, DATE) + file);
    console.log(`wrote ${lang}/${slug}.md`);
  }
}

// TODO placeholders for remaining slugs (real content added next pass)
for (const [slug] of EXTRA) {
  for (const lang of Object.values(L)) {
    const dir = join(ROOT, lang);
    mkdirSync(dir, { recursive: true });
    const title = `[${lang}] ${slug}`;
    const file = `${title}\n`;
    writeFileSync(join(dir, `${slug}.md`), fm([title, 'TODO'], ['TODO'], DATE, DATE) + file);
  }
}
console.log('done');
