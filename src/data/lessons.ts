import type { Lesson, StoreId } from '../types'
import { TODAY, addDays } from './calendar'

type Slot = {
  programId: string
  start: string
  duration: number
  storeId: StoreId
  instructor: string
  capacityLeft?: number
}

/** 1日ぶんの標準タイムテーブル。日によって開講内容を少しずつ変える。 */
const DAY_PATTERNS: Slot[][] = [
  [
    { programId: 'control-flow', start: '18:30', duration: 30, storeId: 'moriguchi', instructor: '岡本 幸' },
    { programId: 'shape-up-core', start: '19:40', duration: 45, storeId: 'moriguchi', instructor: '星野 優美' },
    { programId: 'refresh-core', start: '21:04', duration: 45, storeId: 'moriguchi', instructor: '西野 沙雪' },
    { programId: 'control-flow', start: '21:40', duration: 30, storeId: 'umeda', instructor: '三浦 詩織' },
  ],
  [
    { programId: 'refresh-core', start: '09:30', duration: 45, storeId: 'moriguchi', instructor: '三浦 詩織' },
    { programId: 'control-flow', start: '12:10', duration: 30, storeId: 'umeda', instructor: '岡本 幸' },
    { programId: 'shape-up-core', start: '18:50', duration: 45, storeId: 'moriguchi', instructor: '星野 優美', capacityLeft: 0 },
    { programId: 'refresh-core', start: '20:20', duration: 45, storeId: 'umeda', instructor: '西野 沙雪' },
  ],
  [
    { programId: 'refresh-core', start: '08:45', duration: 45, storeId: 'umeda', instructor: '西野 沙雪' },
    { programId: 'control-flow', start: '11:00', duration: 30, storeId: 'moriguchi', instructor: '岡本 幸' },
    { programId: 'shape-up-core', start: '15:30', duration: 45, storeId: 'moriguchi', instructor: '三浦 詩織' },
    { programId: 'shape-up-core', start: '19:10', duration: 45, storeId: 'umeda', instructor: '星野 優美' },
  ],
]

const buildDay = (dateOffset: number): Lesson[] => {
  const date = addDays(TODAY, dateOffset)
  const pattern = DAY_PATTERNS[((dateOffset % DAY_PATTERNS.length) + DAY_PATTERNS.length) % DAY_PATTERNS.length]
  return pattern.map((slot, index) => {
    const [h, m] = slot.start.split(':').map(Number)
    const endMinutes = h * 60 + m + slot.duration
    const end = `${String(Math.floor(endMinutes / 60) % 24).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`
    return {
      id: `${date}-${slot.programId}-${index}`,
      programId: slot.programId,
      date,
      start: slot.start,
      end,
      duration: slot.duration,
      storeId: slot.storeId,
      instructor: slot.instructor,
      capacityLeft: slot.capacityLeft ?? 3 + ((dateOffset + index) % 5),
    }
  })
}

/** 前週〜翌々週ぶんを用意しておく（週送りしても中身が空にならないように） */
export const LESSONS: Lesson[] = Array.from({ length: 28 }, (_, i) => i - 7).flatMap(buildDay)

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id)
