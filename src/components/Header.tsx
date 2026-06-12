import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrolled } from '../hooks/useScrolled'
import { Arrow, LogoMark } from './Icons'

export default function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="ZYVORA home" onClick={close}>
          <LogoMark />
          <span>
            ZY<span className="dot">V</span>ORA<span className="dot">.</span>
          </span>
        </Link>

        <nav>
          <ul className={open ? 'open' : ''}>
            <li>
              <a className="navlink" href="/#work" onClick={close}>
                What we do
              </a>
            </li>
            <li>
              <a className="navlink" href="/#automation" onClick={close}>
                Automation
              </a>
            </li>
            <li>
              <a className="navlink" href="/#principles" onClick={close}>
                Studio
              </a>
            </li>
            <li>
              <Link className="navlink" to="/play" onClick={close}>
                Play
              </Link>
            </li>
            <li>
              <Link className="navlink" to="/superchat" onClick={close}>
                Superchat
              </Link>
            </li>
            <li>
              <Link className="btn btn-molten" to="/partner" onClick={close}>
                Partner with us
                <Arrow />
              </Link>
            </li>
          </ul>

          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  )
}
