import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  { n: '01', title: 'Custom design', body: 'Built from scratch around your identity — colours, type, layout, feel. Nothing generic.' },
  { n: '02', title: 'Merch storefront', body: 'Drop products, run limited releases, take orders. The revenue is entirely yours.' },
  { n: '03', title: 'Mobile-first', body: 'Your audience is on their phone. Every site we build performs flawlessly on any screen.' },
  { n: '04', title: 'Fast everywhere', body: 'Sub-second load times, optimised assets, clean code. Your site never loses a viewer to lag.' },
  { n: '05', title: 'You own it', body: 'Full ownership of your site and store from day one. We build it, you keep it forever.' },
  { n: '06', title: 'Ongoing support', body: 'Updates, new pages, new drops — we stay on it so you can stay focused on creating.' },
]

const SITE_STYLES = [
  {
    label: 'The Competitor',
    desc: 'Dark, aggressive, precision-built for pro players. High contrast, zero clutter.',
    accent: '#E8401F',
    bg: '#0d0e10',
    bars: ['#1a1c20', '#E8401F', '#1a1c20', '#1a1c20'],
  },
  {
    label: 'The Brand',
    desc: 'Clean, minimal, and professional. Built to attract sponsors and partners.',
    accent: '#15171C',
    bg: '#f5f5f2',
    bars: ['#e4e5e0', '#15171C', '#e4e5e0', '#e4e5e0'],
  },
  {
    label: 'The Creator',
    desc: 'Bold, vibrant, personality-first. Built to turn viewers into fans.',
    accent: '#F4A11A',
    bg: '#0f0a1e',
    bars: ['#1c1432', '#F4A11A', '#1c1432', '#1c1432'],
  },
]

export default function Creators() {
  useReveal()
  return (
    <main>
      {/* dark hero */}
      <section className="creators-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal" style={{ color: 'rgba(236,237,233,.5)' }}>
            <span className="tick-molten" /> Creator sites by ZYVORA
          </div>
          <h1 className="reveal" style={{ color: 'var(--bone)', fontFamily: '"Archivo", sans-serif', fontWeight: 900, fontStretch: 'expanded', fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 1.0, letterSpacing: '-.01em', marginBottom: 24 }}>
            Your internet home,<br />built to <span style={{ color: 'var(--molten)' }}>last</span>.
          </h1>
          <p className="reveal" style={{ color: 'rgba(236,237,233,.65)', fontSize: 18, maxWidth: 540, marginBottom: 36 }}>
            We design and build premium websites for esports creators — complete with a merch store,
            built-in analytics, and a look that sets you apart from everyone on a generic platform.
          </p>
          <div className="cta-row reveal">
            <Link className="btn btn-molten" to="/partner">
              Get your site <Arrow />
            </Link>
            <a className="btn" style={{ background: 'rgba(255,255,255,.08)', color: 'var(--bone)', border: '1px solid rgba(255,255,255,.14)' }} href="#styles">
              See the styles
            </a>
          </div>
        </div>
      </section>

      {/* site style previews */}
      <section id="styles">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> Site aesthetics
            </div>
            <h2 className="fx-head">Three approaches. One standard of quality.</h2>
            <p>Every site is bespoke — these are the creative directions we work in most.</p>
          </div>

          <div className="site-styles reveal">
            {SITE_STYLES.map((s) => (
              <div className="site-style-card" key={s.label}>
                {/* browser mockup */}
                <div className="mock-browser" style={{ background: s.bg }}>
                  <div className="mock-bar">
                    <span className="mock-dot" />
                    <span className="mock-dot" />
                    <span className="mock-dot" />
                    <span className="mock-url">zyvora.cloud/{s.label.toLowerCase().replace('the ', '')}</span>
                  </div>
                  <div className="mock-body">
                    <div className="mock-nav" style={{ background: s.bars[0] }} />
                    <div className="mock-hero-block" style={{ background: s.accent, opacity: .9 }} />
                    <div className="mock-row">
                      <div className="mock-block" style={{ background: s.bars[2] }} />
                      <div className="mock-block" style={{ background: s.bars[3] }} />
                      <div className="mock-block" style={{ background: s.bars[2] }} />
                    </div>
                    <div className="mock-footer-block" style={{ background: s.bars[0] }} />
                  </div>
                </div>
                <div className="site-style-info">
                  <span className="site-style-label">{s.label}</span>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* features */}
      <section style={{ background: 'var(--ink)', color: 'var(--bone)', padding: '96px 0' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow" style={{ color: 'rgba(236,237,233,.45)' }}>
              <span style={{ display: 'inline-block', width: 30, height: 1, background: 'var(--molten)', marginRight: 12, verticalAlign: 'middle' }} /> What's included
            </div>
            <h2 style={{ color: 'var(--bone)' }} className="fx-head">Everything. No add-ons.</h2>
            <p style={{ color: 'rgba(236,237,233,.55)' }}>One price, full site. Here&rsquo;s what&rsquo;s in every build.</p>
          </div>
          <div className="creator-features reveal">
            {FEATURES.map((f) => (
              <div className="creator-feat" key={f.n}>
                <span className="creator-feat-n">{f.n}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="cta-band" id="join">
        <div className="wrap reveal">
          <div className="eyebrow eyebrow-flex center">
            <span className="tick-molten" /> Ready to build
          </div>
          <h2>Let&rsquo;s build your <span className="molten">site</span>.</h2>
          <p>Tell us about your content, your audience, and what you&rsquo;re building — we&rsquo;ll handle the rest.</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-molten" to="/partner">
              Start a conversation <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
