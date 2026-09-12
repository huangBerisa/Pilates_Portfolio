import { useBooking } from '../state/BookingContext'
import { StatusBar } from '../components/StatusBar'
import { SectionHeader } from '../components/SectionHeader'
import { LessonSummary } from '../components/LessonSummary'
import { Button } from '../components/Button'
import { CloseIcon, CompleteCheckIcon } from '../components/icons'
import { lessonById } from '../data/lessons'
import { programById } from '../data/programs'

/** Figma: 予約完了画面 (332:1832) */
export function CompleteScreen({ lessonId }: { lessonId: string }) {
  const { goHome } = useBooking()
  const lesson = lessonById(lessonId)
  if (!lesson) return null
  const program = programById(lesson.programId)

  return (
    <div className="screen screen-enter sheet-screen">
      <StatusBar />

      <div className="sheet">
        <div className="sheet__head">
          <h1>予約完了</h1>
          <button type="button" className="sheet__close" onClick={goHome} aria-label="閉じる">
            <CloseIcon size={20} color="currentColor" />
          </button>
        </div>

        <div className="sheet__body">
          <div className="complete">
            <CompleteCheckIcon size={72} />
            <p className="complete__title">予約が完了しました</p>
            <p className="complete__text">
              ご予約を受け付けました。
              <br />
              当日はレッスン開始10分前までにお越しください。
            </p>
          </div>

          <hr className="rule" />

          <div className="sheet__block">
            <SectionHeader>ご予約内容</SectionHeader>
            <LessonSummary lesson={lesson} />
          </div>

          <div className="sheet__block">
            <SectionHeader>持ち物</SectionHeader>
            <ul className="item-list">
              {program.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <Button variant="primary" block onClick={goHome}>
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
