import { ChevronLeftIcon, ChevronRightIcon } from './icons'

type Props = {
  label: string
  onPrev: () => void
  onNext: () => void
}

/** Figma: WeekSelector (335:1292) */
export function WeekSelector({ label, onPrev, onNext }: Props) {
  return (
    <div className="week-selector">
      <button type="button" className="week-selector__nav" onClick={onPrev} aria-label="前の週">
        <ChevronLeftIcon size={24} color="var(--color-primary)" />
      </button>
      <p className="week-selector__label">{label}</p>
      <button type="button" className="week-selector__nav" onClick={onNext} aria-label="次の週">
        <ChevronRightIcon size={24} color="var(--color-primary)" />
      </button>
    </div>
  )
}
