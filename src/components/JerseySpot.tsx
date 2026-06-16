import { Link } from 'react-router-dom'
import { Arrow } from './Icons'

export default function JerseySpot() {
  return (
    <section className="jspot">
      <div className="wrap">
        <div className="jspot-inner reveal">
          <div className="jspot-copy">
            <div className="eyebrow eyebrow-flex" style={{ color: 'rgba(236,237,233,.4)' }}>
              <span className="tick-molten" /> The kit
            </div>
            <h2 className="fx-head" style={{ color: 'var(--bone)' }}>Wear what<br />you earn.</h2>
            <p>
              Official ZYVORA jerseys are issued to roster players
              and partners. Every piece is built to stand out on any stage.
            </p>
            <Link className="btn btn-molten" to="/jerseys">
              See the full kit <Arrow />
            </Link>
          </div>

          <div className="jspot-stack" aria-hidden="true">
            <div className="jspot-card jspot-back">
              <img src="/jersey-4.webp" alt="ZYVORA kit alternate" />
            </div>
            <div className="jspot-card jspot-front">
              <img src="/jersey-3.webp" alt="ZYVORA official kit" />
            </div>
            <div className="jspot-label">
              <span>Edition 01 &amp; 02</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
