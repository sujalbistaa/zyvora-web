import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'

const API = import.meta.env.VITE_SUPERCHAT_API ?? ''
const PRESETS = [50, 100, 200, 500]
const MAX_MESSAGE = 120

type Creator = {
  slug: string
  displayName: string
  minAmount?: number
  maxAmount?: number
}

export default function Superchat() {
  useReveal()
  const { slug = '' } = useParams()

  const [creator, setCreator] = useState<Creator | null>(null)
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'notfound'>('loading')
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState<number>(100)
  const [gateway, setGateway] = useState<'khalti' | 'esewa'>('khalti')

  useEffect(() => {
    if (!slug) return
    let active = true
    fetch(`${API}/api/creators/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((data: Creator) => {
        if (!active) return
        setCreator(data)
        setLoadState('ok')
      })
      .catch(() => {
        if (active) setLoadState('notfound')
      })
    return () => {
      active = false
    }
  }, [slug])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API}/api/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorSlug: slug,
          viewerName: name,
          message,
          amount,
          gateway,
        }),
      })
      if (!res.ok) throw new Error('initiate failed')
      const data: { paymentUrl?: string } = await res.json()
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
        return
      }
      throw new Error('no payment url')
    } catch {
      setStatus('error')
    }
  }

  const creatorName = creator?.displayName ?? slug

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex reveal">
            <span className="tick-molten" /> Superchat
          </div>
          <h1 className="reveal">
            Support <span className="molten">{creatorName}</span>.
          </h1>
          <p className="lede reveal">
            Send a paid shout-out and your message gets posted into {creatorName}&rsquo;s live chat.
            Powered by Khalti &amp; eSewa.
          </p>
        </div>
      </section>

      <section className="contact" id="pay">
        <div className="wrap">
          <div className="sc-maintenance reveal" role="status">
            <strong>Under maintenance — coming soon</strong>
            <p>Superchat is not yet live. This feature is still being built and will launch soon.</p>
          </div>

          {!API && (
            <div className="sc-banner reveal" role="alert">
              <strong>Backend not configured.</strong> Set <code>VITE_SUPERCHAT_API</code> to your
              superchat service URL to enable payments.
            </div>
          )}

          {loadState === 'notfound' ? (
            <div className="form-success reveal" role="status">
              <strong>Creator not found.</strong>
              <p>Double-check the link — it should look like <code>/c/their-name</code>.</p>
            </div>
          ) : (
            <form className="form reveal" onSubmit={submit}>
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Shown in chat"
                />
              </div>

              <div className="field">
                <label htmlFor="message">
                  Message <span className="sc-count">{message.length}/{MAX_MESSAGE}</span>
                </label>
                <textarea
                  id="message"
                  required
                  maxLength={MAX_MESSAGE}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say something nice…"
                />
              </div>

              <div className="field">
                <label>Amount (NPR)</label>
                <div className="sc-amounts">
                  {PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p}
                      className={`sc-amt${amount === p ? ' on' : ''}`}
                      aria-pressed={amount === p}
                      onClick={() => setAmount(p)}
                    >
                      Rs {p}
                    </button>
                  ))}
                  <input
                    className="sc-amt-input"
                    type="number"
                    min={creator?.minAmount ?? 10}
                    max={creator?.maxAmount ?? 100000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    aria-label="Custom amount"
                  />
                </div>
              </div>

              <div className="field">
                <label>Pay with</label>
                <div className="sc-gateways">
                  <button
                    type="button"
                    className={`sc-gw${gateway === 'khalti' ? ' on' : ''}`}
                    aria-pressed={gateway === 'khalti'}
                    onClick={() => setGateway('khalti')}
                  >
                    Khalti
                  </button>
                  <button
                    type="button"
                    className={`sc-gw${gateway === 'esewa' ? ' on' : ''}`}
                    aria-pressed={gateway === 'esewa'}
                    onClick={() => setGateway('esewa')}
                  >
                    eSewa
                  </button>
                </div>
              </div>

              <p className="form-note">
                Your message appears as a chat message on {creatorName}&rsquo;s stream — it is not an
                official YouTube Super Chat.
              </p>

              {status === 'error' && (
                <p className="form-error" role="alert">
                  Couldn&rsquo;t start the payment. Please try again in a moment.
                </p>
              )}

              <button
                className="btn btn-molten submit"
                type="submit"
                disabled={true}
              >
                {status === 'sending' ? 'Redirecting…' : `Continue to pay Rs ${amount}`}
                <Arrow />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
