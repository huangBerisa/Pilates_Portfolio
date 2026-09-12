import { useRef } from 'react'
import { BookingProvider, useBooking, type TabName } from './state/BookingContext'
import { DEVICE, useStageFit } from './useStageFit'
import { HomeScreen } from './screens/HomeScreen'
import { ReserveScreen } from './screens/ReserveScreen'
import { ConfirmScreen } from './screens/ConfirmScreen'
import { CompleteScreen } from './screens/CompleteScreen'
import { TabPlaceholderScreen } from './screens/TabPlaceholderScreen'
import { BottomNav } from './components/BottomNav'
import { Toast } from './components/Toast'

function TabScreen({ tab }: { tab: TabName }) {
  if (tab === 'home') return <HomeScreen />
  if (tab === 'reserve') return <ReserveScreen />
  return <TabPlaceholderScreen tab={tab} />
}

function Router() {
  const { nav, activeTab, toast } = useBooking()
  // 予約確認・予約完了はポップアップ。下のタブ画面はそのまま残す
  const overlay = nav.screen === 'confirm' || nav.screen === 'complete' ? nav : null

  return (
    <div className="device">
      <div className="device__scroll device__scroll--with-nav" key={activeTab}>
        <TabScreen tab={activeTab} />
      </div>
      <BottomNav />

      {overlay?.screen === 'confirm' && (
        <ConfirmScreen lessonId={overlay.lessonId} readOnly={overlay.readOnly} />
      )}
      {overlay?.screen === 'complete' && <CompleteScreen lessonId={overlay.lessonId} />}

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
