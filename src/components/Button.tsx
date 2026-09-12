import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'soft'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  /** Figma: 予約ボタン先頭の「◎」 */
  leading?: ReactNode
  block?: boolean
  children: ReactNode
}

/** Figma: Button (123:443 / 125:491) / LoadMoreButton (291:1624) */
export function Button({ variant = 'primary', leading, block, children, className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      className={`btn btn--${variant}${block ? ' btn--block' : ''} ${className}`.trim()}
      {...rest}
    >
      {leading ? <span className="btn__leading" aria-hidden>{leading}</span> : null}
      <span>{children}</span>
    </button>
  )
}
