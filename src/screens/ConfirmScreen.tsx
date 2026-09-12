import { useBooking } from '../state/BookingContext'
import { SectionHeader } from '../components/SectionHeader'
import { LessonSummary } from '../components/LessonSummary'
import { Button } from '../components/Button'
import { CloseIcon } from '../components/icons'
import { lessonById } from '../data/lessons'
import { programById } from '../data/programs'
import { BOOKING_NOTICE } from '../data/notice'

type Props = {
  lessonId: string
  /** レッスン詳細としての閲覧（予約ボタンを出さない） */
  readOnly?: boolean
}

/** Figma: 予約する確認画面 (140:547) */
export function ConfirmScreen({ lessonId, readOnly }: Props) {
  const { reserve, goHome, isReserved, isFull, showToast } = useBooking()
  const lesson = lessonById(lessonId)

  if (!lesson) {
    return (
      <div className="screen screen-enter">
        <p className="empty">レッスンが見つかりませんでした。</p>
      </div>
    )
  }

  const program = programById(lesson.programId)
  const alreadyReserved = isReserved(lesson.id)
  const showAction = !readOnly && !alreadyReserved

  return (
    <div className="screen screen-enter sheet-screen">


      <div className="sheet">
        <div className="sheet__head">
          <button type="button" className="sheet__close" onClick={goHome} aria-label="閉じる">
            <CloseIcon size={24} color="var(--color-ink)" />
          </button>
          <h1>{readOnly || alreadyReserved ? 'レッスン詳細' : '予約内容確認'}</h1>
        </div>

        <div className="sheet__body">
          {showAction && <p className="sheet__lead">このレッスンを予約しますか？</p>}
          {alreadyReserved && <p className="sheet__lead">このレッスンは予約済みです</p>}

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
            {showAction ? (
              <Button
                variant="primary"
                leading="◎"
                disabled={isFull}
                onClick={() => (isFull ? showToast('ご予約は3件までです') : reserve(lesson.id))}
              >
                予約する
              </Button>
            ) : (
              <Button variant="outline" onClick={goHome}>
                ホーム画面に戻る
              </Button>
            )}
          </div>

          <hr className="rule" />

          <h2 className="sheet__subhead">ご注意事項</h2>
          <p className="sheet__notice">{BOOKING_NOTICE}</p>
        </div>
      </div>

      <div className="screen__tail" />
    </div>
  )
}
