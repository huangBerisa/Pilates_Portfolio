/**
 * Footer bar（Figma: Navigation / Bottom 321:1741）専用アイコン。
 *
 * 仕様書 §8: 1画面では1種類のアイコンスタイルしか使えず、line と filled の
 * 混在は禁止。そのため選択状態でも塗りには切り替えず、色・字重・
 * 位置インジケータ（CSS の .bottom-nav__item.is-active::before）で示す。
 */
type NavIconProps = {
  size?: number
  color?: string
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
})

/** Icon/home 231:1577 */
export function HomeNavIcon({ size = 24 }: NavIconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 3.6 3.8 10.1v9.6a.7.7 0 0 0 .7.7h4.6v-5.3h5.8v5.3h4.6a.7.7 0 0 0 .7-.7v-9.6L12 3.6Z" />
    </svg>
  )
}

/** Icon/Calendar 231:1583 */
export function CalendarNavIcon({ size = 24 }: NavIconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3.6" y="5.4" width="16.8" height="15" rx="3" />
      <path d="M3.6 10h16.8M8.2 3.4v3.6M15.8 3.4v3.6" />
      <path d="M8 13.8h.01M12 13.8h.01M16 13.8h.01M8 17h.01M12 17h.01" />
    </svg>
  )
}

/** Icon/Report 231:1604 */
export function ReportNavIcon({ size = 24 }: NavIconProps) {
  return (
    <svg {...base(size)}>
      <path d="M5.2 4.6a1 1 0 0 1 1-1h7.6l5 5v10.8a1 1 0 0 1-1 1H6.2a1 1 0 0 1-1-1V4.6Z" />
      <path d="M13.8 3.6v5h5" />
      <path d="M8.4 13.2h7.2M8.4 16.4h4.6" />
    </svg>
  )
}

/** Icon/UseAndEarn 231:1593（ポイントコインが2枚重なった形） */
export function PointNavIcon({ size = 24 }: NavIconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="15.2" cy="15.2" r="5.8" />
      <circle cx="9" cy="9" r="5.8" />
      <path d="M7.6 12V6.3h2.1a1.9 1.9 0 0 1 0 3.8H7.6" />
    </svg>
  )
}

/** Icon/MembershipCard 233:1491（25×20 の会員証カード） */
export function MemberCardIcon({ size = 24 }: NavIconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="2.6" />
      <circle cx="8.6" cy="10.6" r="1.9" />
      <path d="M5.8 15.6c.5-1.5 1.6-2.3 2.8-2.3s2.3.8 2.8 2.3" />
      <path d="M14.8 9.8h3.8M14.8 12.6h3.8M14.8 15.4h2.4" />
    </svg>
  )
}
