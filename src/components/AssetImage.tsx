import { useState } from 'react'

/**
 * 写真スロット。実素材は public/images/<slot>.png に配置している。
 * 差し替えは同じパスにファイルを置くだけでよい。拡張子は下の候補順に試すので
 * 揃える必要はない。対応する Figma ノードIDは docs/FIGMA_ASSETS.md を参照。
 */
type Props = {
  slot: string
  alt: string
  className?: string
}

const BASE = import.meta.env.BASE_URL
const EXTENSIONS = ['png', 'jpg', 'webp', 'svg'] as const

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
