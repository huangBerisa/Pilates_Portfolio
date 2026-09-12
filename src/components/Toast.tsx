import { CheckCircleIcon } from './icons'

/** 操作結果の通知（仕様書 §12-01 Visibility of System Status） */
export function Toast({ message }: { message: string }) {
  return (
    <div className="toast" role="status">
      <CheckCircleIcon size={18} color="currentColor" />
      <span>{message}</span>
    </div>
  )
}
