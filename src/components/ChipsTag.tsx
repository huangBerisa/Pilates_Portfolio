import type { ReactNode } from 'react'
import { PlusIcon } from './icons'

type Props = {
  children: ReactNode
  selected?: boolean
  /** 予約済みなど、状態表示用のゴースト表現（Figma: ChipsTag/Closed） */
  tone?: 'default' | 'success'
  onClick?: () => void
}

/**
 * Figma: ChipsTag (167:949 / 349:1479)
 * 店舗の絞り込みは単一選択なので、押せるチップは radio として扱う。
 */
export function ChipsTag({ children, selected, tone = 'default', onClick }: Props) {
  const className = `chip${selected ? ' chip--selected' : ''}${tone === 'success' ? ' chip--success' : ''}`
  if (!onClick) return <span className={className}>{children}</span>
  return (
    <button type="button" role="radio" aria-checked={Boolean(selected)} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

/** Figma: ChipsTagPuls (182:1411) */
export function ChipsTagAdd({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="chip chip--add" onClick={onClick}>
      <PlusIcon size={10} color="var(--color-primary)" />
      店舗を追加
    </button>
  )
}
