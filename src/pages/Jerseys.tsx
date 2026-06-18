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
  if (particles.length > 80) return
  const angle = Math.random() * Math.PI * 2
  const speed = Math.random() * 2 + 0.5
  particles.push({
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1.4,
    life: 1, maxLife: 1,
    size: Math.random() * 4 + 1,
    hue: Math.random() * 30,
  })
}

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
  const [hovering, setHovering] = useState(false)

  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const wrapRef      = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])

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
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life -= 0.02
        if (p.life <= 0) { ps.splice(i, 1); continue }
        const a = p.life / p.maxLife
        ctx2d.save()
        ctx2d.globalAlpha = a * 0.9
        ctx2d.shadowColor = `hsl(${18 + p.hue},100%,58%)`
        ctx2d.shadowBlur  = 10
        ctx2d.fillStyle   = `hsl(${18 + p.hue},100%,${58 + p.hue * 0.5}%)`
        ctx2d.beginPath()
        ctx2d.arc(p.x, p.y, p.size * a, 0, Math.PI * 2)
        ctx2d.fill()
        ctx2d.restore()
      }
    }
    animId = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // ── Mouse: dual-depth parallax + holographic + particles ─────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const r  = wrap.getBoundingClientRect()
    const nx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
    const ny = (e.clientY - r.top  - r.height / 2) / (r.height / 2)

    // Primary card: strong tilt | secondary card: half-intensity (depth separation)
    wrap.style.setProperty('--rx',  `${-ny * 15}deg`)
    wrap.style.setProperty('--ry',  `${nx  * 15}deg`)
    wrap.style.setProperty('--rx2', `${-ny *  7}deg`)
    wrap.style.setProperty('--ry2', `${nx  *  7}deg`)
    wrap.style.setProperty('--holo-angle',
      `${Math.atan2(e.clientY - r.top - r.height/2, e.clientX - r.left - r.width/2) * (180 / Math.PI)}deg`)
    wrap.style.setProperty('--lx', `${((e.clientX - r.left) / r.width)  * 100}%`)
    wrap.style.setProperty('--ly', `${((e.clientY - r.top)  / r.height) * 100}%`)

    const cv = canvasRef.current
    if (cv) {
      const cr = cv.getBoundingClientRect()
      for (let i = 0; i < 4; i++)
        spawnParticle(e.clientX - cr.left, e.clientY - cr.top, particlesRef.current)
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    setHovering(false)
    const wrap = wrapRef.current
    if (!wrap) return
    wrap.style.setProperty('--rx',  '0deg')
    wrap.style.setProperty('--ry',  '0deg')
    wrap.style.setProperty('--rx2', '0deg')
    wrap.style.setProperty('--ry2', '0deg')
  }, [])

  return (
    <main className="jsy-page">

      {/* ══ §1 HERO ══════════════════════════════════════════════════════════ */}
      <section className="jsy-hero">
        <div className="jsy-hero-grid">

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
              <Link className="btn jsy-btn-ghost" to="/players">
                Apply to play
              </Link>
            </div>
          </div>

          <div className="jsy-hero-float">
            <div className="jsy-hero-float-glow" />
            <img
              src="/main-jersey.webp"
              alt="ZYVORA official jersey"
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

      {/* ══ §2 STAGE ═════════════════════════════════════════════════════════ */}
      <section className="jsy-stage-section" id="stage">
        <div className="jsy-stage-wrap">

          {/* Left: dual 3D jersey showcase */}
          <div className="jsy-stage-left">
            <div
              className="jsy-duo-wrap"
              ref={wrapRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              onMouseEnter={() => setHovering(true)}
            >
              <canvas ref={canvasRef} className="jsy-canvas" aria-hidden="true" />

              {/* Ambient glows */}
              <div className="jsy-duo-glow jsy-duo-glow--a" aria-hidden="true" />
              <div className="jsy-duo-glow jsy-duo-glow--b" aria-hidden="true" />

              {/* Secondary card — white edition, behind */}
              <div className="jsy-duo-card jsy-duo-card--secondary">
                <div className="jsy-duo-card-bg jsy-duo-card-bg--light" />
                <img
                  src="/main-jersey.webp"
                  alt="ZYVORA white edition jersey"
                  className="jsy-duo-img"
                  draggable={false}
                />
                <div className="jsy-holo"   aria-hidden="true" />
                <div className={`jsy-sweep${hovering ? ' jsy-sweep--run' : ''}`} aria-hidden="true" />
                <span className="jsy-duo-label">WHITE EDITION</span>
              </div>

              {/* Primary card — dark jersey, front */}
              <div className="jsy-duo-card jsy-duo-card--primary">
                <div className="jsy-duo-card-bg" />
                <img
                  src="/jersey-4-removebg.webp"
                  alt="ZYVORA forge jersey"
                  className="jsy-duo-img"
                  draggable={false}
                />
                <div className="jsy-holo"   aria-hidden="true" />
                <div className="jsy-light"  aria-hidden="true" />
                <div className="jsy-fabric" aria-hidden="true" />
                <div className={`jsy-sweep${hovering ? ' jsy-sweep--run' : ''}`} aria-hidden="true" />
                <span className="jsy-duo-label jsy-duo-label--orange">THE FORGE KIT</span>
              </div>
            </div>
          </div>

          {/* Right: info */}
          <div className="jsy-stage-right">
            <div className="jsy-stage-eyebrow">
              <span className="jsy-stage-tag">Season 01</span>
              <span className="jsy-stage-year">2025</span>
            </div>

            <h2 className="jsy-stage-title">THE FORGE KIT</h2>
            <p className="jsy-stage-detail">
              Dual-layer performance weave. Heat-bonded ZYVORA crest.
              Worn by every player who competes under the mark.
            </p>

            <div className="jsy-pills">
              {['Roster Exclusive', 'Performance Weave', 'ZYVORA Certified'].map(p => (
                <span key={p} className="jsy-pill">{p}</span>
              ))}
            </div>

            <div className="jsy-duo-specs">
              <div className="jsy-spec">
                <span className="jsy-spec-val">2</span>
                <span className="jsy-spec-key">Editions</span>
              </div>
              <div className="jsy-spec-div" />
              <div className="jsy-spec">
                <span className="jsy-spec-val">100%</span>
                <span className="jsy-spec-key">Roster Only</span>
              </div>
              <div className="jsy-spec-div" />
              <div className="jsy-spec">
                <span className="jsy-spec-val">0₹</span>
                <span className="jsy-spec-key">If you earn it</span>
              </div>
            </div>

            <Link className="btn jsy-btn-primary jsy-duo-cta" to="/players">
              Apply to play for free <Arrow />
            </Link>
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
