import { Link } from 'react-router-dom'
import { LogoMark } from './Icons'

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
              We build the bots that automate official esports rooms for broadcast productions
              &mdash; and the websites where creators grow their brand and sell their merch.
            </p>
          </div>

          <div className="foot-col">
            <h5>Navigate</h5>
            <Link to="/tournaments">Tournaments</Link>
            <Link to="/players">Players</Link>
            <Link to="/creators">Creators</Link>
            <Link to="/bots">Bots</Link>
            <Link to="/jerseys">Jerseys</Link>
          </div>

          <div className="foot-col">
            <h5>What we build</h5>
            <a href="/#automation">Room automation</a>
            <a href="/#automation">Broadcast overlay</a>
            <Link to="/creators">Creator websites</Link>
            <Link to="/creators">Merch storefronts</Link>
          </div>

          <div className="foot-col">
            <h5>Connect</h5>
            <a href="#">Discord</a>
            <a href="#">YouTube</a>
            <a href="#">Instagram</a>
            <Link to="/partner">Partner with us</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span className="mono">&copy; 2026 ZYVORA — FORGE THE FUTURE</span>
          <span className="mono">Crafted by Sujal with ❤️</span>
        </div>
      </div>

      <div className="watermark" aria-hidden="true">ZYVORA</div>
    </footer>
  )
}
