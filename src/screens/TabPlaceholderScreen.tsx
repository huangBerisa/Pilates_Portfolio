import type { TabName } from '../state/BookingContext'
import { useBooking } from '../state/BookingContext'
import { AppHeader } from '../components/AppHeader'
import { Button } from '../components/Button'
import { MemberCardIcon, PointNavIcon, ReportNavIcon } from '../components/icons/nav'

/**
 * 会員証 / レポート / 貯める・使う の3タブ。
 * Figma では Footer bar のアイコンとラベルまでが定義されており、
 * 画面そのものは今回の再設計スコープに含まれていないため、
 * 遷移先が無いボタンにせず「準備中」であることを明示する画面を置いている。
 */
const CONTENT: Record<Exclude<TabName, 'home' | 'reserve'>, { title: string; lead: string; Icon: typeof ReportNavIcon }> = {
  member: {
    title: '会員証',
    lead: '入店時にスタッフへ提示する会員証を表示します。',
    Icon: MemberCardIcon,
  },
  report: {
    title: 'レポート',
    lead: '受講回数や体の変化を振り返るレポートを表示します。',
    Icon: ReportNavIcon,
  },
  points: {
    title: '貯める・使う',
    lead: '受講で貯まったポイントの残高と使いみちを表示します。',
    Icon: PointNavIcon,
  },
}

export function TabPlaceholderScreen({ tab }: { tab: Exclude<TabName, 'home' | 'reserve'> }) {
  const { goTab } = useBooking()
  const { title, lead, Icon } = CONTENT[tab]

  return (
    <div className="screen screen-enter">
      <AppHeader title={title} onMenu={() => goTab('home')} />

      <div className="placeholder gutter">
        <div className="placeholder__panel">
          <span className="placeholder__icon">
            <Icon size={28} />
          </span>
          <p className="placeholder__lead">{lead}</p>
          <p className="placeholder__note">
            この画面は今回の再設計のスコープ外です。
            <br />
            Footer bar の導線のみ実装しています。
          </p>
          <Button variant="secondary" onClick={() => goTab('home')}>
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
