import { useState } from 'react'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const PERKS = [
  {
    ref: '/ 01',
    title: 'Compete on broadcast-grade events',
    body: 'Play official, professionally produced Free Fire tournaments — not backroom customs.',
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

const DEVICES = ['Android phone', 'iPhone', 'Tablet', 'Other']

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')
}

export default function Play() {
  useReveal()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload: Record<string, string> = { 'form-name': 'roster' }
    data.forEach((value, key) => {
      payload[key] = typeof value === 'string' ? value : ''
    })
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })
      setStatus(res.ok ? 'ok' : 'error')
      if (res.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <main>
      {/* hero */}
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal">
            <span className="tick-molten" /> For Nepali Free Fire players
          </div>
          <h1 className="reveal">
            Play for <span className="molten">ZYVORA</span>.
          </h1>
          <p className="lede reveal">
            We&rsquo;re building Nepal&rsquo;s sharpest Free Fire roster — backed by real production,
            real coaching, and a real platform to grow on. If you&rsquo;ve got the skill and the grind,
            we want to see you.
          </p>
          <div className="cta-row reveal">
            <a className="btn btn-molten" href="#apply">
              Apply now
              <Arrow />
            </a>
            <a className="btn btn-ghost" href="#perks">
              See the perks
            </a>
          </div>
        </div>
      </section>

      {/* perks */}
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

      {/* apply */}
      <section className="contact" id="apply">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> Tryout application
            </div>
            <h2 className="fx-head">Fill this out to get on our radar.</h2>
            <p>
              Be honest — we verify. If you&rsquo;re a fit, we&rsquo;ll reach out about scrims and
              tryouts.
            </p>
          </div>

          {status === 'ok' ? (
            <div className="form-success reveal" role="status">
              <strong>Application received.</strong>
              <p>
                Thanks for putting your name in. If you match what we&rsquo;re looking for, we&rsquo;ll
                reach out about a tryout. Keep grinding.
              </p>
            </div>
          ) : (
            <form
              className="form reveal"
              name="roster"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="roster" />
              <p hidden>
                <label>
                  Don&rsquo;t fill this out: <input name="bot-field" />
                </label>
              </p>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="age">Age</label>
                  <input id="age" name="age" type="number" min={10} max={60} required />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="uid">Free Fire UID</label>
                  <input id="uid" name="uid" type="text" inputMode="numeric" required />
                </div>
                <div className="field">
                  <label htmlFor="device">Device</label>
                  <select id="device" name="device" defaultValue={DEVICES[0]}>
                    {DEVICES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="years_game">Years playing Free Fire</label>
                  <input id="years_game" name="years_on_game" type="number" min={0} max={20} required />
                </div>
                <div className="field">
                  <label htmlFor="years_esports">Years in Free Fire esports</label>
                  <input
                    id="years_esports"
                    name="years_in_esports"
                    type="number"
                    min={0}
                    max={20}
                    required
                  />
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
                  Something went wrong sending that. Reach us on Discord instead.
                </p>
              )}

              <button className="btn btn-molten submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Submit application'}
                <Arrow />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
