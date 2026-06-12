import { useEffect } from 'react'

export function Toast({ message, sub, onClose }: { message: string; sub: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="toast" role="status" aria-live="polite">
      <svg className="toast-tick" width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="11" fill="#22c55e" />
        <path d="M6 11.5l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <div className="toast-msg">{message}</div>
        <div className="toast-sub">{sub}</div>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">&#x2715;</button>
    </div>
  )
}
