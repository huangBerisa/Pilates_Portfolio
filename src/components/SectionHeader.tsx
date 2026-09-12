/** Figma: SectionHeader (335:1354)。左の縦罫＋18pxの見出し。 */
export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-header">
      <span className="section-header__rule" aria-hidden />
      {children}
    </h2>
  )
}
