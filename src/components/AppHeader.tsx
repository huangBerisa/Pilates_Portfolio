import { BellIcon, LogoMark, MenuIcon } from './icons'
import { StatusBar } from './StatusBar'

type Props = {
  /** 文字列を渡すとロゴの代わりにタイトルを表示（Figma: カレンダー画面の「レッスン予約」） */
  title?: string
  onMenu?: () => void
  onBell?: () => void
}

/** Figma: HeadBg (335:1239 / 182:1025) */
export function AppHeader({ title, onMenu, onBell }: Props) {
  return (
    <header className="appbar">
      <StatusBar />
      <div className="appbar__row">
        <button type="button" className="appbar__icon" onClick={onMenu} aria-label="メニューを開く">
          <MenuIcon size={24} color="var(--color-icon)" />
        </button>

        {title ? (
          <h1 className="appbar__title">{title}</h1>
        ) : (
          <p className="logo" aria-label="LINEA">
            <LogoMark size={32} />
            <span aria-hidden>LINEA</span>
          </p>
        )}

        {title ? (
          <span className="appbar__icon" aria-hidden />
        ) : (
          <button type="button" className="appbar__icon" onClick={onBell} aria-label="お知らせを開く">
            <BellIcon size={24} color="var(--color-icon)" />
          </button>
        )}
      </div>
    </header>
  )
}
