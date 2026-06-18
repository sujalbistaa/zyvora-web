import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, LogoMark } from '../components/Icons'
import gsap from 'gsap'

// ── Particle trail ────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number; hue: number
}

function spawnParticle(x: number, y: number, particles: Particle[]) {
  if (particles.length > 70) return
  const angle = Math.random() * Math.PI * 2
  const speed = Math.random() * 1.8 + 0.4
  particles.push({
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1.2,
    life: 1, maxLife: 1,
    size: Math.random() * 3.5 + 1,
    hue: Math.random() * 25,
  })
}

// ── Jersey data ───────────────────────────────────────────────────────────────
const JERSEYS = [
  {
    id: 'season-01',
    season: 'Season 01',
    label: 'THE FORGE KIT',
    cleanSrc: '/jersey-4-removebg.webp',
    tag: 'OFFICIAL ROSTER KIT',
    year: '2025',
    detail: 'Dual-layer performance weave. Heat-bonded ZYVORA crest.',
  },
  {
    id: 'season-02',
    season: 'Season 02',
    label: 'BROADCAST EDITION',
    cleanSrc: '/jersey-4-removebg.webp',
    tag: 'BROADCAST EDITION',
    year: '2026',
    detail: 'Transparent-ready design for overlays, broadcast & content.',
  },
]

const TITLE_CHARS = 'WEAR THE\nFORGE.'.split('')

// ── Kinetic title ─────────────────────────────────────────────────────────────
function KineticTitle() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll('.jky-char')
    gsap.set(chars, { y: 120, opacity: 0, rotateX: -80 })
    gsap.to(chars, {
      y: 0, opacity: 1, rotateX: 0,
      stagger: 0.032, duration: 0.7, ease: 'power3.out', delay: 0.15,
    })
  }, [])

  return (
    <div ref={ref} className="jky-title" aria-label="Wear the Forge">
      {TITLE_CHARS.map((ch, i) =>
        ch === '\n' ? <br key={`br-${i}`} /> :
        ch === ' '  ? <span key={`sp-${i}`} className="jky-char jky-space">&nbsp;</span> :
        <span key={i} className={`jky-char${['F','O','R','G','E','.'].includes(ch) ? ' jky-orange' : ''}`}>{ch}</span>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Jerseys() {
  const [activeIdx, setActiveIdx]   = useState(0)
  const [flipped, setFlipped]       = useState(false)
  const [playerName, setPlayerName] = useState('YOUR NAME')
  const [playerNum, setPlayerNum]   = useState('00')
  const [hovering, setHovering]     = useState(false)
  const [numRaw, setNumRaw]         = useState('00')

  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const cardRef      = useRef<HTMLDivElement>(null)
  const stageRef     = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])

  const jersey = JERSEYS[activeIdx]

  // ── Particle canvas ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')!
    let animId = 0

    const resize = () => {
      const p = canvas.parentElement!
      canvas.width  = p.offsetWidth
      canvas.height = p.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      animId = requestAnimationFrame(tick)
      ctx2d.clearRect(0, 0, canvas.width, canvas.height)
      const ps = particlesRef.current
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life -= 0.022
        if (p.life <= 0) { ps.splice(i, 1); continue }
        const a = p.life / p.maxLife
        ctx2d.save()
        ctx2d.globalAlpha = a * 0.85
        ctx2d.shadowColor = `hsl(${20 + p.hue},100%,55%)`
        ctx2d.shadowBlur  = 8
        ctx2d.fillStyle   = `hsl(${20 + p.hue},100%,${55 + p.hue}%)`
        ctx2d.beginPath()
        ctx2d.arc(p.x, p.y, p.size * a, 0, Math.PI * 2)
        ctx2d.fill()
        ctx2d.restore()
      }
    }
    animId = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // ── Mouse: tilt + holographic + particle trail ────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card || flipped) return

    const r  = card.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top  + r.height / 2
    const nx = (e.clientX - cx) / (r.width  / 2)
    const ny = (e.clientY - cy) / (r.height / 2)

    card.style.setProperty('--rx', `${-ny * 14}deg`)
    card.style.setProperty('--ry', `${nx  * 14}deg`)
    card.style.setProperty('--holo-angle',
      `${Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI)}deg`)
    card.style.setProperty('--lx', `${((e.clientX - r.left) / r.width)  * 100}%`)
    card.style.setProperty('--ly', `${((e.clientY - r.top)  / r.height) * 100}%`)

    const cv = canvasRef.current
    if (cv) {
      const cr = cv.getBoundingClientRect()
      for (let i = 0; i < 3; i++)
        spawnParticle(e.clientX - cr.left, e.clientY - cr.top, particlesRef.current)
    }
  }, [flipped])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  }, [])

  const onNumChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 2)
    setNumRaw(digits)
    const n = parseInt(digits)
    if (!isNaN(n)) setPlayerNum(String(Math.min(99, n)).padStart(2, '0'))
  }
  const onNumBlur = () => {
    // pad on blur so display always shows 00–99
    const n = parseInt(numRaw)
    const val = isNaN(n) ? '00' : String(Math.min(99, n)).padStart(2, '0')
    setNumRaw(val)
    setPlayerNum(val)
  }

  return (
    <main className="jsy-page">

      {/* ══ §1 HERO ══════════════════════════════════════════════════════════ */}
      <section className="jsy-hero">
        <div className="jsy-hero-grid">

          {/* left: copy */}
          <div className="jsy-hero-inner">
            <div className="jsy-hero-eyebrow">
              <LogoMark stroke="#FF6A00" size={18} />
              <span>Official ZYVORA Kit</span>
              <span className="jsy-hero-divider" aria-hidden="true" />
              <span className="jsy-hero-tag">Season Collection</span>
            </div>

            <KineticTitle />

            <p className="jsy-hero-sub">
              The ZYVORA jersey is not merchandise — it is a credential.
              Issued to those who have earned the right to carry the mark.
            </p>

            <div className="jsy-hero-ctas">
              <a href="#stage" className="btn jsy-btn-primary">
                View the kit <Arrow />
              </a>
              <a href="#customise" className="btn jsy-btn-ghost">
                Customise yours
              </a>
            </div>
          </div>

          {/* right: full jersey photo */}
          <div className="jsy-hero-float">
            <div className="jsy-hero-float-glow" />
            <img
              src="/main-jersey.webp"
              alt="ZYVORA official jersey — front and back"
              className="jsy-hero-float-img"
              loading="eager"
            />
          </div>

        </div>

        <div className="jsy-hero-scroll-cue" aria-hidden="true">
          <span className="jsy-scroll-label">Scroll</span>
          <span className="jsy-scroll-line" />
        </div>
      </section>

      {/* ══ §2 INTERACTIVE STAGE ══════════════════════════════════════════════ */}
      <section className="jsy-stage-section" id="stage" ref={stageRef}>
        <div className="jsy-stage-wrap">

          {/* Left: 3D card */}
          <div
            className="jsy-stage-left"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={() => setHovering(true)}
          >
            <canvas ref={canvasRef} className="jsy-canvas" aria-hidden="true" />

            <div
              className={`jsy-card${flipped ? ' jsy-card--flipped' : ''}`}
              ref={cardRef}
            >
              {/* FRONT face */}
              <div className="jsy-face jsy-face-front">
                <div className="jsy-card-bg" />
                <img
                  src={jersey.cleanSrc}
                  alt={jersey.label}
                  className="jsy-card-img"
                  draggable={false}
                />
                <div className="jsy-holo"   aria-hidden="true" />
                <div className="jsy-light"  aria-hidden="true" />
                <div className="jsy-fabric" aria-hidden="true" />
                <div className={`jsy-sweep${hovering ? ' jsy-sweep--run' : ''}`} aria-hidden="true" />
                <div className="jsy-card-badge">
                  <span className="jsy-card-badge-dot" />
                  {jersey.tag}
                </div>
              </div>

              {/* BACK face — jersey dimmed + name/number overlaid on it */}
              <div className="jsy-face jsy-face-back">
                <div className="jsy-card-bg" />
                <img
                  src={jersey.cleanSrc}
                  alt="Jersey back preview"
                  className="jsy-card-img jsy-card-img--back"
                  draggable={false}
                />
                {/* Name + number float over the jersey torso */}
                <div className="jsy-on-jersey" aria-hidden="true">
                  <div className="jsy-on-name">{playerName}</div>
                  <div className="jsy-on-num">{playerNum}</div>
                </div>
                <div className="jsy-fabric" aria-hidden="true" />
              </div>
            </div>

            {/* Controls */}
            <button
              className="jsy-flip-btn"
              onClick={() => setFlipped(f => !f)}
              aria-label={flipped ? 'Show front' : 'Preview on back'}
            >
              <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                <path d="M3 10a7 7 0 1 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M17 10l-2-2.5M17 10l-2 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {flipped ? 'Front view' : 'Back view'}
            </button>

            <div className="jsy-dots" role="tablist" aria-label="Jersey version">
              {JERSEYS.map((j, i) => (
                <button
                  key={j.id}
                  className={`jsy-dot${i === activeIdx ? ' jsy-dot--active' : ''}`}
                  onClick={() => { setActiveIdx(i); setFlipped(false) }}
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={j.season}
                />
              ))}
            </div>
          </div>

          {/* Right: info + customizer */}
          <div className="jsy-stage-right">
            <div className="jsy-stage-eyebrow">
              <span className="jsy-stage-tag">{jersey.season}</span>
              <span className="jsy-stage-year">{jersey.year}</span>
            </div>

            <h2 className="jsy-stage-title">{jersey.label}</h2>
            <p className="jsy-stage-detail">{jersey.detail}</p>

            <div className="jsy-pills">
              {['Roster Exclusive', 'Performance Weave', 'ZYVORA Certified'].map(p => (
                <span key={p} className="jsy-pill">{p}</span>
              ))}
            </div>

            {/* Customization */}
            <div className="jsy-custom" id="customise">
              <div className="jsy-custom-label">
                <span className="jsy-custom-dot" />
                Personalise your back
              </div>

              <div className="jsy-custom-field">
                <label className="jsy-field-label">Player name</label>
                <input
                  className="jsy-field-input"
                  type="text"
                  maxLength={14}
                  value={playerName === 'YOUR NAME' ? '' : playerName}
                  placeholder="YOUR NAME"
                  onChange={e => setPlayerName(e.target.value.toUpperCase() || 'YOUR NAME')}
                  aria-label="Player name"
                />
              </div>

              <div className="jsy-custom-field">
                <label className="jsy-field-label">Squad number (00–99)</label>
                <input
                  className="jsy-num-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={numRaw}
                  placeholder="00"
                  onChange={e => onNumChange(e.target.value)}
                  onBlur={onNumBlur}
                  aria-label="Squad number"
                />
              </div>

              <button className="jsy-preview-btn" onClick={() => setFlipped(true)}>
                Preview on jersey <Arrow />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ §3 CTA ═══════════════════════════════════════════════════════════ */}
      <section className="jsy-cta">
        <div className="jsy-cta-glow" aria-hidden="true" />
        <div className="jsy-cta-inner">
          <LogoMark stroke="rgba(255,106,0,0.35)" size={44} />
          <h2 className="jsy-cta-title">
            Want this jersey<br />
            <span className="jsy-cta-orange">for free?</span>
          </h2>
          <p className="jsy-cta-body">
            Apply to play for ZYVORA. Earn your spot on the roster —
            the jersey comes with it.
          </p>
          <div className="jsy-cta-actions">
            <Link className="btn jsy-btn-primary" to="/players">
              Apply to play <Arrow />
            </Link>
            <Link className="btn jsy-btn-ghost" to="/partner">
              Partner with us
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
