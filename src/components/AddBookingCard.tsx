import { Button } from './Button'

type Props = {
  /** 枠の見出し。1枠目かつ予約ゼロのときだけ Figma の文言を使う */
  title: string
  ctaLabel: string
  /** 主要ボタンを出すかどうか（画面内で予約導線を1つに保つため） */
  showCta: boolean
  onReserve: () => void
}

/** Figma: Card / Add Booking Card (210:1320) */
export function AddBookingCard({ title, ctaLabel, showCta, onReserve }: Props) {
  return (
    <div className="add-card">
      <p className="add-card__text">{title}</p>
      {showCta && (
        <Button variant="primary" onClick={onReserve}>
          {ctaLabel}
        </Button>
      )}
    </div>
  )
}
