/**
 * アイコン一式。
 * Figma上ではSVGアセット（iconamoon / Material系）として配置されているが、
 * この環境からFigmaのアセットCDNへ出られないため、同じ線幅・同じ外形で
 * インラインSVGとして再構成している。外形サイズ(size)は各利用箇所の
 * Figma実寸（14 / 16 / 24 / 96px）をそのまま渡す。
 */
type IconProps = {
  size?: number
  className?: string
  color?: string
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
})

export function MenuIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function BellIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 3.2a5.4 5.4 0 0 0-5.4 5.4v3.1c0 .9-.33 1.77-.93 2.44l-.73.82c-.5.56-.1 1.44.65 1.44h12.82c.75 0 1.15-.88.65-1.44l-.73-.82a3.66 3.66 0 0 1-.93-2.44V8.6A5.4 5.4 0 0 0 12 3.2Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M10 19.2a2.1 2.1 0 0 0 4 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function ClockIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.4" />
      <path d="M12 7.2V12l3.2 2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ShopIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 4h16l1 4.2a2.6 2.6 0 0 1-5.1.6 2.6 2.6 0 0 1-4.95 0 2.6 2.6 0 0 1-4.95 0A2.6 2.6 0 0 1 3 8.2L4 4Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M5 11.2V20h14v-8.8" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 20v-4.6h4V20" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

export function TeacherIcon({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="8" r="3.6" stroke={color} strokeWidth="1.3" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function HeartIcon({ size = 14, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 20.4s-8.2-4.9-8.2-10.3A4.6 4.6 0 0 1 12 7.1a4.6 4.6 0 0 1 8.2 3c0 5.4-8.2 10.3-8.2 10.3Z"
        fill={color}
      />
    </svg>
  )
}

export function ChevronRightIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronLeftIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M14.5 5.5 8 12l6.5 6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlusIcon({ size = 10, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 4.5v15M4.5 12h15" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CheckCircleIcon({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.4" />
      <path d="m8 12.2 2.8 2.8L16.2 9.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** 予約完了画面の96pxチェック（Figma: CheckIcon 334:1189） */
export function CompleteCheckIcon({ size = 96, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className} aria-hidden focusable="false">
      <circle cx="48" cy="48" r="48" fill="var(--color-success)" />
      <path
        d="M28 49.5 41.5 63 68 34"
        stroke="var(--color-cream)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

