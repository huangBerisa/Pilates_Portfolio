import { Button } from './Button'

/** Figma: Card / Add Booking Card (210:1320) */
export function AddBookingCard({ onReserve }: { onReserve: () => void }) {
  return (
    <div className="add-card">
      <p className="add-card__text">現在ご予約はありません</p>
      <Button variant="primary" onClick={onReserve}>
        レッスンを予約する
      </Button>
    </div>
  )
}
