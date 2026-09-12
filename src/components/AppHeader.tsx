import { BellIcon, MenuIcon } from './icons'
import { StatusBar } from './StatusBar'

const LOGO = `${import.meta.env.BASE_URL}images/logo.png`

type Props = {
  /** 渡すとロゴの代わりにタイトルを表示（Figma: カレンダー画面の「レッスン予約」） */
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
          <MenuIcon size={24} color="var(--color-ink)" />
        </button>

        {title ? (
          <h1 className="appbar__title">{title}</h1>
        ) : (
          // Figma: HeadBg/logo 361:1256（書き出し実寸 105×33）
          <img className="logo" src={LOGO} width={105} height={33} alt="LINEA" />
        )}

        {title ? (
          <span className="appbar__icon" aria-hidden />
        ) : (
          <button type="button" className="appbar__icon" onClick={onBell} aria-label="お知らせを開く">
            <BellIcon size={24} color="var(--color-ink)" />
          </button>
        )}
      </div>
    </header>
  )
}
