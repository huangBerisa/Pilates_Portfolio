/**
 * Footer bar（Figma: Navigation / Bottom 321:1741）専用アイコン。
 * Figma では Normal（線）/ hover（塗り）の2バリアントを持つため、
 * active で塗りに切り替わるようにしている。外形は 24px 固定。
 */
type NavIconProps = {
  size?: number
  active?: boolean
  color?: string
}

const svg = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: 'false' as const,
})

/** Icon/home 231:1577 */
export function HomeNavIcon({ size = 24, active, color = 'currentColor' }: NavIconProps) {
  const d = 'M12 3.4 3.6 10v10.1h5.9v-5.6h5v5.6h5.9V10L12 3.4Z'
  return (
    <svg {...svg(size)} fill="none">
      <path d={d} fill={active ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

/** Icon/Calendar 231:1583 */
export function CalendarNavIcon({ size = 24, active, color = 'currentColor' }: NavIconProps) {
  return (
    <svg {...svg(size)} fill="none">
      <rect
        x="3.4"
        y="5.4"
        width="17.2"
        height="15.2"
        rx="2.4"
        fill={active ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M3.4 10h17.2" stroke={active ? 'var(--color-accent)' : color} strokeWidth="1.5" />
      <path d="M8 3.4v3.4M16 3.4v3.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <g fill={active ? 'var(--color-accent)' : color}>
        <rect x="6.6" y="12.4" width="3" height="2.4" rx="0.6" />
        <rect x="10.5" y="12.4" width="3" height="2.4" rx="0.6" />
        <rect x="14.4" y="12.4" width="3" height="2.4" rx="0.6" />
        <rect x="6.6" y="16" width="3" height="2.4" rx="0.6" />
        <rect x="10.5" y="16" width="3" height="2.4" rx="0.6" />
      </g>
    </svg>
  )
}

/** Icon/Report 231:1604（右下が折れたレポート用紙） */
export function ReportNavIcon({ size = 24, active, color = 'currentColor' }: NavIconProps) {
  return (
    <svg {...svg(size)} fill="none">
      <path
        d="M4.8 3.4h9.4l5 5v12.2H4.8V3.4Z"
        fill={active ? color : 'none'}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14.2 3.4v5h5" stroke={active ? 'var(--color-accent)' : color} strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M7.8 12.6h8M7.8 15.8h5.4"
        stroke={active ? 'var(--color-accent)' : color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Icon/UseAndEarn 231:1593（ポイントコインが2枚重なった形） */
export function PointNavIcon({ size = 24, active, color = 'currentColor' }: NavIconProps) {
  return (
    <svg {...svg(size)} fill="none">
      <circle cx="15.4" cy="15.4" r="6.1" fill={active ? color : 'none'} stroke={color} strokeWidth="1.5" />
      <circle cx="9.2" cy="9.2" r="6.1" fill={active ? color : 'var(--color-accent)'} stroke={color} strokeWidth="1.5" />
      <path
        d="M7.6 12.4V6.2h2a2 2 0 1 1 0 4h-2"
        stroke={active ? 'var(--color-accent)' : color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Icon/MembershipCard 233:1491（25×20 の会員証カード） */
export function MemberCardIcon({ size = 25, color = 'currentColor' }: NavIconProps) {
  return (
    <svg width={size} height={(size / 25) * 20} viewBox="0 0 25 20" fill="none" aria-hidden focusable="false">
      <rect x="0.9" y="0.9" width="23.2" height="18.2" rx="2.6" stroke={color} strokeWidth="1.6" />
      <circle cx="8" cy="7.8" r="2.5" fill={color} />
      <path d="M4.2 15c0.5-2.1 2-3.2 3.8-3.2s3.3 1.1 3.8 3.2H4.2Z" fill={color} />
      <path d="M15 6.6h6M15 10h6M15 13.4h4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
