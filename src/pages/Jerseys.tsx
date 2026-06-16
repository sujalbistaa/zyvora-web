import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const JERSEYS = [
  {
    id: 'jersey-3',
    src: '/jersey-3.webp',
    label: 'ZYVORA KIT — Edition 01',
    desc: 'The official ZYVORA competitive jersey. Worn by players representing the org in official events and broadcasts.',
    tag: 'Competition Kit',
  },
  {
    id: 'jersey-4',
    src: '/jersey-4.webp',
    label: 'ZYVORA KIT — Edition 02',
    desc: 'Alternate colourway for the ZYVORA roster. Clean, sharp, and built to stand out on any broadcast.',
    tag: 'Alternate Kit',
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
