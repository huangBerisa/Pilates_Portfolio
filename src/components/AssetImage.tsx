import { useState } from 'react'

/**
 * 写真スロット。
 *
 * Figmaに配置されている写真素材（レッスン写真・バナー・コラム）は、
 * この実行環境からFigmaのアセットCDNへ出られないため同梱できていない。
 * 代わりにブランドカラーで組んだプレースホルダSVGを public/images/<slot>.svg に
 * 置いてある。`public/images/<slot>.jpg` を置けばそちらが自動的に優先される。
 * 差し替え手順と対応ノードIDは docs/FIGMA_ASSETS.md を参照。
 */
type Props = {
  slot: string
  alt: string
  className?: string
}

const base = import.meta.env.BASE_URL

export function AssetImage({ slot, alt, className }: Props) {
  const [src, setSrc] = useState(`${base}images/${slot}.jpg`)
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setSrc((current) => (current.endsWith('.jpg') ? `${base}images/${slot}.svg` : current))}
    />
  )
}
