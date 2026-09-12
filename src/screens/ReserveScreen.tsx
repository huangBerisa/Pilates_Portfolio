import { useBooking, type SearchMode } from '../state/BookingContext'
import { AppHeader } from '../components/AppHeader'
import { LessonCard } from '../components/LessonCard'
import { SegmentedControl, type Segment } from '../components/SegmentedControl'
import { Chip, ChipAdd } from '../components/Chip'
import { WeekSelector } from '../components/WeekSelector'
import { DateCardGroup } from '../components/DateCardGroup'
import { STORES } from '../data/stores'
import { buildWeek, formatShortDate, formatWeekRange } from '../data/calendar'
import { MAX_RESERVATIONS } from '../data/notice'

const SEARCH_MODES: Segment[] = [
  { value: 'favorite', label: 'お気に入り店舗' },
  { value: 'all', label: '全店舗' },
  { value: 'condition', label: '条件で探す' },
]

/** Figma: カレンダー (182:1024) */
export function ReserveScreen() {
  const {
    weekStart,
    selectedDate,
    setSelectedDate,
    shiftWeek,
    searchMode,
    setSearchMode,
    storeFilter,
    toggleStore,
    clearStoreFilter,
    lessonsOn,
    openConfirm,
    cancelReservation,
    isReserved,
    isFull,
    reservations,
    goHome,
    showToast,
  } = useBooking()

  const week = buildWeek(weekStart)
  const lessons = lessonsOn(selectedDate)

  return (
    <div className="screen screen-enter">
      <AppHeader title="レッスン予約" onMenu={goHome} />

      <section className="section">
        <div className="gutter">
          <SegmentedControl
            segments={SEARCH_MODES}
            value={searchMode}
            onChange={(value) => setSearchMode(value as SearchMode)}
            ariaLabel="探し方を選ぶ"
          />
        </div>

        <div className="filter-row gutter">
          <Chip selected={storeFilter.length === 0} onClick={clearStoreFilter}>
            すべての店舗
          </Chip>
          {STORES.map((store) => (
            <Chip key={store.id} selected={storeFilter.includes(store.id)} onClick={() => toggleStore(store.id)}>
              {store.name}
            </Chip>
          ))}
          <ChipAdd onClick={() => showToast('店舗追加はこのプロトタイプの対象外です')} />
        </div>

        <WeekSelector label={formatWeekRange(weekStart)} onPrev={() => shiftWeek(-1)} onNext={() => shiftWeek(1)} />
        <DateCardGroup dates={week} selected={selectedDate} onSelect={setSelectedDate} />
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">{formatShortDate(selectedDate)} のレッスン</h2>
          <p className="slots__counter">
            <span>
              予約 {reservations.length} / {MAX_RESERVATIONS}件
            </span>
          </p>
        </div>

        {lessons.length === 0 ? (
          <p className="empty-note">
            この日に開講しているレッスンはありません。
            <br />
            別の日付をお選びください。
          </p>
        ) : (
          <ul className="card-list">
            {lessons.map((lesson) => {
              const reserved = isReserved(lesson.id)
              return (
                <li key={lesson.id}>
                  <LessonCard
                    lesson={lesson}
                    reserved={reserved}
                    limitReached={isFull}
                    onDetail={() => openConfirm(lesson.id, true)}
                    onReserve={() =>
                      isFull ? showToast(`ご予約は${MAX_RESERVATIONS}件までです`) : openConfirm(lesson.id)
                    }
                    onCancel={() => cancelReservation(lesson.id)}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
