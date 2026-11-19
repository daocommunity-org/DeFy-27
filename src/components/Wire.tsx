import { useEffect, useRef } from 'react'
import { EVENT } from '../data/event'
import { useReducedMotion } from '../lib/hooks'

// The strip under the hero: two rows of big outlined type that move with
// the page scroll, in opposite directions, instead of looping on a timer.
// "Registrations close …" is filled lime; separators are mosaic glyphs.

const GLYPHS = ['◎', '✕', '□', '+']

const items = () => [
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

export function Wire() {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height) // 0 → 1 as it crosses the screen
      el.style.setProperty('--sx', `${((p - 0.5) * 40).toFixed(2)}%`)
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

  const all = items()
  const a = all.slice(0, 5)
  const b = all.slice(4)
  const line = (xs: string[], k: 'a' | 'b') => (
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
    <div className="wire wire--5" aria-hidden="true">
      <div className="wsc" ref={ref}>
        {line(a, 'a')}
        {line(b, 'b')}
      </div>
    </div>
  )
}
