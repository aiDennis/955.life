// Generate full content for remaining 6 slugs x 8 locales
// 脚本内的数据可能滞后于线上正文（工时等已在 content 里更新过），因此默认跳过已存在的文件，
// 只给新语种打底；确需回退到脚本版本时显式加 --force。
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const FORCE = process.argv.includes('--force');

const ROOT = new URL('../src/content/docs/', import.meta.url).pathname;
const DATE = '2026-08-06';

function fm(title, desc, tags, date = DATE, updated = DATE) {
  return `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
date: "${date}"
updated: "${updated}"
tags: [${tags.map((x) => `"${x}"`).join(', ')}]
order: 1
---
`;
}

const S = [
  {
    slug: '8-hour-workday', tags: ['8小时工作制', '劳动法'],
    meta: {
      'zh-CN': ['8 小时工作制：从福特到法律', '8 小时工作制的历史、法律依据与全球现状：1886 芝加哥、1914 福特、ILO 公约与中国劳动法。'],
      'zh-Hant': ['8 小時工作制：從福特到法律', '8 小時工作制的歷史、法律依據與全球現狀：1886 芝加哥、1914 福特、ILO 公約與中國勞動法。'],
      en: ['The 8-Hour Workday: From Ford to Law', 'History, legal basis and global status of the 8-hour workday: 1886 Chicago, 1914 Ford, ILO conventions, China\'s labor law.'],
      ja: ['8時間労働制：フォードから法律へ', '8時間労働制の歴史・法的根拠・世界の現状：1886年シカゴ、1914年フォード、ILO条約、中国労働法。'],
      ko: ['8시간 노동제: 포드에서 법까지', '8시간 노동제의 역사·법적 근거·세계 현황: 1886 시카고, 1914 포드, ILO 협약, 중국 노동법.'],
      de: ['Der 8-Stunden-Tag: von Ford zum Gesetz', 'Geschichte, Rechtsgrundlagen und Status des 8-Stunden-Tags: Chicago 1886, Ford 1914, ILO-Abkommen, Chinas Arbeitsgesetz.'],
      es: ['La jornada de 8 horas: de Ford a la ley', 'Historia, base legal y situación global de la jornada de 8 horas: Chicago 1886, Ford 1914, convenios de la OIT, ley laboral china.'],
      fr: ['La journée de 8 heures : de Ford au droit', 'Histoire, fondements juridiques et état mondial de la journée de 8 h : Chicago 1886, Ford 1914, conventions OIT, droit du travail chinois.'],
    },
    body: {
      'zh-CN': `8 小时工作制是 955 生活的法律基石。它是无数工人运动换来的成果，如今却经常被"奋斗"叙事侵蚀。

## 历史：一段争取来的标准

- **1886 年 5 月 1 日**：芝加哥工人大罢工，喊出"8 小时工作、8 小时休息、8 小时归自己"——五一国际劳动节由此而来。
- **1914 年**：福特汽车率先实行每日 8 小时、日薪 5 美元，工人效率不降反升，利润翻倍。
- **1919 年**：国际劳工组织（ILO）《工时公约》确立每日 8 小时、每周 48 小时标准。
- **1938 年**：美国《公平劳动标准法》确立每周 40 小时与加班费制度。

## 中国的法律依据

- 《宪法》第四十三条：**劳动者有休息的权利**。
- 《劳动法》第三十六条：每日工作时间**不超过 8 小时**，平均每周**不超过 44 小时**。
- 《劳动法》第四十一条：加班一般每日不得超过 1 小时，特殊原因不得超过 **3 小时**，每月不得超过 **36 小时**。
- 《国务院关于职工工作时间的规定》：职工每日工作 **8 小时、每周工作 40 小时**。

也就是说，**996（周工时 72 小时）在任何标准下都是违法的**。

## 全球现状

从本站"全球工时对比"图表可以看到：德国年均工时约 1341 小时，日本约 1607 小时，而中国约 2195 小时。有趣的是，短工时国家的生产率并不更低——**工时与产出并不成正比**。

## AI 时代：问题还没解决

AI 大幅提升了效率，但平均工时并未下降——这被称为"生产率悖论"。技术红利被用于扩大产出而非减少劳动时间。这恰恰说明：**工时是制度选择，不是技术宿命**。四天工作制试点（冰岛、英国、以及 2026 年的中国四川企业）正在证明这一点。`,
      'zh-Hant': `8 小時工作制是 955 生活的法律基石。它是無數工人運動換來的成果。

## 歷史

- **1886 年 5 月 1 日**：芝加哥工人大罷工——五一國際勞動節的由來。
- **1914 年**：福特汽車實行每日 8 小時、日薪 5 美元，效率不降反升。
- **1919 年**：ILO《工時公約》確立每日 8 小時、每週 48 小時。
- **1938 年**：美國《公平勞動標準法》確立每週 40 小時與加班費制度。

## 中國法律依據

- 《憲法》第 43 條：**勞動者有休息的權利**。
- 《勞動法》第 36 條：每日**不超過 8 小時**，每週平均**不超過 44 小時**。
- 《勞動法》第 41 條：加班每日一般不超過 1 小時、特殊不超過 3 小時、每月不超過 36 小時。
- 《國務院關於職工工作時間的規定》：每日 8 小時、每週 40 小時。

**996（每週 72 小時）在任何標準下都是違法的。**

## 全球現狀

從本站全球對比圖表可見：德國年均工時約 1341 小時，日本約 1607 小時，中國約 2195 小時。短工時國家生產率並不更低——**工時與產出不成正比**。`,
      en: `The 8-hour workday is the legal cornerstone of a 955 life — a standard won through labor movements, now often eroded by "hustle" narratives.

## A standard won by history

- **May 1, 1886**: Chicago workers strike for "8 hours work, 8 hours rest, 8 hours for ourselves" — the origin of International Workers' Day.
- **1914**: Ford Motor Company adopts the 8-hour day with $5 daily pay; productivity and profit rise.
- **1919**: The ILO Hours of Work Convention sets 8 hours/day, 48 hours/week.
- **1938**: The US Fair Labor Standards Act establishes the 40-hour week and overtime pay.

## Legal basis in China

- **Constitution, Article 43**: Workers have the right to rest.
- **Labor Law, Article 36**: Daily work **no more than 8 hours**, weekly average **no more than 44**.
- **Labor Law, Article 41**: Overtime generally max 1 hour/day, up to 3 in special cases, **max 36 hours/month**.
- **State Council Regulations**: **8 hours per day, 40 hours per week**.

In other words, **996 (72 hours/week) violates the law by any standard**.

## Global status

As our comparison chart shows: Germany averages ~1,341 hours/year, Japan ~1,607, China ~2,195. Notably, short-hours countries are not less productive — **hours and output do not scale together**.`,
      ja: `8時間労働制は955の生活の法的基盤です。労働運動が勝ち取った標準であり、今も「ハッスル」の物語に侵食されがちです。

## 歴史

- **1886年5月1日**：シカゴの労働者が「8時間労働・8時間休息・8時間を自分自身に」を掲げてストライキ — メーデーの起源。
- **1914年**：フォードが日給5ドルで8時間労働制を導入、生産性は向上。
- **1919年**：ILO時間条約が1日8時間・週48時間を設定。
- **1938年**：米国の公正労働基準法が週40時間と割増賃金を確立。

## 中国の法的根拠

- **憲法43条**：労働者には休息の権利がある。
- **労働法36条**：1日**8時間以内**、週平均**44時間以内**。
- **労働法41条**：時間外は原則1日1時間以内、特別な場合3時間以内、**月36時間以内**。
- **国務院規定**：**1日8時間・週40時間**。

つまり、**996（週72時間）はいかなる基準でも違法**です。`,
      ko: `8시간 노동제는 955 생활의 법적 기초입니다. 노동운동이 쟁취한 표준이며, 지금도 '허슬' 서사에 잠식되곤 합니다.

## 역사

- **1886년 5월 1일**: 시카고 노동자 파업 — '8시간 노동, 8시간 휴식, 8시간은 나 자신에게'. 메이데이의 기원.
- **1914년**: 포드가 일급 5달러로 8시간 노동제 도입, 생산성은 오히려 상승.
- **1919년**: ILO 근로시간 협약이 일 8시간·주 48시간 설정.
- **1938년**: 미국 공정노동기준법이 주 40시간과 가산수당 확립.

## 중국의 법적 근거

- **헌법 43조**: 노동자는 휴식권이 있다.
- **노동법 36조**: 1일 **8시간 이내**, 주 평균 **44시간 이내**.
- **노동법 41조**: 연장근로 원칙 1일 1시간, 특별한 경우 3시간, **월 36시간 이내**.
- **국무원 규정**: **1일 8시간·주 40시간**.

즉, **996(주 72시간)은 어떤 기준에서도 위법**입니다.`,
      de: `Der 8-Stunden-Tag ist der rechtliche Eckpfeiler eines 955-Lebens — ein Standard, den Arbeiterbewegungen erkämpft haben.

## Geschichte

- **1. Mai 1886**: Streik in Chicago — der Ursprung des Tags der Arbeit.
- **1914**: Ford führt den 8-Stunden-Tag mit 5 Dollar Tageslohn ein; Produktivität steigt.
- **1919**: ILO-Abkommen setzt 8 Std./Tag, 48 Std./Woche.
- **1938**: US Fair Labor Standards Act: 40-Stunden-Woche und Überstundenzuschlag.

## Rechtsgrundlage in China

- **Verfassung Art. 43**: Arbeiter haben ein Recht auf Ruhe.
- **Arbeitsgesetz Art. 36**: höchstens 8 Std./Tag, Ø 44 Std./Woche.
- **Arbeitsgesetz Art. 41**: Überstunden max. 1 Std./Tag, in Sonderfällen 3, max. 36 Std./Monat.
- **Staatsratsverordnung**: 8 Std./Tag, 40 Std./Woche.

**996 (72 Std./Woche) ist nach jedem Maßstab rechtswidrig.**`,
      es: `La jornada de 8 horas es la piedra angular legal de una vida 955 — un estándar ganado por los movimientos obreros.

## Historia

- **1 de mayo de 1886**: huelga en Chicago — origen del Día del Trabajo.
- **1914**: Ford adopta la jornada de 8 h con $5 diarios; la productividad sube.
- **1919**: el convenio de la OIT fija 8 h/día y 48 h/semana.
- **1938**: la Ley de Normas Laborales Justas de EE. UU. establece las 40 h y las horas extra pagadas.

## Base legal en China

- **Constitución, art. 43**: los trabajadores tienen derecho al descanso.
- **Ley Laboral, art. 36**: máx. 8 h/día y 44 h/semana de media.
- **Ley Laboral, art. 41**: horas extra máx. 1 h/día, 3 h en casos especiales, 36 h/mes.
- **Reglamento del Consejo de Estado**: 8 h/día, 40 h/semana.

**El 996 (72 h/semana) es ilegal bajo cualquier estándar.**`,
      fr: `La journée de 8 heures est le socle juridique d'une vie 955 — un standard conquis par les mouvements ouvriers.

## Histoire

- **1er mai 1886** : grève à Chicago — origine de la Fête du Travail.
- **1914** : Ford adopte la journée de 8 h à 5 $ par jour ; la productivité augmente.
- **1919** : la convention de l'OIT fixe 8 h/jour et 48 h/semaine.
- **1938** : la Fair Labor Standards Act américaine établit 40 h et les heures sup. payées.

## Fondement juridique en Chine

- **Constitution, art. 43** : les travailleurs ont droit au repos.
- **Code du travail, art. 36** : max. 8 h/jour, Ø 44 h/semaine.
- **Code du travail, art. 41** : heures sup. max. 1 h/jour, 3 h en cas spéciaux, 36 h/mois.
- **Règlement du Conseil d'État** : 8 h/jour, 40 h/semaine.

**Le 996 (72 h/semaine) est illégal à tous égards.**`,
    },
  },
  {
    slug: 'vacation-system', tags: ['休假', '双休', '带薪假'],
    meta: {
      'zh-CN': ['休假制度：双休、年假与四天工作制', '双休、11 天法定节假日、5-15 天带薪年假、调休争议，以及全球四天工作制试验——休假是生活的刻度。'],
      'zh-Hant': ['休假制度：雙休、年假與四天工作制', '雙休、11 天法定節假日、5-15 天帶薪年假、調休爭議，以及全球四天工作制試驗。'],
      en: ['Holiday Systems: Weekends, Annual Leave & the 4-Day Week', 'Weekends, 11 statutory holidays, 5-15 days paid leave, the make-up day controversy, and the global 4-day week experiment.'],
      ja: ['休暇制度：週休、年休、週休3日制', '週休、法定休日11日、有給休暇5〜15日、振替休日の論争、そして世界の週休3日制実験。'],
      ko: ['휴가 제도: 주말, 연차, 주 4일제', '주말, 법정 공휴일 11일, 유급연차 5-15일, 대체휴일 논란, 그리고 세계의 주 4일제 실험.'],
      de: ['Urlaubssysteme: Wochenenden, Jahresurlaub & die 4-Tage-Woche', 'Wochenenden, 11 gesetzliche Feiertage, 5-15 Tage bezahlter Urlaub, die Zusatzarbeit-Debatte und das globale 4-Tage-Experiment.'],
      es: ['Sistemas de vacaciones: fines de semana, anuales y la semana de 4 días', 'Fines de semana, 11 festivos legales, 5-15 días de vacaciones pagadas, la controversia de los días compensatorios y el experimento de la semana de 4 días.'],
      fr: ['Systèmes de congés : week-ends, congés annuels et semaine de 4 jours', 'Week-ends, 11 jours fériés, 5-15 jours de congés payés, la polémique des jours de rattrapage et l\'expérience de la semaine de 4 jours.'],
    },
    body: {
      'zh-CN': `休假是生活的刻度。955 生活不只是"按时下班"，还包括真正能休到的假期。

## 双休：法律怎么说

《劳动法》第三十八条规定用人单位应当保证劳动者**每周至少休息一日**；《国务院关于职工工作时间的规定》进一步确立了周六、周日双休制度。双休不是恩赐，是法定权利。

## 法定节假日（11 天）

元旦 1 天、春节 3 天、清明节 1 天、劳动节 1 天、端午节 1 天、中秋节 1 天、国庆节 3 天。

**调休争议**：为形成"小长假"，官方常把周末挪到工作日 —— 本质是"借假"，2024-2026 年关于取消调休的呼声持续升温。多地已在探索 2.5 天休假（河北、江西、浙江等省发文鼓励）。

## 带薪年假（5-15 天）

按《职工带薪年休假条例》：工龄满 1 年不满 10 年享 **5 天**；满 10 年不满 20 年享 **10 天**；满 20 年享 **15 天**。未休年假应按日工资 **300%** 支付报酬。

对比全球：西班牙约 30 天、德国 20 天、日本 10 天，而美国联邦层面**没有**强制带薪年假。

## 四天工作制：从试验到现实

- **冰岛（2015-2019）**：约 2500 名工人参与试验，每周工时缩短至 35-36 小时，**效率不变或提升**，幸福感显著上升。
- **英国（2022）**：61 家公司、2900 名员工参与，**92% 的公司选择继续**实行四天工作制。
- **中国（2026）**：四川京元集成电路宣布四天工作制（周五带薪休假），试点两月效率未降，收到数百份简历。

## 离线权

法国 2017 年立法赋予员工"离线权"（下班后不接工作通讯）；2025 年，福建一家公司把离线权写进制度，员工下班后可拒绝工作联系。AI 时代，随时在线正在成为新的过劳形式，离线权是下一场休假保卫战。`,
      'zh-Hant': `休假是生活的刻度。955 生活不只是「按時下班」，還包括真正能休到的假期。

## 雙休

《勞動法》第 38 條規定每週至少休息一日；《國務院關於職工工作時間的規定》確立週六、週日雙休制度。

## 法定節假日（11 天）

元旦 1、春節 3、清明 1、勞動 1、端午 1、中秋 1、國慶 3。

**調休爭議**：官方常挪動週末形成「小長假」，本質是「借假」，2024-2026 年取消調休的呼聲持續升溫。

## 帶薪年假（5-15 天）

工齡 1-10 年 **5 天**；10-20 年 **10 天**；20 年以上 **15 天**。未休年假按日工資 **300%** 支付。

對比全球：西班牙約 30 天、德國 20 天、日本 10 天，美國聯邦層面**沒有**強制帶薪年假。

## 四天工作制

- **冰島（2015-2019）**：2500 人試驗，效率不變或提升。
- **英國（2022）**：61 家公司試點，**92% 選擇繼續**。
- **中國（2026）**：四川京元實行四天工作制，試點效率未降。

## 離線權

法國 2017 年立法；2025 年福建公司把離線權寫入制度。AI 時代，隨時在線是新的過勞形式。`,
      en: `Holidays are the yardstick of life. A 955 life means not just leaving on time — but actually getting the leave you're entitled to.

## Weekends: what the law says

China's Labor Law (Art. 38) guarantees workers **at least one rest day per week**; State Council regulations establish the standard Saturday-Sunday weekend. Weekends are a statutory right, not a favor.

## Statutory holidays (11 days)

New Year 1, Spring Festival 3, Qingming 1, Labor Day 1, Dragon Boat 1, Mid-Autumn 1, National Day 3.

**The "make-up day" controversy**: to form long weekends, official calendars often swap weekends for workdays — borrowing time from the future. Calls to end this practice have grown through 2024-2026, and several provinces (Hebei, Jiangxi, Zhejiang) now encourage 2.5-day weekends.

## Paid annual leave (5-15 days)

Under China's Paid Annual Leave Regulations: 1-10 years tenure → **5 days**; 10-20 years → **10 days**; 20+ years → **15 days**. Unused leave must be compensated at **300%** of daily pay.

Global comparison: Spain ~30 days, Germany 20, Japan 10 — while the US has **no** federal statutory paid leave.

## The 4-day week: from pilot to reality

- **Iceland (2015-2019)**: ~2,500 workers trialed 35-36 hour weeks — **productivity held or rose**, wellbeing jumped.
- **UK (2022)**: 61 companies, 2,900 staff — **92% continued** the 4-day week.
- **China (2026)**: Sichuan Jingyuan IC adopted a 4-day week with paid Fridays; after a two-month pilot with no drop in efficiency, hundreds applied.

## The right to disconnect

France legislated it in 2017; in 2025 a Fujian company wrote it into policy — employees may ignore work contact after hours. In the AI era, being always-on is the new overwork.`,
      ja: `休暇は人生の物差しです。955生活とは定時退社だけでなく、権利としての休暇を実際に取れることでもあります。

## 週休

中国労働法38条は週に**少なくとも1日**の休日を保証。国務院規定が週末2日制を確立。週末は権利であり、恩恵ではありません。

## 法定休日（11日）

元日1、春節3、清明1、労働節1、端午1、中秋1、国慶節3。

**振替休日の論争**：大型連休のため週末を平日に振り替える制度は「借金」であり、2024-2026年は廃止論が高まり、河北・江西・浙江などが2.5日週末を推奨。

## 有給年休（5〜15日）

勤続1-10年：**5日**、10-20年：**10日**、20年以上：**15日**。未消化分は日給の**300%**で補償。

世界比較：スペイン約30日、ドイツ20日、日本10日、アメリカは連邦レベルで**強制なし**。

## 週休3日制

- **アイスランド（2015-2019）**：約2500人が35-36時間週を試行、**生産性は維持・向上**。
- **英国（2022）**：61社が試行、**92%が継続**。
- **中国（2026）**：四川京元が週休3日制を導入、効率低下なし。

## オフライン権

フランスが2017年に法制化。2025年には福建の企業が制度に明記。AI時代、常時接続が新しい過労です。`,
      ko: `휴가는 삶의 척도입니다. 955 생활은 정시 퇴근뿐 아니라 권리로서의 휴가를 실제로 누리는 것을 뜻합니다.

## 주말

중국 노동법 38조는 주 **최소 1일** 휴식을 보장. 국무원 규정이 주 2일 휴무제를 확립. 주말은 권리이지 호의가 아닙니다.

## 법정 공휴일 (11일)

신정 1, 춘절 3, 청명 1, 노동절 1, 단오 1, 추석 1, 국경절 3.

**대체휴일 논란**: 연휴를 만들기 위해 주말을 평일로 바꾸는 제도는 '빚'입니다. 2024-2026년 폐지론이 커지고, 허베이·장시·저장 등은 2.5일 주말을 장려.

## 유급연차 (5-15일)

근속 1-10년: **5일**, 10-20년: **10일**, 20년 이상: **15일**. 미사용분은 일급의 **300%** 보상.

세계 비교: 스페인 약 30일, 독일 20일, 일본 10일, 미국은 연방 차원에서 **의무 없음**.

## 주 4일제

- **아이슬란드 (2015-2019)**: 약 2500명이 주 35-36시간 실험, **생산성 유지·향상**.
- **영국 (2022)**: 61개사 시행, **92%가 지속**.
- **중국 (2026)**: 쓰촨 징위안 반도체가 주 4일제 도입, 효율 저하 없음.

## 오프라인 권리

프랑스가 2017년 법제화. 2025년 푸젠 기업이 제도에 명문화. AI 시대, 항상 연결됨이 새로운 과로입니다.`,
      de: `Urlaub ist der Maßstab des Lebens. Ein 955-Leben heißt: pünktlich Feierabend — und den Urlaub tatsächlich bekommen, der einem zusteht.

## Wochenenden

Chinas Arbeitsgesetz (Art. 38) garantiert **mindestens einen Ruhetag pro Woche**; die Staatsratsverordnung etabliert das normale Wochenende. Wochenenden sind ein Recht, kein Gefallen.

## Gesetzliche Feiertage (11 Tage)

Neujahr 1, Frühlingsfest 3, Qingming 1, Tag der Arbeit 1, Drachenboot 1, Mondfest 1, Nationalfeiertag 3.

**Die Zusatzarbeit-Debatte**: Um lange Wochenenden zu schaffen, werden Wochenenden mit Arbeitstagen getauscht — geliehene Zeit. Die Forderung nach Abschaffung wächst; mehrere Provinzen empfehlen 2,5-Tage-Wochenenden.

## Bezahlter Jahresurlaub (5-15 Tage)

1-10 Jahre: **5 Tage**, 10-20: **10 Tage**, 20+: **15 Tage**. Unverbrauchter Urlaub wird mit **300 %** vergütet.

Weltweit: Spanien ~30, Deutschland 20, Japan 10 — die USA haben **keinen** gesetzlichen Urlaub.

## Die 4-Tage-Woche

- **Island (2015-2019)**: ~2.500 Beschäftigte, 35-36 Stunden — **Produktivität hielt oder stieg**.
- **UK (2022)**: 61 Firmen, 92 % machten weiter.
- **China (2026)**: Sichuan Jingyuan führte die 4-Tage-Woche mit bezahltem Freitag ein.

## Recht auf Nichterreichbarkeit

Frankreich 2017; 2025 schrieb eine Fujian-Firma es in ihre Richtlinie. Im KI-Zeitalter ist ständige Erreichbarkeit die neue Überarbeitung.`,
      es: `Las vacaciones son la medida de la vida. Una vida 955 significa no solo salir a tiempo — sino recibir de verdad las vacaciones que te corresponden.

## Fines de semana

La ley laboral china (art. 38) garantiza **al menos un día de descanso por semana**; el Reglamento del Consejo de Estado establece el fin de semana normal. Son un derecho, no un favor.

## Festivos legales (11 días)

Año Nuevo 1, Festival de Primavera 3, Qingming 1, Día del Trabajo 1, Barco del Dragón 1, Medio Otoño 1, Día Nacional 3.

**La polémica de los días compensatorios**: para crear puentes, el calendario oficial cambia fines de semana por días laborables — tiempo prestado. La demanda de abolirlo crece; varias provincias fomentan fines de semana de 2,5 días.

## Vacaciones anuales pagadas (5-15 días)

1-10 años: **5 días**, 10-20: **10 días**, 20+: **15 días**. Lo no disfrutado se compensa al **300 %**.

Mundo: España ~30, Alemania 20, Japón 10 — EE. UU. no tiene vacaciones federales obligatorias.

## La semana de 4 días

- **Islandia (2015-2019)**: ~2.500 trabajadores, 35-36 h — **la productividad se mantuvo o subió**.
- **Reino Unido (2022)**: 61 empresas, el 92 % continuó.
- **China (2026)**: Sichuan Jingyuan adoptó la semana de 4 días con viernes pagado.

## Derecho a la desconexión

Francia lo legisló en 2017; en 2025 una empresa de Fujian lo escribió en su política. En la era de la IA, estar siempre conectado es el nuevo exceso de trabajo.`,
      fr: `Les congés sont la mesure de la vie. Une vie 955, c'est non seulement partir à l'heure — mais obtenir réellement les congés auxquels on a droit.

## Week-ends

Le droit du travail chinois (art. 38) garantit **au moins un jour de repos par semaine** ; le règlement du Conseil d'État établit le week-end normal. C'est un droit, pas une faveur.

## Jours fériés (11 jours)

Nouvel An 1, Fête du Printemps 3, Qingming 1, Fête du Travail 1, Bateau-Dragon 1, Mi-Automne 1, Fête nationale 3.

**La polémique des jours de rattrapage** : pour créer des ponts, le calendrier échange week-ends contre jours travaillés — du temps emprunté. Plusieurs provinces encouragent les week-ends de 2,5 jours.

## Congés annuels payés (5-15 jours)

1-10 ans : **5 jours**, 10-20 : **10 jours**, 20+ : **15 jours**. Les congés non pris sont indemnisés à **300 %**.

Monde : Espagne ~30, Allemagne 20, Japon 10 — les États-Unis n'ont **aucun** congé fédéral obligatoire.

## La semaine de 4 jours

- **Islande (2015-2019)** : ~2 500 salariés, 35-36 h — **productivité maintenue ou en hausse**.
- **Royaume-Uni (2022)** : 61 entreprises, 92 % ont continué.
- **Chine (2026)** : Sichuan Jingyuan a adopté la semaine de 4 jours avec vendredi payé.

## Droit à la déconnexion

La France l'a légiféré en 2017 ; en 2025, une entreprise du Fujian l'a inscrit dans sa politique. À l'ère de l'IA, l'hyperconnexion est le nouveau surmenage.`,
    },
  },
  {
    slug: 'welfare-comparison', tags: ['福利', '社保', '育儿假'],
    meta: {
      'zh-CN': ['福利对比：从五险一金到育儿假', '五险一金、产假与育儿假、病假工资的国内外对比——福利是安全网，也是文明程度。'],
      'zh-Hant': ['福利比較：從五險一金到育兒假', '五險一金、產假與育兒假、病假工資的國內外對比。'],
      en: ['Welfare Comparison: From Social Insurance to Parental Leave', 'Social insurance, maternity and parental leave, sick pay — how welfare differs around the world.'],
      ja: ['福利厚生の比較：社会保険から育児休暇まで', '社会保険、出産・育児休暇、傷病手当の国内外比較。'],
      ko: ['복지 비교: 사회보험부터 육아휴직까지', '사회보험, 출산·육아휴직, 병가 수당의 국내외 비교.'],
      de: ['Sozialleistungen im Vergleich: von der Sozialversicherung bis zur Elternzeit', 'Sozialversicherung, Mutterschutz und Elternzeit, Lohnfortzahlung im Krankheitsfall — ein Weltvergleich.'],
      es: ['Comparativa de bienestar: de la seguridad social al permiso parental', 'Seguridad social, permisos de maternidad y paternidad, salario por enfermedad: cómo difiere el bienestar en el mundo.'],
      fr: ['Comparaison de la protection sociale : de la sécurité sociale au congé parental', 'Sécurité sociale, congés maternité et parental, indemnités maladie : comment la protection sociale diffère dans le monde.'],
    },
    body: {
      'zh-CN': `福利是社会的安全网，也是文明程度的标尺。955 生活不仅需要"少加班"，还需要"有保障"。

## 中国的五险一金

- **养老保险**：企业 16% + 个人 8%，累计满 15 年可领养老金
- **医疗保险**：企业约 8% + 个人 2%，含个人账户
- **失业保险**：企业 0.5% + 个人 0.5%
- **工伤保险**：企业缴纳，个人不缴
- **生育保险**：并入医疗，企业缴纳
- **住房公积金**：5%-12% 比例缴存

关键点：五险一金的缴存基数常被企业"打折"，维权时可向 12333 投诉。

## 产假与育儿假

- **中国**：法定产假 **98 天**，各地加奖励假后普遍 128-158 天以上；男性陪产假 7-30 天不等。育儿假近年在多地立法（如北京每年 5 个工作日）。
- **瑞典**：**480 天**带薪育儿假，夫妻可分摊，其中 90 天不可转让——全球标杆。
- **德国**：产假 14 周全薪，另有多达 3 年育儿假（部分无薪/低薪）。
- **日本**：育儿假最长至孩子 2 岁（部分工资 67%）。

## 病假工资

- **中国**：病假工资按工龄为本人工资的 60%-100%，且不低于当地最低工资的 80%。
- **德国**：生病 **6 周全薪**，由雇主支付，之后由医保支付 70%。
- **日本**：伤病津贴为日薪的 66.7%，最长 1 年 6 个月。
- **美国**：联邦无强制带薪病假（部分州有）。

## 结论

福利制度是"隐性工资"。当工时与薪酬趋同，**福利的差距就是生活质量的差距**。955 的下一站，是把年假、育儿假、病假这些"看不见的工资"谈清楚。`,
      'zh-Hant': `福利是社會的安全網，也是文明程度的標尺。

## 中國的五險一金

- **養老保險**：企業 16% + 個人 8%
- **醫療保險**：企業約 8% + 個人 2%
- **失業保險**：企業 0.5% + 個人 0.5%
- **工傷保險**：企業繳納
- **生育保險**：併入醫療
- **住房公積金**：5%-12%

## 產假與育兒假

- **中國**：法定產假 **98 天**，各地加獎勵假後普遍 128-158 天以上。
- **瑞典**：**480 天**帶薪育兒假——全球標杆。
- **德國**：產假 14 周全薪，另有多達 3 年育兒假。
- **日本**：育兒假最長至孩子 2 歲。

## 病假工資

- **中國**：按工齡為本人工資 60%-100%。
- **德國**：生病 **6 周全薪**。
- **日本**：傷病津貼 66.7%，最長 1 年 6 個月。
- **美國**：聯邦無強制帶薪病假。

福利是「隱性工資」。955 的下一站，是把年假、育兒假、病假這些「看不見的工資」談清楚。`,
      en: `Welfare is society's safety net — and a measure of civilization. A 955 life needs not just "fewer hours" but "real security."

## China's five insurances + housing fund

- **Pension**: employer 16% + employee 8%; 15 years' contributions to qualify
- **Medical**: employer ~8% + employee 2%
- **Unemployment**: 0.5% + 0.5%
- **Work injury**: employer-only
- **Maternity**: folded into medical, employer-funded
- **Housing fund**: 5%-12% matched contributions

Note: contribution bases are often understated by employers — report to 12333.

## Maternity & parental leave

- **China**: statutory maternity leave **98 days**, typically 128-158+ with provincial bonuses; paternity leave 7-30 days.
- **Sweden**: **480 days** paid parental leave, shareable — the global benchmark.
- **Germany**: 14 weeks fully paid maternity, plus up to 3 years parental leave.
- **Japan**: parental leave up to the child's 2nd birthday.

## Sick pay

- **China**: 60%-100% of salary by tenure, not below 80% of local minimum wage.
- **Germany**: **6 weeks full pay**, paid by employer.
- **Japan**: 66.7% sickness allowance for up to 18 months.
- **US**: no federal statutory paid sick leave.

Welfare is "invisible salary." The next stop of 955: negotiating the holidays, parental leave and sick pay you can't see on the pay stub.`,
      ja: `福祉は社会のセーフティネットであり、文明度の物差しです。955の生活には「残業が少ない」だけでなく「保障がある」ことが必要です。

## 中国の五険一金

- **養老保険**：企業16%+個人8%
- **医療保険**：企業約8%+個人2%
- **失業保険**：0.5%+0.5%
- **労災保険**：企業負担
- **出産保険**：医療に統合
- **住宅積立金**：5-12%

## 出産・育児休暇

- **中国**：法定産休**98日**、各地方で128-158日以上に拡充。
- **スウェーデン**：**480日**の有給育児休暇——世界の基準。
- **ドイツ**：産休14週全額支給、さらに最長3年の育児休暇。
- **日本**：育児休業は子が2歳になるまで。

## 傷病手当

- **中国**：勤続年数に応じ給与の60-100%。
- **ドイツ**：**6週間全額支給**。
- **日本**：66.7%、最長1年6ヶ月。
- **米国**：連邦の強制なし。

福祉は「見えない給与」です。955の次なる目標は、給与明細に見えない休暇・育児休暇・傷病手当をきちんと取り決めることです。`,
      ko: `복지는 사회의 안전망이자 문명의 척도입니다. 955 생활에는 '잔업이 적은 것'뿐 아니라 '보장이 있는 것'이 필요합니다.

## 중국의 오보험일금

- **연금보험**: 기업 16% + 개인 8%
- **의료보험**: 기업 약 8% + 개인 2%
- **실업보험**: 0.5% + 0.5%
- **산재보험**: 기업 부담
- **출산보험**: 의료에 통합
- **주택공적금**: 5-12%

## 출산·육아휴직

- **중국**: 법정 출산휴가 **98일**, 각지 128-158일 이상.
- **스웨덴**: **480일** 유급 육아휴직 — 세계 기준.
- **독일**: 출산휴가 14주 전액 지급, 최장 3년 육아휴직.
- **일본**: 육아휴직 최장 만 2세까지.

## 병가 수당

- **중국**: 근속연수에 따라 급여의 60-100%.
- **독일**: **6주 전액 지급**.
- **일본**: 66.7%, 최장 1년 6개월.
- **미국**: 연방 차원 의무 없음.

복지는 '보이지 않는 임금'입니다. 955의 다음 목표는 급여명세서에 보이지 않는 휴가·육아휴직·병가를 제대로 협상하는 것입니다.`,
      de: `Sozialleistungen sind das Sicherheitsnetz der Gesellschaft — und ein Maß der Zivilisation. Ein 955-Leben braucht nicht nur „weniger Stunden", sondern „echte Sicherheit".

## Chinas fünf Versicherungen + Wohnungsfonds

- **Rente**: Arbeitgeber 16 % + Arbeitnehmer 8 %
- **Krankenversicherung**: ~8 % + 2 %
- **Arbeitslosenversicherung**: 0,5 % + 0,5 %
- **Unfallversicherung**: nur Arbeitgeber
- **Mutterschaftsversicherung**: im Medizinischen enthalten
- **Wohnungsfonds**: 5-12 %

## Mutterschutz & Elternzeit

- **China**: gesetzlich **98 Tage**, mit regionalen Boni meist 128-158+.
- **Schweden**: **480 Tage** bezahlte Elternzeit — der globale Maßstab.
- **Deutschland**: 14 Wochen voll bezahlt, plus bis zu 3 Jahre Elternzeit.
- **Japan**: Elternzeit bis zum 2. Geburtstag des Kindes.

## Lohnfortzahlung im Krankheitsfall

- **China**: 60-100 % je nach Betriebszugehörigkeit.
- **Deutschland**: **6 Wochen volle Fortzahlung**.
- **Japan**: 66,7 %, bis zu 18 Monate.
- **USA**: keine gesetzliche Pflicht.

Sozialleistungen sind „unsichtbarer Lohn". Der nächste Schritt von 955: die nicht sichtbaren Urlaubs- und Krankheitsleistungen klar verhandeln.`,
      es: `El bienestar es la red de seguridad de la sociedad — y una medida de civilización. Una vida 955 necesita no solo "menos horas" sino "seguridad real".

## Cinco seguros + fondo de vivienda en China

- **Pensión**: empresa 16 % + empleado 8 %
- **Médico**: ~8 % + 2 %
- **Desempleo**: 0,5 % + 0,5 %
- **Accidentes laborales**: solo empresa
- **Maternidad**: integrado en el médico
- **Fondo de vivienda**: 5-12 %

## Permisos de maternidad y paternidad

- **China**: 98 días legales, típicamente 128-158+ con bonos provinciales.
- **Suecia**: **480 días** pagados — el referente mundial.
- **Alemania**: 14 semanas completas, más hasta 3 años de permiso parental.
- **Japón**: hasta el 2.º cumpleaños del hijo.

## Salario por enfermedad

- **China**: 60-100 % según antigüedad.
- **Alemania**: **6 semanas completas**.
- **Japón**: 66,7 %, hasta 18 meses.
- **EE. UU.**: sin obligación federal.

El bienestar es el "salario invisible". El siguiente paso del 955: negociar los permisos que no ves en la nómina.`,
      fr: `La protection sociale est le filet de sécurité de la société — et une mesure de civilisation. Une vie 955 exige non seulement « moins d'heures » mais « une vraie sécurité ».

## Cinq assurances + fonds logement en Chine

- **Retraite** : employeur 16 % + salarié 8 %
- **Santé** : ~8 % + 2 %
- **Chômage** : 0,5 % + 0,5 %
- **Accidents du travail** : employeur seul
- **Maternité** : intégrée à la santé
- **Fonds logement** : 5-12 %

## Congés maternité et parental

- **Chine** : **98 jours** légaux, souvent 128-158+ avec bonus régionaux.
- **Suède** : **480 jours** payés — la référence mondiale.
- **Allemagne** : 14 semaines plein salaire, plus jusqu'à 3 ans de congé parental.
- **Japon** : jusqu'au 2e anniversaire de l'enfant.

## Indemnités maladie

- **Chine** : 60-100 % selon l'ancienneté.
- **Allemagne** : **6 semaines plein salaire**.
- **Japon** : 66,7 %, jusqu'à 18 mois.
- **États-Unis** : aucune obligation fédérale.

La protection sociale est le « salaire invisible ». Prochaine étape du 955 : négocier clairement les congés invisibles sur le bulletin de paie.`,
    },
  },
  {
    slug: 'work-intensity', tags: ['工作强度', '过劳', '数据'],
    meta: {
      'zh-CN': ['工作强度：数据、过劳与案例时间线', '中国与世界工时数据、WHO 过劳研究，以及 2016-2026 年劳动案例时间线——强度下降是 955 的核心。'],
      'zh-Hant': ['工作強度：數據、過勞與案例時間線', '中國與世界工時數據、WHO 過勞研究，以及 2016-2026 年勞動案例時間線。'],
      en: ['Work Intensity: Data, Karoshi & a Timeline of Cases', 'Working-hours data, WHO overwork research, and a 2016-2026 timeline of labor cases — intensity matters.'],
      ja: ['労働強度：データ、過労死、事例年表', '中国と世界の労働時間データ、WHOの過労研究、2016-2026年の労働事例。'],
      ko: ['노동 강도: 데이터, 과로사, 사례 연표', '중국과 세계의 노동시간 데이터, WHO 과로 연구, 2016-2026 노동 사례.'],
      de: ['Arbeitsintensität: Daten, Überarbeitung & eine Chronik', 'Arbeitszeitdaten, WHO-Überarbeitungsforschung und eine Chronik der Fälle 2016-2026.'],
      es: ['Intensidad laboral: datos, karoshi y cronología de casos', 'Datos de horas de trabajo, investigación de la OMS sobre sobrecarga y una cronología de casos 2016-2026.'],
      fr: ['Intensité du travail : données, karoshi et chronologie', 'Données d\'heures travaillées, recherche OMS sur le surmenage et chronologie de cas 2016-2026.'],
    },
    body: {
      'zh-CN': `工作强度是 955 的靶心：工时越长，生活越薄。

## 数据：中国 vs 世界

- 中国：年均工时约 **2195 小时**（多口径估算），近年国家统计局周平均工时徘徊在 **48-49 小时**，高于劳动法 44 小时上限。
- 对比：墨西哥约 2126h、韩国约 1901h、日本约 1607h、美国约 1799h、英国约 1531h、德国约 **1341h**。
- 关键观察：德国工时最短，但人均产出与制造业竞争力长期全球领先——**高强度不等于高效率**。

## 过劳研究

- WHO/ILO 2021 年发布的研究（覆盖 2016 年数据）：全球每年约 **74.5 万人**死于每周工作 55 小时以上的长工时；与长工时相关的缺血性心脏病和中风死亡占比显著。
- 日本把"过劳死（karoshi）"写进法律：2014 年《过劳死等防止对策推进法》。中国近年也开始讨论"过劳"的劳动法保护议题。

## 案例时间线（2016-2026）

- **2016**：58 同城被曝全员 996，周末加班无工资，舆论哗然。
- **2019**：有赞年会宣布执行 996，CEO 称"几年后回看是好事"；京东被曝分部门 995/996。同年 996.ICU 项目爆火，GitHub 27 万+ star。
- **2021**：某电商平台员工凌晨下班途中猝死，引爆全网对"大小周"与加班文化的反思。
- **2023**：中国电科成都研发部加班事件登上热搜，员工"强制加班被怼"引发共鸣。
- **2025-2026**：风向转变 —— 四川京元实行四天工作制、吉林两会建议 4.5 天工作制、多省发文鼓励 2.5 天休假、福建公司落实"离线权"。

## 结论

从"以加班为荣"到"以休息为常"，中国的劳动叙事正在缓慢转向。强度下降不是懒惰，而是对健康、家庭与创造力的投资。`,
      'zh-Hant': `工作強度是 955 的靶心：工時越長，生活越薄。

## 數據

- 中國：年均工時約 **2195 小時**，近年官方周平均工時 48-49 小時，高於 44 小時法定上限。
- 對比：墨西哥 2126h、韓國 1901h、日本 1607h、美國 1799h、英國 1531h、德國 **1341h**。
- 關鍵：德國工時最短但競爭力長期領先——**高強度不等於高效率**。

## 過勞研究

- WHO/ILO：全球每年約 **74.5 萬人**死於每週工作 55 小時以上。
- 日本將「過勞死（karoshi）」寫入法律（2014）。

## 案例時間線（2016-2026）

- **2016**：58 同城 996 風波。
- **2019**：有贊、京東 996；996.ICU 爆火（27 萬+ star）。
- **2021**：電商員工凌晨下班猝死，反思「大小周」。
- **2023**：中國電科加班事件上熱搜。
- **2025-2026**：風向轉變——四川京元四天工作制、吉林建議 4.5 天、多省 2.5 天休假、福建離線權。

強度下降不是懶惰，而是對健康、家庭與創造力的投資。`,
      en: `Work intensity is the bullseye of 955: longer hours mean a thinner life.

## The data: China vs. the world

- China: ~**2,195 hours** per year (various estimates); official weekly average hovers around **48-49 hours** — above the 44-hour legal ceiling.
- Compare: Mexico ~2,126h, South Korea ~1,901h, Japan ~1,607h, US ~1,799h, UK ~1,531h, Germany ~**1,341h**.
- Key insight: Germany works the least yet leads in productivity — **intensity is not efficiency**.

## Overwork research

- A WHO/ILO study (2016 data, published 2021) estimated ~**745,000 deaths per year** globally from working 55+ hours weekly.
- Japan enshrined "karoshi" in law (2014 Anti-Karoshi Act). China is beginning to debate overwork protections.

## A timeline of cases (2016-2026)

- **2016**: 58.com exposed for company-wide 996 with unpaid weekend work.
- **2019**: Youzan announces 996 at annual meeting; JD.com reportedly 995/996. 996.ICU explodes — 270k+ GitHub stars.
- **2021**: An e-commerce worker dies on the way home after a late shift — nationwide reckoning over "big/small weeks."
- **2023**: CETC Chengdu overtime incident trends; "forced overtime pushback" resonates.
- **2025-2026**: The wind shifts — Sichuan Jingyuan adopts a 4-day week, Jilin suggests 4.5 days, provinces encourage 2.5-day weekends, Fujian firms codify the right to disconnect.

Lower intensity isn't laziness — it's an investment in health, family and creativity.`,
      ja: `労働強度は955の核心です。時間が長いほど、人生は薄くなります。

## データ

- 中国：年間約**2,195時間**。公式の週平均は**48-49時間**で、法定上限44時間を超過。
- 比較：メキシコ2,126h、韓国1,901h、日本1,607h、米国1,799h、英国1,531h、ドイツ**1,341h**。
- 重要な事実：ドイツは最も短時間で生産性トップ——**高強度≠高効率**。

## 過労研究

- WHO/ILO（2016年データ）：世界で年間約**74.5万人**が週55時間以上の労働で死亡。
- 日本は2014年に過労死対策法を制定。

## 事例年表（2016-2026）

- **2016**：58同城の全社996が発覚。
- **2019**：有賛・京東の996、996.ICUが爆発的人気（27万star）。
- **2021**：EC企業社員が深夜帰宅中に急死、「大小週」を反省。
- **2023**：中国電科の残業事件が話題に。
- **2025-2026**：風向きが変わる——四川京元の週休3日、吉林の4.5日提案、2.5日週末、福建のオフライン権。

強度低下は怠惰ではなく、健康・家族・創造性への投資です。`,
      ko: `노동 강도는 955의 핵심입니다. 시간이 길수록 삶은 얇아집니다.

## 데이터

- 중국: 연간 약 **2,195시간**. 공식 주 평균 **48-49시간**으로 법정 상한 44시간 초과.
- 비교: 멕시코 2,126h, 한국 1,901h, 일본 1,607h, 미국 1,799h, 영국 1,531h, 독일 **1,341h**.
- 핵심: 독일은 가장 적게 일하면서 생산성 최상위 — **고강도≠고효율**.

## 과로 연구

- WHO/ILO(2016년 데이터): 세계 연간 약 **74.5만 명**이 주 55시간 이상 노동으로 사망.
- 일본은 2014년 과로사 방지법 제정.

## 사례 연표 (2016-2026)

- **2016**: 58.com 전사 996 적발.
- **2019**: 유잔·징둥 996, 996.ICU 폭발적 인기 (27만+ star).
- **2021**: 이커머스 직원 심야 퇴근길 사망, '대소주' 반성.
- **2023**: 중국전과(中電科) 잔업 사건 화제.
- **2025-2026**: 바람이 바뀐다 — 쓰촨 징위안 주 4일제, 지린 4.5일 제안, 2.5일 주말, 푸젠 오프라인 권리.

강도 감소는 게으름이 아니라 건강·가족·창의성에 대한 투자입니다.`,
      de: `Arbeitsintensität ist das Kernziel von 955: längere Stunden bedeuten ein dünneres Leben.

## Die Daten

- China: ~**2.195 Stunden**/Jahr; der offizielle Wochenmittelwert liegt bei **48-49 Stunden** — über der gesetzlichen Obergrenze von 44.
- Vergleich: Mexiko 2.126h, Südkorea 1.901h, Japan 1.607h, USA 1.799h, UK 1.531h, Deutschland **1.341h**.
- Wichtig: Deutschland arbeitet am wenigsten und ist produktiv — **Intensität ist nicht Effizienz**.

## Überarbeitungsforschung

- WHO/ILO (2016): weltweit ~**745.000 Todesfälle**/Jahr durch 55+ Wochenstunden.
- Japan verankerte „Karoshi" 2014 im Gesetz.

## Chronik (2016-2026)

- **2016**: 58.com wegen 996 in der Kritik.
- **2019**: Youzan und JD, 996.ICU explodiert (270k+ Stars).
- **2021**: Tod eines E-Commerce-Mitarbeiters nach Nachtschicht.
- **2023**: CETC-Überstundenskandal.
- **2025-2026**: Der Wind dreht sich — 4-Tage-Woche, 4,5-Tage-Vorschlag, 2,5-Tage-Wochenenden, Recht auf Nichterreichbarkeit.

Weniger Intensität ist keine Faulheit, sondern eine Investition in Gesundheit, Familie und Kreativität.`,
      es: `La intensidad laboral es el centro del 955: más horas significan una vida más delgada.

## Los datos

- China: ~**2.195 horas**/año; el promedio semanal oficial es de **48-49 horas**, por encima del límite legal de 44.
- Comparación: México 2.126h, Corea del Sur 1.901h, Japón 1.607h, EE. UU. 1.799h, Reino Unido 1.531h, Alemania **1.341h**.
- Clave: Alemania trabaja menos y es productiva — **la intensidad no es eficiencia**.

## Investigación sobre sobrecarga

- OMS/OIT (2016): ~**745.000 muertes**/año por trabajar 55+ horas semanales.
- Japón consagró el «karoshi» en la ley (2014).

## Cronología (2016-2026)

- **2016**: 58.com, 996 en toda la empresa.
- **2019**: Youzan y JD; 996.ICU explota (270k+ estrellas).
- **2021**: muere un empleado de e-commerce camino a casa.
- **2023**: escándalo de horas extra en CETC.
- **2025-2026**: cambia el viento — semana de 4 días, propuesta de 4,5 días, fines de semana de 2,5 días, derecho a la desconexión.

Menos intensidad no es pereza: es inversión en salud, familia y creatividad.`,
      fr: `L'intensité du travail est le cœur du 955 : plus d'heures signifie une vie plus mince.

## Les données

- Chine : ~**2 195 heures**/an ; la moyenne hebdomadaire officielle est de **48-49 heures**, au-dessus du plafond légal de 44.
- Comparaison : Mexique 2 126 h, Corée du Sud 1 901 h, Japon 1 607 h, États-Unis 1 799 h, Royaume-Uni 1 531 h, Allemagne **1 341 h**.
- Clé : l'Allemagne travaille le moins et reste productive — **l'intensité n'est pas l'efficacité**.

## Recherche sur le surmenage

- OMS/OIT (2016) : ~**745 000 décès**/an dans le monde pour 55 h+ hebdomadaires.
- Le Japon a inscrit le « karoshi » dans la loi (2014).

## Chronologie (2016-2026)

- **2016** : 58.com, 996 à l'échelle de l'entreprise.
- **2019** : Youzan et JD ; 996.ICU explose (270 000+ étoiles).
- **2021** : mort d'un salarié e-commerce en rentrant d'un service de nuit.
- **2023** : scandale des heures sup. chez CETC.
- **2025-2026** : le vent tourne — semaine de 4 jours, proposition de 4,5 jours, week-ends de 2,5 jours, droit à la déconnexion.

Moins d'intensité n'est pas de la paresse : c'est un investissement dans la santé, la famille et la créativité.`,
    },
  },
];

for (const doc of S) {
  for (const lang of Object.keys(doc.meta)) {
    const dir = join(ROOT, lang);
    mkdirSync(dir, { recursive: true });
    const target = join(dir, `${doc.slug}.md`);
    if (existsSync(target) && !FORCE) {
      console.log(`skip ${lang}/${doc.slug}.md（已存在）`);
      continue;
    }
    const [title, desc] = doc.meta[lang];
    const body = doc.body[lang];
    const file = `${body}\n`;
    writeFileSync(target, fm(title, desc, doc.tags) + file);
    console.log(`wrote ${lang}/${doc.slug}.md`);
  }
}
console.log('done');
