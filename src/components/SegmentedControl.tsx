export type Segment = {
  value: string
  label: string
  /** 2行目（Figma: 日付タブの「6/11(木)」） */
  sub?: string
}

type Props = {
  segments: Segment[]
  value: string
  onChange: (value: string) => void
  ariaLabel: string
}

/** Figma: Date_Chip/Segmented_Control (113:827 / 182:1352) */
export function SegmentedControl({ segments, value, onChange, ariaLabel }: Props) {
  return (
    <div className="segmented" role="tablist" aria-label={ariaLabel}>
      {segments.map((segment) => {
        const active = segment.value === value
        return (
          <button
            key={segment.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={`segmented__item${active ? ' is-active' : ''}`}
            onClick={() => onChange(segment.value)}
          >
            <span className="segmented__label">{segment.label}</span>
            {segment.sub ? <span className="segmented__sub">{segment.sub}</span> : null}
          </button>
        )
      })}
    </div>
  )
}
