import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const JERSEYS = [
  {
    id: 'main-jersey',
    src: '/main-jersey.webp',
    label: 'ZYVORA KIT — Season 01',
    desc: 'The Season 01 official kit, front and back. The full ZYVORA identity on a single piece.',
    tag: 'Season Kit',
  },
  {
    id: 'jersey-4-removebg',
    src: '/jersey-4-removebg.webp',
    label: 'ZYVORA KIT — Season 02',
    desc: 'Clean-cut edition with transparent background — designed for overlays, broadcast graphics, and content production.',
    tag: 'Broadcast Edition',
  },
]

export default function Jerseys() {
  useReveal()
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal">
            <span className="tick-molten" /> The kit
          </div>
          <h1 className="reveal">
            Wear the <span className="molten">forge</span>.
          </h1>
          <p className="lede reveal">
            The ZYVORA jersey is more than a shirt — it&rsquo;s the mark of an org that takes
            esports seriously. Worn by our players on every official stage.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="jersey-grid reveal">
            {JERSEYS.map((j) => (
              <div className="jersey-card" key={j.id}>
                <div className="jersey-img-wrap">
                  <img src={j.src} alt={j.label} className="jersey-img" loading="lazy" />
                </div>
                <div className="jersey-info">
                  <span className="jersey-tag">{j.tag}</span>
                  <h2 className="jersey-name">{j.label}</h2>
                  <p className="jersey-desc">{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="jersey-avail">
        <div className="wrap reveal">
          <div className="eyebrow eyebrow-flex">
            <span className="tick-molten" /> Official players only
          </div>
          <h2 className="fx-head">Earn your kit.</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 17, maxWidth: 520, marginBottom: 32 }}>
            ZYVORA jerseys are issued to official roster players and partners. Want to rep the forge?
            Apply to join the roster or partner with us.
          </p>
          <div className="cta-row">
            <Link className="btn btn-molten" to="/players">
              Apply to play <Arrow />
            </Link>
            <Link className="btn btn-ghost" to="/partner">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
