import { BookingProvider, useBooking } from './state/BookingContext'
import { HomeScreen } from './screens/HomeScreen'
import { ReserveScreen } from './screens/ReserveScreen'
import { ConfirmScreen } from './screens/ConfirmScreen'
import { CompleteScreen } from './screens/CompleteScreen'
import { TabPlaceholderScreen } from './screens/TabPlaceholderScreen'
import { BottomNav } from './components/BottomNav'
import { Toast } from './components/Toast'

function Router() {
  const { nav, toast } = useBooking()
  // 予約確認・予約完了はシート表示のため Footer bar を出さない
  const showNav = nav.screen !== 'confirm' && nav.screen !== 'complete'

  return (
    <div className="device">
      <div
        className={`device__scroll${showNav ? ' device__scroll--with-nav' : ''}`}
        key={`${nav.screen}-${'lessonId' in nav ? nav.lessonId : ''}`}
      >
        {nav.screen === 'home' && <HomeScreen />}
        {nav.screen === 'reserve' && <ReserveScreen />}
        {nav.screen === 'member' && <TabPlaceholderScreen tab="member" />}
        {nav.screen === 'report' && <TabPlaceholderScreen tab="report" />}
        {nav.screen === 'points' && <TabPlaceholderScreen tab="points" />}
        {nav.screen === 'confirm' && <ConfirmScreen lessonId={nav.lessonId} readOnly={nav.readOnly} />}
        {nav.screen === 'complete' && <CompleteScreen lessonId={nav.lessonId} />}
      </div>
      {showNav && <BottomNav />}
      {toast && <Toast message={toast} />}
    </div>
  )
}

export default function App() {
  return (
    <BookingProvider>
      <div className="stage">
        <p className="stage__title">
          <strong>LINEA</strong>
          ピラティス予約 UI 再設計プロトタイプ
        </p>
        <Router />
      </div>
    </BookingProvider>
  )
}
