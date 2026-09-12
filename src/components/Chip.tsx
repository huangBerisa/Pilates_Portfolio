import type { ReactNode } from 'react'
import { PlusIcon } from './icons'

type Props = {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
}

/** 絞り込み用チップ。Figma: ChipsTag (167:949) */
export function Chip({ children, selected, onClick }: Props) {
  const className = `chip${selected ? ' is-selected' : ''}`
  if (!onClick) return <span className={className}>{children}</span>
  return (
    <button type="button" className={className} onClick={onClick} aria-pressed={Boolean(selected)}>
      {children}
    </button>
  )
}

/** Figma: ChipsTagPuls (182:1411) */
export function ChipAdd({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="chip chip--add" onClick={onClick}>
      <PlusIcon size={10} color="currentColor" />
      店舗を追加
    </button>
  )
}

/**
 * 状態チップ。仕様書 §10.3「禁止只依靠顏色判斷狀態」に従い、
 * 色だけでなく必ず文字で状態を示す。
 */
export function StatusChip({ tone, children }: { tone: 'reserved' | 'full' | 'today'; children: ReactNode }) {
  return <span className={`chip chip--status chip--${tone}`}>{children}</span>
}
