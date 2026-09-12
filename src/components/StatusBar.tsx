/** Figma: UiLockTop (292:1734)。iOSのステータスバー表現。 */
export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden>
      <span className="statusbar__time">9:41</span>
      <span className="statusbar__island" />
      <span className="statusbar__right">
        <svg width="21" height="14" viewBox="0 0 21 14" fill="none">
          <rect x="0" y="8.4" width="4" height="4.8" rx="0.4" fill="currentColor" />
          <rect x="5.6" y="6" width="4" height="7.2" rx="0.4" fill="currentColor" />
          <rect x="11.6" y="3.2" width="4" height="10" rx="0.4" fill="currentColor" />
          <rect x="17.2" y="0" width="4" height="13.2" rx="0.4" fill="currentColor" />
        </svg>
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
          <path
            d="M10 13.6 0.8 4.9a13 13 0 0 1 18.4 0L10 13.6Z"
            fill="currentColor"
          />
        </svg>
        <svg width="30" height="12" viewBox="0 0 30 12" fill="none">
          <rect x="0.6" y="0.6" width="24.4" height="10.4" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          <rect x="1.8" y="1.8" width="22" height="8" rx="1.4" fill="currentColor" opacity="0.9" />
          <rect x="27.6" y="4" width="1.6" height="3.6" rx="0.8" fill="currentColor" opacity="0.6" />
        </svg>
      </span>
    </div>
  )
}
