import { useEffect, useRef, useState } from 'react'
import { EVENT } from '../data/event'
import { useReducedMotion } from '../lib/hooks'

// The strip under the hero, in five styles to compare (?ticker=1..5).
// 1 Wire        quiet mono news wire, padded
// 2 Outline     big outlined Yapari drifting, one word filled lime
// 3 Rails       two thin mono rails sliding in opposite directions
// 4 Rotator     one statement at a time, sliding up, with a counter
// 5 Scroll      big outlined rows that move with the page scroll
// The switcher is a temporary design tool on the redesign branch.

type V = '1' | '2' | '3' | '4' | '5'
const NAMES: Record<V, string> = { '1': 'Wire', '2': 'Outline', '3': 'Rails', '4': 'Rotator', '5': 'Scroll' }
const GLYPHS = ['◎', '✕', '□', '+']

const ITEMS = () => [
  `Registrations close ${EVENT.registrationClosesShort}`,
  'Entry free',
  'Teams of 4–6',
  '24 hours',
  'Web3 × Business',
  'VIT Chennai',
  '9–10 Jan 2027',
  `Top ${EVENT.shortlisted} to VIT Chennai`,
  `${EVENT.finalistsPerTrack} finalists per track`,
]

const read = (): V => {
  const v = new URLSearchParams(location.search).get('ticker')
  return v === '2' || v === '3' || v === '4' || v === '5' ? v : '1'
}

/** A looping row: the list rendered 4× so translateX(-50%) loops seamlessly. */
function Loop({ items, cls, reverse }: { items: string[]; cls: string; reverse?: boolean }) {
  const row = [...items, ...items]
  return (
    <div className={`wl ${cls}${reverse ? ' wl--rev' : ''}`}>
      <div className="wl__track">
        {[...row, ...row].map((t, i) => (
          <span key={i} className={`wl__i${i % items.length === 0 ? ' is-hl' : ''}`}>
            <i>{GLYPHS[i % GLYPHS.length]}</i>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function Rotator({ items }: { items: string[] }) {
  const [n, setN] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setN((x) => (x + 1) % items.length), 2600)
    return () => window.clearInterval(id)
  }, [items.length, reduce])
  return (
    <div className="wrot">
      <span className="wrot__n">
        {String(n + 1).padStart(2, '0')} <span>/ {String(items.length).padStart(2, '0')}</span>
      </span>
      <div className="wrot__view">
        <span key={n} className={`wrot__t${n === 0 ? ' is-hl' : ''}`}>
          <i>{GLYPHS[n % GLYPHS.length]}</i>
          {items[n]}
        </span>
      </div>
      <span className="wrot__bar" aria-hidden="true">
        <span key={n} />
      </span>
    </div>
  )
}

function ScrollRows({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height) // 0 → 1 across the viewport
      el.style.setProperty('--sx', `${(p - 0.5) * 40}%`)
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', on, { passive: true })
    return () => {
      window.removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [reduce])
  const a = items.slice(0, 5)
  const b = items.slice(4)
  const line = (xs: string[], k: string) => (
    <div className={`wsc__row wsc__row--${k}`}>
      {[...xs, ...xs, ...xs].map((t, i) => (
        <span key={i} className={`wsc__i${k === 'a' && i % xs.length === 0 ? ' is-hl' : ''}`}>
          {t}
          <i>{GLYPHS[i % GLYPHS.length]}</i>
        </span>
      ))}
    </div>
  )
  return (
    <div className="wsc" ref={ref}>
      {line(a, 'a')}
      {line(b, 'b')}
    </div>
  )
}

export function Wire() {
  const [v, setV] = useState<V>(read)
  const items = ITEMS()
  const choose = (n: V) => {
    setV(n)
    const u = new URL(location.href)
    u.searchParams.set('ticker', n)
    history.replaceState(history.state, '', u)
  }
  return (
    <>
      <div className={`wire wire--${v}`} aria-hidden="true">
        {v === '1' && <Loop items={items} cls="wl--wire" />}
        {v === '2' && <Loop items={items} cls="wl--outline" />}
        {v === '3' && (
          <>
            <Loop items={items} cls="wl--rail" />
            <Loop items={[...items].reverse()} cls="wl--rail wl--rail-b" reverse />
          </>
        )}
        {v === '4' && <Rotator items={items} />}
        {v === '5' && <ScrollRows items={items} />}
      </div>
      <div className="hswitch" role="group" aria-label="Ticker style (design preview)">
        <span className="hswitch__k">Ticker</span>
        {(Object.keys(NAMES) as V[]).map((x) => (
          <button key={x} type="button" className={v === x ? 'is-on' : ''} aria-pressed={v === x} onClick={() => choose(x)}>
            {x} <span>{NAMES[x]}</span>
          </button>
        ))}
      </div>
    </>
  )
}
