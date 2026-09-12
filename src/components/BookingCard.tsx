import type { Lesson } from '../types'
import { programById } from '../data/programs'
import { storeName } from '../data/stores'
import { TODAY, addDays, formatShortDate } from '../data/calendar'
import { ClockIcon, HeartIcon, ShopIcon, TeacherIcon } from './icons'
import { AssetImage } from './AssetImage'
import { Button } from './Button'
import { ChipsTag } from './ChipsTag'

type Props = {
  lesson: Lesson
  reserved?: boolean
  /** 予約枠が上限に達しているか（Figma: 1件/3件） */
  disabled?: boolean
  onDetail: () => void
  onReserve: () => void
  onCancel?: () => void
}

const dateChip = (date: string) => {
  if (date === TODAY) return '今日'
  if (date === addDays(TODAY, 1)) return '明日'
  return null
}

/** Figma: Card / Booking Card (125:495 / 156:996) */
export function BookingCard({ lesson, reserved, disabled, onDetail, onReserve, onCancel }: Props) {
  const program = programById(lesson.programId)
  const chip = dateChip(lesson.date)
  const soldOut = lesson.capacityLeft === 0 && !reserved

  return (
    <article className={`booking-card${reserved ? ' booking-card--reserved' : ''}`}>
      {/* Figmaでは予約済み・満席など状態のあるカードだけがチップ行を表示する */}
      {(reserved || soldOut) && (
        <div className="booking-card__chips">
          {reserved && <ChipsTag tone="success">予約済</ChipsTag>}
          {soldOut && <ChipsTag tone="success">満席</ChipsTag>}
          {chip && <ChipsTag selected>{chip}</ChipsTag>}
        </div>
      )}

      <div className="booking-card__body">
        <div className="booking-card__thumb">
          <AssetImage slot={`lessons/${program.image}`} alt={`${program.name}のレッスン風景`} />
        </div>

        <div className="booking-card__info">
          <p className="booking-card__title">
            <span>{program.name}</span>
            <span className="booking-card__rating">
              <HeartIcon size={14} color="var(--color-ink)" />
              {program.rating}
            </span>
          </p>

          <p className="booking-card__meta">
            <ClockIcon size={16} color="var(--color-ink)" />
            <span>
              {formatShortDate(lesson.date)}
              {lesson.start}~{lesson.end}
            </span>
            <span>({lesson.duration}分)</span>
          </p>

          <p className="booking-card__meta">
            <ShopIcon size={16} color="var(--color-ink)" />
            <span>{storeName(lesson.storeId)}</span>
          </p>

          <p className="booking-card__meta">
            <TeacherIcon size={16} color="var(--color-ink)" />
            <span>{lesson.instructor}</span>
          </p>
        </div>
      </div>

      <div className="booking-card__actions">
        <Button variant="outline" onClick={onDetail}>
          レッスン詳細
        </Button>
        {reserved ? (
          <Button variant="soft" onClick={onCancel}>
            予約キャンセル
          </Button>
        ) : (
          <Button variant="primary" leading="◎" onClick={onReserve} disabled={disabled || soldOut}>
            {soldOut ? '満席' : '予約する'}
          </Button>
        )}
      </div>
    </article>
  )
}
