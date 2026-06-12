// Shared inline SVG marks — all hand-drawn, no icon libraries.

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 7h9M7 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LogoMark({ stroke = '#15171C', size = 34 }: { stroke?: string; size?: number }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M15 1.5 27.5 8v14L15 28.5 2.5 22V8L15 1.5Z" stroke={stroke} strokeWidth="1.6" />
      <path
        d="M9 10h12l-9 7h9"
        stroke="#E8401F"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function NepalMark() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path d="M1 1l9 6H3l8 7H1V1Z" fill="#C8102E" stroke="#ECEDE9" strokeWidth="1" />
    </svg>
  )
}
