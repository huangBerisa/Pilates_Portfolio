import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Lesson, Reservation, StoreId } from '../types'
import { LESSONS, lessonById } from '../data/lessons'
import { MAX_RESERVATIONS } from '../data/notice'
import { TODAY } from '../data/calendar'

export type SearchMode = 'favorite' | 'all' | 'condition'

/** Footer bar のタブ（Figma: Navigation / Bottom 321:1741） */
export type TabName = 'home' | 'reserve' | 'member' | 'report' | 'points'

type Nav =
  | { screen: TabName }
  | { screen: 'confirm'; lessonId: string; readOnly?: boolean }
  | { screen: 'complete'; lessonId: string }

const TABS: TabName[] = ['home', 'reserve', 'member', 'report', 'points']
const isTab = (screen: Nav['screen']): screen is TabName => (TABS as string[]).includes(screen)

type BookingState = {
  nav: Nav
  lastTab: TabName
  reservations: Reservation[]
  /** 予約カレンダーで選択中の日付 */
  selectedDate: string
  /** カレンダーの表示開始週（日曜始まりではなく基準日始まり） */
  weekStart: string
  searchMode: SearchMode
  /** 単一選択。null = すべての店舗 */
  storeFilter: StoreId | null
  toast: string | null
}

type BookingActions = {
  go: (nav: Nav) => void
  goHome: () => void
  goTab: (tab: TabName) => void
  /** モーダルを閉じて直前のタブ画面に戻る */
  closeOverlay: () => void
  /** Footer bar のハイライト。シート系の画面では直前のタブを維持する */
  activeTab: TabName
  openReserve: (date?: string) => void
  openConfirm: (lessonId: string, readOnly?: boolean) => void
  reserve: (lessonId: string) => void
  cancelReservation: (lessonId: string) => void
  setSelectedDate: (date: string) => void
  shiftWeek: (direction: 1 | -1) => void
  setSearchMode: (mode: SearchMode) => void
  /** 店舗の絞り込み。null で「すべて」に戻す */
  selectStore: (id: StoreId | null) => void
  showToast: (message: string) => void
  dismissToast: () => void
  isReserved: (lessonId: string) => boolean
  reservedLessons: Lesson[]
  isFull: boolean
  lessonsOn: (date: string) => Lesson[]
}

const BookingContext = createContext<(BookingState & BookingActions) | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>({
    nav: { screen: 'home' },
    lastTab: 'home',
    reservations: [],
    selectedDate: TODAY,
    weekStart: TODAY,
    searchMode: 'favorite',
    storeFilter: null,
    toast: null,
  })

  const patch = useCallback((next: Partial<BookingState>) => setState((s) => ({ ...s, ...next })), [])

  const go = useCallback(
    (nav: Nav) => setState((s) => ({ ...s, nav, lastTab: isTab(nav.screen) ? nav.screen : s.lastTab })),
    [],
  )

  const showToast = useCallback(
    (message: string) => {
      patch({ toast: message })
      window.setTimeout(() => setState((s) => (s.toast === message ? { ...s, toast: null } : s)), 2400)
    },
    [patch],
  )

  const reservedLessons = useMemo(
    () =>
      state.reservations
        .map((r) => lessonById(r.lessonId))
        .filter((l): l is Lesson => Boolean(l))
        .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)),
    [state.reservations],
  )

  const isReserved = useCallback(
    (lessonId: string) => state.reservations.some((r) => r.lessonId === lessonId),
    [state.reservations],
  )

  const value: BookingState & BookingActions = {
    ...state,
    go,
    goHome: () => go({ screen: 'home' }),
    goTab: (tab) => go({ screen: tab }),
    closeOverlay: () => setState((s) => ({ ...s, nav: { screen: s.lastTab } })),
    activeTab: isTab(state.nav.screen) ? state.nav.screen : state.lastTab,
    openReserve: (date) =>
      setState((s) => ({ ...s, nav: { screen: 'reserve' }, lastTab: 'reserve', selectedDate: date ?? s.selectedDate })),
    openConfirm: (lessonId, readOnly) => go({ screen: 'confirm', lessonId, readOnly }),
    reserve: (lessonId) => {
      setState((s) => {
        if (s.reservations.some((r) => r.lessonId === lessonId)) return s
        if (s.reservations.length >= MAX_RESERVATIONS) return s
        return {
          ...s,
          reservations: [...s.reservations, { id: `r-${lessonId}`, lessonId, reservedAt: new Date().toISOString() }],
          nav: { screen: 'complete', lessonId },
        }
      })
    },
    cancelReservation: (lessonId) => {
      setState((s) => ({ ...s, reservations: s.reservations.filter((r) => r.lessonId !== lessonId) }))
      showToast('予約をキャンセルしました')
    },
    setSelectedDate: (date) => patch({ selectedDate: date }),
    shiftWeek: (direction) =>
      setState((s) => {
        const d = new Date(s.weekStart)
        d.setDate(d.getDate() + direction * 7)
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        return { ...s, weekStart: iso, selectedDate: iso }
      }),
    setSearchMode: (mode) => patch({ searchMode: mode }),
    selectStore: (id) => patch({ storeFilter: id }),
    showToast,
    dismissToast: () => patch({ toast: null }),
    isReserved,
    reservedLessons,
    isFull: state.reservations.length >= MAX_RESERVATIONS,
    lessonsOn: (date) =>
      LESSONS.filter((l) => l.date === date)
        .filter((l) => state.storeFilter === null || state.storeFilter === l.storeId)
        .sort((a, b) => a.start.localeCompare(b.start)),
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
