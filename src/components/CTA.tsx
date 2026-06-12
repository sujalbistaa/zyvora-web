import { Link } from 'react-router-dom'
import { Arrow } from './Icons'

export default function CTA() {
  return (
    <section className="cta-band" id="join">
      <div className="wrap reveal">
        <div className="eyebrow eyebrow-flex center">
          <span className="tick-molten" /> Let&rsquo;s build
        </div>
        <h2>
          Ready to <span className="molten">forge</span> something?
        </h2>
        <p>
          Whether you&rsquo;re a broadcast production that needs the room automated, or a creator
          who wants a site and a store &mdash; let&rsquo;s talk.
        </p>
        <div className="cta-row">
          <Link className="btn btn-molten" to="/partner">
            Partner with us
            <Arrow />
          </Link>
          <a className="btn btn-ghost" href="#work">
            Build my creator site
          </a>
        </div>
      </div>
    </section>
  )
}
