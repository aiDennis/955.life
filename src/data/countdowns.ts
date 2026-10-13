// 倒计时数据：只收录有可靠公开来源的日期。
// 2026 年放假安排来自《国务院办公厅关于2026年部分节假日安排的通知》（国办发明电〔2025〕7号，2025-11-04 发布）。
// 2027 年官方通知尚未发布，等公布后在官方页面更新；本页只放可核实的日期，不预测。
export interface CountdownItem {
  /** ISO 日期（假期开始当天 00:00，按 UTC+8 计算） */
  start: string;
  /** ISO 日期（假期最后一天） */
  end: string;
  /** 各语言名称 key，见 i18n/ui.ts cd_* 前缀 */
  key: string;
}

export const EU_FLR = {
  /** 条例 (EU) 2024/3015 于 2024-12-13 生效 */
  inForce: '2024-12-13',
  /** 2027-12-14 起全面适用（条例正文固定日期，不可变更） */
  applies: '2027-12-14',
  /** 欧盟委员会实施指南 + 单一门户 + 风险数据库（2026-06-26 已落地） */
  guidelines: '2026-06-26',
};

export const countdowns: CountdownItem[] = [
  { start: '2027-01-01', end: '2027-01-03', key: 'cd_newyear26' },
  { start: '2027-02-05', end: '2027-02-11', key: 'cd_cny27' },
  { start: '2027-04-05', end: '2027-04-05', key: 'cd_qingming27' },
  { start: '2027-05-01', end: '2027-05-02', key: 'cd_labor27' },
  { start: '2027-06-09', end: '2027-06-09', key: 'cd_dragon27' },
  { start: '2027-09-15', end: '2027-09-15', key: 'cd_midautumn27' },
  { start: '2027-10-01', end: '2027-10-03', key: 'cd_national27' },
];
