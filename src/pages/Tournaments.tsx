import { useReveal } from '../hooks/useReveal'

export default function Tournaments() {
  useReveal()
  return (
    <main>
      <section className="cs-section">
        <div className="cs-hex" aria-hidden="true">
          <div className="cs-hex-ring cs-hex-ring-1" />
          <div className="cs-hex-ring cs-hex-ring-2" />
          <div className="cs-hex-ring cs-hex-ring-3" />
          <svg className="cs-hex-core" viewBox="0 0 60 60" fill="none">
            <path d="M30 3 55 17.5v25L30 57 5 42.5v-25L30 3Z" stroke="url(#hg)" strokeWidth="1.2" />
            <path d="M18 22h24l-18 14h18" stroke="#E8401F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8401F" />
                <stop offset="1" stopColor="#F4A11A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="cs-content reveal">
          <div className="eyebrow eyebrow-flex" style={{ justifyContent: 'center' }}>
            <span className="tick-molten" /> Tournaments
          </div>
          <h1 className="cs-title">
            Coming <span className="molten">Soon</span>.
          </h1>
          <div className="heatline heatline-center" style={{ margin: '28px auto 32px' }} />
          <p className="cs-sub">
            ZYVORA&rsquo;s first tournament is in production. Broadcast-grade, fully automated —
            the kind of event you&rsquo;ve been waiting for. Stay sharp.
          </p>

          <div className="cs-stats">
            <div className="cs-stat">
              <span className="cs-stat-val">01</span>
              <span className="cs-stat-label">Season incoming</span>
            </div>
            <div className="cs-stat-divider" />
            <div className="cs-stat">
              <span className="cs-stat-val">Bot</span>
              <span className="cs-stat-label">Fully automated room</span>
            </div>
            <div className="cs-stat-divider" />
            <div className="cs-stat">
              <span className="cs-stat-val">Live</span>
              <span className="cs-stat-label">Broadcast overlay</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head reveal" style={{ maxWidth: '100%' }}>
            <div className="eyebrow">
              <span className="tick" /> What to expect
            </div>
            <h2 className="fx-head">How ZYVORA runs a tournament.</h2>
          </div>
          <div className="manifest reveal">
            {[
              { ref: '/ 01', title: 'Bot-run rooms', body: 'Every official room is handled by ZYVORA bots — no human operator, no missed scores, no delays.' },
              { ref: '/ 02', title: 'Live scoring', body: 'Points, kills, and standings update in real time and push straight to the broadcast overlay.' },
              { ref: '/ 03', title: 'Auto MVP detection', body: 'Best performer per match is flagged instantly — shown on stream without anyone lifting a finger.' },
              { ref: '/ 04', title: 'Final results broadcast', body: 'End-of-tournament results compiled and displayed automatically. Clean, instant, verifiable.' },
            ].map((c) => (
              <div className="cap" key={c.ref}>
                <span className="ref">{c.ref}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
