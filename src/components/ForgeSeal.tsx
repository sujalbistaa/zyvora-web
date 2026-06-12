const RING_TEXT =
  'FORGE THE FUTURE\u00A0\u00A0·\u00A0\u00A0ZYVORA\u00A0\u00A0·\u00A0\u00A0EST. 2026\u00A0\u00A0·\u00A0\u00A0'

export default function ForgeSeal() {
  return (
    <div className="seal">
      <svg className="seal-svg" width="240" height="240" viewBox="0 0 240 240" aria-hidden="true">
        <defs>
          <path id="ring" d="M120,120 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
        </defs>
        <text className="ring-text">
          <textPath href="#ring" startOffset="0">
            {RING_TEXT}
          </textPath>
        </text>

        {/* molten heat arc */}
        <path d="M120 56 a64 64 0 0 1 55 32" fill="none" stroke="#E8401F" strokeWidth="3" strokeLinecap="round" />

        {/* hexagon medallion */}
        <path d="M120 58 174 89 174 151 120 182 66 151 66 89Z" fill="none" stroke="#15171C" strokeWidth="2" />
        <path
          d="M120 58 174 89 174 151 120 182 66 151 66 89Z"
          fill="none"
          stroke="#15171C"
          strokeWidth="0.6"
          transform="scale(.88) translate(16.4 16.4)"
        />

        {/* engraved Z (molten) */}
        <path
          d="M101 104h38l-30 22h30"
          fill="none"
          stroke="#E8401F"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="120" cy="120" r="2.5" fill="#15171C" />
      </svg>

      <span className="seal-word">
        ZY<span className="v">V</span>ORA
      </span>
      <span className="seal-meta">Esports automation · Kathmandu</span>
    </div>
  )
}
