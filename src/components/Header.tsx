import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrolled } from '../hooks/useScrolled'
import { LogoMark } from './Icons'

const NAV = [
  { label: 'Tournaments', to: '/tournaments' },
  { label: 'Players', to: '/players' },
  { label: 'Creators', to: '/creators' },
  { label: 'Bots', to: '/bots' },
  { label: 'Jerseys', to: '/jerseys' },
]

export default function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()

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
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  className={`navlink${pathname === n.to ? ' active' : ''}`}
                  to={n.to}
                  onClick={close}
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="btn btn-molten nav-cta" to="/partner" onClick={close}>
                Partner
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
