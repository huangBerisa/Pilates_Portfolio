import { useBooking } from '../state/BookingContext'
import { Modal } from '../components/Modal'
import { SectionHeader } from '../components/SectionHeader'
import { LessonSummary } from '../components/LessonSummary'
import { Button } from '../components/Button'
import { CloseIcon, CompleteCheckIcon } from '../components/icons'
import { lessonById } from '../data/lessons'
import { programById } from '../data/programs'

/** Figma: 予約完了画面 (332:1832) */
export function CompleteScreen({ lessonId }: { lessonId: string }) {
  const { goHome, closeOverlay } = useBooking()
  const lesson = lessonById(lessonId)
  if (!lesson) return null
  const program = programById(lesson.programId)

  return (
    <Modal label="予約完了" onClose={closeOverlay}>
      <div className="sheet">
        <div className="sheet__head">
          <button type="button" className="sheet__close" onClick={closeOverlay} aria-label="閉じる">
            <CloseIcon size={24} color="var(--color-ink)" />
          </button>
          <h1>予約完了</h1>
        </div>

        <div className="sheet__body">
          <div className="complete__icon">
            <CompleteCheckIcon size={96} />
          </div>
          <p className="complete__title">予約が完了しました</p>
          <p className="complete__text">
            ご予約を受け付けました。
            <br />
            ご予約内容をご確認ください。
          </p>

          <hr className="rule" />

          <h2 className="sheet__subhead">ご予約内容</h2>

          <SectionHeader>レッスン内容</SectionHeader>
          <LessonSummary lesson={lesson} />

          <SectionHeader>レッスン詳細</SectionHeader>
          <p className="sheet__text">{program.description}</p>

          <SectionHeader>持ち物</SectionHeader>
          <ul className="item-list">
            {program.items.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>

          <div className="sheet__action">
            <Button variant="primary" onClick={goHome}>
              ホーム画面に戻る
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
