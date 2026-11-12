import { useState, type ReactNode } from 'react'
import { LINKS } from '../config/links'
import type { Brand } from '../data/sponsors'
import { useCountUp, useInView } from '../lib/hooks'
import { Link } from '../lib/router'
import { Icon } from './Icon'

/** Section shell. Black is the ground; 'raised' is a slightly lifted panel
 *  and 'lime' is the full-bleed title-card moment from the trailer. */
export function Frame({ id, children, className = '', tone = 'dark' }: { id?: string; children: ReactNode; className?: string; tone?: 'dark' | 'lime' | 'raised' | 'paper' }) {
  const t = tone === 'paper' ? 'dark' : tone
  return (
    <section id={id} className={`sec sec--${t} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}

/** HUD frame from the trailer's end card: lime corner brackets with small
 *  mono labels pinned to the corners. */
export function Hud({ children, className = '', tl, br }: { children: ReactNode; className?: string; tl?: string; br?: string }) {
  return (
    <div className={`hud ${className}`}>
      <span className="hud__c hud__c--tl" aria-hidden="true" />
      <span className="hud__c hud__c--tr" aria-hidden="true" />
      <span className="hud__c hud__c--bl" aria-hidden="true" />
      <span className="hud__c hud__c--br" aria-hidden="true" />
      {tl && <span className="hud__l hud__l--tl">{tl}</span>}
      {br && <span className="hud__l hud__l--br">{br}</span>}
      {children}
    </div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="blk">{children}</p>
}

/** Section head. The label reads like a block header in an explorer:
 *  block number, then what the block holds. */
export function SectionHead({ eyebrow, title, sub, aside, n }: { eyebrow: string; title: ReactNode; sub?: ReactNode; aside?: ReactNode; n?: string }) {
  return (
    <header className="shead rv">
      <div className="shead__main">
        <p className="blk">
          {n && <span className="blk__n">{n}</span>}
          {eyebrow}
        </p>
        <h2 className="h2">{title}</h2>
        {sub && <p className="lede">{sub}</p>}
      </div>
      {aside && <div className="shead__aside">{aside}</div>}
    </header>
  )
}

type BtnProps = { to?: string; href?: string; variant?: 'lime' | 'ghost' | 'dark' | 'dark-ghost' | 'ink'; icon?: string; children: ReactNode; download?: boolean }

export function Button({ to, href, variant = 'lime', icon, children, download }: BtnProps) {
  const cls = `btn btn--${variant}`
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} className="btn__ico" />}
    </>
  )
  if (to) return <Link to={to} className={cls}>{inner}</Link>
  return (
    <a className={cls} href={href} download={download || undefined} {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  )
}

/** Primary CTA. Registrations are open: goes to LINKS.register, or to the
 *  homepage #register block until that link is pasted in. */
export function RegisterButton({ variant = 'lime', label = LINKS.register ? `Register on ${LINKS.registerPlatform}` : 'Register your team', size }: { variant?: 'lime' | 'ghost' | 'dark'; label?: string; size?: 'lg' }) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ''}`
  const inner = (
    <>
      <span>{label}</span>
      <Icon name="arrow" className="btn__ico" />
    </>
  )
  if (LINKS.register)
    return (
      <a className={cls} href={LINKS.register} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  return (
    <Link to="/#register" className={cls}>
      {inner}
    </Link>
  )
}

export function LogoTile({ b, size = 'md', named }: { b: Brand; size?: 'sm' | 'md'; named?: boolean }) {
  const img = (
    <>
      <img src={b.logo} alt={b.name} loading="lazy" draggable={false} />
      {named && (
        <span className="logo__name" aria-hidden="true">
          {b.name}
          {b.href && <Icon name="arrow" />}
        </span>
      )}
    </>
  )
  const cls = `logo logo--${size} ${b.mono ? 'logo--mono' : 'logo--color'}${b.tall ? ' logo--tall' : ''}${named ? ' logo--named' : ''}`
  return b.href ? (
    <a className={cls} href={b.href} target="_blank" rel="noopener noreferrer" title={b.name}>
      {img}
    </a>
  ) : (
    <span className={cls} title={b.name}>
      {img}
    </span>
  )
}

/** Infinite logo loop. The list is rendered twice so -50% loops seamlessly. */
export function Marquee({ items, reverse, speed = 40 }: { items: Brand[]; reverse?: boolean; speed?: number }) {
  return (
    <div className={`marquee ${reverse ? 'marquee--rev' : ''}`} style={{ ['--dur' as string]: `${speed}s` }}>
      <div className="marquee__track">
        {[...items, ...items].map((b, i) => (
          <span key={i} className="marquee__item" aria-hidden={i >= items.length || undefined}>
            <img src={b.logo} alt={i < items.length ? b.name : ''} loading="lazy" draggable={false} className={b.mono ? '' : 'is-color'} />
          </span>
        ))}
      </div>
    </div>
  )
}

/** Number that counts up the first time it scrolls into view. */
export function CountUp({ value, prefix = '', suffix = '', decimals }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4)
  const v = useCountUp(value, seen)
  const d = decimals ?? (Number.isInteger(value) ? 0 : 1)
  const shown = v.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d })
  return (
    <span ref={ref} className="num" aria-label={`${prefix}${value.toLocaleString('en-IN')}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {shown}
        {suffix}
      </span>
    </span>
  )
}

export function CopyRow({ icon, label, value, href }: { icon: string; label?: string; value: string; href?: string }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1600)
    } catch {
      const sel = window.getSelection()
      const node = document.getElementById(`cv-${value}`)
      if (sel && node) {
        const r = document.createRange()
        r.selectNodeContents(node)
        sel.removeAllRanges()
        sel.addRange(r)
      }
    }
  }
  return (
    <div className="copyrow">
      <Icon name={icon} className="copyrow__ico" />
      <div className="copyrow__text">
        {label && <span className="copyrow__label">{label}</span>}
        {href ? (
          <a id={`cv-${value}`} className="copyrow__val" href={href}>
            {value}
          </a>
        ) : (
          <span id={`cv-${value}`} className="copyrow__val">
            {value}
          </span>
        )}
      </div>
      <button type="button" className={`copybtn ${done ? 'is-done' : ''}`} onClick={copy} aria-label={`Copy ${value}`}>
        <Icon name={done ? 'check' : 'copy'} />
        <span className="sr" aria-live="polite">{done ? 'Copied' : ''}</span>
      </button>
    </div>
  )
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="acc">
      {items.map((it, i) => {
        const on = open === i
        return (
          <div key={it.q} className={`acc__item ${on ? 'is-open' : ''}`}>
            <h3 className="acc__h">
              <button type="button" id={`faq-q${i}`} aria-expanded={on} aria-controls={`faq-a${i}`} onClick={() => setOpen(on ? null : i)}>
                <span>{it.q}</span>
                <Icon name="plus" className="acc__ico" />
              </button>
            </h3>
            <div className="acc__panel" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}>
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Five stars, filled to the rating; they light up in turn on view. */
export function Stars({ r }: { r: number }) {
  return (
    <div className="stars" aria-label={`Rated ${r} out of 5 by participants`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="star" style={{ ['--f' as string]: Math.max(0, Math.min(1, r - i)), ['--i' as string]: i }}>
          <Icon name="star" />
        </span>
      ))}
    </div>
  )
}
