import { Link } from 'react-router-dom'
import { Arrow } from './Icons'

export default function Hero() {
  return (
    <section className="hero-forge">
      <div className="forge-glow" aria-hidden="true" />

      <div className="wrap forge-grid">
        {/* ── left: copy ── */}
        <div className="forge-copy">
          <div className="forge-eyebrow">
            <span className="forge-eye-line" />
            Esports org — Est. 2026
          </div>

          <h1 className="forge-h1">
            <span className="forge-word">Forge</span>
            <span className="forge-word forge-italic molten">the</span>
            <span className="forge-word">future.</span>
          </h1>

          <p className="forge-sub">
            ZYVORA runs official esports rooms for broadcast productions
            and builds the internet homes where creators grow their brand.
          </p>

          <div className="forge-actions">
            <Link className="btn btn-molten" to="/players">
              Join the roster <Arrow />
            </Link>
            <Link className="btn btn-ghost" to="/partner">
              Partner with us
            </Link>
          </div>

          <div className="forge-stats">
            <div className="forge-stat">
              <span className="forge-stat-n">S1</span>
              <span className="forge-stat-l">Season loading</span>
            </div>
            <div className="forge-stat-sep" />
            <div className="forge-stat">
              <span className="forge-stat-n">Bot</span>
              <span className="forge-stat-l">Fully automated</span>
            </div>
            <div className="forge-stat-sep" />
            <div className="forge-stat">
              <span className="forge-stat-n">Live</span>
              <span className="forge-stat-l">Broadcast overlay</span>
            </div>
          </div>
        </div>

        {/* ── right: jersey ── */}
        <div className="forge-jersey-side">
          <div className="forge-jersey-frame">
            <img
              src="/main-jersey.webp"
              alt="ZYVORA official jersey — front and back"
              className="forge-jersey-img"
              width="672"
              height="372"
            />
            <div className="forge-kit-pill">
              <span className="forge-kit-dot" aria-hidden="true" />
              Official Kit · Season 01
              <Link to="/jerseys" className="forge-kit-link">
                View jerseys <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
