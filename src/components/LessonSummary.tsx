import type { Lesson } from '../types'
import { programById } from '../data/programs'
import { storeName } from '../data/stores'
import { formatShortDate } from '../data/calendar'
import { ClockIcon, HeartIcon, ShopIcon, TeacherIcon } from './icons'
import { AssetImage } from './AssetImage'

/** Figma: 予約確認 / 予約完了 の block1 (140:558 / 344:1308) */
export function LessonSummary({ lesson }: { lesson: Lesson }) {
  const program = programById(lesson.programId)
  return (
    <div className="summary">
      <div className="summary__thumb">
        <AssetImage slot={`lessons/${program.image}`} alt={`${program.name}のレッスン風景`} />
      </div>
      <div className="summary__info">
        <p className="summary__title">
          <span>{program.name}</span>
          <span className="summary__rating">
            <HeartIcon size={14} color="var(--color-ink)" />
            {program.rating}
          </span>
        </p>
        <p className="summary__meta">
          <ClockIcon size={14} color="var(--color-ink)" />
          <span>
            {formatShortDate(lesson.date)}
            {lesson.start}~{lesson.end}
          </span>
          <span>({lesson.duration}分)</span>
        </p>
        <p className="summary__meta">
          <ShopIcon size={14} color="var(--color-ink)" />
          <span>{storeName(lesson.storeId)}</span>
        </p>
        <p className="summary__meta">
          <TeacherIcon size={14} color="var(--color-ink)" />
          <span>{lesson.instructor}</span>
        </p>
      </div>
    </div>
  )
}
