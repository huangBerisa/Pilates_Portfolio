import { useState } from 'react'
import { useBooking } from '../state/BookingContext'
import { AppHeader } from '../components/AppHeader'
import { ReservationSlots } from '../components/ReservationSlots'
import { BookingCard } from '../components/BookingCard'
import { SegmentedControl, type Segment } from '../components/SegmentedControl'
import { ChipsTag } from '../components/ChipsTag'
import { ArticleCard } from '../components/ArticleCard'
import { AssetImage } from '../components/AssetImage'
import { Button } from '../components/Button'
import { ChevronRightIcon } from '../components/icons'
import { STORES } from '../data/stores'
import { ARTICLES } from '../data/articles'
import { MAX_RESERVATIONS } from '../data/notice'
import { TODAY, addDays, formatShortDate } from '../data/calendar'

const INITIAL_VISIBLE = 3

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
    { value: addDays(TODAY, 2), label: '明日以降', sub: formatShortDate(addDays(TODAY, 2)) },
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

      {/* ご予約可能なレッスン --------------------------------------------- */}
      <section className="block gutter">
        <h2 className="block__title">ご予約可能なレッスン</h2>

        <SegmentedControl
          segments={dateTabs}
          value={activeTab}
          onChange={setSelectedDate}
          ariaLabel="表示する日を選ぶ"
        />

        <div className="filter-row">
          <div className="filter-row__chips">
            <ChipsTag selected={storeFilter.length === 0} onClick={clearStoreFilter}>
              すべて
            </ChipsTag>
            {STORES.map((store) => (
              <ChipsTag key={store.id} selected={storeFilter.includes(store.id)} onClick={() => toggleStore(store.id)}>
                {store.name}
              </ChipsTag>
            ))}
          </div>
          <button type="button" className="link-right" onClick={() => openReserve(activeTab)}>
            店舗を変更
            <ChevronRightIcon size={24} color="var(--color-primary)" />
          </button>
        </div>

        {shown.length === 0 ? (
          <p className="empty">条件に合うレッスンがありません。</p>
        ) : (
          <ul className="card-list">
            {shown.map((lesson) => (
              <li key={lesson.id}>
                <BookingCard
                  lesson={lesson}
                  disabled={isFull}
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
          <Button variant="soft" block onClick={() => setVisible((v) => v + INITIAL_VISIBLE)}>
            もっと見る
          </Button>
        )}
      </section>

      {/* 会員様にお届け ---------------------------------------------------- */}
      <section className="block">
        <h2 className="block__title gutter">会員様にお届け</h2>
        <div className="banner">
          <AssetImage slot="banner" alt="LINEA会員向けキャンペーンのご案内" />
        </div>
        <div className="dots" aria-hidden>
          <span className="is-active" />
          <span />
          <span />
        </div>
      </section>

      {/* 今月のコラム ------------------------------------------------------ */}
      <section className="block gutter">
        <h2 className="block__title">今月のYogaFullコラム</h2>
        <ul className="article-list">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </ul>
      </section>

      <div className="screen__tail" />
    </div>
  )
}
