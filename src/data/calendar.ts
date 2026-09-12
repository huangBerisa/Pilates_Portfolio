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

/**
 * 06/11(木) 形式。
 * Heuristic 04「日付は常に同じ書式」に従い、アプリ内の日付は
 * ここを通した MM/DD 表記に統一する（ゼロ埋めで桁が揃う）。
 */
export const formatShortDate = (iso: string) => {
  const d = toDate(iso)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}(${weekdayJp(iso)})`
}

/** 2026年6月11日 形式 */
export const formatLongDate = (iso: string) => {
  const d = toDate(iso)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

/** 2026/06/11 – 06/17 形式（週セレクタ）。MM/DD 表記に揃える */
export const formatWeekRange = (startIso: string) => {
  const start = toDate(startIso)
  const endIso = addDays(startIso, 6)
  const end = toDate(endIso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${start.getFullYear()}/${pad(start.getMonth() + 1)}/${pad(start.getDate())} – ${pad(
    end.getMonth() + 1,
  )}/${pad(end.getDate())}`
}

/** 2026/06/14 形式（コラム） */
export const formatSlashDate = (iso: string) => iso.replace(/-/g, '/')

export const buildWeek = (startIso: string) => Array.from({ length: 7 }, (_, i) => addDays(startIso, i))

/** 日付カード用。Figmaでは当日のみ「今日」、以降は曜日表記。 */
export const dayLabel = (iso: string) => (iso === TODAY ? '今日' : weekdayJp(iso))
