import { useEffect, useState } from 'react'
import { LINKS, SOCIALS } from '../config/links'
import { EVENT } from '../data/event'
import { POWERED_BY } from '../data/sponsors'
import { Link, useRouter } from '../lib/router'
import { Icon, SocialIcon } from './Icon'
import { DefyWordmark, Mark27 } from './Marks'
import { RegisterButton } from './ui'

const NAV = [
  { to: '/#chain', label: 'How it works' },
  { to: '/#tracks', label: 'Tracks' },
  { to: '/#sponsors', label: 'Sponsors' },
  { to: '/archive', label: 'Past editions' },
  { to: '/sponsor', label: 'Sponsor us' },
]

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="DeFy'27 home">
      <DefyWordmark className="brand__defy" />
      <Mark27 className="brand__27" />
    </Link>
  )
}

export function Nav() {
  const { route } = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [route])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
    <a id="mlh-trust-badge" className="mlh-badge" href={LINKS.mlhBadge} target="_blank" rel="noopener noreferrer">
      <img src="/logos/mlh-trust-badge-2027-white.svg" alt="Major League Hacking 2027 Hackathon Season" />
    </a>
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__in">
        <Brand />
        <nav className="nav__links" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={`nav__a ${route === n.to ? 'is-on' : ''}`} aria-current={route === n.to ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="nav__cta">
          <RegisterButton label="Register" />
        </div>
        <button type="button" className="nav__burger" aria-expanded={open} aria-controls="mnav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      <div id="mnav" className="mnav" hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n, i) => (
            <Link key={n.to} to={n.to} className="mnav__a" style={{ ['--i' as string]: i }}>
              <span>{n.label}</span>
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
        <div className="mnav__foot">
          <RegisterButton />
          <p className="mnav__meta">
            {EVENT.datesShort} · {EVENT.city}
          </p>
        </div>
      </div>
    </header>
    </>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div className="foot__brand">
            <p className="foot__mark" aria-hidden="true">
              <DefyWordmark className="foot__defy" />
              <Mark27 className="foot__27" />
            </p>
            <p className="foot__blurb">Innovate. Code. Collaborate. A 24-hour Web3 hackathon at {EVENT.city}, {EVENT.datesShort}.</p>
          </div>
          <div className="foot__cols">
            <div>
              <p className="foot__h">Explore</p>
              <Link to="/#about">About</Link>
              <Link to="/#chain">How it works</Link>
              <Link to="/#tracks">Tracks</Link>
              <Link to="/#faq">FAQ</Link>
            </div>
            <div>
              <p className="foot__h">Get involved</p>
              {LINKS.register ? <a href={LINKS.register} target="_blank" rel="noopener noreferrer">Register</a> : <Link to="/#register">Register</Link>}
              {LINKS.whatsappCommunity && (
                <a href={LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer">
                  WhatsApp community
                </a>
              )}
              {LINKS.shortlistedTeams && (
                <a href={LINKS.shortlistedTeams} target="_blank" rel="noopener noreferrer">
                  Shortlisted teams
                </a>
              )}
              <a href={LINKS.mlhCodeOfConduct} target="_blank" rel="noopener noreferrer">
                MLH Code of Conduct
              </a>
              <Link to="/sponsor">Sponsor DeFy</Link>
              <Link to="/archive">Past editions</Link>
            </div>
          </div>
        </div>

        <div className="foot__mid">
          <div className="foot__powered">
            <span className="foot__h">Powered by</span>
            {POWERED_BY.map((p) => (
              <img key={p.name} src={p.logo} alt={p.name} loading="lazy" />
            ))}
          </div>
          <div className="socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
        </div>

        <p className="foot__copy">© 2026 DeFy&rsquo;27 · The DAO Community × BIC · VIT Chennai</p>
      </div>
    </footer>
  )
}
