import { Link } from 'react-router-dom'
import { LogoMark, NepalMark } from './Icons'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="brand">
              <LogoMark stroke="#ECEDE9" size={30} />
              <span>
                ZYVORA<span className="dot">.</span>
              </span>
            </div>
            <p>
              We build the bots that automate official Free Fire rooms for broadcast productions
              &mdash; and the websites where creators sell their merch.
            </p>
            <div className="nepal">
              <NepalMark /> MADE IN NEPAL
            </div>
          </div>

          <div className="foot-col">
            <h5>Studio</h5>
            <a href="/#work">What we do</a>
            <a href="/#principles">How we work</a>
            <Link to="/partner">Partner with us</Link>
            <a href="#">Careers</a>
          </div>

          <div className="foot-col">
            <h5>What we build</h5>
            <a href="/#automation">Room automation</a>
            <a href="/#automation">Broadcast partners</a>
            <a href="/#work">Creator websites</a>
            <a href="/#work">Merch storefronts</a>
          </div>

          <div className="foot-col">
            <h5>Connect</h5>
            <a href="#">Discord</a>
            <a href="#">YouTube</a>
            <a href="#">Instagram</a>
            <Link to="/partner#contact">Contact</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span className="mono">&copy; 2026 ZYVORA — FORGE THE FUTURE</span>
          <span className="mono">PRIVACY · TERMS</span>
        </div>
      </div>

      <div className="watermark" aria-hidden="true">
        ZYVORA
      </div>
    </footer>
  )
}
