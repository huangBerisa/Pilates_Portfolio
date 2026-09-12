import { useBooking, type SearchMode } from '../state/BookingContext'
import { AppHeader } from '../components/AppHeader'
import { BookingCard } from '../components/BookingCard'
import { SegmentedControl, type Segment } from '../components/SegmentedControl'
import { ChipsTag, ChipsTagAdd } from '../components/ChipsTag'
import { WeekSelector } from '../components/WeekSelector'
import { DateCardGroup } from '../components/DateCardGroup'
import { STORES } from '../data/stores'
import { buildWeek, formatWeekRange } from '../data/calendar'
import { MAX_RESERVATIONS } from '../data/notice'

const SEARCH_MODES: Segment[] = [
  { value: 'favorite', label: 'お気に入り店舗から探す' },
  { value: 'all', label: '全店舗から探す' },
  { value: 'condition', label: '組み合わせ条件で探す' },
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
    selectStore,
    lessonsOn,
    openConfirm,
    cancelReservation,
    isReserved,
    isFull,
    goHome,
    showToast,
  } = useBooking()

  const week = buildWeek(weekStart)
  const lessons = lessonsOn(selectedDate)

  return (
    <div className="screen screen-enter">
      <AppHeader title="レッスン予約" onMenu={goHome} />

      <section className="block gutter">
        <SegmentedControl
          segments={SEARCH_MODES}
          value={searchMode}
          onChange={(value) => setSearchMode(value as SearchMode)}
          ariaLabel="探し方を選ぶ"
        />

        <div className="filter-row filter-row--wrap" role="radiogroup" aria-label="店舗で絞り込む">
          <ChipsTag selected={storeFilter === null} onClick={() => selectStore(null)}>
            すべて
          </ChipsTag>
          {STORES.map((store) => (
            <ChipsTag key={store.id} selected={storeFilter === store.id} onClick={() => selectStore(store.id)}>
              {store.name}
            </ChipsTag>
          ))}
          <ChipsTagAdd onClick={() => showToast('店舗追加はこのプロトタイプの対象外です')} />
        </div>
      </section>

      <WeekSelector
        label={formatWeekRange(weekStart)}
        onPrev={() => shiftWeek(-1)}
        onNext={() => shiftWeek(1)}
      />

      <DateCardGroup dates={week} selected={selectedDate} onSelect={setSelectedDate} />

      <section className="block gutter">
        {lessons.length === 0 ? (
          <p className="empty">この日に開講しているレッスンはありません。</p>
        ) : (
          <ul className="card-list">
            {lessons.map((lesson) => {
              const reserved = isReserved(lesson.id)
              return (
                <li key={lesson.id}>
                  <BookingCard
                    lesson={lesson}
                    reserved={reserved}
                    disabled={isFull}
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

      <div className="screen__tail" />
    </div>
  )
}
