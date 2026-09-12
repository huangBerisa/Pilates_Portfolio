import { useState } from 'react'

/**
 * 写真スロット。
 *
 * Figma に配置されている写真素材（レッスン写真・バナー・コラム）は、
 * 実装時の環境から Figma のアセット配信元へ接続できなかったため同梱できていない。
 * 代わりにブランドカラーで組んだプレースホルダ SVG を public/images/<slot>.svg に置いてある。
 *
 * 差し替えは `public/images/<slot>.jpg`（または .png / .webp）を置くだけでよい。
 * 下の候補順に読み込みを試し、最初に成功したものを使う。
 * 対応するFigmaノードIDは docs/FIGMA_ASSETS.md を参照。
 */
type Props = {
  slot: string
  alt: string
  className?: string
}

const BASE = import.meta.env.BASE_URL
const EXTENSIONS = ['jpg', 'png', 'webp', 'svg'] as const

export function AssetImage({ slot, alt, className }: Props) {
  const [index, setIndex] = useState(0)
  const src = `${BASE}images/${slot}.${EXTENSIONS[index]}`

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      // 候補を順に試す。最後（svg プレースホルダ）で止める。
      onError={() => setIndex((i) => Math.min(i + 1, EXTENSIONS.length - 1))}
    />
  )
}
