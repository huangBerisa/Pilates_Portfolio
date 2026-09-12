import { dayLabel, toDate } from '../data/calendar'

type Props = {
  dates: string[]
  selected: string
  onSelect: (date: string) => void
}

/** Figma: date_card_group (325:1816) / DateCard (324:1792) */
export function DateCardGroup({ dates, selected, onSelect }: Props) {
  return (
    <div className="date-cards" role="tablist" aria-label="日付を選ぶ">
      {dates.map((date) => {
        const active = date === selected
        return (
          <button
            key={date}
            type="button"
            role="tab"
            aria-selected={active}
            className={`date-card${active ? ' is-active' : ''}`}
            onClick={() => onSelect(date)}
          >
            <span className="date-card__label">{dayLabel(date)}</span>
            <span className="date-card__day">{toDate(date).getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}
