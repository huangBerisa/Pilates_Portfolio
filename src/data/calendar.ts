/**
 * デモの基準日。Figmaのアートボードが 2026/06/11(木) を「今日」として
 * 描かれているため、プロトタイプでも同じ日付を基準に固定する。
 */
export const TODAY = '2026-06-11'

const WEEKDAY_JP = ['日', '月', '火', '水', '木', '金', '土']

export const toDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const addDays = (iso: string, days: number) => {
  const d = toDate(iso)
  d.setDate(d.getDate() + days)
  return toIso(d)
}

export const weekdayJp = (iso: string) => WEEKDAY_JP[toDate(iso).getDay()]

/** 6/11(木) 形式 */
export const formatShortDate = (iso: string) => {
  const d = toDate(iso)
  return `${d.getMonth() + 1}/${d.getDate()}(${weekdayJp(iso)})`
}

/** 2026年6月11日 形式 */
export const formatLongDate = (iso: string) => {
  const d = toDate(iso)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

/** 2026年6月11日-17日 形式（週セレクタ） */
export const formatWeekRange = (startIso: string) => {
  const end = toDate(addDays(startIso, 6))
  const start = toDate(startIso)
  const head = `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日`
  return start.getMonth() === end.getMonth()
    ? `${head}-${end.getDate()}日`
    : `${head}-${end.getMonth() + 1}月${end.getDate()}日`
}

/** 2026/06/14 形式（コラム） */
export const formatSlashDate = (iso: string) => iso.replace(/-/g, '/')

export const buildWeek = (startIso: string) => Array.from({ length: 7 }, (_, i) => addDays(startIso, i))

/** 日付カード用。Figmaでは当日のみ「今日」、以降は曜日表記。 */
export const dayLabel = (iso: string) => (iso === TODAY ? '今日' : weekdayJp(iso))
