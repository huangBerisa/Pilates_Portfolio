import type { ReactNode } from 'react'

/** シート内の小見出し。Figma: SectionHeader (335:1354) */
export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <h2 className="section-header">
      <span className="section-header__rule" aria-hidden />
      {children}
    </h2>
  )
}
