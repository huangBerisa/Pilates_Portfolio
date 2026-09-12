import type { LessonProgram } from '../types'

const COMMON_ITEMS = ['水500ml', 'ウェア(上下)', 'フェイスタオル', '滑り止めの付いた靴下']

export const PROGRAMS: LessonProgram[] = [
  {
    id: 'control-flow',
    name: 'Control Flow',
    level: 2,
    description:
      'アップテンポな音楽に合わせ、カラダをコントロールしながら動かし、全身をボディメイク。ウエスト・ヒップ・二の腕など、女性が気になる部位を中心に、日常生活で使いにくいインナーマッスルに効かせていきます。楽しみながら、バランスの良い均整の取れたスタイルに。',
    items: COMMON_ITEMS,
    image: 'control-flow',
  },
  {
    id: 'shape-up-core',
    name: 'Shape up Core',
    level: 3,
    description:
      '体幹（コア）を安定させながら、骨盤まわりと背骨をていねいに動かしていくプログラム。姿勢を支える深層筋にアプローチし、日常の立ち姿・歩き方まで整えます。運動量はしっかりめ、引き締めを目指す方に。',
    items: COMMON_ITEMS,
    image: 'shape-up-core',
  },
  {
    id: 'refresh-core',
    name: 'Refresh Core',
    level: 1,
    description:
      'ゆったりとした呼吸に合わせて、固まった肩・背中・股関節をほぐしていくリラックス系プログラム。一日の終わりの疲れをリセットし、睡眠の質を整えます。運動が久しぶりの方にもおすすめです。',
    items: COMMON_ITEMS,
    image: 'refresh-core',
  },
]

export const programById = (id: string) => PROGRAMS.find((p) => p.id === id)!
