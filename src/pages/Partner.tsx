import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const VALUE = [
  {
    ref: '/ 01',
    title: 'Production-grade room automation',
    body:
      'Our bots run the official Free Fire room end to end — lobby, slotting, live scoring, results — so your crew never touches a spreadsheet mid-broadcast.',
  },
  {
    ref: '/ 02',
    title: 'Real-time broadcast data',
    body:
      'Clean standings, kill feeds, and overlays piped straight to your stream the moment they happen. No manual entry, no lag.',
  },
  {
    ref: '/ 03',
    title: 'Reliability under pressure',
    body:
      'Built for live. Redundant, monitored, and tested in the room before you go on air — no missed scores, no dead air.',
  },
  {
    ref: '/ 04',
    title: 'A creator network',
    body:
      'Beyond the room, we build and run the websites and merch stores for a growing roster of Free Fire creators.',
  },
]

const PARTNERS = [
  {
    lab: 'Broadcast productions',
    body: 'You bring the show and the cameras — we run the room and feed you clean, live data and overlays.',
  },
  {
    lab: 'Tournament organizers',
    body: 'Automate operations end to end: registration, slotting, scoring, and results, all hands-off.',
  },
  {
    lab: 'Brands & sponsors',
    body: 'Get your name on broadcast-grade Free Fire events with reliable production behind them.',
  },
  {
    lab: 'Creators',
    body: 'Your own site, your own store, your own stage — built and maintained by us, owned by you.',
  },
]

const STEPS = [
  'Tell us about your event, brand, or channel.',
  'We scope the automation and how it plugs into your broadcast.',
  'We deploy and test the bots inside your official room.',
  'You go live — we keep everything running.',
]

const PARTNER_TYPES = ['Broadcast production', 'Tournament organizer', 'Brand / sponsor', 'Creator', 'Other']

const W3F_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? ''

export default function Partner() {
  useReveal()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

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
          subject: `New Partner Enquiry — ${d.get('name')}`,
          from_name: 'ZYVORA Partner Form',
          'Name': d.get('name'),
          'Organization': d.get('organization') || '—',
          'Email': d.get('email'),
          'Partner Type': d.get('partner_type'),
          'Message': d.get('message'),
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
      {/* hero */}
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal">
            <span className="tick-molten" /> For productions, brands &amp; creators
          </div>
          <h1 className="reveal">
            Partner with <span className="molten">ZYVORA</span>.
          </h1>
          <p className="lede reveal">
            We run the automation behind official Free Fire rooms and build the homes where creators
            sell their merch. If you produce events, represent a brand, or create content — here&rsquo;s
            how we work together.
          </p>
          <div className="cta-row reveal">
            <a className="btn btn-molten" href="#contact">
              Start a conversation
              <Arrow />
            </a>
            <Link className="btn btn-ghost" to="/#work">
              See what we do
            </Link>
          </div>
        </div>
      </section>

      {/* value */}
      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> What we bring
            </div>
            <h2 className="fx-head">Built to make your broadcast effortless.</h2>
            <p>
              Everything we ship is designed for the moment the cameras are rolling — accurate,
              automatic, and on time.
            </p>
          </div>
          <div className="manifest reveal">
            {VALUE.map((v) => (
              <div className="cap" key={v.ref}>
                <span className="ref">{v.ref}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* who */}
      <section className="who">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> Who we partner with
            </div>
            <h2 className="fx-head">Four ways in.</h2>
          </div>
          <div className="ptypes reveal">
            {PARTNERS.map((p) => (
              <div className="ptype" key={p.lab}>
                <span className="lab">{p.lab}</span>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how */}
      <section>
        <div className="wrap tour-grid">
          <div className="tour-copy reveal">
            <div className="eyebrow eyebrow-flex">
              <span className="tick-molten" /> How it works
            </div>
            <h2 className="fx-head">From intro to on-air.</h2>
            <ul>
              {STEPS.map((s, i) => (
                <li key={i}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bracket reveal" aria-label="Sample room automation log">
            <div className="match win"><span>Official room created</span><span className="score">OK</span></div>
            <div className="match win"><span>Squads slotted</span><span className="score">OK</span></div>
            <div className="match win"><span>Scores captured</span><span className="score">OK</span></div>
            <div className="match"><span>Feeding broadcast</span><span className="live">&#9679; LIVE</span></div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> Start a conversation
            </div>
            <h2 className="fx-head">Let&rsquo;s build something.</h2>
            <p>Tell us a little about what you&rsquo;re working on and we&rsquo;ll get back to you.</p>
          </div>

          {status === 'ok' ? (
            <div className="form-success reveal" role="status">
              <strong>Thanks — message received.</strong>
              <p>We&rsquo;ll be in touch shortly. In the meantime, feel free to reach us on Discord.</p>
            </div>
          ) : (
            <form className="form reveal" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="org">Organization</label>
                  <input id="org" name="organization" type="text" autoComplete="organization" />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="ptype">I&rsquo;m a…</label>
                  <select id="ptype" name="partner_type" defaultValue={PARTNER_TYPES[0]}>
                    {PARTNER_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">What are you working on?</label>
                <textarea id="message" name="message" required />
              </div>

              {status === 'error' && (
                <p className="form-error" role="alert">
                  Something went wrong sending that. Email us at partner@zyvora.cloud instead.
                </p>
              )}

              <button className="btn btn-molten submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <Arrow />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
