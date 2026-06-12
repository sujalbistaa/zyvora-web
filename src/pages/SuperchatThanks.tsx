import { Link, useParams, useSearchParams } from 'react-router-dom'

export default function SuperchatThanks() {
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const raw = (params.get('status') ?? '').toLowerCase()
  const ok = raw === 'success' || raw === 'completed' || raw === 'ok'

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow eyebrow-flex">
            <span className="tick-molten" /> Superchat
          </div>
          {ok ? (
            <>
              <h1>
                Sent. <span className="molten">Thank you.</span>
              </h1>
              <p className="lede">
                Your message is on its way to the live chat. Thanks for supporting the creator and
                ZYVORA.
              </p>
            </>
          ) : (
            <>
              <h1>
                Payment <span className="molten">didn&rsquo;t go through</span>.
              </h1>
              <p className="lede">
                No money was taken. You can head back and try again.
              </p>
            </>
          )}
          <div className="cta-row">
            <Link className="btn btn-molten" to={`/c/${slug}`}>
              {ok ? 'Send another' : 'Try again'}
            </Link>
            <Link className="btn btn-ghost" to="/">
              Back to ZYVORA
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
