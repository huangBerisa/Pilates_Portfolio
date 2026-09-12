import type { Lesson } from '../types'
import { programById } from '../data/programs'
import { storeName } from '../data/stores'
import { formatShortDate } from '../data/calendar'
import { ClockIcon, ShopIcon, TeacherIcon } from './icons'
import { AssetImage } from './AssetImage'
import { Difficulty } from './Difficulty'

/** Figma: 予約確認 / 予約完了 の block1 (140:558 / 344:1308) */
export function LessonSummary({ lesson }: { lesson: Lesson }) {
  const program = programById(lesson.programId)
  return (
    <div className="summary">
      <div className="summary__thumb">
        <AssetImage slot={`lessons/${program.image}`} alt={`${program.name}のレッスン風景`} />
      </div>
      <div className="summary__info">
        <p className="summary__name">{program.name}</p>
        <p className="meta-row">
          <TeacherIcon size={16} color="currentColor" />
          <span>{lesson.instructor}</span>
        </p>
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
    </div>
  )
}
