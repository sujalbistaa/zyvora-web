interface Props {
  enabled: boolean
  loading: boolean
  onToggle: () => void
}

export function SoundToggle({ enabled, loading, onToggle }: Props) {
  return (
    <button
      className={`sound-btn${enabled ? ' sound-on' : ''}${loading ? ' sound-loading' : ''}`}
      onClick={onToggle}
      aria-label={enabled ? 'Mute audio' : 'Enable audio'}
      aria-pressed={enabled}
      disabled={loading}
    >
      {/* energy sweep on hover */}
      <span className="sound-sweep" aria-hidden="true" />

      {/* icon */}
      <span className="sound-icon" aria-hidden="true">
        {enabled ? (
          <svg viewBox="0 0 18 18" fill="none" width="15" height="15">
            <path d="M9 2.5 5 6H2v6h3l4 3.5V2.5Z" fill="currentColor" />
            <path d="M12.5 6a4 4 0 0 1 0 6"    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M15 4a7 7 0 0 1 0 10"      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 18 18" fill="none" width="15" height="15">
            <path d="M9 2.5 5 6H2v6h3l4 3.5V2.5Z" fill="currentColor" />
            <path d="M13 6.5 16.5 11.5M16.5 6.5 13 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </span>

      {/* equalizer bars — visible when playing */}
      <span className="sound-eq" aria-hidden="true">
        <span className="eq-b" />
        <span className="eq-b" />
        <span className="eq-b" />
      </span>

      {/* label */}
      <span className="sound-label">
        {loading ? 'Loading…' : enabled ? 'Sound On' : 'Enable Sound'}
      </span>
    </button>
  )
}
