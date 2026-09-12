import { useState } from 'react'
import { useBooking } from '../state/BookingContext'
import { AppHeader } from '../components/AppHeader'
import { ReservationSlots } from '../components/ReservationSlots'
import { LessonCard } from '../components/LessonCard'
import { SegmentedControl, type Segment } from '../components/SegmentedControl'
import { Chip } from '../components/Chip'
import { ArticleCard } from '../components/ArticleCard'
import { AssetImage } from '../components/AssetImage'
import { Button } from '../components/Button'
import { ChevronRightIcon } from '../components/icons'
import { STORES } from '../data/stores'
import { ARTICLES } from '../data/articles'
import { MAX_RESERVATIONS } from '../data/notice'
import { TODAY, addDays, formatShortDate } from '../data/calendar'

const INITIAL_VISIBLE = 3

/**
 * ホーム。情報の並びは仕様書 §16 の推奨順:
 *   Header → 予約中（自分の状態） → 本週課程 → Promotion → コラム
 */
export function HomeScreen() {
  const {
    reservedLessons,
    selectedDate,
    setSelectedDate,
    storeFilter,
    toggleStore,
    clearStoreFilter,
    lessonsOn,
    openReserve,
    openConfirm,
    cancelReservation,
    isReserved,
    isFull,
    showToast,
  } = useBooking()

  const [visible, setVisible] = useState(INITIAL_VISIBLE)

  const dateTabs: Segment[] = [
    { value: TODAY, label: '今日', sub: formatShortDate(TODAY) },
    { value: addDays(TODAY, 1), label: '明日', sub: formatShortDate(addDays(TODAY, 1)) },
    { value: addDays(TODAY, 2), label: 'それ以降', sub: formatShortDate(addDays(TODAY, 2)) },
  ]
  const activeTab = dateTabs.some((t) => t.value === selectedDate) ? selectedDate : dateTabs[2].value

  const lessons = lessonsOn(activeTab).filter((l) => !isReserved(l.id))
  const shown = lessons.slice(0, visible)

  return (
    <div className="screen screen-enter">
      <AppHeader
        onMenu={() => showToast('メニューはこのプロトタイプの対象外です')}
        onBell={() => showToast('お知らせはこのプロトタイプの対象外です')}
      />

      <ReservationSlots
        reserved={reservedLessons}
        max={MAX_RESERVATIONS}
        onReserveNew={() => openReserve()}
        onDetail={(id) => openConfirm(id, true)}
        onCancel={cancelReservation}
      />

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">ご予約可能なレッスン</h2>
          <button type="button" className="section__link" onClick={() => openReserve(activeTab)}>
            すべて見る
            <ChevronRightIcon size={16} color="currentColor" />
          </button>
        </div>

        <div className="gutter">
          <SegmentedControl
            segments={dateTabs}
            value={activeTab}
            onChange={setSelectedDate}
            ariaLabel="表示する日を選ぶ"
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
        </div>

        {shown.length === 0 ? (
          <p className="empty-note">
            条件に合うレッスンがありません。
            <br />
            日付や店舗を変えてお試しください。
          </p>
        ) : (
          <ul className="card-list">
            {shown.map((lesson) => (
              <li key={lesson.id}>
                <LessonCard
                  lesson={lesson}
                  limitReached={isFull}
                  onDetail={() => openConfirm(lesson.id, true)}
                  onReserve={() =>
                    isFull ? showToast(`ご予約は${MAX_RESERVATIONS}件までです`) : openConfirm(lesson.id)
                  }
                />
              </li>
            ))}
          </ul>
        )}

        {visible < lessons.length && (
          <div className="gutter">
            <Button variant="secondary" block onClick={() => setVisible((v) => v + INITIAL_VISIBLE)}>
              さらに表示
            </Button>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">会員様にお届け</h2>
        </div>
        <div className="banner">
          <AssetImage slot="banner" alt="LINEA会員向けキャンペーンのご案内" />
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">今月のコラム</h2>
        </div>
        <ul className="article-list">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ul>
      </section>
    </div>
  )
}
