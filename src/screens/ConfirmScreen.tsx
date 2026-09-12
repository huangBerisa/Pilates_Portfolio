import { useBooking } from '../state/BookingContext'
import { StatusBar } from '../components/StatusBar'
import { SectionHeader } from '../components/SectionHeader'
import { LessonSummary } from '../components/LessonSummary'
import { Button } from '../components/Button'
import { CloseIcon } from '../components/icons'
import { lessonById } from '../data/lessons'
import { programById } from '../data/programs'
import { BOOKING_NOTICE, MAX_RESERVATIONS } from '../data/notice'

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
      <div className="screen screen-enter sheet-screen">
        <StatusBar />
        <p className="empty-note">
          レッスン情報を取得できませんでした。
          <br />
          時間をおいてもう一度お試しください。
        </p>
        <div className="gutter">
          <Button variant="secondary" block onClick={goHome}>
            ホームに戻る
          </Button>
        </div>
      </div>
    )
  }

  const program = programById(lesson.programId)
  const alreadyReserved = isReserved(lesson.id)
  const showAction = !readOnly && !alreadyReserved

  return (
    <div className="screen screen-enter sheet-screen">
      <StatusBar />

      <div className="sheet">
        <div className="sheet__head">
          <h1>{showAction ? '予約内容の確認' : 'レッスン詳細'}</h1>
          <button type="button" className="sheet__close" onClick={goHome} aria-label="閉じる">
            <CloseIcon size={20} color="currentColor" />
          </button>
        </div>

        <div className="sheet__body">
          {showAction && <p className="sheet__lead">このレッスンを予約しますか？</p>}
          {alreadyReserved && <p className="sheet__lead">このレッスンは予約済みです</p>}

          <div className="sheet__block">
            <SectionHeader>レッスン内容</SectionHeader>
            <LessonSummary lesson={lesson} />
          </div>

          <div className="sheet__block">
            <SectionHeader>レッスンについて</SectionHeader>
            <p className="sheet__text">{program.description}</p>
          </div>

          <div className="sheet__block">
            <SectionHeader>持ち物</SectionHeader>
            <ul className="item-list">
              {program.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* 1画面の主要アクションは1つだけ（仕様書 Rule 4） */}
          {showAction ? (
            <Button
              variant="primary"
              block
              disabled={isFull}
              onClick={() => (isFull ? showToast(`ご予約は${MAX_RESERVATIONS}件までです`) : reserve(lesson.id))}
            >
              このレッスンを予約する
            </Button>
          ) : (
            <Button variant="secondary" block onClick={goHome}>
              ホームに戻る
            </Button>
          )}

          <hr className="rule" />

          <div className="sheet__block">
            <SectionHeader>ご注意事項</SectionHeader>
            <p className="sheet__notice">{BOOKING_NOTICE}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
