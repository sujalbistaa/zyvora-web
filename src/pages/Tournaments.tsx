import { useState, useEffect, useRef, Fragment } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Arrow } from '../components/Icons'

const TOURNAMENT_DATE = new Date('2026-07-15T10:00:00+05:45')
const TOTAL_SLOTS = 16
const SLOTS_REMAINING = 4

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    done: diff === 0,
  }
}

function useCountdown(target: Date) {
  const [time, setTime] = useState(() => getRemaining(target))
  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

const pad = (n: number) => String(n).padStart(2, '0')

const OVERVIEW = [
  {
    n: '01',
    icon: '⚔️',
    title: 'Format',
    body: 'Battle Royale — Squad (4 members). Two-day event: group qualifiers on Day 1, Grand Finals on Day 2. Top 8 teams advance.',
  },
  {
    n: '02',
    icon: '🏆',
    title: 'Match Structure',
    body: 'Day 1: 2 matches per group. Day 2: 3 Grand Final matches. Cumulative points across all matches determine the winner.',
  },
  {
    n: '03',
    icon: '👥',
    title: 'Team Requirements',
    body: '4 registered members. Minimum account level 30. No roster changes after confirmation. All players must be on ZYVORA Discord.',
  },
]

const PRIZES = [
  { place: '2nd', emoji: '🥈', amount: '₹3,000', pct: '30% of pool', cls: 'tnmt-prize-second' },
  { place: '1st', emoji: '🥇', amount: '₹5,000', pct: '50% of pool', cls: 'tnmt-prize-first', crown: true },
  { place: '3rd', emoji: '🥉', amount: '₹2,000', pct: '20% of pool', cls: 'tnmt-prize-third' },
]

const SCHEDULE = [
  { date: 'Jul 10', title: 'Registration Closes', desc: 'Final deadline. Late entries not accepted.' },
  { date: 'Jul 12', title: 'Team Confirmation', desc: 'Confirmed squads published on Discord.' },
  { date: 'Jul 13', title: 'Briefing Session', desc: 'Rules walkthrough on Discord voice channel.' },
  { date: 'Jul 15', title: 'Day 1 — Qualifiers', desc: 'Groups A & B play. Top 8 teams advance.' },
  { date: 'Jul 16', title: 'Day 2 — Grand Finals', desc: 'Top 8 squads. 3 matches. Winner takes all.' },
]

const RULES = [
  'All 4 team members must be registered before the deadline. No substitutions after confirmation.',
  'Only the registered team leader may communicate with room admins during matches.',
  'Use of hacks, mods, third-party tools, or exploits results in immediate permanent disqualification.',
  'Teams must be ready in the lobby 10 minutes before scheduled match time.',
  'Scoring: Booyah = 12 pts · 2nd = 9 · 3rd = 7 · 4th = 5 · 5th = 3. Each kill = 1 pt.',
  'Teaming, stream sniping, or unsportsmanlike conduct results in disqualification from all ZYVORA events.',
  'Room admin decisions are final. No disputes entertained after results are published.',
  'All participants must be active in the ZYVORA Discord throughout the event.',
]

const FAQ = [
  {
    q: 'Who can participate?',
    a: 'Any Free Fire player with a valid in-game ID. Teams must have exactly 4 active members registered before the deadline. Solo or incomplete team registration is not accepted.',
  },
  {
    q: 'How do I register my team?',
    a: "Click Register Now and join the ZYVORA Discord. Open a ticket in #tournament-registration, provide your team name, leader contact, and all 4 member IDs. You'll receive confirmation within 24 hours.",
  },
  {
    q: 'Is there an entry fee?',
    a: 'No. ZYVORA tournaments are completely free to enter. The ₹10,000 prize pool is fully sponsored.',
  },
  {
    q: 'What platform is used for coordination?',
    a: 'All room codes, scheduling, and live updates are distributed via the official ZYVORA Discord. Joining and staying active on Discord is mandatory for all participants.',
  },
  {
    q: 'What happens if a player disconnects mid-match?',
    a: 'Disconnections are not grounds for a replay or pause. Teams are responsible for their own connectivity. Room admins will not delay matches for technical issues.',
  },
  {
    q: 'How are scores verified?',
    a: 'ZYVORA bots log all kills, placements, and scores in real time directly from the official room. Results are published automatically and are final once posted.',
  },
]

export default function Tournaments() {
  useReveal()
  const countdown = useCountdown(TOURNAMENT_DATE)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const cdUnits = [
    { v: pad(countdown.days), l: 'Days' },
    { v: pad(countdown.hours), l: 'Hours' },
    { v: pad(countdown.minutes), l: 'Min' },
    { v: pad(countdown.seconds), l: 'Sec' },
  ]

  return (
    <main className="tnmt-page">

      {/* ── VIDEO HERO ── */}
      <section className="tnmt-hero" aria-label="Tournament hero">
        <video
          ref={videoRef}
          className="tnmt-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/montage.mp4" type="video/mp4" />
        </video>

        <div className="tnmt-overlay" aria-hidden="true" />

        <div className="tnmt-hero-inner">
          <div className="tnmt-live-badge reveal">
            <span className="tnmt-live-dot" aria-hidden="true" />
            Registration Open
          </div>

          <p className="tnmt-hero-org reveal">ZYVORA Presents</p>

          <h1 className="tnmt-hero-title reveal">
            Free Fire<br />
            <span className="tnmt-gradient-text">Tournament</span>
          </h1>

          <div className="tnmt-stats-bar reveal" role="list" aria-label="Tournament details">
            <div className="tnmt-hstat" role="listitem">
              <span className="tnmt-hstat-val">₹10,000</span>
              <span className="tnmt-hstat-lbl">Prize Pool</span>
            </div>
            <div className="tnmt-hstat" role="listitem">
              <span className="tnmt-hstat-val">Jul 15</span>
              <span className="tnmt-hstat-lbl">Tournament Date</span>
            </div>
            <div className="tnmt-hstat" role="listitem">
              <span className="tnmt-hstat-val">Jul 10</span>
              <span className="tnmt-hstat-lbl">Reg. Deadline</span>
            </div>
            <div className="tnmt-hstat" role="listitem">
              <span className="tnmt-hstat-val tnmt-hot">{SLOTS_REMAINING}/{TOTAL_SLOTS}</span>
              <span className="tnmt-hstat-lbl">Slots Left</span>
            </div>
          </div>

          <div className="tnmt-countdown reveal" aria-label="Countdown to tournament start">
            {cdUnits.map((unit, i) => (
              <Fragment key={unit.l}>
                <div className="tnmt-cd-unit">
                  <span className="tnmt-cd-num" aria-label={`${unit.v} ${unit.l}`}>{unit.v}</span>
                  <span className="tnmt-cd-lbl" aria-hidden="true">{unit.l}</span>
                </div>
                {i < 3 && <span className="tnmt-cd-colon" aria-hidden="true">:</span>}
              </Fragment>
            ))}
          </div>

          <div className="tnmt-hero-ctas reveal">
            <a href="#register" className="btn tnmt-btn-fire tnmt-btn-lg">
              Register Now <Arrow />
            </a>
            <a href="#rules" className="btn tnmt-btn-glass">
              View Rules
            </a>
          </div>
        </div>

        <div className="tnmt-scroll-cue" aria-hidden="true"><span /></div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="tnmt-section tnmt-mid" id="overview" aria-labelledby="overview-heading">
        <div className="wrap">
          <div className="tnmt-sec-head reveal">
            <div className="tnmt-eyebrow"><span className="tnmt-ebar" />Tournament Overview</div>
            <h2 id="overview-heading" className="tnmt-h2">How it works.</h2>
          </div>

          <div className="tnmt-overview-grid">
            {OVERVIEW.map((item) => (
              <div className="tnmt-ov-card reveal" key={item.n}>
                <span className="tnmt-ov-n">{item.n}</span>
                <span className="tnmt-ov-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIZE POOL ── */}
      <section className="tnmt-section tnmt-deep" id="prizes" aria-labelledby="prizes-heading">
        <div className="wrap">
          <div className="tnmt-sec-head tnmt-centered reveal">
            <div className="tnmt-eyebrow tnmt-eyebrow-c"><span className="tnmt-ebar" />Prize Distribution</div>
            <h2 id="prizes-heading" className="tnmt-h2">Play for the win.</h2>
          </div>

          <div className="tnmt-prize-podium">
            {PRIZES.map((p) => (
              <div className={`tnmt-prize-card ${p.cls} reveal`} key={p.place}>
                {p.crown && <span className="tnmt-crown" aria-hidden="true">👑</span>}
                {p.cls === 'tnmt-prize-first' && (
                  <div className="tnmt-prize-badge">Top Prize</div>
                )}
                <span className="tnmt-prize-place">{p.place} Place</span>
                <span className="tnmt-prize-emoji" aria-hidden="true">{p.emoji}</span>
                <div className="tnmt-prize-amount">{p.amount}</div>
                <div className="tnmt-prize-pct">{p.pct}</div>
              </div>
            ))}
          </div>

          <p className="tnmt-prize-footer reveal">
            Total prize pool: <strong>₹10,000</strong> — distributed digitally within 72 hours of completion.
          </p>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="tnmt-section tnmt-mid" id="schedule" aria-labelledby="schedule-heading">
        <div className="wrap">
          <div className="tnmt-sec-head reveal">
            <div className="tnmt-eyebrow"><span className="tnmt-ebar" />Event Schedule</div>
            <h2 id="schedule-heading" className="tnmt-h2">Key dates.</h2>
          </div>

          <ol className="tnmt-timeline" aria-label="Tournament schedule">
            {SCHEDULE.map((item, i) => (
              <li className="tnmt-tl-row reveal" key={i}>
                <div className="tnmt-tl-date" aria-label={item.date}>{item.date}</div>
                <div className="tnmt-tl-spine" aria-hidden="true">
                  <div className="tnmt-tl-dot" />
                  {i < SCHEDULE.length - 1 && <div className="tnmt-tl-line" />}
                </div>
                <div className="tnmt-tl-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── RULES ── */}
      <section className="tnmt-section tnmt-deep" id="rules" aria-labelledby="rules-heading">
        <div className="wrap">
          <div className="tnmt-sec-head reveal">
            <div className="tnmt-eyebrow"><span className="tnmt-ebar" />Official Rules</div>
            <h2 id="rules-heading" className="tnmt-h2">Know the rules.</h2>
          </div>

          <div className="tnmt-rules-layout">
            <ol className="tnmt-rules-list" aria-label="Tournament rules">
              {RULES.map((rule, i) => (
                <li className="tnmt-rule reveal" key={i}>
                  <span className="tnmt-rule-n" aria-hidden="true">{pad(i + 1)}</span>
                  <span className="tnmt-rule-text">{rule}</span>
                </li>
              ))}
            </ol>

            <aside className="tnmt-rules-aside reveal" aria-label="Fair play notice">
              <div className="tnmt-rules-aside-inner">
                <span className="tnmt-rules-aside-icon" aria-hidden="true">⚠️</span>
                <h3>Fair play is mandatory</h3>
                <p>
                  ZYVORA operates fully automated rooms. Every kill, placement, and action
                  is logged in real time. Any violation results in a permanent ban from all
                  future ZYVORA events.
                </p>
                <div className="tnmt-rules-aside-sep" />
                <p className="tnmt-rules-aside-small">
                  Questions? Ask in <strong>#tournament-support</strong> on our Discord.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="tnmt-section tnmt-mid" id="faq" aria-labelledby="faq-heading">
        <div className="wrap">
          <div className="tnmt-sec-head tnmt-centered reveal">
            <div className="tnmt-eyebrow tnmt-eyebrow-c"><span className="tnmt-ebar" />FAQ</div>
            <h2 id="faq-heading" className="tnmt-h2">Questions answered.</h2>
          </div>

          <dl className="tnmt-faq" aria-label="Frequently asked questions">
            {FAQ.map((item, i) => (
              <div
                className={`tnmt-faq-item reveal${openFaq === i ? ' tnmt-faq-open' : ''}`}
                key={i}
              >
                <dt>
                  <button
                    className="tnmt-faq-trigger"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span>{item.q}</span>
                    <span className="tnmt-faq-icon" aria-hidden="true">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${i}`}
                  className="tnmt-faq-answer"
                  hidden={openFaq !== i}
                >
                  <p>{item.a}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── REGISTER CTA ── */}
      <section className="tnmt-register" id="register" aria-labelledby="register-heading">
        <div className="tnmt-register-glow" aria-hidden="true" />
        <div className="wrap tnmt-register-wrap">
          <div className="reveal">
            <div className="tnmt-eyebrow tnmt-eyebrow-c">
              <span className="tnmt-ebar" />{SLOTS_REMAINING} Slots Remaining
            </div>
            <h2 id="register-heading" className="tnmt-register-title">
              Your squad.<br />
              <span className="tnmt-gradient-text">One shot.</span>
            </h2>
            <p className="tnmt-register-sub">
              Registration closes <strong>July 10</strong>. Once the {TOTAL_SLOTS} slots fill,
              doors close. Don&rsquo;t wait.
            </p>
            <div className="tnmt-register-ctas">
              <a
                href="https://discord.gg/zyvora"
                className="btn tnmt-btn-fire tnmt-btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register on Discord <Arrow />
              </a>
              <a href="#overview" className="btn tnmt-btn-glass">
                Learn more
              </a>
            </div>
            <p className="tnmt-register-note">Free to enter · No entry fee · Open to all players</p>
          </div>
        </div>
      </section>

    </main>
  )
}
