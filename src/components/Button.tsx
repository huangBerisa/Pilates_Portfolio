import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * 仕様書 §10.1 / §10.2
 * primary   : filled mauve。1画面の主要アクション
 * secondary : transparent + 1px outline
 * quiet     : 文字のみ。カード内で primary と視覚的に競合させないため
 */
type Variant = 'primary' | 'secondary' | 'quiet'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  block?: boolean
  children: ReactNode
}

export function Button({ variant = 'primary', block, children, className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      className={`btn btn--${variant}${block ? ' btn--block' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}
