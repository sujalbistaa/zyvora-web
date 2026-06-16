import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  {
    n: '01',
    title: 'Auto point tracking',
    body: 'Points scored by every player, every match, captured and tallied the moment they happen. Zero manual entry.',
  },
  {
    n: '02',
    title: 'MVP recognition',
    body: 'Best performer is automatically identified after each match — ready to display on stream before the next one starts.',
  },
  {
    n: '03',
    title: 'Kill feed',
    body: 'Total kills logged per player, per match, in real time. The data is always current, always clean.',
  },
  {
    n: '04',
    title: 'Match management',
    body: 'Room creation, player slotting, match start — fully automated. The bot handles the room so your crew handles the show.',
  },
  {
    n: '05',
    title: 'Live overlay feed',
    body: 'Standings, leaderboards, and kill data pushed to the broadcast overlay in real time. Viewers see it as it happens.',
  },
  {
    n: '06',
    title: 'Results compilation',
    body: 'Final standings, top performers, and match summaries generated and exported the moment the tournament ends.',
  },
]

const LOG = [
  { text: 'ZYVORA BOT v2 — ACTIVE', live: false, dim: true },
  { text: 'Official room created — 48 slots', live: false, dim: false },
  { text: 'All squads slotted — match start confirmed', live: false, dim: false },
  { text: 'Match 3 underway — tracking kills', live: false, dim: false },
  { text: 'Kill registered › Squad 7 player (+1) — total 9', live: false, dim: false },
  { text: 'MVP computed › Squad 12 — 14 kills this match', live: false, dim: false },
  { text: 'Standings updated — pushing to broadcast overlay', live: false, dim: false },
  { text: 'Match 3 complete — results broadcast', live: true, dim: false },
]

export default function Bots() {
  useReveal()
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal">
            <span className="tick-molten" /> ZYVORA Bots
          </div>
          <h1 className="reveal">
            Automation that <span className="molten">never</span> misses.
          </h1>
          <p className="lede reveal">
            Our bots run the full lifecycle of an official esports room — from lobby creation to final
            results broadcast — without a single manual input. Built for live. Built to scale.
          </p>
          <div className="cta-row reveal">
            <Link className="btn btn-molten" to="/partner">
              Partner with us <Arrow />
            </Link>
            <a className="btn btn-ghost" href="#features">
              See the features
            </a>
          </div>
        </div>
      </section>

      {/* live terminal demo */}
      <section id="automation">
        <div className="wrap tour-grid">
          <div className="bot-terminal reveal" aria-label="Bot activity log">
            <div className="bot-term-bar">
              <span className="bot-term-dot" />
              <span className="bot-term-dot" />
              <span className="bot-term-dot" />
              <span className="bot-term-title">zyvora-bot — live</span>
            </div>
            <div className="bot-term-body">
              {LOG.map((line, i) => (
                <div key={i} className={`bot-log-line${line.dim ? ' dim' : ''}${line.live ? ' live-line' : ''}`}>
                  <span className="bot-prompt">{line.live ? '●' : '›'}</span>
                  {line.text}
                  {line.live && <span className="live" style={{ marginLeft: 12 }}>LIVE</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="tour-copy reveal">
            <div className="eyebrow eyebrow-flex">
              <span className="tick-molten" /> Inside the room
            </div>
            <h2 className="fx-head">We don&rsquo;t host. We automate.</h2>
            <ul>
              {[
                'A broadcast production brings the event — we bring the bots.',
                'Our bots run the official room: lobby, slotting, live scoring, results.',
                'Clean data and overlays flow to the broadcast, in real time.',
              ].map((s, i) => (
                <li key={i}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span> {s}
                </li>
              ))}
            </ul>
            <Link className="btn btn-molten" to="/partner">
              Get our bots on your event <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* feature grid */}
      <section id="features">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> What the bots do
            </div>
            <h2 className="fx-head">Six things, done automatically.</h2>
            <p>Every feature runs in real time, in the official room, with no human in the loop.</p>
          </div>
          <div className="bot-features reveal">
            {FEATURES.map((f) => (
              <div className="bot-feat" key={f.n}>
                <span className="bot-feat-n">{f.n}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap reveal">
          <div className="eyebrow eyebrow-flex center">
            <span className="tick-molten" /> Deploy bots
          </div>
          <h2>Ready to <span className="molten">automate</span> your event?</h2>
          <p>Whether you&rsquo;re a broadcast production or a tournament organiser — let&rsquo;s talk about deploying ZYVORA bots on your next event.</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-molten" to="/partner">
              Partner with us <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
