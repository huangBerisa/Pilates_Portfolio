import { useCallback, useEffect, useRef, useState } from 'react'
import type { Lesson } from '../types'
import { BookingCard } from './BookingCard'
import { AddBookingCard } from './AddBookingCard'

type Props = {
  /** 予約中のレッスン。枠の埋まり具合と件数カウンタはここから導出する */
  reserved: Lesson[]
  /** 予約できる上限枠数（Figma: 現在の予約数 1件/3件） */
  max: number
  onReserveNew: () => void
  onDetail: (lessonId: string) => void
  onCancel: (lessonId: string) => void
}

/**
 * ご予約中レッスンの枠スライダー。
 * Figma: 予約カード (182:801) の横並び ＋ Card / Add Booking Card (210:1320)
 *
 * 枠は常に max（3件）ぶん並び、左右にドラッグして送れる。
 * 見出し横の「現在の予約数 N件/3件」とドットは同じ `reserved` から
 * 算出しているので、予約・取り消しと必ず一致する。
 */
export function ReservationSlots({ reserved, max, onReserveNew, onDetail, onCancel }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const { onPointerDown, suppressClick } = useDragScroll(trackRef)

  const slots = Array.from({ length: max }, (_, i) => reserved[i] ?? null)

  const syncCurrent = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const items = Array.from(track.children) as HTMLElement[]
    const center = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let best = Infinity
    items.forEach((item, i) => {
      const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center)
      if (distance < best) {
        best = distance
        nearest = i
      }
    })
    setCurrent(nearest)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', syncCurrent, { passive: true })
    syncCurrent()
    return () => track.removeEventListener('scroll', syncCurrent)
  }, [syncCurrent, reserved.length])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const item = track.children[Math.max(0, Math.min(index, max - 1))] as HTMLElement | undefined
    item?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(current + 1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(current - 1)
    }
  }

  return (
    <section className="block">
      {/* Figma: ReservedLessonSectionHeader (294:1573) */}
      <div className="reserved-head">
        <h2 className="reserved-head__title">ご予約中レッスン</h2>
        <p className="reserved-head__count">
          現在の予約数<strong>{reserved.length}</strong>件/{max}件
        </p>
      </div>

      <div
        className="carousel"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onClickCapture={suppressClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-label={`予約枠 ${max}件中 ${reserved.length}件が予約済み。左右にドラッグ、または矢印キーで切り替え`}
      >
        {slots.map((lesson, index) => (
          <div className="carousel__item" key={lesson?.id ?? `empty-${index}`}>
            {lesson ? (
              <BookingCard
                lesson={lesson}
                reserved
                onDetail={() => onDetail(lesson.id)}
                onReserve={() => undefined}
                onCancel={() => onCancel(lesson.id)}
              />
            ) : (
              <AddBookingCard onReserve={onReserveNew} />
            )}
          </div>
        ))}
      </div>

      {/* Figma: Group 5 (52:90) のドット。現在位置と枠の状態を示す */}
      <div className="dots dots--slots" aria-hidden>
        {slots.map((lesson, index) => (
          <span
            key={index}
            className={`${lesson ? 'is-filled' : ''} ${index === current ? 'is-active' : ''}`.trim()}
          />
        ))}
      </div>
    </section>
  )
}

/**
 * マウスでの左右ドラッグ。タッチはブラウザのネイティブスクロールに任せる。
 * ドラッグ中は scroll-snap を切り、離したときにスナップさせる。
 */
function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const state = useRef({ dragging: false, startX: 0, startLeft: 0, moved: 0 })

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = ref.current
    if (!track || event.pointerType === 'touch' || event.button !== 0) return
    state.current = { dragging: true, startX: event.clientX, startLeft: track.scrollLeft, moved: 0 }
    track.classList.add('is-dragging')
    track.setPointerCapture(event.pointerId)

    const onMove = (e: PointerEvent) => {
      if (!state.current.dragging) return
      const dx = e.clientX - state.current.startX
      state.current.moved = Math.max(state.current.moved, Math.abs(dx))
      track.scrollLeft = state.current.startLeft - dx
    }

    const onUp = (e: PointerEvent) => {
      state.current.dragging = false
      track.classList.remove('is-dragging')
      track.releasePointerCapture?.(e.pointerId)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointercancel', onUp)
      track.scrollBy({ left: 0 })
    }

    track.addEventListener('pointermove', onMove)
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointercancel', onUp)
  }

  /** ドラッグ直後のクリックでボタンが誤爆しないようにする */
  const suppressClick = (event: React.MouseEvent) => {
    if (state.current.moved > 6) {
      event.preventDefault()
      event.stopPropagation()
      state.current.moved = 0
    }
  }

  return { onPointerDown, suppressClick }
}
