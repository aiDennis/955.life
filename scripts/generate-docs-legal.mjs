// Generate laws + resources content (overwrites TODO placeholders)
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

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

const laws = {
  tags: ['劳动法', '法律', '维权'],
  meta: {
    'zh-CN': ['法律法规库：工时与休假的法律依据', '宪法、劳动法、劳动合同法、国务院规定中关于工时、加班、休假的核心条文，附官方来源链接。'],
    'zh-Hant': ['法律法規庫：工時與休假的法律依據', '憲法、勞動法、勞動合同法、國務院規定中關於工時、加班、休假的核心條文。'],
    en: ['Legal Library: The Laws Behind Work Hours & Leave', 'Core provisions on working hours, overtime and leave from China\'s Constitution, Labor Law and State Council regulations, with official sources.'],
    ja: ['法令ライブラリ：労働時間と休暇の法的根拠', '中国の憲法・労働法・国務院規定における労働時間・時間外・休暇の主要条文。'],
    ko: ['법령 라이브러리: 근로시간과 휴가의 법적 근거', '중국 헌법·노동법·국무원 규정의 근로시간·연장근로·휴가 핵심 조문.'],
    de: ['Gesetzesbibliothek: Rechtsgrundlagen für Arbeitszeit & Urlaub', 'Kernbestimmungen zu Arbeitszeit, Überstunden und Urlaub aus Verfassung, Arbeitsgesetz und Staatsratsverordnung mit offiziellen Quellen.'],
    es: ['Biblioteca legal: las leyes tras las horas de trabajo y las vacaciones', 'Disposiciones clave sobre jornada, horas extra y vacaciones de la Constitución, la Ley Laboral y el Reglamento del Consejo de Estado, con fuentes oficiales.'],
    fr: ['Bibliothèque juridique : les lois derrière le temps de travail et les congés', 'Dispositions clés sur la durée du travail, les heures sup. et les congés (Constitution, Code du travail, règlement du Conseil d\'État), avec sources officielles.'],
  },
  body: {
    'zh-CN': `## 宪法

**第四十三条**：中华人民共和国劳动者有休息的权利。国家发展劳动者休息和休养的设施，规定职工的工作时间和休假制度。

## 劳动法

- **第三十六条**：国家实行劳动者每日工作时间不超过 **8 小时**、平均每周工作时间不超过 **44 小时**的工时制度。
- **第三十八条**：用人单位应当保证劳动者**每周至少休息一日**。
- **第三十九条**：企业因生产特点不能实行第三十六、三十八条规定的，经劳动行政部门批准，可以实行其他工作和休息办法。
- **第四十一条**：延长工作时间一般每日不得超过 **1 小时**；因特殊原因，每日不得超过 **3 小时**，每月不得超过 **36 小时**。
- **第四十三条**：用人单位不得违反本法规定延长劳动者的工作时间。
- **第四十四条**：加班报酬 —— 工作日延长 150%；休息日不能补休 200%；法定休假日 **300%**。
- **第九十、九十一条**：违法延长工作时间的行政处罚与赔偿。

## 劳动合同法

- **第三十一条**：用人单位应当严格执行劳动定额标准，不得强迫或者变相强迫劳动者加班。
- **第八十五条**：未依法支付加班费的，由劳动行政部门责令限期支付，逾期加付 **50%-100%** 赔偿金。

## 国务院规定

- 《国务院关于职工工作时间的规定》第三条：职工每日工作 **8 小时、每周工作 40 小时**。
- 第六条：任何单位和个人不得擅自延长职工工作时间。

## 带薪年休假

《职工带薪年休假条例》第三条：累计工作满 1 年不满 10 年的，年休假 **5 天**；满 10 年不满 20 年的 **10 天**；满 20 年的 **15 天**。

> 官方来源：全国人大网（npc.gov.cn）、人力资源社会保障部（mohrss.gov.cn）。本站引用仅为普法参考，具体以官方文本为准。`,
    'zh-Hant': `## 憲法

**第四十三條**：中華人民共和國勞動者有休息的權利。

## 勞動法

- 第 36 條：每日**不超過 8 小時**、每週平均**不超過 44 小時**。
- 第 38 條：**每週至少休息一日**。
- 第 41 條：加班每日一般不超過 1 小時、特殊不超過 3 小時、每月不超過 36 小時。
- 第 44 條：加班費 150% / 200% / **300%**。
- 第 90、91 條：違法延長工時的處罰與賠償。

## 勞動合同法

- 第 31 條：不得強迫或變相強迫勞動者加班。
- 第 85 條：未依法支付加班費，逾期加付 50%-100% 賠償金。

## 國務院規定

- 職工每日工作 **8 小時、每週工作 40 小時**。

## 帶薪年休假

滿 1 年不滿 10 年 **5 天**；滿 10 年不滿 20 年 **10 天**；滿 20 年 **15 天**。

> 官方來源：全國人大網、人社部。本站引用僅為普法參考。`,
    en: `## Constitution

**Article 43**: Workers of the People's Republic of China have the right to rest. The state develops facilities for rest and recuperation and prescribes working hours and leave systems for workers.

## Labor Law

- **Art. 36**: Daily work **no more than 8 hours**; weekly average **no more than 44 hours**.
- **Art. 38**: Employers must guarantee workers **at least one rest day per week**.
- **Art. 41**: Overtime generally max **1 hour/day**; in special cases max **3 hours/day** and **36 hours/month**.
- **Art. 44**: Overtime pay — 150% on weekdays, 200% on rest days (if no compensatory rest), **300% on statutory holidays**.
- **Arts. 90-91**: Penalties and compensation for unlawful extension of working hours.

## Labor Contract Law

- **Art. 31**: Employers must not force or covertly compel workers to work overtime.
- **Art. 85**: Failure to pay overtime wages → labor authority orders payment; late payment incurs **50%-100%** additional compensation.

## State Council Regulations

- **Art. 3**: **8 hours per day, 40 hours per week**.
- **Art. 6**: No unit or individual may extend working hours without authorization.

## Paid Annual Leave

Regulations on Paid Annual Leave, Art. 3: **5 days** for 1-10 years of service, **10 days** for 10-20, **15 days** for 20+.

> Official sources: NPC (npc.gov.cn) and MOHRSS (mohrss.gov.cn). For reference only — consult the official text.`,
    ja: `## 憲法

**第43条**：中華人民共和国の労働者には休息の権利がある。

## 労働法

- 第36条：1日**8時間以内**、週平均**44時間以内**。
- 第38条：**週に少なくとも1日**の休日。
- 第41条：時間外は原則1日1時間以内、特別な場合3時間以内、**月36時間以内**。
- 第44条：割増賃金 150% / 200% / **300%**。
- 第90・91条：違法な時間延長の罰則・賠償。

## 労働契約法

- 第31条：強制・事実上の強制残業の禁止。
- 第85条：残業代未払いは**50-100%**の追加賠償。

## 国務院規定

- **1日8時間・週40時間**。

## 有給年休

勤続1-10年 **5日**、10-20年 **10日**、20年以上 **15日**。

> 出典：全人代（npc.gov.cn）、人社部（mohrss.gov.cn）。参考用です。`,
    ko: `## 헌법

**제43조**: 중화인민공화국 노동자에게는 휴식권이 있다.

## 노동법

- 제36조: 1일 **8시간 이내**, 주 평균 **44시간 이내**.
- 제38조: **주 최소 1일** 휴식.
- 제41조: 연장근로 원칙 1일 1시간, 특별 3시간, **월 36시간 이내**.
- 제44조: 가산임금 150% / 200% / **300%**.
- 제90·91조: 위법한 시간 연장의 처벌·배상.

## 노동계약법

- 제31조: 강제·사실상 강제 잔업 금지.
- 제85조: 잔업비 미지급 시 **50-100%** 추가 배상.

## 국무원 규정

- **1일 8시간·주 40시간**.

## 유급연차

근속 1-10년 **5일**, 10-20년 **10일**, 20년 이상 **15일**.

> 출처: 전국인대(npc.gov.cn), 인력자원사회보장부(mohrss.gov.cn). 참고용입니다.`,
    de: `## Verfassung

**Art. 43**: Arbeiter haben das Recht auf Ruhe. Der Staat legt Arbeitszeiten und Urlaubssysteme fest.

## Arbeitsgesetz

- **Art. 36**: max. **8 Std./Tag**, Ø **44 Std./Woche**.
- **Art. 38**: mind. **ein Ruhetag pro Woche**.
- **Art. 41**: Überstunden max. 1 Std./Tag, in Sonderfällen 3 Std., **36 Std./Monat**.
- **Art. 44**: Zuschläge 150 % / 200 % / **300 %**.
- **Art. 90-91**: Sanktionen bei rechtswidriger Arbeitszeitverlängerung.

## Arbeitsvertragsgesetz

- **Art. 31**: keine erzwungene Überstundenarbeit.
- **Art. 85**: unbezahlte Überstunden → **50-100 %** zusätzliche Entschädigung.

## Staatsratsverordnung

- **8 Std./Tag, 40 Std./Woche**.

## Bezahlter Jahresurlaub

1-10 Jahre: **5 Tage**, 10-20: **10**, 20+: **15**.

> Quellen: NPC (npc.gov.cn), MOHRSS (mohrss.gov.cn). Nur zur Information.`,
    es: `## Constitución

**Art. 43**: Los trabajadores tienen derecho al descanso.

## Ley Laboral

- **Art. 36**: máx. **8 h/día**, Ø **44 h/semana**.
- **Art. 38**: al menos **un día de descanso por semana**.
- **Art. 41**: horas extra máx. 1 h/día, 3 h en casos especiales, **36 h/mes**.
- **Art. 44**: recargos 150 % / 200 % / **300 %**.
- **Arts. 90-91**: sanciones por prolongación ilegal.

## Ley de Contratos de Trabajo

- **Art. 31**: prohibición de forzar horas extra.
- **Art. 85**: horas extra impagadas → **50-100 %** de compensación adicional.

## Reglamento del Consejo de Estado

- **8 h/día, 40 h/semana**.

## Vacaciones anuales pagadas

1-10 años: **5 días**, 10-20: **10**, 20+: **15**.

> Fuentes: NPC (npc.gov.cn), MOHRSS (mohrss.gov.cn). Solo informativo.`,
    fr: `## Constitution

**Art. 43** : les travailleurs ont droit au repos.

## Code du travail

- **Art. 36** : max. **8 h/jour**, Ø **44 h/semaine**.
- **Art. 38** : au moins **un jour de repos par semaine**.
- **Art. 41** : heures sup. max. 1 h/jour, 3 h en cas spéciaux, **36 h/mois**.
- **Art. 44** : majorations 150 % / 200 % / **300 %**.
- **Arts. 90-91** : sanctions pour prolongation illégale.

## Code du travail (contrats)

- **Art. 31** : interdiction de forcer les heures sup.
- **Art. 85** : heures sup. impayées → **50-100 %** de compensation additionnelle.

## Règlement du Conseil d'État

- **8 h/jour, 40 h/semaine**.

## Congés annuels payés

1-10 ans : **5 jours**, 10-20 : **10**, 20+ : **15**.

> Sources : NPC (npc.gov.cn), MOHRSS (mohrss.gov.cn). Information uniquement.`,
  },
};

const resources = {
  tags: ['资源', '开源'],
  meta: {
    'zh-CN': ['资源库：项目、数据与维权渠道', '996.ICU / 955.WLB / 944.Life 相关开源项目、权威数据来源与劳动维权渠道汇总。'],
    'zh-Hant': ['資源庫：項目、數據與維權渠道', '996.ICU / 955.WLB / 944.Life 相關開源項目、權威數據來源與勞動維權渠道。'],
    en: ['Resources: Projects, Data & Rights Channels', 'Related open-source projects (996.ICU, 955.WLB, 944.Life), authoritative data sources and labor-rights channels.'],
    ja: ['リソース：プロジェクト・データ・権利相談窓口', '関連オープンソース（996.ICU、955.WLB、944.Life）、信頼できるデータ源、労働相談窓口。'],
    ko: ['자료: 프로젝트·데이터·권리 상담', '관련 오픈소스(996.ICU, 955.WLB, 944.Life), 신뢰할 수 있는 데이터 소스, 노동 상담 창구.'],
    de: ['Ressourcen: Projekte, Daten & Beratungsstellen', 'Verwandte Open-Source-Projekte (996.ICU, 955.WLB, 944.Life), Datenquellen und Beratungsstellen für Arbeitsrechte.'],
    es: ['Recursos: proyectos, datos y canales de derechos', 'Proyectos de código abierto relacionados (996.ICU, 955.WLB, 944.Life), fuentes de datos y canales de derechos laborales.'],
    fr: ['Ressources : projets, données et canaux de droits', 'Projets open source liés (996.ICU, 955.WLB, 944.Life), sources de données et canaux de droits du travail.'],
  },
  body: {
    'zh-CN': `## 相关开源项目

- **996.ICU**（github.com/996icu/996.ICU）：反 996 工作制运动的起源项目，GitHub 27 万+ star。
- **955.WLB**（github.com/formulahendry/955.WLB）：955 不加班的公司白名单，本站"955 公司"数据的种子来源。
- **944.Life**（github.com/formulahendry/944.Life）：四天工作制（944）公司名单。

## 权威数据来源

- **ILO**（国际劳工组织）：全球工时与劳动标准数据
- **OECD**：各国年均工时、休假统计
- **WHO**：工作与健康研究（长工时死亡风险）
- 国家统计局：中国工时数据

## 劳动维权渠道

- **12333**：全国人社服务热线（工时、加班费、社保投诉）
- **12345**：政务服务热线（转劳动监察）
- **劳动仲裁**：当地劳动人事争议仲裁委员会（免费申请）
- 证据留存：考勤记录、工资条、加班审批记录、工作群聊天

## 加入我们

本站 955.life 完全开源（GitHub: 955life/955.life）。你可以：提交公司名单、翻译内容、补充案例数据、报告问题 —— 让 955 从理想变成标准。`,
    'zh-Hant': `## 相關開源項目

- **996.ICU**：反 996 運動起源項目（27 萬+ star）。
- **955.WLB**：955 公司白名單，本站數據種子來源。
- **944.Life**：四天工作制（944）公司名單。

## 權威數據來源

- **ILO**：全球工時與勞動標準
- **OECD**：各國年均工時、休假統計
- **WHO**：工作與健康研究
- 國家統計局：中國工時數據

## 勞動維權渠道

- **12333**：人社服務熱線
- **12345**：政務服務熱線（轉勞動監察）
- **勞動仲裁**：當地仲裁委員會（免費申請）
- 證據：考勤、工資條、加班審批、工作群記錄

## 加入我們

955.life 完全開源（GitHub: 955life/955.life）。`,
    en: `## Related open-source projects

- **996.ICU** (github.com/996icu/996.ICU): the origin of the anti-996 movement, 270k+ stars.
- **955.WLB** (github.com/formulahendry/955.WLB): the 955 no-overtime company whitelist — seed data for this site.
- **944.Life** (github.com/formulahendry/944.Life): the four-day workweek (944) company list.

## Authoritative data sources

- **ILO**: global working-time and labor standards
- **OECD**: annual hours worked, leave statistics
- **WHO**: work & health research (long-hours mortality risk)
- China's National Bureau of Statistics: domestic hours data

## Labor-rights channels

- **12333**: national human-resources hotline (hours, overtime pay, social insurance)
- **12345**: government service hotline (routes to labor inspection)
- **Labor arbitration**: local labor-dispute committee (free to apply)
- Keep evidence: attendance records, payslips, overtime approvals, work chats

## Join us

955.life is fully open source (GitHub: 955life/955.life). Submit companies, translate content, contribute data — make 955 the standard.`,
    ja: `## 関連オープンソース

- **996.ICU**：反996運動の原点（27万+ star）。
- **955.WLB**：955企業ホワイトリスト（本サイトのデータ源）。
- **944.Life**：週休3日制（944）企業リスト。

## 信頼できるデータ

- **ILO**：世界の労働時間・労働基準
- **OECD**：各国の年間労働時間・休暇統計
- **WHO**：労働と健康研究
- 国家統計局：中国の労働時間データ

## 労働相談窓口

- **12333**：人社サービスホットライン
- **12345**：政府サービス（労働監察へ）
- **労働仲裁**：地域の労働争議仲裁委員会（無料）
- 証拠：勤怠記録、給与明細、残業承認、業務チャット

## 参加する

955.life は完全オープンソース（GitHub: 955life/955.life）。`,
    ko: `## 관련 오픈소스

- **996.ICU**: 반996 운동의 기원 (27만+ star).
- **955.WLB**: 955 기업 화이트리스트 (본 사이트 데이터 원천).
- **944.Life**: 주 4일제(944) 기업 목록.

## 신뢰할 수 있는 데이터

- **ILO**: 세계 노동시간·노동기준
- **OECD**: 각국 연간 노동시간·휴가 통계
- **WHO**: 노동과 건강 연구
- 국가통계국: 중국 노동시간 데이터

## 노동 권리 상담

- **12333**: 인사·사회보장 핫라인
- **12345**: 정부 서비스 (노동감찰 연결)
- **노동중재**: 지역 노동쟁의중재위원회 (무료)
- 증거: 근태기록, 급여명세서, 잔업 승인, 업무 채팅

## 참여하기

955.life는 완전 오픈소스입니다 (GitHub: 955life/955.life).`,
    de: `## Verwandte Open-Source-Projekte

- **996.ICU**: Ursprung der Anti-996-Bewegung (270k+ Stars).
- **955.WLB**: 955-Unternehmensliste — Seed-Daten dieser Seite.
- **944.Life**: 4-Tage-Woche-Unternehmensliste.

## Datenquellen

- **ILO**: globale Arbeitszeiten und Standards
- **OECD**: jährliche Arbeitszeiten, Urlaubsstatistik
- **WHO**: Arbeit-und-Gesundheit-Forschung
- Chinas Nationales Statistikbüro

## Beratungsstellen

- **12333**: Arbeits-Hotline (Stunden, Überstunden, Sozialversicherung)
- **12345**: Behördenhotline (→ Arbeitsinspektion)
- **Arbeitsschiedsgericht**: kostenlos beantragbar
- Beweise sichern: Stempelkarten, Lohnabrechnungen, Genehmigungen, Chats

## Mitmachen

955.life ist komplett Open Source (GitHub: 955life/955.life).`,
    es: `## Proyectos relacionados

- **996.ICU**: origen del movimiento anti-996 (270k+ estrellas).
- **955.WLB**: lista blanca 955 — datos semilla de este sitio.
- **944.Life**: lista de empresas de semana de 4 días.

## Fuentes de datos

- **OIT**: tiempo de trabajo y estándares globales
- **OCDE**: horas anuales y vacaciones
- **OMS**: investigación trabajo y salud
- Oficina Nacional de Estadística de China

## Canales de derechos laborales

- **12333**: línea de recursos humanos
- **12345**: línea de servicios gubernamentales (→ inspección laboral)
- **Arbitraje laboral**: gratuito
- Conserva pruebas: registros, nóminas, aprobaciones, chats

## Únete

955.life es 100 % código abierto (GitHub: 955life/955.life).`,
    fr: `## Projets open source liés

- **996.ICU** : origine du mouvement anti-996 (270 000+ étoiles).
- **955.WLB** : liste blanche 955 — données sources de ce site.
- **944.Life** : liste d'entreprises à semaine de 4 jours.

## Sources de données

- **OIT** : temps de travail et normes mondiales
- **OCDE** : heures annuelles, statistiques de congés
- **OMS** : recherche travail et santé
- Bureau national des statistiques de Chine

## Canaux de droits du travail

- **12333** : ligne RH (heures, heures sup., sécurité sociale)
- **12345** : ligne gouvernementale (→ inspection du travail)
- **Arbitrage du travail** : gratuit
- Conservez des preuves : pointages, fiches de paie, approbations, chats

## Rejoignez-nous

955.life est entièrement open source (GitHub : 955life/955.life).`,
  },
};

for (const [name, doc] of [['laws', laws], ['resources', resources]]) {
  for (const lang of Object.keys(doc.meta)) {
    const dir = join(ROOT, lang);
    mkdirSync(dir, { recursive: true });
    const [title, desc] = doc.meta[lang];
    const file = `${doc.body[lang]}\n`;
    writeFileSync(join(dir, `${name}.md`), fm(title, desc, doc.tags) + file);
    console.log(`wrote ${lang}/${name}.md`);
  }
}
console.log('done');
