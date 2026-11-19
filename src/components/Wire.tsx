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

  // Rows drift slowly on their own (so the strip is never static) and the
  // page scroll adds to that drift. Each row holds its list three times; the
  // offset wraps every one-list width, so the loop is seamless. Per frame this
  // only reads scrollY and writes two transforms: no layout reads.
  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    const rows = Array.from(el.querySelectorAll<HTMLElement>('.wsc__row'))
    let setW = rows.map((r) => r.scrollWidth / 3)
    const measure = () => (setW = rows.map((r) => r.scrollWidth / 3))
    const DRIFT = 22 // px per second when idle
    const PUSH = 0.35 // px of travel per px scrolled
    let raf = 0
    let visible = true
    let t0 = performance.now()
    const wrap = (x: number, w: number) => ((x % w) + w) % w
    const frame = (t: number) => {
      const travel = ((t - t0) / 1000) * DRIFT + window.scrollY * PUSH
      rows.forEach((row, i) => {
        const w = setW[i] || 1
        const x = i === 0 ? -wrap(travel, w) : -w + wrap(travel * 0.8, w)
        row.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`
      })
      if (visible) raf = requestAnimationFrame(frame)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
    })
    io.observe(el)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    document.fonts?.ready.then(measure)
    t0 = performance.now()
    start()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
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
