// 全球劳动数据对比（2026 参考）
// 工时来源：OECD "Hours worked" 2023（theglobaleconomy/OECD 修订后口径）；中国非 OECD 成员，采用 ILO 建模估算（约 2195h/年）
// 法定带薪休假 = 法定年假 + 法定公共节假日（来源：各国劳动法与官方公共假日；英国 28 天已含公共假日；韩国/日本含替代假）
// 实际休假（实际休取的年假天数）来源：Expedia Vacation Deprivation Report 2023/2024、日本厚劳省「就労条件総合調査」(2024 平均取得 12.1 天)、美国 BLS Employee Benefits (2025)、及公开调查估算
export interface LaborStat {
  code: string;
  nameZh: string;
  nameEn: string;
  hours: number; // 年均工时（小时）
  leave: number; // 法定带薪休假 = 法定年假 + 法定公共节假日（天）
  actual: number; // 实际平均休假（年假使用天数，天，近似值）
  noteZh: string;
  noteEn: string;
}

export const laborStats: LaborStat[] = [
  { code: 'CN', nameZh: '中国', nameEn: 'China', hours: 2195, leave: 16, actual: 6, noteZh: '非 OECD 成员，ILO 估算约 2195 小时；统计局口径 2024 年周工时约 49h；法定带薪假 = 年假 5-15 天（最低档计）+ 11 天公共假日 = 16 天起；人社部 2024 调查人均实休 6.29 天，民企不足 4 天', noteEn: 'Not OECD; ~2,195h (ILO est.); NBS weekly avg ~49h; statutory = 5-15 days leave (lowest tier) + 11 holidays = 16+ days; MOHRSS 2024: avg 6.29 taken, <4 in private sector' },
  { code: 'MX', nameZh: '墨西哥', nameEn: 'Mexico', hours: 2207, leave: 20, actual: 14, noteZh: 'OECD 工时最高之一；2023 年新法法定年假首年 12 天起（原 6 天）+ 8 天公共假日 = 20 天；调查显示年假付与 16 天实际休 14 天', noteEn: 'Highest OECD hours; 2023 reform: 12 days leave from year one + 8 holidays = 20; 16 granted / 14 taken (survey)' },
  { code: 'KR', nameZh: '韩国', nameEn: 'South Korea', hours: 1896, leave: 30, actual: 12, noteZh: '曾长期高工时；法定带薪假 = 年假 15-25 天（最低档计）+ 15 天公共假日 = 30 天；2024 年假使用率升至 79.4%（文体部，实际约 12 天）', noteEn: 'Historically long hours; statutory = 15-25 days leave + 15 holidays = 30; 2024 usage rate rose to 79.4% (~12 taken, MCST)' },
  { code: 'US', nameZh: '美国', nameEn: 'United States', hours: 1705, leave: 11, actual: 11, noteZh: '联邦无强制带薪年假（年假 0 天）+ 11 天联邦公共假日 = 11 天；企业惯例 PTO 约 10-15 天，调查显示平均取 11 天', noteEn: 'No federal statutory leave (0) + 11 federal holidays = 11; typical PTO 10-15 days, ~11 taken (survey)' },
  { code: 'AU', nameZh: '澳大利亚', nameEn: 'Australia', hours: 1713, leave: 30, actual: 18, noteZh: '带薪假 4 周起步（20 天）+ 约 10 天公共假日 = 30 天；调查显示年假付与 21 天实际休 18 天', noteEn: '4 weeks minimum (20) + ~10 public holidays = 30; 21 granted / 18 taken (survey)' },
  { code: 'ES', nameZh: '西班牙', nameEn: 'Spain', hours: 1632, leave: 36, actual: 19, noteZh: '法定年假 22 个工作日（30 日历日）+ 14 天公共假日 = 36 天（工作日口径）；Factorial 2025：22 个工作日中实际取用约 19 天', noteEn: '22 working days leave (30 calendar days) + 14 holidays = 36 (working-day basis); Factorial 2025: ~19 of 22 working days actually taken' },
  { code: 'JP', nameZh: '日本', nameEn: 'Japan', hours: 1607, leave: 26, actual: 12, noteZh: '法定带薪假 = 年假 10-20 天（最低档计）+ 16 天公共假日 = 26 天；2024 年平均取得 12.1 天（取得率 66.9%，厚劳省），2019 年强制取得改革见效', noteEn: 'Statutory = 10-20 days leave + 16 holidays = 26; 12.1 taken (66.9% usage, MHLW 2024)' },
  { code: 'GB', nameZh: '英国', nameEn: 'United Kingdom', hours: 1524, leave: 28, actual: 25, noteZh: '法定带薪假 28 天 = 20 天年假 + 8 天公共假日（已含在内）；Expedia 2024 调查实际约休 25 天', noteEn: 'Statutory 28 = 20 days leave + 8 bank holidays (included); Expedia 2024: ~25 actually taken' },
  { code: 'FR', nameZh: '法国', nameEn: 'France', hours: 1487, leave: 36, actual: 29, noteZh: '35 小时工作制传统；法定带薪假 = 年假 25 天（5 周）+ 11 天公共假日 = 36 天，另有 RTT 补偿假；调查显示年假付与 31 天实际休 29 天', noteEn: '35-hour tradition; statutory = 25 days leave + 11 holidays = 36, plus RTT; 31 granted / 29 taken (survey)' },
  { code: 'SE', nameZh: '瑞典', nameEn: 'Sweden', hours: 1437, leave: 38, actual: 30, noteZh: '北欧福利标杆；法定带薪假 = 年假 25 天 + 约 13 天公共假日 = 38 天；年假基本休满（欧洲最高梯队）', noteEn: 'Nordic benchmark; statutory = 25 days leave + ~13 holidays = 38; leave almost fully used (top tier in Europe)' },
  { code: 'NL', nameZh: '荷兰', nameEn: 'Netherlands', hours: 1449, leave: 28, actual: 26, noteZh: '兼职文化盛行；法定带薪假 = 年假 20 天 + 约 8 天公共假日 = 28 天；Loket.nl 2024 调查实际年假约 26 天', noteEn: 'Strong part-time culture; statutory = 20 days leave + ~8 holidays = 28; Loket.nl 2024: ~26 leave actually taken' },
  { code: 'DE', nameZh: '德国', nameEn: 'Germany', hours: 1343, leave: 30, actual: 27, noteZh: '短工时高产出；法定带薪假 = 年假最低 20 天 + 9-13 天公共假日（州级，约 10 天计）= 30 天；集体协议付与 29-30 天、实际约休 27 天', noteEn: 'Short hours, high productivity; statutory = 20 days leave + 9-13 holidays (state-level, ~10) = 30; collective agreements 29-30, ~27 taken' },
];
