import { useBooking, type TabName } from '../state/BookingContext'
import { CalendarNavIcon, HomeNavIcon, MemberCardIcon, PointNavIcon, ReportNavIcon } from './icons/nav'

type Item = {
  tab: TabName
  label: string
  Icon: typeof HomeNavIcon
}

/** 中央の会員証ボタンを挟んで左右2つずつ（Figma: Navigation_bg 322:1757 の空き） */
const LEFT: Item[] = [
  { tab: 'home', label: 'ホーム', Icon: HomeNavIcon },
  { tab: 'reserve', label: '予約', Icon: CalendarNavIcon },
]
const RIGHT: Item[] = [
  { tab: 'report', label: 'レポート', Icon: ReportNavIcon },
  { tab: 'points', label: '貯める・使う', Icon: PointNavIcon },
]

/**
 * Figma: Navigation / Bottom (321:1741)
 * 現在地は色・字重・上部インジケータの3点で示す（仕様書 §11 / §14）。
 */
export function BottomNav() {
  const { activeTab, goTab } = useBooking()

  const renderItem = ({ tab, label, Icon }: Item) => {
    const active = activeTab === tab
    return (
      <button
        key={tab}
        type="button"
        className={`bottom-nav__item${active ? ' is-active' : ''}`}
        onClick={() => goTab(tab)}
        aria-current={active ? 'page' : undefined}
      >
        <Icon size={24} />
        <span>{label}</span>
      </button>
    )
  }

  return (
    <nav className="bottom-nav" aria-label="メインメニュー">
      <div className="bottom-nav__group">{LEFT.map(renderItem)}</div>
      <div className="bottom-nav__notch" aria-hidden />
      <div className="bottom-nav__group">{RIGHT.map(renderItem)}</div>

      <button
        type="button"
        className={`bottom-nav__member${activeTab === 'member' ? ' is-active' : ''}`}
        onClick={() => goTab('member')}
        aria-current={activeTab === 'member' ? 'page' : undefined}
      >
        <MemberCardIcon size={22} />
        <span>会員証</span>
      </button>
    </nav>
  )
}
