import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const API = import.meta.env.VITE_SUPERCHAT_API ?? ''

const STEPS = [
  { ref: '/ 01', title: 'Pick a creator', body: 'Choose any ZYVORA creator who is live or accepting superchats.' },
  { ref: '/ 02', title: 'Pay with Khalti or eSewa', body: 'Add your message and amount, then pay with the wallet you already use.' },
  { ref: '/ 03', title: 'Hit the stream', body: 'Your message posts into their live chat and pops on the broadcast overlay.' },
]

type Creator = { slug: string; displayName: string }

export default function SuperchatHub() {
  useReveal()
  const navigate = useNavigate()
  const [handle, setHandle] = useState('')
  const [creators, setCreators] = useState<Creator[] | null>(null)

  useEffect(() => {
    if (!API) return
    let active = true
    fetch(`${API}/api/creators`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Creator[]) => {
        if (active && Array.isArray(data)) setCreators(data)
      })
      .catch(() => {
        /* no list endpoint / not reachable — fall back to the handle search */
      })
    return () => {
      active = false
    }
  }, [])

  const go = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const slug = handle.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
    if (slug) navigate(`/c/${slug}`)
  }

  return (
    <main>
      {/* hero */}
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal">
            <span className="tick-molten" /> Superchat
          </div>
          <h1 className="reveal">
            Superchat a <span className="molten">ZYVORA</span> creator.
          </h1>
          <p className="lede reveal">
            Send a paid shout-out to your favourite Nepali Free Fire creator and your message lands
            right in their live chat — paid with Khalti or eSewa.
          </p>
          <div className="sc-maintenance reveal" role="status">
            <strong>Under maintenance — coming soon</strong>
            <p>Superchat is still being built. This feature is not yet live. We'll announce when it launches.</p>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> How it works
            </div>
            <h2 className="fx-head">Three taps to the stream.</h2>
          </div>
          <div className="perks reveal">
            {STEPS.map((s) => (
              <div className="perk" key={s.ref}>
                <span className="ref">{s.ref}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* find / roster */}
      <section className="contact">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="tick" /> Find a creator
            </div>
            <h2 className="fx-head">Who do you want to support?</h2>
            <p>Know their handle? Jump straight to their superchat page.</p>
          </div>

          <form className="sc-find reveal" onSubmit={go}>
            <span className="sc-find-prefix">/c/</span>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="creator-handle"
              aria-label="Creator handle"
            />
            <button className="btn btn-molten" type="submit">
              Go
              <Arrow />
            </button>
          </form>

          {creators && creators.length > 0 && (
            <div className="ptypes reveal" style={{ marginTop: '36px' }}>
              {creators.map((c) => (
                <Link className="ptype sc-card" to={`/c/${c.slug}`} key={c.slug}>
                  <span className="lab">@{c.slug}</span>
                  <p>{c.displayName}</p>
                  <span className="sc-card-go">
                    Superchat <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          )}

          {!API && (
            <p className="form-note" style={{ marginTop: '24px' }}>
              The creator roster loads from your superchat backend once
              <code> VITE_SUPERCHAT_API </code> is set.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
