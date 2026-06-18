import { useEffect, useRef, Fragment } from 'react'
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Arrow, LogoMark } from '../components/Icons'

const TOURNAMENT_DATE = new Date('2026-06-24T23:59:00+05:45')
const TOTAL_SLOTS = 16
const SLOTS_REMAINING = 4

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
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

const SCHEDULE = [
  { date: 'Jun 19', title: 'Registration Opens', desc: 'Slots open. Register your squad on Discord.' },
  { date: 'Jun 24', title: 'Registration Closes', desc: 'Final deadline. Late entries not accepted.' },
  { date: 'Jun 26', title: 'Team Confirmation', desc: 'Confirmed squads published on Discord.' },
  { date: 'Jul 01', title: 'Day 1 — Qualifiers', desc: 'Groups A & B play. Top 8 teams advance.' },
]

const INFO = [
  { label: 'Tournament Date',    value: 'July 1, 2026' },
  { label: 'Registration Open',  value: 'June 19 – June 24' },
  { label: 'Team Confirmation',  value: 'June 26' },
  { label: 'Format',             value: 'Battle Royale — Squad (4v4)' },
  { label: 'Total Slots',        value: `${TOTAL_SLOTS} teams` },
  { label: 'Slots Remaining',    value: `${SLOTS_REMAINING} of ${TOTAL_SLOTS}` },
  { label: 'Entry Fee',          value: 'Free' },
  { label: 'Platform',           value: 'ZYVORA Discord' },
]

export default function Tournaments() {
  useReveal()
  const countdown = useCountdown(TOURNAMENT_DATE)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const cdUnits = [
    { v: pad(countdown.days),    l: 'Days' },
    { v: pad(countdown.hours),   l: 'Hours' },
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
          autoPlay muted loop playsInline preload="auto"
          aria-hidden="true"
        >
          <source src="/montage.mp4" type="video/mp4" />
        </video>
        <div className="tnmt-overlay" aria-hidden="true" />

        <div className="tnmt-hero-inner">
          <div className="tnmt-hero-brand reveal">
            <LogoMark stroke="#ECEDE9" size={32} />
            <span className="tnmt-brand-name">
              ZY<span className="tnmt-brand-v">V</span>ORA<span className="tnmt-brand-v">.</span>
            </span>
            <span className="tnmt-brand-presents">Presents</span>
          </div>

          <h1 className="tnmt-hero-title reveal">
            Free Fire<br />
            <span className="tnmt-title-orange">Tournament</span>
          </h1>

          <div className="tnmt-stats-bar reveal" role="list" aria-label="Tournament details">
            <div className="tnmt-hstat" role="listitem">
              <span className="tnmt-hstat-val">NPR 10,000</span>
              <span className="tnmt-hstat-lbl">Prize Pool</span>
            </div>
            <div className="tnmt-hstat" role="listitem">
              <span className="tnmt-hstat-val">Jul 01</span>
              <span className="tnmt-hstat-lbl">Tournament Date</span>
            </div>
            <div className="tnmt-hstat" role="listitem">
              <span className="tnmt-hstat-val">Jun 24</span>
              <span className="tnmt-hstat-lbl">Reg. Deadline</span>
            </div>
          </div>

          <div className="tnmt-countdown reveal" aria-label="Registration closes in">
            {cdUnits.map((unit, i) => (
              <Fragment key={unit.l}>
                <div className="tnmt-cd-unit">
                  <span className="tnmt-cd-num">{unit.v}</span>
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
            <a href="#schedule" className="btn tnmt-btn-glass">
              View Schedule
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT + KEY DATES ── */}
      <section className="tnmt-section" id="info">
        <div className="wrap">
          <div className="tnmt-split reveal">

            {/* left: tournament details */}
            <div className="tnmt-split-col">
              <div className="eyebrow eyebrow-flex">
                <span className="tick" /> Tournament Details
              </div>
              <h2 className="fx-head">About the event.</h2>
              <dl className="tnmt-info-list">
                {INFO.map((item) => (
                  <div className="tnmt-info-row" key={item.label}>
                    <dt className="tnmt-info-label">{item.label}</dt>
                    <dd className={`tnmt-info-value${item.label === 'Slots Remaining' ? ' tnmt-hot-ink' : ''}`}>
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* right: schedule timeline */}
            <div className="tnmt-split-col" id="schedule">
              <div className="eyebrow eyebrow-flex">
                <span className="tick" /> Event Schedule
              </div>
              <h2 className="fx-head">Key dates.</h2>
              <ol className="tnmt-timeline" aria-label="Tournament schedule">
                {SCHEDULE.map((item, i) => (
                  <li className="tnmt-tl-row" key={i}>
                    <div className="tnmt-tl-date">{item.date}</div>
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

          </div>
        </div>
      </section>

      {/* ── REGISTER CTA ── */}
      <section className="squad-cta" id="register">
        <video className="squad-cta-video" src="/ff.mp4" autoPlay muted loop playsInline preload="auto" />
        <div className="squad-cta-overlay" />
        <div className="wrap reveal">
          <div className="eyebrow eyebrow-flex center">
            <span className="tick-molten" /> {SLOTS_REMAINING} Slots Remaining
          </div>
          <h2>
            Your squad.<br />
            <span className="molten">One shot.</span>
          </h2>
          <p style={{ maxWidth: '44ch', margin: '0 auto 30px', fontSize: 17 }}>
            Registration closes <strong>June 24</strong>.
            Once the {TOTAL_SLOTS} slots fill, doors close.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-molten"
              href="https://discord.gg/zyvora"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register on Discord <Arrow />
            </a>
            <a className="btn btn-ghost" href="#info">
              Learn more
            </a>
          </div>
          <p className="squad-cta-note">
            Free to enter · No entry fee · Open to all players
          </p>
        </div>
      </section>

    </main>
  )
}
