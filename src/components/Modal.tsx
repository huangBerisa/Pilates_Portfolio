import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  label: string
  onClose: () => void
  children: ReactNode
}

/**
 * 画面の上に重ねるポップアップ。
 * 下の画面（ホーム／予約カレンダー）はそのまま残し、スクリムで覆う。
 * 背景クリックと Esc で閉じられる。
 */
export function Modal({ label, onClose, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.focus()
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="modal"
      // mousedown で判定することで、パネル内から始まったドラッグで閉じないようにする
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal__panel" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} ref={panelRef}>
        {children}
      </div>
    </div>
  )
}
