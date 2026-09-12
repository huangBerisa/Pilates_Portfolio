import { useRef } from 'react'
import { BookingProvider, useBooking } from './state/BookingContext'
import { DEVICE, useStageFit } from './useStageFit'
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
  const titleRef = useRef<HTMLParagraphElement>(null)
  const { scale, fullBleed } = useStageFit(titleRef)

  return (
    <BookingProvider>
      <div
        className={`stage${fullBleed ? ' stage--full' : ''}`}
        style={
          {
            '--device-w': `${DEVICE.width}px`,
            '--device-h': `${DEVICE.height}px`,
            '--device-radius': `${DEVICE.radius}px`,
            '--device-scale': scale,
          } as React.CSSProperties
        }
      >
        <p className="stage__title" ref={titleRef}>
          <strong>LINEA</strong>
          ピラティス予約 UI 再設計プロトタイプ
          <span className="stage__spec">iPhone 17 — 402 × 874 pt</span>
        </p>
        {/* transform で縮小するため、実際に占める面積は外側のラッパーで確保する */}
        <div className="device-slot">
          <Router />
        </div>
      </div>
    </BookingProvider>
  )
}
