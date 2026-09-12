/**
 * 難易度表示（仕様書 §13.3）。
 * 色だけで区別せず ●○○ のドットと日本語ラベルを併記する。
 */
const LABEL = { 1: '初級', 2: '中級', 3: '上級' } as const

export function Difficulty({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="difficulty">
      <span>{LABEL[level]}</span>
      <span className="difficulty__dots" role="img" aria-label={`難易度 ${level} / 3`}>
        {[1, 2, 3].map((n) => (
          <span key={n} className={`difficulty__dot${n <= level ? ' is-on' : ''}`} />
        ))}
      </span>
    </span>
  )
}
