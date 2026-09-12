import { BookingProvider, useBooking } from './state/BookingContext'
import { HomeScreen } from './screens/HomeScreen'
import { ReserveScreen } from './screens/ReserveScreen'
import { ConfirmScreen } from './screens/ConfirmScreen'
import { CompleteScreen } from './screens/CompleteScreen'
import { Toast } from './components/Toast'

function Router() {
  const { nav, toast } = useBooking()

  return (
    <div className="device">
      <div className="device__scroll" key={`${nav.screen}-${'lessonId' in nav ? nav.lessonId : ''}`}>
        {nav.screen === 'home' && <HomeScreen />}
        {nav.screen === 'reserve' && <ReserveScreen />}
        {nav.screen === 'confirm' && <ConfirmScreen lessonId={nav.lessonId} readOnly={nav.readOnly} />}
        {nav.screen === 'complete' && <CompleteScreen lessonId={nav.lessonId} />}
      </div>
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
