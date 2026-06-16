import { useCallback, useState } from 'react'
import { Toast } from '../components/Toast'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const PERKS = [
  {
    ref: '/ 01',
    title: 'Compete on broadcast-grade events',
    body: 'Play in officially produced, professionally broadcast tournaments — not backroom customs.',
  },
  {
    ref: '/ 02',
    title: 'Your own creator page',
    body: 'We build you a personal site and merch store to grow your brand and earn from it.',
  },
  {
    ref: '/ 03',
    title: 'Scrims & coaching',
    body: 'Structured practice, VOD review, and a squad to grind with — not just solo queue.',
  },
  {
    ref: '/ 04',
    title: 'Spotlight',
    body: 'Featured on ZYVORA broadcasts, socials, and highlight reels in front of real audiences.',
  },
  {
    ref: '/ 05',
    title: 'Earnings that are yours',
    body: 'Prize splits, sponsor deals, and merch revenue — transparent, and in your pocket.',
  },
  {
    ref: '/ 06',
    title: 'A real org behind you',
    body: 'Logistics, automation, and production handled by us, so you can just focus on playing.',
  },
]

const ROLES = ['Primary Rusher', 'Secondary Rusher', 'Sniper', 'Nader']
const DEVICES = ['Android', 'iOS']
const W3F_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '97995862-6697-4e79-9bfc-cbc68388cf53'

export default function Play() {
  useReveal()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [role, setRole] = useState(ROLES[0])
  const [device, setDevice] = useState(DEVICES[0])
  const closeToast = useCallback(() => setStatus('idle'), [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          subject: `New Player Application — ${d.get('name')}`,
          from_name: 'ZYVORA Players Form',
          'Player Name': d.get('name'),
          'Game UID': d.get('uid'),
          'Years of Experience in eSports': d.get('years_esports'),
          'Role': role,
          'Device': device,
          'Contact (Discord / WhatsApp)': d.get('contact'),
        }),
      })
      const json = await res.json()
      setStatus(json.success ? 'ok' : 'error')
      if (json.success) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal">
            <span className="tick-molten" /> Join the roster
          </div>
          <h1 className="reveal">
            Play for <span className="molten">ZYVORA</span>.
          </h1>
          <p className="lede reveal">
            We&rsquo;re building a sharp, competitive esports roster — backed by real production,
            real coaching, and a platform to grow on. If you&rsquo;ve got the skill and the grind,
            we want to see you.
          </p>
          <div className="cta-row reveal">
            <a className="btn btn-molten" href="#apply">
              Apply now <Arrow />
            </a>
            <a className="btn btn-ghost" href="#perks">
              See what you get
            </a>
          </div>
        </div>
      </section>

      <section id="perks">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> What you get
            </div>
            <h2 className="fx-head">More than a jersey.</h2>
            <p>Repping ZYVORA means an org that invests in you on and off the battlefield.</p>
          </div>
          <div className="perks reveal">
            {PERKS.map((p) => (
              <div className="perk" key={p.ref}>
                <span className="ref">{p.ref}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="apply">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> Tryout application
            </div>
            <h2 className="fx-head">Fill this out to get on our radar.</h2>
            <p>Be honest — we verify. If you&rsquo;re a fit, we&rsquo;ll reach out about tryouts.</p>
          </div>

          {status === 'ok' && (
            <Toast
              message="Application received!"
              sub="We'll review your details and get back to you shortly."
              onClose={closeToast}
            />
          )}

          <form className="form reveal" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="uid">Game UID</label>
                <input id="uid" name="uid" type="text" inputMode="numeric" required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="years_esports">Years of experience in eSports</label>
              <input id="years_esports" name="years_esports" type="number" min={0} max={20} required />
            </div>

            <div className="field">
              <label>Role</label>
              <div className="player-options">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    key={r}
                    className={`player-opt${role === r ? ' on' : ''}`}
                    aria-pressed={role === r}
                    onClick={() => setRole(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Device</label>
              <div className="player-options">
                {DEVICES.map((d) => (
                  <button
                    type="button"
                    key={d}
                    className={`player-opt${device === d ? ' on' : ''}`}
                    aria-pressed={device === d}
                    onClick={() => setDevice(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact">Contact (Discord or WhatsApp)</label>
              <input id="contact" name="contact" type="text" required />
            </div>

            <p className="form-note">
              Under 18? You&rsquo;ll need a parent or guardian&rsquo;s consent before signing with us.
            </p>

            {status === 'error' && (
              <p className="form-error" role="alert">
                Something went wrong. Reach us on Discord instead.
              </p>
            )}

            <button className="btn btn-molten submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Submit application'}
              <Arrow />
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
