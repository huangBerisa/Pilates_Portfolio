import { useEffect, useState, type RefObject } from 'react'

/** iPhone 17 の論理解像度（ポイント）。デバイスフレームの基準サイズ。 */
export const DEVICE = { width: 402, height: 874, radius: 55 }

/** .stage の上下パディング＋gap（global.css と対応させること） */
const STAGE_PADDING_Y = 24 + 32
const STAGE_GAP = 16
/** 左右に残す余白 */
const STAGE_PADDING_X = 32

/** この幅以下では端末フレームをやめて全画面表示にする */
const FULL_BLEED_MAX = 460

/** これ以上は縮小しない下限 */
const MIN_SCALE = 0.4

type Fit = { scale: number; fullBleed: boolean }

/**
 * ビューポートに合わせてデバイスフレームの表示倍率を決める。
 * 402×874 の比率は保ったまま、収まらないときだけ縮小する（拡大はしない）。
 *
 * @param chromeRef フレームの上に載るタイトル要素。高さを実測して差し引く。
 */
export function useStageFit(chromeRef: RefObject<HTMLElement | null>): Fit {
  const [fit, setFit] = useState<Fit>({ scale: 1, fullBleed: false })

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      if (vw <= FULL_BLEED_MAX) {
        setFit({ scale: 1, fullBleed: true })
        return
      }

      const chromeH = (chromeRef.current?.offsetHeight ?? 72) + STAGE_PADDING_Y + STAGE_GAP
      const scale = Math.min(
        1,
        (vw - STAGE_PADDING_X) / DEVICE.width,
        (vh - chromeH) / DEVICE.height,
      )
      setFit({ scale: Math.max(scale, MIN_SCALE), fullBleed: false })
    }

    update()
    window.addEventListener('resize', update)
    window.visualViewport?.addEventListener('resize', update)

    // Webフォント読み込みでタイトルの高さが変わることがある
    document.fonts?.ready.then(update).catch(() => undefined)

    return () => {
      window.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [chromeRef])

  return fit
}
