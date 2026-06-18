import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, LogoMark } from './Icons'
import gsap from 'gsap'

// ── Logo shape targets sampled from LogoMark SVG (30×30 viewBox)
// Hexagon: M15 1.5 27.5 8v14L15 28.5 2.5 22V8L15 1.5Z
// Z mark:  M9 10h12l-9 7h9
function buildLogoTargets(cx: number, cy: number, scale: number) {
  const hex: [number, number][] = [
    [15, 1.5], [27.5, 8], [27.5, 22], [15, 28.5], [2.5, 22], [2.5, 8],
  ]
  const pts: [number, number][] = []

  for (let i = 0; i < hex.length; i++) {
    const [ax, ay] = hex[i]
    const [bx, by] = hex[(i + 1) % hex.length]
    for (let t = 0; t < 1; t += 0.065) {
      pts.push([ax + (bx - ax) * t, ay + (by - ay) * t])
    }
  }

  const zSegs: [[number, number], [number, number]][] = [
    [[9, 10], [21, 10]],
    [[21, 10], [12, 17]],
    [[12, 17], [21, 17]],
  ]
  for (const [[ax, ay], [bx, by]] of zSegs) {
    for (let t = 0; t <= 1; t += 0.09) {
      pts.push([ax + (bx - ax) * t, ay + (by - ay) * t])
    }
  }

  return pts.map(([px, py]) => ({
    x: cx + (px - 15) * scale,
    y: cy + (py - 15) * scale,
  }))
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  tx: number; ty: number
  hx: number; hy: number
  size: number
  opacity: number
  orange: boolean
  trail: { x: number; y: number }[]
}

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const sweepRef   = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([])
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctasRef    = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const scrollRef  = useRef<HTMLDivElement>(null)
  const parts      = useRef<Particle[]>([])
  const phase      = useRef<0 | 1 | 2>(0)
  const rafId      = useRef<number>(0)
  const tlRef      = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile  = window.innerWidth < 768

    function initParticles() {
      const W = canvas!.width, H = canvas!.height
      const cx = W / 2, cy = H * 0.42
      const logoScale = Math.min(W, H) * 0.105
      const targets = buildLogoTargets(cx, cy, logoScale)
      const count = mobile ? 85 : 210

      parts.current = Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2
        const dist  = 60 + Math.random() * Math.max(W, H) * 0.48
        const tgt   = targets[i % targets.length]
        const jx    = tgt.x + (Math.random() - 0.5) * 6
        const jy    = tgt.y + (Math.random() - 0.5) * 6
        return {
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          tx: jx, ty: jy,
          hx: jx + (Math.random() - 0.5) * 24,
          hy: jy + (Math.random() - 0.5) * 24,
          size: 0.7 + Math.random() * 1.6,
          opacity: 0.22 + Math.random() * 0.78,
          orange: Math.random() > 0.67,
          trail: [],
        }
      })
    }

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
    resize()
    window.addEventListener('resize', resize)

    const ctx = canvas.getContext('2d')!
    let lastT = 0

    const tick = (ts: number) => {
      rafId.current = requestAnimationFrame(tick)
      if (mobile && ts - lastT < 34) return
      lastT = ts
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const ph = phase.current

      for (const p of parts.current) {
        if (ph === 0) {
          p.vx += (Math.random() - 0.5) * 0.055
          p.vy += (Math.random() - 0.5) * 0.055 - 0.003
          p.vx *= 0.972; p.vy *= 0.972
          p.x += p.vx;   p.y += p.vy
          if (p.x < -20) p.x = W + 20
          if (p.x > W + 20) p.x = -20
          if (p.y < -20) p.y = H + 20
          if (p.y > H + 20) p.y = -20
        } else if (ph === 1) {
          const dx = p.tx - p.x, dy = p.ty - p.y
          p.vx += dx * 0.062; p.vy += dy * 0.062
          p.vx *= 0.79; p.vy *= 0.79
          p.x += p.vx; p.y += p.vy
          p.trail.unshift({ x: p.x, y: p.y })
          if (p.trail.length > 9) p.trail.pop()
        } else {
          const dx = p.hx - p.x, dy = p.hy - p.y
          p.vx += dx * 0.0035 + (Math.random() - 0.5) * 0.09
          p.vy += dy * 0.0035 + (Math.random() - 0.5) * 0.09
          p.vx *= 0.91; p.vy *= 0.91
          p.x += p.vx; p.y += p.vy
          p.hx += (p.tx - p.hx) * 0.0018 + (Math.random() - 0.5) * 0.28
          p.hy += (p.ty - p.hy) * 0.0018 + (Math.random() - 0.5) * 0.28
        }

        const baseAlpha = ph === 0 ? p.opacity * 0.3 : p.opacity
        const rgb = p.orange ? '255,106,0' : '255,255,255'

        if (ph === 1 && p.trail.length > 1) {
          for (let j = 0; j < p.trail.length - 1; j++) {
            const ta = ((p.trail.length - j) / p.trail.length) * p.opacity * 0.22
            ctx.beginPath()
            ctx.arc(p.trail[j].x, p.trail[j].y, p.size * 0.4, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${rgb},${ta})`
            ctx.fill()
          }
        }

        if (p.orange) { ctx.shadowBlur = 7; ctx.shadowColor = 'rgba(255,106,0,0.45)' }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${baseAlpha})`
        ctx.fill()
        ctx.shadowBlur = 0
        if (ph !== 1) p.trail = []
      }

      // ambient sparks near logo
      if (ph === 2 && Math.random() < 0.028) {
        const cx = W / 2, cy = H * 0.42
        const s = Math.min(W, H) * 0.105
        const a = Math.random() * Math.PI * 2
        const r = s * (0.35 + Math.random() * 1.0)
        ctx.beginPath()
        ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r,
          0.8 + Math.random() * 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,106,0,${0.45 + Math.random() * 0.55})`
        ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(255,106,0,0.65)'
        ctx.fill(); ctx.shadowBlur = 0
      }
    }

    rafId.current = requestAnimationFrame(tick)

    // ── GSAP sequence ──────────────────────────────────────────
    if (reduced) {
      gsap.set([logoRef.current, subRef.current, ctasRef.current, statsRef.current], { opacity: 1 })
      wordsRef.current.forEach(w => w && gsap.set(w, { clipPath: 'inset(0 0% 0 0)' }))
      videoRef.current && gsap.set(videoRef.current, { opacity: 0.22 })
      phase.current = 2
    } else {
      const tl = gsap.timeline()
      tlRef.current = tl

      // video breathes in
      tl.to(videoRef.current, { opacity: 0.22, duration: 2.6, ease: 'power1.inOut' }, 0.5)

      // 1.15s → gather
      tl.call(() => { phase.current = 1 }, [], 1.15)

      // 2.05s → logo materialises
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.82, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' },
        2.05
      )

      // 2.48s → energy sweep
      tl.set(sweepRef.current, { opacity: 1 }, 2.44)
      tl.fromTo(sweepRef.current, { left: '-6px' }, { left: '104%', duration: 0.4, ease: 'power3.in' }, 2.46)
      tl.set(sweepRef.current, { opacity: 0 }, 2.9)

      // 2.62s → ambient phase
      tl.call(() => { phase.current = 2 }, [], 2.62)

      // forge words in sequence
      wordsRef.current.forEach((word, i) => {
        if (!word) return
        const t = 2.52 + i * 0.19
        tl.fromTo(
          word,
          { clipPath: 'inset(0 100% 0 0)', x: -12, skewX: -4 },
          { clipPath: 'inset(0 0% 0 0)', x: 0, skewX: 0, duration: 0.48, ease: 'power4.out' },
          t
        )
        // rattle glitch
        tl.to(word, { x: 5, duration: 0.03, yoyo: true, repeat: 3, ease: 'none' }, t + 0.48)
        tl.to(word, { x: 0, duration: 0.06 }, t + 0.62)
      })

      tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 3.28)
      tl.fromTo(ctasRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.48, ease: 'power3.out' }, 3.5)
      tl.fromTo(statsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.44, ease: 'power3.out' }, 3.72)
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.38 }, 4.3)
    }

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', resize)
      tlRef.current?.kill()
    }
  }, [])

  return (
    <section className="hero-cinematic">

      <video
        ref={videoRef}
        className="hero-bg-video"
        autoPlay muted loop playsInline preload="auto"
        poster="/landing-poster.jpg"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <source src="/landing-video.webm" type="video/webm" />
        <source src="/landing-video-fast.mp4" type="video/mp4" />
      </video>

      <div className="hero-v-overlay" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div ref={sweepRef} className="hero-sweep" style={{ opacity: 0 }} aria-hidden="true" />
      <div className="hero-scanlines" aria-hidden="true" />

      <div className="hero-content">

        <div ref={logoRef} className="hero-logo-lockup" style={{ opacity: 0 }}>
          <LogoMark stroke="#ECEDE9" size={38} />
          <span className="hero-logo-name">
            ZY<span className="hero-logo-v">V</span>ORA<span className="hero-logo-v">.</span>
          </span>
        </div>

        <h1 className="hero-h1">
          {(['FORGE', 'THE', 'FUTURE.'] as const).map((w, i) => (
            <span
              key={w}
              ref={el => { wordsRef.current[i] = el }}
              className="hero-word"
              data-text={w}
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              {w}
            </span>
          ))}
        </h1>

        <p ref={subRef} className="hero-sub" style={{ opacity: 0 }}>
          ZYVORA runs official esports rooms for broadcast productions
          and builds the internet homes where creators grow their brand.
        </p>

        <div ref={ctasRef} className="hero-ctas" style={{ opacity: 0 }}>
          <Link className="btn hero-btn-fire" to="/players">
            Join the roster <Arrow />
          </Link>
          <Link className="btn hero-btn-glass" to="/partner">
            Partner with us
          </Link>
        </div>

        <div ref={statsRef} className="hero-stats" style={{ opacity: 0 }}>
          <div className="hero-stat">
            <span className="hero-stat-v">S1</span>
            <span className="hero-stat-l">Season loading</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-v">Bot</span>
            <span className="hero-stat-l">Fully automated</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-v" style={{ color: '#FF6A00' }}>Live</span>
            <span className="hero-stat-l">Broadcast overlay</span>
          </div>
        </div>

      </div>

      <div ref={scrollRef} className="hero-scroll" style={{ opacity: 0 }} aria-hidden="true">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-lbl">Scroll</span>
      </div>

      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  )
}
