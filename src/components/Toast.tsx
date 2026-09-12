import { CheckCircleIcon } from './icons'

/** Figma: messageBox (294:1874) */
export function Toast({ message }: { message: string }) {
  return (
    <div className="toast" role="status">
      <CheckCircleIcon size={24} color="var(--color-primary)" />
      <span>{message}</span>
    </div>
  )
}
