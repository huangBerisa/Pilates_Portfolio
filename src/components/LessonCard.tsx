import type { Lesson } from '../types'
import { programById } from '../data/programs'
import { storeName } from '../data/stores'
import { TODAY, addDays, formatShortDate } from '../data/calendar'
import { ClockIcon, ShopIcon, TeacherIcon } from './icons'
import { AssetImage } from './AssetImage'
import { Button } from './Button'
import { StatusChip } from './Chip'
import { Difficulty } from './Difficulty'

type Props = {
  lesson: Lesson
  reserved?: boolean
  /** 予約枠が上限に達している */
  limitReached?: boolean
  onDetail: () => void
  onReserve: () => void
  onCancel?: () => void
}

const dayChip = (date: string) => {
  if (date === TODAY) return '今日'
  if (date === addDays(TODAY, 1)) return '明日'
  return null
}

/**
 * Course Card（仕様書 §10.3 / Figma: Card / Booking Card 125:495）
 *
 * Proximity（§2.4）に従い3グループに分けている:
 *   1. 識別情報  … 画像・レッスン名・担当
 *   2. 受講条件  … 日時・所要時間・難易度・店舗
 *   3. 行動      … CTA
 * CTA は1カードにつき primary 1つだけ。詳細は文字リンク（§Rule 4）。
 */
export function LessonCard({ lesson, reserved, limitReached, onDetail, onReserve, onCancel }: Props) {
  const program = programById(lesson.programId)
  const chip = dayChip(lesson.date)
  const soldOut = lesson.capacityLeft === 0 && !reserved

  return (
    <article className="lesson-card">
      {/* 状態チップは独立した行に置く。カードごとに画像とレッスン名の
          基線がずれないようにするため（仕様書 §2.3 Alignment） */}
      {(reserved || soldOut || chip) && (
        <div className="lesson-card__status">
          {reserved && <StatusChip tone="reserved">予約済み</StatusChip>}
          {soldOut && <StatusChip tone="full">満席</StatusChip>}
          {chip && <StatusChip tone="today">{chip}</StatusChip>}
        </div>
      )}

      <div className="lesson-card__identity">
        <div className="lesson-card__thumb">
          <AssetImage slot={`lessons/${program.image}`} alt={`${program.name}のレッスン風景`} />
        </div>

        <div className="lesson-card__headline">
          <h3 className="lesson-card__name">{program.name}</h3>
          <p className="lesson-card__instructor">
            <TeacherIcon size={14} color="currentColor" /> {lesson.instructor}
          </p>
        </div>
      </div>

      <div className="lesson-card__conditions">
        <p className="meta-row">
          <ClockIcon size={16} color="currentColor" />
          <time className="tabular">
            {formatShortDate(lesson.date)} {lesson.start}–{lesson.end}
          </time>
          <span className="meta-sep">|</span>
          <span className="tabular">{lesson.duration}分</span>
        </p>
        <p className="meta-row">
          <ShopIcon size={16} color="currentColor" />
          <span>{storeName(lesson.storeId)}</span>
          <span className="meta-sep">|</span>
          <Difficulty level={program.level} />
        </p>
      </div>

      <div className="lesson-card__actions">
        <Button variant="quiet" onClick={onDetail}>
          詳細を見る
        </Button>
        {reserved ? (
          <Button variant="secondary" onClick={onCancel}>
            予約を取り消す
          </Button>
        ) : (
          <Button variant="primary" onClick={onReserve} disabled={soldOut || limitReached}>
            {soldOut ? '満席' : '予約する'}
          </Button>
        )}
      </div>
    </article>
  )
}
