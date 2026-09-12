export type StoreId = 'moriguchi' | 'umeda'

export type Store = {
  id: StoreId
  name: string
  favorite: boolean
}

export type LessonProgram = {
  id: string
  /** レッスン名（Figma: Control Flow / Shape up Core / Refresh Core …） */
  name: string
  /** 難易度。1=初階 / 2=中階 / 3=進階（仕様書 §13.3） */
  level: 1 | 2 | 3
  description: string
  items: string[]
  /** 画像スロット名。public/images/lessons/<image>.svg を参照する */
  image: string
}

export type Lesson = {
  id: string
  programId: string
  /** YYYY-MM-DD */
  date: string
  /** HH:MM */
  start: string
  end: string
  /** 分 */
  duration: number
  storeId: StoreId
  instructor: string
  /** 残席。0 は満席 */
  capacityLeft: number
}

export type Reservation = {
  id: string
  lessonId: string
  reservedAt: string
}

export type Article = {
  id: string
  title: string
  tag: string
  date: string
  image: string
}
