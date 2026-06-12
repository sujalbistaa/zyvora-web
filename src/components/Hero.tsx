import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from './Icons'

type Spark = {
  left: string
  size: string
  duration: string
  delay: string
}

const MARQUEE_ITEMS = ['Free Fire', 'Room automation', 'Broadcast', 'Creator sites', 'Merch']

export default function Hero() {
  // Rising ember particles, generated once. Honors reduced-motion.
  const sparks = useMemo<Spark[]>(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return []
    const count = window.innerWidth < 700 ? 8 : 16
    return Array.from({ length: count }, () => {
      const px = 2 + Math.random() * 2.5
      return {
        left: `${Math.random() * 90 + 5}%`,
        size: `${px}px`,
        duration: `${3.5 + Math.random() * 3}s`,
        delay: `${Math.random() * 5}s`,
      }
    })
  }, [])

  return (
    <section className="hero hero-center">
      <div className="sparks" aria-hidden="true">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="spark"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      <div className="wrap hero-center-inner">
        <div className="hero-watermark" aria-hidden="true">
          <svg viewBox="0 0 30 30" fill="none">
            <path d="M15 1.5 27.5 8v14L15 28.5 2.5 22V8L15 1.5Z" stroke="#15171C" strokeWidth="0.7" />
            <path
              d="M9 10h12l-9 7h9"
              stroke="#E8401F"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="hero-center-content">
        <h1 className="display reveal">
          Forge the <span className="molten">future</span>.
        </h1>

        <div className="heatline heatline-center reveal" />

        <p className="lede reveal">
          ZYVORA builds the bots that automate official Free Fire rooms — partnering with broadcast
          productions to run the lobby, scoring, and results — and crafts the websites where creators
          sell their merch.
        </p>

        <div className="cta-row cta-center reveal">
          <a className="btn btn-primary" href="#automation">
            See how it works
            <Arrow />
          </a>
          <Link className="btn btn-ghost" to="/partner">
            Partner with us
          </Link>
          </div>
        </div>
      </div>

      <div className="marquee" role="presentation">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group} aria-hidden={group === 1 ? true : undefined}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span className="marquee-item" key={i}>
                  {item}
                  <span className="sep">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
